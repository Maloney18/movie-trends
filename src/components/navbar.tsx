'use client'

import { HStack, Text, Button, Stack, Box } from "@chakra-ui/react"
import { Home, Logo, Logout, Movie, Series, Upcoming } from "@/icons/icons"
import { Colors } from "./color"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { descriptionL, startPlaying, primaryColor, rating, primaryLighter, gameBg, primaryGradient} = Colors.light
  
  const styles = {
    backgroundColor: primaryGradient,
    color: primaryColor,
    cursor: 'pointer'
  };

  const mdStyles = {
    backgroundColor: 'white',
    color: primaryColor,
    cursor: 'pointer',
    textAlign: 'left' as React.CSSProperties["textAlign"]
  }
  
  return (
    <Stack pos={{base: 'relative', md: ''}} as='nav' w={{md:'150px', lg:'full'}} h='full' py={{base:'2', md:'7'}} borderColor={{base:'#0000004D', _dark:rating}}  borderTopRightRadius={{base:'0', md:'45px'}} borderBottomRightRadius={{base:'0', md:'45px'}} borderWidth={{base:'0', md:'1px'}} justifyContent={{base:'', lg:'space-between'}} gap={{base:'0', md:'7'}}>
      <HStack justifyContent={{base: 'space-between', md:''}} pr={{base: '2', md:''}}>
        <HStack gap={{base: '2', lg: '5'}} pl={{base:'2', lg:'7'}}>
          <Logo />
          <Text fontSize='xl' fontWeight={{base:'black', lg:'bold'}}> Trendy </Text>
        </HStack>

        <Stack gap='1' pos={open ? 'relative' : ''} hideFrom='md' cursor='pointer' _hover={{opacity: '0.7'}} justifyContent='center' w='30px' h='30px' alignItems='center' bg={primaryColor} onClick={() => setOpen(!open)} rounded='full'>
          <Box transition='all 0.5s ease-in' rotate={open ? '60deg' : ''} w='17px' p='0.5' bg='black' rounded='lg'></Box>
          <Box transition='all 0.5s ease-in' rotate={open ? '-30deg' : ''} pos={open ? 'absolute' : ''} right={open ? '5px' : ''}  w='17px' p='0.5' bg='black' rounded='lg'></Box>
        </Stack>
      </HStack>

     { open && 
      <Stack borderTopLeftRadius='lg' borderBottomLeftRadius='lg' pos='absolute' top='60px' bg={primaryGradient} pl={2} py={3} right='0 ' zIndex={10} hideFrom='md' color='white' gap='0' fontSize={{base: '', md:'md', lg:'lg'}} fontWeight='semibold'>
        <Link href='/'>
          <Text _hover={mdStyles} textAlign='right' borderLeftWidth={pathname === '/' ? '3px' : ""} borderColor={primaryColor} transition='all 0.5s ease-in' p='2' style={pathname === '/' ? mdStyles: {}}> Home</Text>
        </Link>
        <Link href='/movies'>
          <Text _hover={mdStyles} textAlign='right' borderLeftWidth={pathname === '/movies' ? '3px' : ""} borderColor={primaryColor} transition='all 0.5s ease-in' p='2' style={pathname === '/movies' ? mdStyles: {}}> Movies</Text>
        </Link>
        <Link href='/series'>
          <Text _hover={mdStyles} textAlign='right' borderLeftWidth={pathname === '/series' ? '3px' : ""} borderColor={primaryColor} transition='all 0.5s ease-in' p='2' style={pathname === '/series' ? mdStyles: {}}> TV Series</Text>
        </Link>
        <Link href='/upcoming'>
         <Text _hover={mdStyles} textAlign='right' borderLeftWidth={pathname === '/upcoming' ? '3px' : ""} borderColor={primaryColor} transition='all 0.5s ease-in' p='2' style={pathname === '/upcoming' ? mdStyles: {}}> Upcoming</Text>
        </Link>
        
      </Stack>
      }

      <Stack color={rating} hideBelow='md' gap='0' fontSize={{base: '', md:'md', lg:'lg'}} fontWeight='semibold'>
        <HStack _hover={styles} borderRightWidth={pathname === '/' ? '3px' : ""} borderColor={primaryColor} transition='all 0.5s ease-in' p={{md:'5', lg:'7'}} style={pathname === '/' ? styles: {}} onClick={() => router.push('/')}>
          <Home />
          <Text> Home</Text>
        </HStack>
        <HStack _hover={styles} borderRightWidth={pathname === '/movies' ? '3px' : ""} borderColor={primaryColor} transition='all 0.5s ease-in' p={{md:'5', lg:'7'}} style={pathname === '/movies' ? styles: {}} onClick={() => router.push('/movies')}>
          <Movie />
          <Text> Movies</Text>
        </HStack>
        <HStack _hover={styles} borderRightWidth={pathname === '/series' ? '3px' : ""} borderColor={primaryColor} transition='all 0.5s ease-in' p={{md:'5', lg:'7'}} style={pathname === '/series' ? styles: {}} onClick={() => router.push('/series')}> 
          <Series />
          <Text> TV Series</Text>
        </HStack>
        <HStack _hover={styles} borderRightWidth={pathname === '/upcoming' ? '3px' : ""} borderColor={primaryColor} transition='all 0.5s ease-in' p={{md:'5', lg:'7'}} style={pathname === '/upcoming' ? styles: {}} onClick={() => router.push('/upcoming')}>
          <Upcoming />
          <Text> Upcoming</Text>
        </HStack>
      </Stack>

      <Stack hideBelow='lg' gap='2' alignSelf='center' w='170px' bg={{base:gameBg, _dark: primaryGradient}} borderWidth='1px' rounded='xl' px='5' pt='7' pb='1.5' borderColor={primaryLighter}>
        <Text color={{base:descriptionL, _dark: rating}} fontWeight='semibold'>
          Play movie quizes and earn free tickets
        </Text>
        <Text color={rating} fontSize='xs' fontWeight='medium'>
          50k people are playing now
        </Text>

        <Button bg={startPlaying} color={{base:primaryColor, _dark: 'white'}} rounded='3xl' w='112px' alignSelf='center' fontSize='xs' fontWeight='medium'> Start playing</Button>
      </Stack>

      {/* <HStack color={rating} p='3' transition='all 0.5s ease-in' _hover={styles}>
        <Logout />
        <Text>Logout</Text>
      </HStack> */}
    </Stack>
  )
}

export default Navbar