import { Fragment } from "react";
import axios, { AxiosError } from "axios";
import { IColors, IInfiniteQueryResponse } from "../utils";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get<IInfiniteQueryResponse>(
    `http://localhost:4000/colors?_page=${pageParam}&_per_page=2`
  );
};

const InfiniteQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, page) => {
      if (page.length < 4) {
        return page.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{(error as AxiosError).message}</h1>;
  }

  return (
    <div>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.data.map((color: IColors) => (
            <div key={color.id}>
              <h2>
                {color.id}.{color.label}
              </h2>
            </div>
          ))}
        </Fragment>
      ))}
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load more
      </button>

      {isFetching && !isFetchingNextPage ? <h2>Loading...</h2> : null}
    </div>
  );
};

export default InfiniteQueries;
