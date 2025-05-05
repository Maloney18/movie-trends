import { Box, Text, Grid, GridItem } from '@chakra-ui/react'
import { Colors } from './color'
import { useRouter } from 'next/navigation' 
import PosterPlaceholder from '@/assets/posterPlaceholder.png'
import { Ref } from 'react'

type incoming = {
  date?: string,
  title?: string,
  imgSrc?: string | null,
  movieId?: string,
  type?: string,
  tag?: boolean,
  innerRef?: Ref<HTMLDivElement>,
  clicked?: () => void
}

const MovieCard = ({date, title, imgSrc, movieId, type, tag, innerRef, clicked} : incoming) => {
  const {gray400, gray900, rating, primaryLighter, primaryColor} = Colors.light
  const year = date ? new Date(date).getFullYear() :  ''
  const router = useRouter()

  const percent = {
    background: `linear-gradient(to top left, ${gray900} 80%, transparent 50%)`,
    borderRadius: '50%'
  }

  return (
    <Grid 
      ref={innerRef} 
      className='group' 
      _hover={{cursor:'pointer'}} 
      gridTemplateRows={{base:'250px auto', md: '200px auto', lg: '250px auto'}} 
      gap={3} 
      w={{base:'200px', md: '150px', lg: '200px'}} 
      onClick={() => {
        router.push(`/${type === 'movie' ? 'movies' : 'series'}/${movieId}`)
        clicked && clicked()
      }}
    >
      <GridItem pos='relative' h={{base:'250px', md: '200px', lg: '250px'}} w={{base:'200px', md: '150px', lg: '200px'}} bg={imgSrc ? '' : 'grey'} overflow='hidden' borderTopLeftRadius='lg' borderBottomRightRadius='lg'>
          {title &&
            <img 
            width='100%' 
            style={{
              height: '100%', 
              aspectRatio: '1/1',
            }} 
            alt={title} 
            loading='lazy'
            src={imgSrc ? `https://image.tmdb.org/t/p/w500${imgSrc}` : PosterPlaceholder.src}
          />}
          {tag && <Text pos='absolute' top='1.5' right='1.5' bg={primaryLighter} px='2.5' rounded='xl' color={{base: 'white', _dark: gray400}} fontWeight='medium' fontSize={{base: 'xs', md: 'sm'}}> Series </Text>}
      </GridItem>
      <GridItem display='flex' flexDir='column' gap={{base: '0.5', lg:'1.5'}}>
        {
          (year || title) ?
          (
            <>
              <Text color={gray400} transition='all 0.3s ease-in'  _groupHover={{color: primaryLighter}} fontWeight='bold' fontSize='xs'>{year}</Text>
              <Text color={{base:gray900, _dark: rating}} transition='all 0.5s ease-in'  _groupHover={{color: primaryColor}}  _groupActive={{color: primaryColor}} fontSize={{base:'md', lg:'lg'}} fontWeight='bold' wordWrap='break-word' w='full'>{title}</Text>
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