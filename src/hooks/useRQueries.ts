import { useQuery } from "@tanstack/react-query";

// popular : 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
// upcoming: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
// top rated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
// series:  'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
// trending: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
// movieDetails: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
// movieCredits: `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
// recommendation: `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`

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

const getDetails = async (movieId: string, endpoint: string, extra?: string) => {
  try {
    const response = await fetch( `https://api.themoviedb.org/3/${endpoint}/${movieId}${extra && '/'+extra}?language=en-US`,
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


export const heroQuery = () => useQuery({queryKey: ['hero'], queryFn: () => getTrendingEndpoint('movie')})

export const seriesQuery = () => useQuery({queryKey: ['series'], queryFn: () => getTrendingEndpoint('tv')})

export const featuredMoviewQuery = () => useQuery({queryKey: ['featured'], queryFn: () => getEndpoint('popular')})

export const top10Query = () => useQuery({queryKey: ['top10'], queryFn: () => getEndpoint('top_rated')})

export const movieDetailsQuery = (movieId: string) => useQuery({queryKey: ['movieDetails', movieId], queryFn: ({queryKey}) => getDetails(queryKey[1], 'movie')})

export const movieCreditsQuery = (movieId: string) => useQuery({queryKey: ['credits', movieId], queryFn: ({queryKey}) => getDetails(queryKey[1], 'movie', 'credits')})

export const movieRecommendationsQuery = (movieId: string) => useQuery({queryKey: ['recommendations', movieId], queryFn: ({queryKey}) => getDetails(queryKey[1], 'movie', 'recommendations')})

export const youtubeVideoQuery = (query: string) => useQuery({queryKey: ['youtubeVideo', query], queryFn: ({queryKey}) => getYoutubeVideo(queryKey[1])})