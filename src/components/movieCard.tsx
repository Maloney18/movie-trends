import { Box, Text, Grid, GridItem } from '@chakra-ui/react'
import { Colors } from './color'
import { useRouter } from 'next/navigation' 
import PosterPlaceholder from '@/assets/posterPlaceholder.png'

type incoming = {
  date?: string,
  title?: string,
  genre?: string,
  imgSrc?: string | null,
  movieId?: string,
  type?: string,
  tag?: boolean
}

const MovieCard = ({date, title, genre, imgSrc, movieId, type, tag} : incoming) => {
  const {gray400, gray900, rating, primaryLighter} = Colors.light
  const year = date ? new Date(date).getFullYear() :  ''
  const router = useRouter()

  const percent = {
    background: `linear-gradient(to top left, ${gray900} 80%, transparent 50%)`,
    borderRadius: '50%'
  }

  // console.log(imgSrc)
  return (
    <Grid cursor='pointer' gridTemplateRows={{base:'250px auto', md: '200px auto', lg: '250px auto'}} gap={3} w={{base:'200px', md: '150px', lg: '200px'}} onClick={() => router.push(`/${type === 'movie' ? 'movies' : 'series'}/${movieId}`)}>
      <GridItem pos='relative' h={{base:'250px', md: '200px', lg: '250px'}} w={{base:'200px', md: '150px', lg: '200px'}} bg={imgSrc ? '' : 'grey'} overflow='hidden' borderTopLeftRadius='lg' borderBottomRightRadius='lg'>
          {(imgSrc && title) &&
            <img 
            width='100%' 
            style={{
              height: '100%', 
              aspectRatio: '1/1',
            }} 
            alt="movie" 
            src={imgSrc ? `https://image.tmdb.org/t/p/w500${imgSrc}` : PosterPlaceholder.src}
          />}
          {tag && <Text pos='absolute' top='1.5' right='1.5' bg={primaryLighter} px='2.5' rounded='xl' color={{base: 'white', _dark: gray400}} fontWeight='medium' fontSize={{base: 'xs', md: 'sm'}}> Series </Text>}
      </GridItem>
      <GridItem display='flex' flexDir='column' gap={{base: '0.5', lg:'1.5'}}>
        {
          (year || title) ?
          (
            <>
              <Text color={gray400} fontWeight='bold' fontSize='xs'>{year}</Text>
              <Text color={{base:gray900, _dark: rating}} fontSize={{base:'md', lg:'lg'}} fontWeight='bold' wordWrap='break-word'>{title}</Text>
              <Text fontSize='xs' color={gray400} fontWeight='bold'>{genre}</Text>
            </>
          ) 
          :
          (
            <>
              <Box p='2.5' bg='grey' w='1/3'></Box>
              <Box p='2.5' bg='grey' w='2/3'></Box>
              <Box p='2.5' bg='grey' w='2/3'></Box>
            </>
          ) 
        }
      </GridItem>
    </Grid>
  )
}

export default MovieCard