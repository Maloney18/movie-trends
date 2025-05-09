'use client'
import { Tmovie } from '@/app/(trendy)/layout'
import { Dispatch, SetStateAction, useState, createContext, useContext, Ref, useRef } from 'react'

type SeasonInfo = {
  seriesId: null | number,
  seasonNumber: null | number
}

type SeasonContext = {
  // season details page
  seasonInfo: SeasonInfo,
  showSeasonDetails: boolean,
  setSeasonInfo: Dispatch<SetStateAction<SeasonInfo>>,
  setShowSeasonDetails: Dispatch<SetStateAction<boolean>>,

  // search info
  search: string,
  setSearch: Dispatch<SetStateAction<string>>
  searchResult: Tmovie[],
  setSearchResult: Dispatch<SetStateAction<Tmovie[]>>,
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>

  // movies page and series page
  moviesPageScrollHeight: number | null,
  setMoviesPageScrollHeight: Dispatch<SetStateAction<number | null>>
  seriesPageScrollHeight: number | null,
  setSeriesPageScrollHeight: Dispatch<SetStateAction<number | null>>,
}

const Season = createContext<SeasonContext | undefined>(undefined)

const SeasonProvider = ({children} : { children: React.ReactNode}) => {
  //season details page
  const [ seasonInfo, setSeasonInfo ] = useState<SeasonInfo>({
    seriesId: null,
    seasonNumber: null
  })
  const [showSeasonDetails, setShowSeasonDetails] = useState(false)
  
  // search info
  const [search, setSearch] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Tmovie[]>([])
  const [isLoading, setIsLoading] = useState(false)

  //movies page and series page
  const [moviesPageScrollHeight, setMoviesPageScrollHeight] = useState<number | null>(null)
  const [seriesPageScrollHeight, setSeriesPageScrollHeight] = useState<number | null>(null)



  return (
    <Season.Provider value={{
      seasonInfo, setSeasonInfo, showSeasonDetails, setShowSeasonDetails,  // seasons details
      search, setSearch, searchResult, setSearchResult, isLoading, setIsLoading, // search page
      moviesPageScrollHeight, setMoviesPageScrollHeight, seriesPageScrollHeight, setSeriesPageScrollHeight, // movies and series page
    }}>
      {children}
    </Season.Provider>
  )
}


export const useMyContext = () => {
  const context = useContext(Season)

  if (context === undefined) {
    throw new Error("context can only be used by it's children element")
  }

  return context
}

export default SeasonProvider