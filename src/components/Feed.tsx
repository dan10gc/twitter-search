// @ts-nocheck
import { Box, Card, CardBody, CardFooter, Image, Text } from "grommet";
import React from "react";
import config from "../config/config";
import { useDebounce } from "../helpers/useDebounce";
import { searchTweets } from "../services/twitter";
import { Status } from "../types";
import { Spinner } from "./Spinner";

interface Props {
  searchTerm: string;
}

const Tweet = ({ tweet, index }) => {
  return (
    <Box
      direction="row"
      align="center"
      gap="small"
      //   border={index < tweets.length - 1 ? "bottom" : undefined}
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
};

export const Feed = (props: Props) => {
  const [tweets, setTweets] = React.useState([]);
  const [status, setStatus] = React.useState<Status>(Status.IDLE);

  const debouncedSearchTerm = useDebounce(props.searchTerm, 500);

  React.useEffect(
    () => {
      if (debouncedSearchTerm) {
        setStatus(Status.PENDING);
        searchTweets(debouncedSearchTerm).then((results) => {
          setStatus(Status.RESOLVED);
          setTweets(results);
        });
      }
      //    else {
      //     setTweets([]);
      //   }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  return (
    <Box>
      {Status.PENDING === status && <Spinner />}

      {tweets.map((tweet, index) => {
        // @ts-ignore
        return <Tweet {...{ tweet, index }} />;
      })}
    </Box>
  );
};
