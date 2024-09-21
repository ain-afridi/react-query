import axios from "axios"
import { useQuery, UseQueryOptions, useQueryClient } from "react-query"
import { ISuperHero } from "../utils";

const fetchSuperHero = ({ queryKey }: UseQueryOptions) => {
    const heroId = queryKey ? queryKey[1] : 0;
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId: string) => {
    const queryClient = useQueryClient();
    return useQuery<{ data: ISuperHero } | undefined>(['super-hero', heroId], fetchSuperHero, {
        initialData: () => {
            const hero = queryClient.getQueryData<{ data: ISuperHero[] }>('super-heros')?.data?.find((x: ISuperHero) => x.id === parseInt(heroId));

            if (hero) {
                return {
                    data: hero
                }
            } else {
                return undefined
            }
        }
    })
}