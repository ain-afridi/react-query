import axios from "axios"
import { useQuery, UseQueryOptions, useQueryClient, useMutation } from "react-query"
import { IAddSuperHero, ISuperHero } from "../utils";

const fetchSuperHero = ({ queryKey }: UseQueryOptions) => {
    const heroId = queryKey ? queryKey[1] : 0;
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

const addSuperHero = (payload: IAddSuperHero) => {
    return axios.post('http://localhost:4000/superheroes',payload)
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

export const AddSuperHerosData = () => {
    return useMutation(addSuperHero)
}