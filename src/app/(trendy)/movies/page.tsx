'use client'

import { Colors } from "@/components/color"
import Loader from "@/components/loader"
import MovieCard from "@/components/movieCard"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Stack, Flex, Text } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import LoadingSpinner from "@/components/loadingSpinner"
import { useMyContext } from "@/hooks/useMyContext"
import { Tmovie } from "../layout"

const MoviesPage = () => { 
  const { gray900, gray400 } = Colors.light 
  const page = useRef<HTMLDivElement | null>(null)
  const [ ref, inview ] = useInView()
  const { moviesPageScrollHeight, setMoviesPageScrollHeight } = useMyContext()

  const getMovies = async ({pageParam}: {pageParam: number}) => {
    try {
      const response = await fetch( `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageParam}`,
        {
          method: 'GET',
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          }
        }
      )
      
      if (!response.ok) {
        throw new Error(`An error occured while fetching movies`)
      }
  
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  const { status, data, error, isFetchingNextPage, hasNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey: ['allMovies'], 
    queryFn: getMovies, 
    initialPageParam: 1,
    getNextPageParam: (lastpage, allpages) => {
      const currentPage = allpages.length
      const totalPages = lastpage.total_pages
      return currentPage < totalPages ? currentPage + 1 : undefined
    }, 
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  // unlimited scroll
  useEffect(() => {
    if (inview && hasNextPage) {
      fetchNextPage()
    }
  }, [inview, hasNextPage, fetchNextPage])

  // save page scroll-height before navigating from page
  useEffect(() => {
    if(moviesPageScrollHeight && page?.current) {
      page?.current?.offsetParent?.scrollTo({ top: moviesPageScrollHeight, behavior: "smooth" })
    }
  }, [moviesPageScrollHeight, page?.current])


  // reset page scroll-height back to zero when scroll-to-top button is pressed
  useEffect(() => {
    if(page.current?.offsetParent?.scrollTop === 0 && (moviesPageScrollHeight && moviesPageScrollHeight > 0)) {
      setMoviesPageScrollHeight(null)
    }
  }, [page?.current])

  if (status === 'pending') {
    return (
      <Stack gap='7'>
        <Text fontWeight='black' fontSize='4xl' textAlign='center' color={{base:gray900, _dark: gray400}}> Movies </Text>
        <Loader />
      </Stack>
    )
  }

  if (status === 'error') {
    throw new Error(error?.message)
  }

  const handleHeight = () => {
    setMoviesPageScrollHeight(page?.current?.offsetParent?.scrollTop || null)
  }

  const movies = data?.pages?.map((page) => page.results.map((movie: Tmovie, idx : number) => {
    if (page.results.length - 6 === idx) {
      return <MovieCard clicked={handleHeight} innerRef={ref} title={movie.title ? movie.title : movie.name} type={movie.title ? 'movie' : 'series'} key={movie.id} movieId={movie.id} imgSrc={ movie.poster_path} date={movie.release_date ? movie.release_date : movie.first_air_date} tag={movie.title ? false : true}/>
    }
    else {
      return <MovieCard clicked={handleHeight} title={movie.title ? movie.title : movie.name} type={movie.title ? 'movie' : 'series'} key={movie.id} movieId={movie.id} imgSrc={ movie.poster_path} date={movie.release_date ? movie.release_date : movie.first_air_date} tag={movie.title ? false : true}/>
    }
  }))

  // console.log(moviesPageScrollHeight)
  // console.log('child element', ref.current)
  // console.log('parent element', page.current?.offsetParent?.scrollTop)
  // console.log('parent element', page.current?.offsetParent?.moviePageScrollHeight)

  // const scrollToTop = () => {
  //   if (scrollTo) {
  //     page.current?.scrollTo({ top: scrollTo, behavior: "smooth" });
  //   }
  // };

  return (
    <Stack gap='7' maxW='full' ref={page} pb='5'>
      <Text fontWeight='black' fontSize={{base:'2xl', lg:'4xl'}} color={{base:gray900, _dark:gray400}} alignSelf='center'> Movies </Text>

      <Stack gap='7' px='2'>
        <Flex direction='row' wrap='wrap' justifyContent={{base: 'center', md:'space-between'}} gap={{base:'5', md: '7'}} alignItems={{base:'center', md:'start'}}>
          {movies}
        </Flex>
      </Stack>
    
      {
        hasNextPage && 
        <Stack aria-label="Loading more videos" role="status" alignSelf='center' justifyContent='center' alignItems='center' w='max-content' h='max-content' rounded='full'>
          <LoadingSpinner color="black"/>
        </Stack>
      }
    </Stack>
  )
}

export default MoviesPage