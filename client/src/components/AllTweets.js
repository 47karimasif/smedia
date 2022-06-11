import { useQuery, gql } from "@apollo/client";
import React from "react";
import "../styles/allTweets.css";

export const TWEETS_QUERY = gql`
  query TWEETS_QUERY {
    Tweets {
      id
      createdAt
      content
      author {
        id
        name
        Profile {
          id
          avatar
        }
      }
    }
  }
`;

export default function AllTweets() {
  const { loading, error, data } = useQuery(TWEETS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(data);

  return (
    <div>
      {data?.Tweets?.map((tweet) => (
        <div className="tweet-container">
          <div className="tweet-header">
            <img
              src={tweet.author.Profile.avatar}
              style={{ width: "40px", borderRadius: "50%" }}
              alt="avatar"
            />
            <h4 className="name">{tweet.author.name} </h4>
          </div>
          <p>{tweet.content}</p>
        </div>
      ))}
    </div>
  );
}
