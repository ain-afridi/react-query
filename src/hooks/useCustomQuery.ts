import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

const SuperHerosApi = () => {
    return axios.get(`http://localhost:4000/superheroes`)
}

export const useCustomQuery = (onSuccess: (data: AxiosResponse) => void, onError: (error: AxiosError) => void) => {
    return useQuery(
        "super-heros",
        SuperHerosApi,
        {
            // enabled: false,
            // staleTime: 3000
            // cacheTime: 5000,
            // refetchOnMount: "always",
            // refetchOnWindowFocus: "always",
            // refetchInterval: 2000,
            // refetchIntervalInBackground: true,
            onSuccess,
            onError,
            // select: (data) => {
            //   return data.data.map((hero: dataProps) => hero.name);
            // }

        }
    );
}