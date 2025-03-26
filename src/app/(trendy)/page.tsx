'use client'
import Hero from "@/components/hero"
import { Stack } from "@chakra-ui/react"
import Collection from "@/components/collection"
import { featuredMoviewQuery, seriesQuery, top10Query,  } from "@/hooks/useRQueries"


const Home = () => {
  const { isLoading, isError, data, error} = featuredMoviewQuery()
  const { isLoading: loading, isError: errorState, data: result, error: err} = top10Query()
  const { isLoading: seriesLoader, isError: seriesErrState, data: series, error: seriesErr} = seriesQuery()
  return (
    <Stack as='section' pt={{base: '', md:'5'}} p={{base: '1', md:''}} pr={{base: '', md:'2'}} gap='7' pb='7'>
      <Hero />

      <Stack gap={{base: '7', lg:'16'}}>
        <Collection isLoading={isLoading} isError={isError} data={data} error={error} title="Featured Movies"/>
        <Collection isLoading={loading} isError={errorState} data={result} error={err} title="Top Rated Movies"/>
        <Collection isLoading={seriesLoader} isError={seriesErrState} data={series} error={seriesErr} title="TV Series"/>
      </Stack>
    </Stack>
  )
}

export default Home