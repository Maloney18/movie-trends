"use client";

import { Colors } from "@/components/color";
import Loader from "@/components/loader";
import MovieCard from "@/components/movieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Stack, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "@/components/loadingSpinner";
import { useMyContext } from "@/hooks/useMyContext";
import { Tmovie } from "../layout";

const SeriesPage = () => {
  const { gray900, gray400 } = Colors.light;
  const page = useRef<HTMLDivElement | null>(null);
  const [ref, inview] = useInView();
  const { seriesPageScrollHeight, setSeriesPageScrollHeight } = useMyContext();

  const getSeries = async ({ pageParam }: { pageParam: number }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageParam}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`An error occured while fetching series`);
      }

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["allSeries"],
    queryFn: getSeries,
    initialPageParam: 1,
    getNextPageParam: (lastpage, allpages) => {
      const currentPage = allpages.length;
      const totalPages = lastpage.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const sortData = (arr: Tmovie[]) => {
    return arr.sort(
      (a, b) =>
        new Date(b.release_date ? b.release_date : b.first_air_date).getTime() -
        new Date(a.release_date ? a.release_date : a.first_air_date).getTime()
    );
  };

  // unlimited scroll
  useEffect(() => {
    if (inview && hasNextPage) {
      fetchNextPage();
    }
  }, [inview, hasNextPage, fetchNextPage]);

  // save page scroll-height before navigating from page
  useEffect(() => {
    if (seriesPageScrollHeight && page?.current) {
      page?.current?.offsetParent?.scrollTo({
        top: seriesPageScrollHeight,
        behavior: "smooth",
      });
    }
  }, [seriesPageScrollHeight, page?.current]);

  // reset page scroll-height back to zero when scroll-to-top button is pressed
  useEffect(() => {
    if (
      page.current?.offsetParent?.scrollTop === 0 &&
      seriesPageScrollHeight &&
      seriesPageScrollHeight > 0
    ) {
      setSeriesPageScrollHeight(null);
    }
  }, [page?.current]);

  if (status === "pending") {
    return (
      <Stack gap="7">
        <Text
          fontWeight="black"
          fontSize={{ base: "2xl", lg: "4xl" }}
          textAlign="center"
          color={{ base: gray900, _dark: gray400 }}
        >
          {" "}
          Series{" "}
        </Text>
        <Loader />
      </Stack>
    );
  }

  if (status === "error") {
    throw new Error(error?.message);
  }

  const handleHeight = () => {
    setSeriesPageScrollHeight(page?.current?.offsetParent?.scrollTop || null);
  };

  const series = data?.pages?.map((page) =>
    sortData(page.results).map((movie: Tmovie, idx: number) => {
      if (page.results.length - 6 === idx) {
        return (
          <MovieCard
            clicked={handleHeight}
            innerRef={ref}
            title={movie.title ? movie.title : movie.name}
            type={movie.title ? "movie" : "series"}
            key={movie.id}
            movieId={movie.id}
            imgSrc={movie.poster_path}
            date={
              movie.release_date ? movie.release_date : movie.first_air_date
            }
            tag={movie.title ? false : true}
          />
        );
      } else {
        return (
          <MovieCard
            clicked={handleHeight}
            title={movie.title ? movie.title : movie.name}
            type={movie.title ? "movie" : "series"}
            key={movie.id}
            movieId={movie.id}
            imgSrc={movie.poster_path}
            date={
              movie.release_date ? movie.release_date : movie.first_air_date
            }
            tag={movie.title ? false : true}
          />
        );
      }
    })
  );

  // console.log('child element', ref.current)
  // console.log('parent element', page.current?.offsetParent?.scrollTop)
  // console.log('parent element', page.current?.offsetParent?.moviePageScrollHeight)

  // const scrollToTop = () => {
  //   if (scrollTo) {
  //     page.current?.scrollTo({ top: scrollTo, behavior: "smooth" });
  //   }
  // };

  return (
    <Stack gap="7" maxW="full" ref={page} pb="5">
      <Text
        fontWeight="black"
        fontSize={{ base: "2xl", lg: "4xl" }}
        color={{ base: gray900, _dark: gray400 }}
        alignSelf="center"
      >
        {" "}
        Series{" "}
      </Text>

      <Flex
        direction="row"
        wrap="wrap"
        justifyContent={{ base: "center", md: "space-between" }}
        gap={{ base: "5", md: "7" }}
        alignItems={{ base: "center", md: "start" }}
      >
        {series}
      </Flex>

      {hasNextPage && (
        <Stack
          aria-label="loading more"
          role="status"
          alignSelf="center"
          justifyContent="center"
          alignItems="center"
          w="max-content"
          h="max-content"
          rounded="full"
        >
          <LoadingSpinner />
        </Stack>
      )}
    </Stack>
  );
};

export default SeriesPage;
