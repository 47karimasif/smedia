import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./components/User";
import Landing from "./components/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/auth";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import Profile from "./pages/Profile";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("jwtToken");

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Switch>
            <PublicRoute exact path="/" component={Landing} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
