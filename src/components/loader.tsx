import { Flex } from "@chakra-ui/react"
import MovieCard from "./movieCard"
import { motion } from "framer-motion"

const Loader = () => {

  return (
    <Flex dir="row" wrap='wrap' justifyContent='space-between' alignItems='center'>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1, ease: 'easeIn', repeat: Infinity, delay: 1}}
      >
        <MovieCard />
      </motion.div>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2, ease: 'easeIn', repeat: Infinity, delay: 3}}
      >
        <MovieCard />
      </motion.div>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 3, ease: 'easeIn', repeat: Infinity, delay: 5}}
      >
        <MovieCard />
      </motion.div>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 4, ease: 'easeIn', repeat: Infinity, delay: 7}}
      >
        <MovieCard />
      </motion.div>
      </Flex>
  )
}

export default Loader