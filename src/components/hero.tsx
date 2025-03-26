'use client'
import { Stack, Box, HStack, Text, Button, Flex } from "@chakra-ui/react"
import Searchbar from "./searchBar"
import { Watch } from "@/icons/icons"
import { Colors } from "./color"
import { Suspense, useEffect, useState } from "react"
import { heroQuery } from "@/hooks/useRQueries"
import { useRouter } from "next/navigation"

type movie = {
  id: string,
  poster_path: string,
  overview: string,
  original_title: string
}

const Hero = () => {
  const router = useRouter()
  const {isLoading, data, isError, error} = heroQuery()
  const { primaryColor, gray400} = Colors.light
  const [ nav, setNav ] = useState(0)
  const [ currentMovie, setCurrentMovie] = useState<movie>()

  useEffect(() => {
    if(data) {
      setCurrentMovie(data.results[0])
    }
  }, [data])

  const handleCurrent = (no : number) => {
    setCurrentMovie( data && data.results[no])
    setNav(no)
  }

  const current = {
    fontSize: '19px',
    color: 'white'
  };

  const normal ={
    fontSize: '14px',
    color: gray400
  }

  const hover = {
    color: 'white',
    fontSize: '15px'
  }

  if ( isLoading ) {
    return (
      <Stack alignItems='center' justifyContent='center' bg='grey' pos='relative' pt={{base: '2', md:'7'}} w='full' h='75vh' borderWidth='1px' gap='20' zIndex={1}>
        <Text color='white' fontSize='xl' fontWeight='black'>Loading...</Text>
      </Stack>
    )
  }

  if ( isError) {
    throw new Error(error.message)
  }

  return (
    <Stack pos='relative' pt={{base: '2', md:'7'}} w='full' h='75vh' justifyContent='space-between' pb={{base:'2', md: '16',lg:'20'}} zIndex={1}>
      <Box pos='absolute' top='0' h='75vh' w='full' zIndex={2} overflow='hidden' borderTopLeftRadius={{base:'xl', md:'0'}} borderBottomRightRadius={{base:'xl', md:'0'}}>
        <img 
          width='100%' 
          style={{height: '100%', aspectRatio: '1/1'}} 
          alt="movie" 
          src={`https://image.tmdb.org/t/p/w500${currentMovie?.poster_path}`}
        />
      </Box>
      <Searchbar />

      <Flex gap={{base: '7', md: '0'}} direction={{base:'column', md:'row'}} w={{base: 'full', md:'90%'}} alignSelf={{base:'center', md:'end'}} zIndex={5} justifyContent='space-between' p={{base: '2', md:'0'}} pr={{base:'', md:'7'}}>
        <Stack color='white' maxW={{base: 'full', md: '80%', lg:'1/3'}} gap='3'>
          <Text fontSize={{base:'4xl',md:'5xl', lg:'48px'}} lineHeight={{base:'40px', md:'48px', lg:'53px'}} fontWeight='bolder'>{currentMovie?.original_title}</Text>

          <Text lineClamp={4} fontSize={{base:'sm', md:'md', lg:'lg'}} fontWeight='medium'>
            {currentMovie?.overview}
          </Text>

          <Button onClick={() => router.push(`/movies/${currentMovie?.id}`)} bg={primaryColor} maxW={{base: '169px', md: '130px' , lg:'169px'}} p='1.5' rounded='md' color='white'>
            <HStack gap='2'>
              <Watch />
              <Text>Watch Trailer</Text>
            </HStack>
          </Button>
        </Stack>

        <Flex direction={{base:'row', md:'column'}} gap={{base:'5', md: ''}} alignSelf={{base: 'center', md:'end'}}>
          <HStack gap='2' onClick={() => handleCurrent(0)} _hover={hover}  style={nav === 0 ? current : normal} transition='all 0.5s ease-in'>
            <Text p='0.5' w='20px' rounded='lg' bg={nav === 0 ? 'white' : 'transparent'}></Text>
            <Text cursor='pointer'>1</Text>
          </HStack>
          <HStack gap='2' onClick={() => handleCurrent(1)} style={nav === 1 ? current : normal} _hover={hover} transition='all 0.5s ease-in'>
            <Text p='0.5' w='20px' rounded='lg' bg={nav === 1 ? 'white' : 'transparent'}></Text>
            <Text cursor='pointer'>2</Text>
          </HStack>
          <HStack gap='2' onClick={() => handleCurrent(2)} style={nav === 2 ? current : normal} _hover={hover} transition='all 0.5s ease-in'>
            <Text p='0.5' w='20px' rounded='lg' bg={nav === 2 ? 'white' : 'transparent'}></Text>
            <Text cursor='pointer'>3</Text>
          </HStack>
          <HStack gap='2' onClick={() => handleCurrent(3)} style={nav === 3 ? current : normal} _hover={hover} transition='all 0.5s ease-in'>
            <Text p='0.5' w='20px' rounded='lg' bg={nav === 3 ? 'white' : 'transparent'}></Text>
            <Text cursor='pointer'>4</Text>
          </HStack>
          <HStack gap='2'  onClick={() => handleCurrent(4)}  style={nav === 4 ? current : normal} _hover={hover} transition='all 0.5s ease-in'>
            <Text p='0.5' w='20px' rounded='lg' bg={nav === 4 ? 'white' : 'transparent'}></Text>
            <Text cursor='pointer'>5</Text>
          </HStack>
        </Flex>
      </Flex>
    </Stack>
  )
}

export default Hero