import { useParams } from "react-router-dom"
import { useSuperHeroData } from "../hooks/useSuperHeroData";
import { AxiosError } from "axios";

const RQSuperhero = () => {
    const { heroId } = useParams();

    const { data, isLoading, isError, error } = useSuperHeroData(heroId as string);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>{(error as AxiosError).message}</h1>
    }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
}

export default RQSuperhero