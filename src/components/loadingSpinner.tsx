import { Box } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import { ImSpinner8 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <Box>
      <motion.div
        initial={{rotate: 0}}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <ImSpinner8 style={{fontSize: '24px'}} color='white'/>
      </motion.div>
    </Box>
  )
}

export default LoadingSpinner