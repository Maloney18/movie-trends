import { Search } from "@/icons/icons"
import { Box, Input } from "@chakra-ui/react"


const Searchbar = () => {
  return (
    <Box zIndex={5} pos='relative' alignSelf='center' w={{base: '80%', md:'70%', lg:'525px'}} borderWidth='1px' borderColor='white' pl='2' pr='10' rounded='lg'>
      <Input 
        placeholder="What do you want to watch?"
        outline='none'
        bg='transparent'
        border='none'
      />

      <Box pos='absolute' top='2' right='3'>
        <Search />
      </Box>    
    </Box>
  )
}

export default Searchbar