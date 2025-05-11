'use client'

import { useMyContext } from "@/hooks/useMyContext"
import { searchEndpoint } from "@/hooks/useRQueries"
import { Box, Input } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { FaSearch } from "react-icons/fa"
import { Colors } from "./color"
import debounce from 'lodash'
import { useMemo } from "react"

const Searchbar = ({ color } : {color?: string}) => {
  const { search, setSearch, setSearchResult, setIsLoading } = useMyContext()
  const router = useRouter()
  const {gray400} = Colors.light

  const handleSearch: () => Promise<void> = async() => {
    setIsLoading(true)
    try {
      router.push(`/search?title=${search}`)

      const [movies, series] = await Promise.all([
        searchEndpoint(search, 'movie'),
        searchEndpoint(search, 'tv')
      ])

      const searchResult = [...movies?.results, ...series?.results].sort((a,b) => b.vote_average - a.vote_average)
      const filteredResult = searchResult.filter(item => item.vote_average && item.vote_average !== 0 && item?.first_air_date !== "" && item?.release_date !== "")

      setSearchResult(filteredResult)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
    finally {
      setIsLoading(false)
    }
  }


  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && search.length > 1 ? handleSearch() : ''
  }

  return (
    <Box aria-label="searchbar" zIndex={5} pos='relative' alignSelf='center' w={{base: '80%', md:'70%', lg:'525px'}} borderWidth='1px' borderColor={{base: color || 'white', _dark: 'white'}} pl='2' pr='10' rounded='lg'>
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
        aria-label="search input"
      />

      <Box aria-label="search" role="button" color={{base: color || 'white', _dark: 'white'}} pos='absolute' top={{base: '2' , md:'2.5'}} right='3' cursor='pointer' className="group" onClick={() => search.length > 1 && handleSearch()}>
        <FaSearch style={{fontSize: '20px'}} color="inherit"/>
      </Box>    
    </Box>
  )
}

export default Searchbar