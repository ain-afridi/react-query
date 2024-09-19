import axios from "axios"
import { useQuery, UseQueryOptions } from "react-query"

const fetchSuperHero = ({ queryKey }: UseQueryOptions) => {
    
    const heroId = queryKey ? queryKey[1] : 0;
    
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId: string) => {
    return useQuery(['super-hero', heroId], fetchSuperHero)
}