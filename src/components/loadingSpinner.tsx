import { Box } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import { ImSpinner8 } from "react-icons/im";

const MotionBox = motion.create(Box)
const LoadingSpinner = ({color} : {color?: string}) => {
  return (
    <Box>
      <MotionBox
        initial={{rotate: 0}}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        color={{base: color || 'white', _dark: 'white'}}
      >
        <ImSpinner8 style={{fontSize: '24px'}} color='inherit'/>
      </MotionBox>
    </Box>
  )
}

export default LoadingSpinner