import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { useEffect, useState } from "react"
import API from "../../utils/API"

//import { createServer, Model } from "miragejs"
import { makeStyles } from "@material-ui/core/styles"

         ///////
// let server = createServer()
// server.get("/api/users", { users: [{ id: 1, name: "Bob" }] })

const useStyles = makeStyles({
    card: {
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
        marginBottom: 20
    },
})

const InternalDataDisplay = () => {

    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        API.getPeopleList()
            .then((data) => setData(data))
    }, [])

    
    const classes = useStyles()

    return (
        <div>
            {/*TODO: change key to person.id after adding id to Person in the server*/}
            {/*TODO: change || "no data found", not working as expected*/}
            {data.map((person) => (
                <Card key={person.name} className={classes.card}> 
                    <CardContent> 
                        {person.name} 
                        <br/>
                        {person.email} 
                     </CardContent>
                     <br/>
                </Card>)) || <h2> no data found </h2>}
            
        </div>
    )
}

export default InternalDataDisplay