import { AxiosError, AxiosResponse } from "axios";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { Link } from "react-router-dom";

interface dataProps {
  id: number;
  name: string;
  alterEgo: string;
}



function RQSuperHeros() {

  const onSuccess = (data: AxiosResponse) => {
    console.log("successful...", data);
  }
  const onError = (error: AxiosError) => { 
    console.log("Error", error);
    
  }

  const { isLoading, data, isError, error, isFetching, refetch } =
    useCustomQuery(onSuccess, onError);

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
        <div key={hero.name}>
          <Link to={`/super-hero/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}

      {/* {data?.map((heroName: string) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </div>
  );
}

export default RQSuperHeros;
