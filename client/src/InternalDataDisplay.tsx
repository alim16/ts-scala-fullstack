import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useEffect, useState } from "react";
import API from "./utils/API";

const InternalDataDisplay = () => {

    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        API.getPeopleList()
            .then((data) => setData(data))
    }, []);

    return (
        <div>
            {/*TODO: change key to person.id after adding id to Person in the server*/}
            {/*TODO: change || "no data found", not working as expected*/}
            {data.map((person) => (
                <Card key={person.name}> 
                    <CardContent> 
                        {person.name} 
                        <br/>
                        {person.email} 
                     </CardContent>
                </Card>)) || <h2> no data found </h2>}
        </div>
    )
}

export default InternalDataDisplay