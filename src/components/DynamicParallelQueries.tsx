import axios from "axios";
import { useQueries } from "react-query";


interface IDynamicProps {
    heroId: number[]
}

const fetchSuperHero = (heroId: number) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};


const DynamicParallelQueries = ({ heroId }: IDynamicProps) => {
    const queriesResult = useQueries(
        heroId.map((Id: number) => {
            return {
                queryKey: ['super-hero', Id],
                queryFn: () => fetchSuperHero(Id)
            }
        })
    )

    console.log({queriesResult});
    
  return <div>DynamicParallelQueries</div>;
};

export default DynamicParallelQueries