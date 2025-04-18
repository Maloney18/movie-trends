'use client'

import { Colors } from '@/components/color'
import Navbar from '@/components/navbar'
import { Button, Grid, GridItem } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

const DefaultLayout = ({children}: {children: React.ReactNode}) => {
  const [showButton, setShowButton] = useState(false)
  const page = useRef<HTMLDivElement | null>(null);
  const {primaryLighter} = Colors.light

  const handleScroll = () => {
    if (page.current && page.current.scrollTop > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    page.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Grid templateColumns={{ base: 'none',md:'repeat(6, 1fr)'}} templateRows={{base: '70px auto', md:'none'}} h='100vh' gap='2'>
      <GridItem colSpan={{base:6, md:1}} h='full'>
        <Navbar />
      </GridItem>
      <GridItem ref={page} onScroll={() => handleScroll()}  colSpan={{base: 6, md:5}} h='full' className="scroll" pos='relative'>
        {children}
        
      {
        showButton && 
        <Button backdropFilter='blur(5px)' onClick={scrollToTop} pos='fixed' p='2.5' bottom='4' right='4' bg={primaryLighter} color='white' rounded='full'>
          <FaArrowUp />
        </Button>
      }
      </GridItem>
    </Grid>
  )
}

export default DefaultLayout