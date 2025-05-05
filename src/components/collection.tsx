'use client'

import { Tmovie } from "@/app/(trendy)/layout"
import { Colors } from "./color"
import Loader from "@/components/loader"
import MovieCard from "@/components/movieCard"
import { SeeMore } from "@/icons/icons"
import { Stack, HStack, Text, Flex } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

type incoming = {
  title?: string,
  data: {
    results: Tmovie[]
  },
  isError: boolean,
  isLoading: boolean,
  error: Error | null,
  url?: string
}

const Collection = ({title, data, isError, isLoading, error, url}: incoming) => {
  const { gray900, primaryColor, gray400 } = Colors.light 
  const router = useRouter()

  if ( isLoading ) {
    return (
      <Stack gap='7'>
        <Text fontWeight='black' fontSize='2xl' color={{base:gray900, _dark: gray400}}> {title} </Text>
        <Loader />
      </Stack>
    )
  }

  if (isError) {
    throw new Error(error?.message)
  }

  // console.log(url)
  return (
    <Stack gap='7' maxW='full'>
      {
        title &&
        <HStack justifyContent='space-between' px={{base: '2'}}>
          <Text fontWeight='black' fontSize={{base:'xl', lg:'2xl'}} color={{base:gray900, _dark:gray400}}> {title} </Text>
          <HStack className="group" cursor='pointer' gap='1' onClick={() => router.push(url || '')}>
            <Text _groupHover={{fontWeight: 'bold'}} transition='all 0.08s ease-in' fontSize={{base:'xs', lg:'md'}} color={primaryColor}>See more</Text>
            <SeeMore />
          </HStack>
        </HStack>
      }
      <Stack gap='7' px='2'>
        <Flex direction='row' wrap='wrap' justifyContent={{base: 'center', md:'space-between'}} gap={{base:'5', md: '7'}} alignItems={{base:'center', md:'start'}}>
          {
            data.results?.slice(0,12).map((movie: Tmovie) => (

              <MovieCard title={movie.title ? movie.title : movie.name} type={movie.title ? 'movie' : 'series'} key={movie.id} movieId={movie.id} imgSrc={ movie.poster_path} date={movie.release_date ? movie.release_date : movie.first_air_date} tag={movie.title ? false : true}/>
            ))
            
          }
        </Flex>
      </Stack>
    </Stack>
)
}

export default Collection