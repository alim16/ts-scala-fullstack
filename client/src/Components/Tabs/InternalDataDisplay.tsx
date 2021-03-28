import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { useEffect, useState } from "react"
import API from "../../utils/API"
import Typography from "@material-ui/core/Typography"
import React from "react"

//import { createServer, Model } from "miragejs"
import { makeStyles } from "@material-ui/core/styles"
import CardActionArea from "@material-ui/core/CardActionArea"
import Grid from "@material-ui/core/Grid"

///////
// let server = createServer()
// server.get("/api/users", { users: [{ id: 1, name: "Bob" }] })

const useStyles = makeStyles({
    card: {
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
        marginBottom: 20
    },
    media: {
        height: 140,
        width: 140
    }
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
                     <CardActionArea>
                    <Grid container spacing={2}>
                  
                    <CardMedia className={classes.media}
                        component="img"
                        alt="something"
                        image="/images/person1.jpg"
                        title="something"
                    />
                   
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Name: {person.name}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            Email: {person.email}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Last online: 03/03/21
                        </Typography>
                       
                    </CardContent>
                    </Grid>
                    </CardActionArea>
                </Card>)) || <h2> no data found </h2>}

        </div>
    )
}

export default InternalDataDisplay