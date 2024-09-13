import { useEffect, useState } from "react";
import axios from "axios"

interface dataProps {
  id: number;
  name: string;
  alterEgo: string;
}

function SuperHeros() {
    const [data, setData] = useState<dataProps[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:4000/superheroes`)
            .then(res => {
                setData(res.data)
                setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <h1>Loading...</h1>
    }
      return (
        <div>
          <h1>SuperHeros Page</h1>
          {data.map((hero: dataProps) => (
            <div key={hero.name}>{hero.name}</div>
          ))}
        </div>
      );
}

export default SuperHeros;