import { gql, useQuery } from "@apollo/client";
import React from "react";

const USERS_QUERY = gql`
  query USERS_QUERY {
    allUsers {
      id
      name
    }
  }
`;

export default function Users() {
  console.log("inside user");
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data?.allUsers.map((user) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
}
