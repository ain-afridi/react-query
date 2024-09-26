
import { useQuery, UseQueryOptions, useQueryClient, useMutation } from "react-query"
import { IAddSuperHero, ISuperHero } from "../utils";
import { request } from "../utils/axios-utils";
import axios from "axios";

const fetchSuperHero = ({ queryKey }: UseQueryOptions) => {
    const heroId = queryKey ? queryKey[1] : 0;

    // return request({ url: `/superheroes/${heroId}`})
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

const addSuperHero = (payload: IAddSuperHero) => {

    return request({ url: `superheroes`, method:'POST', data: payload})
    // return axios.post('http://localhost:4000/superheroes', payload)
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

interface SuperHeroQueryData {
    data: ISuperHero[];
}

export const AddSuperHerosData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        //     // queryClient.invalidateQueries('super-heros')
        //     queryClient.setQueryData<SuperHeroQueryData>('super-heros',(oldQueryData) => {
        //         if (oldQueryData)
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //             }
        //         else return {
        //             data: []
        //         }
        //     })
        // },
        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heros');
            const previousHeroData = queryClient.getQueryData('super-heros');
            queryClient.setQueryData<SuperHeroQueryData>('super-heros', (oldQueryData) => {
                if (oldQueryData)
                    return {
                        ...oldQueryData,
                        data: [...oldQueryData.data,{ id: oldQueryData.data.length+1, ...newHero}]
                    }
                else return {
                    data: []
                }
            })

            return {
                previousHeroData
            }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-heros', context?.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heros')
        }
    })
}