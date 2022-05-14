import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/auth";

// export const IS_LOGGED_IN = gql`
//   query Me {
//     me {
//       name
//     }
//   }
// `;

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  // const { loading, error, data } = useQuery(IS_LOGGED_IN);

  // if (loading) return <p>Loading...</p>;
  // const auth = data?.me && !error;

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}

export default PrivateRoute;
