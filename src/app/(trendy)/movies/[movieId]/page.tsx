'use client'

import { Box, Button, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { Play } from '@/icons/icons'
import { use, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { creditsQuery, detailsQuery, recommendationsQuery } from '@/hooks/useRQueries';
import { Colors } from '@/components/color';
const MovieDetailsLoader = dynamic(() => import('@/components/movieDetailsLoader'))
import PlaceholderImg from '@/assets/plalceholderImg.png'
import ProductionCompany from '@/assets/A_minimalistic_placeholder_logo_for_a_movie_produc.png'
const Collection = dynamic(() => import('@/components/collection')) 
import LoadingSpinner from '@/components/loadingSpinner';
import dynamic from 'next/dynamic';

type params = {
  params: Promise<{
    movieId: string;
  }>;
};


const MovieId = ({params}: params) => {
  const [clicked, setClicked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [youtubeVideo, setYoutubeVideo] = useState('')
  const { movieId } = use(params)
  const {isLoading: detailsLoader, data: details, isError: detailsError, error: detailsErrMsg} = detailsQuery(movieId, 'movie')
  const {isLoading: credIsLoading, data: credits, isError: credErrState, error: credErr} = creditsQuery(movieId, 'movie')
  const {isLoading: recommendIsLoading, data: recommendations, isError: reccomErrorState, error: reccomErr} = recommendationsQuery(movieId, 'movie')
  const router = useRouter()
  const { title, rating, gray400, primaryLighter, primaryColor, gameBg, description, descriptionL } = Colors.light

  // console.log(details)

  // const getYoutubeVideo = async () => {
  //   const {}
  // }

  const getYoutubeVideo: (query: string) => Promise<void> = async (query: string) => {
    setLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}?part=snippet&q=${query}&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
    
      if (!response.ok) {
        setLoading(false)
        throw new Error("Failed to fetch video details");
      }
    
      const data = await response.json();
    
      if (data.items.length === 0) {
        throw new Error("No video found with this ID");
      }
  
      const video = data.items.find((movie: {snippet: {title: string}}) => movie.snippet.title.startsWith(query))
    
      console.log(video)
      // console.log(video)
      setYoutubeVideo(video.length > 1 ? video[0].id.videoId : data.items[0].id.videoId)
      setLoading(false)
      setClicked(prevState => !prevState)
      // console.log(); // Returns video details
      
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
    }finally {
      setLoading(false)
    }
  };

  if (detailsLoader) {
    return <MovieDetailsLoader />
  }

  if (detailsError) {
    throw new Error(detailsErrMsg.message)
  }

  const bg = {
    background: `no-repeat url('https://image.tmdb.org/t/p/w500${details.backdrop_path}') center/cover`
  }

  const hours = Math.floor(details.runtime / 60)
  const mins = details.runtime % 60
  const director = credits?.crew.find((member: { job: string }) => member.job === 'Director')
  const storyWriters = credits?.crew.find((member: { job: string }) => ['Story', 'Writer'].includes(member.job))
  const topActors = credits?.cast.filter((member: { known_for_department: string }) => member.known_for_department === 'Acting').slice(0,7)

  return (
    <Stack as='section' h='full' pt={{base:'', md: '5'}} pr={{base: '', md:'2'}} p={{base: '1.5', md: ''}} gap={{base: '10', md:'16'}}>
      <Stack gap='5'>
        <Stack>
          <Button display='flex' bg='none' w='max-content' color={{base: title, _dark: rating}} _hover={{color: primaryLighter, scale: .9}} transition='all 0.5s ease-in' cursor='pointer' gap='1' onClick={() => router.back()}>
            <FaArrowLeftLong />
            <Text fontSize={{base: '', md: 'sm'}} fontWeight='bold'>Back</Text>
          </Button>
          <Stack pos='relative' style={bg} alignItems='center' justifyContent='center' h={{base: '60vh'}} bg='grey' rounded='xl' overflow='hidden'>
            {
              clicked ?
              <Box h='full' w='full' pos='absolute'>
                <iframe height='100%' width='100%' src={`https://www.youtube.com/embed/${youtubeVideo}`} />
              </Box>
              : 
              <Stack aria-label='Play trailer' onClick={() => getYoutubeVideo(details.title)} cursor='pointer' justifyContent='center' alignItems='center' bg='#00000040' rounded='full' w={{base:'80px', md:'100px'}} h={{base:'80px', md:'100px'}} backdropFilter='blur(5px)'>
                {loading ? <LoadingSpinner /> : <Play />}
              </Stack>
            }
          </Stack>
        </Stack>

        <Flex direction={{base: 'column', lg: 'row'}} gap={{base: '10', md: ''}} pl='2' alignItems={{base: '', md:'start'}}>
          <Stack maxW={{base:'full', lg: '82%'}} flex='1' gap={{base: '2.5', md: ''}}>
            <Flex direction={{base: 'column', md: 'row'}} gap={{base: '', md:'2'}} color={{base: title, _dark: gray400}} alignItems={{base: '', md:'end'}}>
              <Text fontSize={{base: 'xl', lg: '2xl'}} fontWeight='black'>{details.title}</Text>

              {
                details.release_date &&
                <HStack>
                  <Text alignSelf='center'>&#x2022;</Text>
                  <Text fontSize={{base: '', lg: 'xl'}} fontWeight='bold'>{details.release_date}</Text>
                  <Text alignSelf='center'>&#x2022;</Text>
                  <Text color={primaryLighter} fontSize={{base: '', lg: 'xl'}} fontWeight='medium'>{`${hours}h ${mins}m`}</Text>
                </HStack>
              }
            </Flex>

            <HStack wrap='wrap'>
              {
                details.genres.map((genre: {id: string, name: string}) => (
                  <Text key={genre.id} borderWidth='1px' borderColor={{base:gameBg, _dark:rating}} color={{base:primaryColor, _dark: primaryLighter}} px='2' fontWeight='medium' rounded='3xl' fontSize={{base: 'xs',md: 'sm', lg: 'md'}}>{genre.name}</Text>
                ))
              }
            </HStack>

            <Stack gap='1' mt='3' w={{base: '', lg:'70%'}}>
            {details.tagline && <Text color={{base: title, _dark: gray400}} fontSize={{base: '',md: 'md', lg: 'lg'}}>"{details.tagline}"</Text>}
              <Text color={{base:description, _dark: rating}} fontSize={{base: '', md: 'md', lg: 'lg'}}>{details.overview}</Text>
            </Stack>

            <Flex direction={{base: 'column', lg: 'row'}} alignItems='start' color={{base: title, _dark: gray400}} gap={{base: '5', md:'10'}} pt='2'>
            { 
                director && 
                <Stack>
                  <Text fontWeight='bold' fontSize={{base: 'lg', lg: 'xl'}}>Director</Text>
                  <Text fontWeight='medium' fontSize={{base: '',md: 'sm', lg: 'lg'}}>&#x2022; {director?.name}</Text>
                </Stack>
              }
              { 
                (storyWriters && storyWriters.length !== 0) && 
                  <Stack>
                    <Text fontWeight='bold' fontSize={{base: 'lg', md: 'xl'}}>Story {storyWriters.length > 1 ? 'Writers' : 'Writer'}</Text>
                      {
                      storyWriters.length > 1 ? 
                      <HStack gap='5'>
                        {
                          storyWriters.map((member: {id: string, name: string}) => ( 
                            <Text key={member.id} fontWeight='medium' fontSize={{base: '', md: 'lg'}}>&#x2022; {member?.name}</Text>
                          ))
                        }
                      </HStack>
                      :
                      <Text fontWeight='medium' fontSize={{base: '', md: 'lg'}}>&#x2022; {storyWriters.original_name}</Text>
                    }
                  </Stack>
                }
            </Flex>

            { 
              topActors && 
              <Stack pt='5' gap='2' color={{base: title, _dark: gray400}}>
                <Text fontSize={{base:'xl'}} fontWeight='bold'>Top Casts</Text>

                <HStack pr='2' overflowX='scroll' className='removeScroll' gap='5' alignItems='start' pb={{base:'', md:recommendations?.results.length === 0 ? '5' : ''}}>
                  {
                    topActors.map((actor: {id: string, name: string, character: string, profile_path: string | null}) => (
                    <Stack key={actor.id} w={{base: '120px', lg:'150px'}}>
                      <Box w={{base: '120px', lg:'150px'}} h={{base: '120px', lg:'150px'}} overflow='hidden' borderTopLeftRadius='xl' borderBottomEndRadius='xl'>
                        <img src={actor.profile_path !== null ? `https://image.tmdb.org/t/p/w500${actor.profile_path}/` : PlaceholderImg.src} alt={actor.name} width='100%' height='100%' style={{aspectRatio: 1/1, objectFit: 'cover'}}/>
                      </Box>

                      <Stack gap='0' borderWidth='1px' p='1.5' pt={0} borderTopWidth={0} borderColor={primaryLighter} borderBottomLeftRadius='xl'>
                        <Text fontWeight='bold' fontSize={{base:'sm', lg:''}}>{actor.name}</Text>
                        {actor.character && <Text textAlign='center' fontWeight='medium'>as</Text>}
                        <Text wordWrap='break-word' textAlign='end' color={primaryLighter} fontSize={{base:'xs', lg:'sm'}} fontWeight='black'>{actor.character}</Text>
                      </Stack>
                    </Stack>
                  ))}
                </HStack>
              </Stack>
            }
          </Stack>
          <Stack pb={{base:recommendations?.results.length === 0 ? '5' : '', md: ''}}>
            <Stack color={{base: title, _dark: gray400}}>
              <Text fontWeight='bold' fontSize={{base:'lg'}}>Production {details.production_companies.length > 1 ? 'Companies' : 'Company'}</Text>

              <Stack color={{base: title, _dark: gray400}} gap='2'>
                {
                  details.production_companies.map((company : {logo_path:string | null, id:string, origin_country: string, name: string}) => (
                      <HStack key={company.id} gap='2' alignItems='start'>
                        <Box h={{base: '40px', md:'35px'}} w={{base: '40px', md:'35px'}} borderWidth='1px' overflow='hidden' rounded='full'>
                          <img src={company.logo_path ? `https://image.tmdb.org/t/p/w500${company.logo_path}/` : ProductionCompany.src} alt={company.name} width='100%' height='100%' style={{aspectRatio: 1/1, objectFit: 'cover'}}/>
                        </Box>

                        <Stack gap='0'>
                          <Text fontSize='sm' fontWeight='bold' lineClamp='1'>{company.name}</Text>
                          <Text fontSize='xs' fontWeight='medium'>{company.origin_country}</Text>
                        </Stack>
                      </HStack>
                  ))
                }
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </Stack>

     { 
        recommendations?.results.length !== 0 &&
        <Stack color={{base: title, _dark: gray400}} gap='7' pb='7' pl={{base: '2', md:''}}>
          <Stack gap={0}>
            <Flex direction={{base: 'column', md:'row'}} gap={{base: 0, md: '1.5'}}>
              <Text fontWeight='black' fontSize={{base: '2xl',md: '3xl', lg:'4xl'}}>Movie</Text>
              <Text fontWeight='black' fontSize={{base: '2xl',md: '3xl', lg:'4xl'}}>Recommendations</Text>
            </Flex>
            <Text fontWeight='medium' fontSize={{base: 'md', lg:'lg'}}>Here are some movie recommendations based on this type of movie</Text>
          </Stack>

          <Collection isError={reccomErrorState} data={recommendations} isLoading={recommendIsLoading} error={reccomErr} />
        </Stack>
      }
    </Stack>
  )
}

export default MovieId