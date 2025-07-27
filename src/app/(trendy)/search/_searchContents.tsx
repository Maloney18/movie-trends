import { Flex, Stack, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Tmovie } from "../layout";
import MovieCard from "@/components/movieCard";
import { useMyContext } from "@/hooks/useMyContext";
import LoadingSpinner from "@/components/loadingSpinner";
import { useEffect, useMemo } from "react";
import { Colors } from "@/components/color";
import { searchEndpoint } from "@/hooks/useRQueries";

const SearchContents = () => {
  const searchParam = useSearchParams();
  const searchTitle = searchParam.get("title");
  const { primaryColor } = Colors.light;
  const {
    searchResult,
    isLoading,
    setIsLoading,
    setSearchResult,
    search,
    setSearch,
  } = useMyContext();

  const handleSearch: () => Promise<void> = async () => {
    setIsLoading(true);
    try {
      const [movies, series] = await Promise.all([
        searchEndpoint(searchTitle || "", "movie"),
        searchEndpoint(searchTitle || "", "tv"),
      ]);

      const searchResult = [...movies?.results, ...series?.results].sort(
        (a, b) => Math.floor(b.vote_average) - Math.floor(a.vote_average)
      );
      const filteredResult = searchResult.filter(
        (item) =>
          item.vote_average &&
          item.vote_average !== 0 &&
          item?.first_air_date !== "" &&
          item?.release_date !== ""
      );

      setSearchResult(filteredResult);
      setIsLoading(false);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const sortData = (arr: Tmovie[]) => {
    return arr.sort(
      (a, b) =>
        new Date(b.release_date ? b.release_date : b.first_air_date).getTime() -
        new Date(a.release_date ? a.release_date : a.first_air_date).getTime()
    );
  };

  // refetch after page reloads
  useEffect(() => {
    if (searchTitle && search.length === 0) {
      setSearch(searchTitle);
      handleSearch();
    }
  }, []);

  const Result = useMemo(
    () =>
      sortData(searchResult)?.map((movie: Tmovie) => (
        <MovieCard
          title={movie.title ? movie.title : movie.name}
          type={movie.title ? "movie" : "series"}
          key={movie.id}
          movieId={movie.id}
          imgSrc={movie.poster_path}
          date={movie.release_date ? movie.release_date : movie.first_air_date}
          tag={movie.title ? false : true}
        />
      )),
    [searchResult]
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Stack
          alignSelf="center"
          justifyContent="center"
          alignItems="center"
          w="max-content"
          h="max-content"
          rounded="full"
        >
          <LoadingSpinner color="black" />
        </Stack>
      );
    }

    if (searchTitle && searchTitle.length > 0) {
      if (searchResult?.length > 0) {
        return (
          <Flex
            pb="5"
            direction="row"
            wrap="wrap"
            justifyContent={{
              base: "center",
              md: searchResult.length < 3 ? "unset" : "space-between",
              lg: searchResult.length < 6 ? "unset" : "space-between",
            }}
            gap={{ base: "5", md: "7" }}
            alignItems={{ base: "center", md: "start" }}
          >
            {Result}
          </Flex>
        );
      }
    } else {
      return (
        <Text alignSelf="center" fontSize="lg">
          {" "}
          Couldn't get the results for {searchTitle}{" "}
        </Text>
      );
    }

    return (
      <Text alignSelf="center" fontSize="lg">
        Type something in the searchbox
      </Text>
    );
  };
  return (
    <Stack gap="10">
      {searchTitle && (
        <Text alignSelf="center" fontSize="lg">
          {" "}
          Showing results for{" "}
          <span style={{ fontWeight: "bold", color: primaryColor }}>
            {searchTitle}
          </span>
        </Text>
      )}

      {renderContent()}
    </Stack>
  );
};

export default SearchContents;
