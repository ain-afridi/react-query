import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

interface dataProps {
  id: number;
  name: string;
  alterEgo: string;
}

const SuperHerosApi = () => {
  return axios.get(`http://localhost:4000/superheroes`)
}

function RQSuperHeros() {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heros",
    SuperHerosApi,
    {
      enabled: false,
      // staleTime: 3000
      // cacheTime: 5000,
      // refetchOnMount: "always",
      // refetchOnWindowFocus: "always",
      // refetchInterval: 2000,
      // refetchIntervalInBackground: true

    }
  );

  console.log({isLoading, isFetching});
  

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h2>{(error as AxiosError)?.message || "Something went wrong!"}</h2>;
  }

  // console.log(data)
  return (
    <div>
      <button onClick={() => refetch()}>Fetch Heros</button>
      <h1>RQSuperHeros Page</h1>
      {data?.data.map((hero: dataProps) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </div>
  );
}

export default RQSuperHeros;
