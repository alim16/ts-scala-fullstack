import { makeStyles } from "@material-ui/core/styles";

export const loginStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),

  },
  form: {
    width: 600,
  },
  control: {
    margin: 5
  },
  button: {
    margin: 5,
    width: 200,

  }
}))