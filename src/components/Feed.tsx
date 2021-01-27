import { Box, Card, CardBody, CardFooter, Image, Text } from "grommet";
import React from "react";
import config from "../config/config";
import { useDebounce } from "../helpers/useDebounce";
import { searchTweets } from "../services/twitter";
import { Status } from "../types";
import { Spinner } from "./Spinner";
import Tweet from "./Tweet";

interface Props {
  tweets: Array<any>;
  status: Status;
}

export const Feed = ({ tweets, status }: Props) => {
  return (
    <div className="box px-0">
      {Status.PENDING === status && <Spinner />}

      {tweets.map((tweet, index) => {
        return (
          <Tweet
            {...{ tweet, index }}
            key={tweet.user.name + index.toString()}
          />
        );
      })}
      {tweets.length > 0 && (
        <button className="button is-ghost is-fullwidth">Load more</button>
      )}
    </div>
  );
};
