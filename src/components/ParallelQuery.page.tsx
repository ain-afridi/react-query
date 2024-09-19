import axios from "axios"
import { useQuery } from "react-query";
import { IFriends, ISuperHero } from "../utils";

const SuperHerosApi = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

const FriendsApi = () => {
  return axios.get(`http://localhost:4000/Friends`);
};



const ParallelQuery = () => {

    const { data: superHeroData } = useQuery("super-heros", SuperHerosApi);
    const { data: friendsData } = useQuery("friends", FriendsApi);
  return (
    <div>
      <h1>Super Heros</h1>
      {superHeroData?.data.map((hero: ISuperHero) => (
        <div key={hero.id}>
          <span>{hero.name}</span>
        </div>
      ))}

      <h1>Friends</h1>
      {friendsData?.data.map((hero: IFriends) => (
        <div key={hero.id}>
          <span>{hero.name}</span>
        </div>
      ))}
    </div>
  );
}

export default ParallelQuery