'use client'
import DetailsPage from '@/components/detailsPage'
import { creditsQuery, detailsQuery, recommendationsQuery } from '@/hooks/useRQueries'
import { use } from 'react'

type params = {
  params: Promise<{
    seriesId: string
  }>
}

const SeriesPage = ({params}: params) => {
  const {seriesId} = use(params)
  const details = detailsQuery(seriesId, 'tv')
  const credits = creditsQuery(seriesId, 'tv')
  const recommendations = recommendationsQuery(seriesId, 'tv')

  return (
    <DetailsPage details={details} credits={credits} recommendations={recommendations}/>
  )
}

export default SeriesPage