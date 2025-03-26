import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const MovieDetailsLoader = () => {
  return (
    <Stack  as='section' h='full' pt={{base:'', md: '5'}} pr={{base: '', md:'2'}} p={{base: '1.5', md: ''}} gap='5' pb='7'>
      <Stack alignItems='center' justifyContent='center' h='60vh' bg='grey' rounded='xl'>
        <Stack cursor='pointer' justifyContent='center' alignItems='center' bg='#00000040' rounded='full' w={{base: '100px'}} h={{base: '100px'}} backdropBlur='2px'>
          <Text color='white' fontSize={{base:'xs', md: 'sm'}} fontWeight='black'>Loading</Text>
        </Stack>
      </Stack>

      <Flex direction={{base: 'column', md: 'row'}} gap={{base: '10', md: ''}} alignItems={{base: '', md:'start'}}>
        <Stack  w='70%'>
          <HStack gap='2' alignItems='flex-end'>
            <Text bg='grey' p='2.5' w='100px'></Text>
            <Text alignSelf='center'>&#x2022;</Text>
            <Text bg='grey' p='2.5' w='70px'></Text>
            <Text alignSelf='center'>&#x2022;</Text>
            <Text bg='grey' p='2.5' w='70px'></Text>
          </HStack>

          <HStack>
            <Text borderWidth='1px' rounded='3xl' bg='grey' p='2.5'></Text>
          </HStack>

          <Stack gap='1' mt='3'>
            <Text bg='grey' p='2.5'></Text>
          </Stack>

          <Stack>
            <Text bg='grey' p='2.5' w='1/3'></Text>
            <Text bg='grey' p='2.5' w='1/3'></Text>
            <Text bg='grey' p='2.5' w='1/3'></Text>
          </Stack>
        </Stack>
        
        <Stack hideBelow='md' w='30%'>
          <Stack>
            <Text bg='grey' p='2.5'></Text>
      
              <Stack gap='2'>
                <HStack>
                  <Box h='35px' w='35px' rounded='full' bg='grey'></Box>

                  <Stack gap='0.5'>
                    <Text bg='grey' p='2' w='2/3'></Text>
                    <Text bg='grey' p='2' w='2/3'></Text>
                  </Stack>
                </HStack>
              </Stack>
            </Stack>
        </Stack>
      </Flex>
  </Stack>
)
}

export default MovieDetailsLoader