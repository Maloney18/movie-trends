'use client'

import Searchbar from "@/components/searchBar"
import Loader from "@/components/loader"
import SearchContents from "./_searchContents"
import { Stack } from "@chakra-ui/react"
import { Suspense } from "react"


const SearchPage = () => {
  // console.log(searchResult)
  return (
    <Stack as='section' pt='5' pl='2' pr='4' gap='5'>
      <Searchbar color="black"/>

      <Suspense fallback={<Loader />}>
      <SearchContents />
      </Suspense>
    </Stack>
  )
}

export default SearchPage