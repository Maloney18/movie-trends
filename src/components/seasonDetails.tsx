import { Box, Stack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, easeIn, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";



const MotionStack = motion.create(Stack)

type incoming = {
  seasonInfo: {
    seriesId: null | number,
    seasonNumber: null | number
  },
  setShowDetails:Dispatch<SetStateAction<boolean>>,
}

const SeasonDetails = ({seasonInfo, setShowDetails}: incoming) => {

  const getDetails = async (id: null | number, seasonNo: null | number) => {
    try {
      const response = await fetch( `https://api.themoviedb.org/3/tv/${id}${ seasonNo && seasonNo !== 0 ? '/season/'+seasonNo : '/season/0'}?language=en-US'`,
        {
          method: 'GET',
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          }
        }
      )
      
      if (!response.ok) {
        throw new Error(`An error occured while fetching season details`)
      }
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  const {data} = useQuery({queryKey: ['seasonDetails', seasonInfo.seriesId, seasonInfo.seasonNumber], queryFn: () => getDetails(seasonInfo.seriesId, seasonInfo.seasonNumber)})
  // console.log('data', data)


  return (
    <AnimatePresence initial={false} key='seasonDetails'>
      <MotionStack 
        initial={{opacity: 0, backdropFilter: 'blur(0px)'}} 
        animate={{opacity: 1, backdropFilter: 'blur(5px)'}} 
        transition={{duration: 0.8, ease: 'easeIn'}} 
        exit={{opacity: 0, backdropFilter: 'blur(0px)'}}
        justifyContent='flex-end' 
        pos='sticky' 
        bottom='-1px' 
        h='100vh'
        w='full' 
      >
        <MotionStack initial={{height: '10%'}} animate={{height: '70%'}}  transition={{duration: 0.5, type: 'spring', stiffness: 300, damping: 10}} exit={{height: '10%'}} minH='10%' w='full' bg='orange' borderTopLeftRadius='150px' borderTopRightRadius='130px'>
          <Box alignSelf='flex-end' onClick={() => setShowDetails(false)}>
            <IoMdClose />
          </Box>
        </MotionStack>
      </MotionStack>
    </AnimatePresence>
  )
}

export default SeasonDetails