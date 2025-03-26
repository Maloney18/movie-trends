import { Colors } from "./color"
import Loader from "@/components/loader"
import MovieCard from "@/components/movieCard"
import { SeeMore } from "@/icons/icons"
import { Stack, HStack, Text, Flex } from "@chakra-ui/react"

type movie = {
  title: string,
  poster_path: string,
  id: string,
  release_date: string,
  name: string,
  first_air_date: string,
}

type incoming = {
  title?: string,
  data: {
    results: movie[]
  },
  isError: boolean,
  isLoading: boolean,
  error: Error | null
}

const Collection = ({title, data, isError, isLoading, error}: incoming) => {
  const { gray900, primaryColor } = Colors.light 

  if ( isLoading ) {
    return (
      <Stack gap='7'>
        <Text fontWeight='black' fontSize='2xl' color={gray900}> {title} </Text>
        <Loader />
      </Stack>
    )
  }

  if (isError) {
    throw new Error(error?.message)
  }

  // console.log(data.results)
  return (
    <Stack gap='7' maxW='full'>
      {
        title &&
        <HStack justifyContent='space-between' px={{base: '2'}}>
          <Text fontWeight='black' fontSize={{base:'xl', lg:'2xl'}} color={gray900}> {title} </Text>
          <HStack gap='1'>
            <Text fontSize={{base:'xs', lg:'md'}} cursor='pointer' color={primaryColor}>See more</Text>
            <SeeMore />
          </HStack>
        </HStack>
      }
      <Stack gap='7' px='2'>
        <Flex direction='row' wrap='wrap' justifyContent={{base: 'center', md:'space-between'}} gap={{base:'5', md: '7'}} alignItems={{base:'center', md:'start'}}>
          {
            data.results?.slice(0,12).map((movie: movie) => (

              <MovieCard title={movie.title ? movie.title : movie.name} type={movie.title ? 'movie' : 'series'} key={movie.id} movieId={movie.id} imgSrc={ movie.poster_path} date={movie.release_date ? movie.release_date : movie.first_air_date}/>
            ))
          }
        </Flex>
      </Stack>
    </Stack>
)
}

export default Collection