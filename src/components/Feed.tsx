import { Box, Image, Text } from "grommet";
import React from "react";
import config from "../config/config";
import { Status } from "../types";
import { Spinner } from "./Spinner";

interface Props {}

export const Feed = (props: Props) => {
  const [tweets, setTweets] = React.useState([]);
  const [status, setStatus] = React.useState<Status>(Status.IDLE);
  React.useEffect(() => {
    setStatus(Status.PENDING);
    fetch(`${config.API_URL}tweets/`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTweets(res.statuses);
      })
      .finally(() => setStatus(Status.RESOLVED));
  }, []);
  return (
    <Box>
      {Status.PENDING === status && <Spinner />}

      {tweets.map((tweet, index) => {
        // @ts-ignore
        return (
          <Box
            direction="row"
            align="center"
            gap="small"
            border={index < tweets.length - 1 ? "bottom" : undefined}
            pad="small"
            key={index}
          >
            <Image
              width="48px"
              //   @ts-ignore
              src={tweet.user.profile_image_url}
              style={{ borderRadius: "100%" }}
            />
            <Box
              direction="column"
              align="start"
              gap="small"
              pad="small"
              key={index}
              width="large"
            >
              <Text>
                {/* @ts-ignore */}
                <strong>{`@${tweet.user.name}`}</strong>
              </Text>
              {/* @ts-ignore */}
              <Text>{tweet.text}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
