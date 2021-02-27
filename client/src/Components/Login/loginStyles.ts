import { makeStyles } from "@material-ui/core/styles";

export const loginStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}))

export const login2Styles = makeStyles((theme) => ({
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


export const login3Styles = makeStyles({
  root: {
    container: {
      padding: 3,
      margin: 10
    },
    margin: 10
  }
})