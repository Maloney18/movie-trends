'use client'

import { useMyContext } from "@/hooks/useMyContext"
import { searchEndpoint } from "@/hooks/useRQueries"
import { Box, Input } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { FaSearch } from "react-icons/fa"
import { Colors } from "./color"

const Searchbar = ({ color } : {color?: string}) => {
  const { search, setSearch, setSearchResult, setIsLoading } = useMyContext()
  const router = useRouter()
  const {gray400} = Colors.light

  const handleSubmit = async() => {
    setIsLoading(true)
    try {
      router.push(`/search?title=${search}`)

      const [movies, series] = await Promise.all([
        searchEndpoint(search, 'movie'),
        searchEndpoint(search, 'tv')
      ])

      const searchResult = [...movies?.results, ...series?.results].sort((a,b) => Math.floor(b.vote_average) - Math.floor(a.vote_average))
      const filteredResult = searchResult.filter(item => item.vote_average && item.vote_average !== 0 && item?.first_air_date !== "" && item?.release_date !== "")

      setSearchResult(filteredResult)
      setIsLoading(false)
    } catch (error) {
      throw new Error(`${error}`)
      setIsLoading(false)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && search.length > 1 ? handleSubmit() : ''
  }

  return (
    <Box zIndex={5} pos='relative' alignSelf='center' w={{base: '80%', md:'70%', lg:'525px'}} borderWidth='1px' borderColor={{base: color || 'white', _dark: 'white'}} pl='2' pr='10' rounded='lg'>
      <Input 
        placeholder="Let your curiosity lead"
        _placeholder={{color: gray400}}
        outline='none'
        bg='transparent'
        border='none'
        color={{base: color || 'white', _dark: 'white'}}
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
      />

      <Box color={{base: color || 'white', _dark: 'white'}} pos='absolute' top={{base: '2' , md:'2.5'}} right='3' cursor='pointer' className="group" onClick={() => search.length > 1 && handleSubmit()}>
        <FaSearch style={{fontSize: '20px'}} color="inherit"/>
      </Box>    
    </Box>
  )
}

export default Searchbar