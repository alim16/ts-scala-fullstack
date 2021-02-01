import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TabPanel from "./MenuTabPanel";


const App = () => {
  return (
    <div>
      <Container>
        <Typography color="textPrimary" gutterBottom variant="h2" align="center">
          Example Frontend
        </Typography>
        <TabPanel />

      </Container>
    </div>
  );

}

export default App;
