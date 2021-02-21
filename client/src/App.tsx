import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { Reducer } from "react";
import Login from "./Components/Login/Login";
import NavTabs from "./Components/Menu/MenuTabPanel";
import TopBar from "./Components/Menu/TopBar";

interface IState {
  isAuthenticated: boolean,
  user: string | null,
  token: string | null,
}

type LoginAction = { type: "LOGIN", payload: { user: string, token: string } } |
  { type: "LOGOUT" }

interface IContextProps {
  state: IState;
  dispatch: React.Dispatch<any>
}


export const AuthContext = React.createContext({} as IContextProps)
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const reducer: Reducer<IState, LoginAction> = (state: IState, action: LoginAction) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};


const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <TopBar />
      <Container maxWidth="md">
   
        {!state.isAuthenticated ? <Login /> : <NavTabs />}
      </Container>
    </AuthContext.Provider>
  );

}

export default App;
