import axios from "axios"
import { useQuery } from "react-query"
import { IChannels, IUsers } from "../utils";

interface IDependentProps {
    email: string
}

const fetchUser = (email: string) => {
    return axios.get<IUsers>(`http://localhost:4000/users/${email}`);
}

const fetchChannels = (channelId: string | undefined) => {
  return axios.get<IChannels>(`http://localhost:4000/channels/${channelId}`);
};

const DependentQuery = ({email}: IDependentProps) => {

    const { data: userData } = useQuery('email', () => fetchUser(email))
    
    const channelId = userData?.data.channelId

    useQuery("courses", () => fetchChannels(channelId), {
        enabled: !!channelId
    });

  return (
    <div>DependentQuery</div>
  )
}

export default DependentQuery