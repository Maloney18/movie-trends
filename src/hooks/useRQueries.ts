import { useQuery } from "@tanstack/react-query";

// popular : 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
// upcoming: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
// top rated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
// series:  'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
// trending: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
// movieDetails: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
// movieCredits: `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
// recommendation: `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`
// search-movies: `https://api.themoviedb.org/3/search/${type}?query=sponge%20bob&include_adult=false&language=en-US&page=1`
// search-series: 'https://api.themoviedb.org/3/search/tv?query=solo%20leveling&include_adult=false&language=en-US&page=1'
// coming episoded: 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1'
// popular series: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'
// top rated series: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1'
// seriesDetails: 'https://api.themoviedb.org/3/tv/240411?language=en-US'
// seriesCredits: 'https://api.themoviedb.org/3/tv/240411/credits?language=en-US'
// seriesRecommendation: 'https://api.themoviedb.org/3/tv/240411/recommendations?language=en-US&page=1'
// similar: 'https://api.themoviedb.org/3/tv/240411/similar?language=en-US&page=1'
// seasons: 'https://api.themoviedb.org/3/tv/71912/season/1?language=en-US';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";


const getTrendingEndpoint = async (endpoint: string) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/${endpoint}/day?language=en-US`,
      {
        method: 'GET',
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`An error occured while fetching ${endpoint} movies`)
    }

    return response.json()
  } catch (error) {
    console.log(error)
  }
}

const getEndpoint = async (endpoint: string) => {
  try{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
      {
        method: 'GET',
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
      }
    )

    if (!response.ok) {
      throw new Error(`an error occured while fetching ${endpoint} movies`)
    }
    
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

const getDetails = async (id: string, endpoint: string, extra?: string, seasonNo?: string) => {
  try {
    const response = await fetch( `https://api.themoviedb.org/3/${endpoint}/${id}${extra && '/'+extra}${seasonNo ? '/season/'+seasonNo+'?language=en-US' : '?language=en-US'}`,
      {
        method: 'GET',
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`An error occured while fetching ${endpoint} details`)
    }

    return response.json()
  } catch (error) {
    console.log(error)
  }
}


const searchEndpoint = async (search: string, endpoint: string) => {
  try {
    const response = await fetch( `https://api.themoviedb.org/3/search/${endpoint}?query=${search}&include_adult=false&language=en-US&page=1`,
      {
        method: 'GET',
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`An error occured while fetching ${endpoint} search results`)
    }

    return response.json()
  } catch (error) {
    console.log(error)
  }
}

export const getYoutubeVideo = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}?part=snippet&q=${query}&type=video&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch video details");
  }

  const data = await response.json();

  if (data.items.length === 0) {
    throw new Error("No video found with this ID");
  }

  return data.items[0]; // Returns video details
};


export const heroQuery = () => useQuery({queryKey: ['hero'], queryFn: () => getTrendingEndpoint('all')})

export const seriesQuery = () => useQuery({queryKey: ['series'], queryFn: () => getTrendingEndpoint('tv')})

export const featuredMoviewQuery = () => useQuery({queryKey: ['featured'], queryFn: () => getEndpoint('popular')})

export const top10Query = () => useQuery({queryKey: ['top10'], queryFn: () => getEndpoint('top_rated')})

export const detailsQuery = (id: string, endpoint: string) => useQuery({queryKey: ['movieDetails', id, endpoint], queryFn: ({queryKey}) => getDetails(queryKey[1], queryKey[2])})

export const creditsQuery = (id: string, endpoint: string) => useQuery({queryKey: ['credits', id, endpoint], queryFn: ({queryKey}) => getDetails(queryKey[1], queryKey[2], 'credits')})

export const recommendationsQuery = (id: string, endpoint: string) => useQuery({queryKey: ['recommendations', id, endpoint], queryFn: ({queryKey}) => getDetails(queryKey[1], queryKey[2], 'recommendations')})

export const searchQuery = (search: string, endpoint: string) => useQuery({queryKey: ['search', search, endpoint], queryFn: ({queryKey}) => searchEndpoint(queryKey[1], queryKey[2])})

export const youtubeVideoQuery = (query: string) => useQuery({queryKey: ['youtubeVideo', query], queryFn: ({queryKey}) => getYoutubeVideo(queryKey[1])})