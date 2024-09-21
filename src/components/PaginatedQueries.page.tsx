import axios, { AxiosError } from "axios";
import { IColors } from "../utils";
import { useQuery } from "react-query";
import { useState } from "react";

const fetchColors = (page: number) => {
  return axios.get<IColors[]>(
    `http://localhost:4000/colors??_limit=2&_start=${page}&_end=${page+2}`
  );
};
const PaginatedQueries = () => {
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["colors", page],
    () => fetchColors(page),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{(error as AxiosError).message}</h1>;
  }
  return (
    <div>
      <h1>Paginated Queries</h1>
      {data?.data.map((color: IColors) => (
        <div key={color.id}>
          <h2>
            {color.id}.{color.label}
          </h2>
        </div>
      ))}
      <button onClick={() => setPage((prev) => prev - 2)} disabled={page === 0}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 2)} disabled={page === 4}>
        Next
      </button>

      {isFetching && <h2>Loading...</h2>}
    </div>
  );
};

export default PaginatedQueries;
