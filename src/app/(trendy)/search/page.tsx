'use client'

import { Colors } from "@/components/color"
import Searchbar from "@/components/searchBar"
import { Flex, Stack, Text } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import { Tmovie } from "../layout"
import MovieCard from "@/components/movieCard"
import { useMyContext } from "@/hooks/useMyContext"
import LoadingSpinner from "@/components/loadingSpinner"
import { useMemo } from "react"


const SearchPage = () => {
  const searchParam = useSearchParams()
  const searchTitle = searchParam.get('title')
  const {primaryColor} = Colors.light
  const { searchResult, isLoading } = useMyContext()

  const Result = useMemo(() => searchResult?.map((movie: Tmovie) => <MovieCard title={movie.title ? movie.title : movie.name} type={movie.title ? 'movie' : 'series'} key={movie.id} movieId={movie.id} imgSrc={ movie.poster_path} date={movie.release_date ? movie.release_date : movie.first_air_date} tag={movie.title ? false : true}/>), [searchTitle]) 

  // console.log(searchResult)
  return (
    <Stack as='section' pt='5' pl='2' pr='4' gap='10'>
      <Stack gap='5'>
        <Searchbar />
        {searchTitle &&  <Text alignSelf='center' fontSize='lg'> Showing results for <span style={{fontWeight: 'bold', color: primaryColor}}>{searchTitle}</span></Text>}
      </Stack>

      {
        isLoading ?
        <Stack alignSelf='center' justifyContent='center' alignItems='center' w='max-content' h='max-content' rounded='full'>
          <LoadingSpinner color='black' />
        </Stack> 
        :
        (searchTitle && searchTitle.length > 0) ? searchResult?.length > 0 ?
        <Flex pb='5' direction='row' wrap='wrap' justifyContent={{base: 'center', md:searchResult.length < 3 ? 'unset' : 'space-between', lg: searchResult.length < 6 ? 'unset' : 'space-between'}} gap={{base:'5', md: '7'}} alignItems={{base:'center', md:'start'}}>
          {Result}
        </Flex>:
        <Text alignSelf='center' fontSize='lg'> Couldn't get the results for {searchTitle} </Text> :
        <Text alignSelf='center' fontSize='lg'>Type something in the searchbox</Text>
      }
    </Stack>
  )
}

export default SearchPage