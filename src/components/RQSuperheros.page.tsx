import { AxiosError, AxiosResponse } from "axios";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AddSuperHerosData } from "../hooks/useSuperHeroData";

interface dataProps {
  id: number;
  name: string;
  alterEgo: string;
}



function RQSuperHeros() {
  const [name, setName] = useState("")
  const [alterEgo, setAlterEgo] = useState("")

  const onSuccess = (data: AxiosResponse) => {
    console.log("successful...", data);
  }
  const onError = (error: AxiosError) => { 
    console.log("Error", error);
    
  }

  const { isLoading, data, isError, error, isFetching, refetch } =
    useCustomQuery(onSuccess, onError);
  
  const {mutate: addHero} = AddSuperHerosData();

  console.log({isLoading, isFetching});
  

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h2>{(error as AxiosError)?.message || "Something went wrong!"}</h2>;
  }

  const handleSubmit = () => {
    addHero({name, alterEgo})
  }


  // console.log(data)
  return (
    <div>
      <button onClick={() => refetch()}>Fetch Heros</button>
      <h1>RQSuperHeros Page</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="alterEgo"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Hero</button>
      </div>

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
