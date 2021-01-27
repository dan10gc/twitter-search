// @ts-nocheck
import { Box, Card, CardBody, CardFooter, Image, Text } from "grommet";
import React from "react";
import config from "../config/config";
import { useDebounce } from "../helpers/useDebounce";
import { searchTweets } from "../services/twitter";
import { Status } from "../types";
import { Spinner } from "./Spinner";
import extractUrls from "extract-urls";

interface Props {
  searchTerm: string;
}

const Tweet = ({ tweet, index }) => {
  //   const str = "";
  const tweetUrl = extractUrls(tweet.text);

  const text = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
  //   console.log(Array.isArray(tweetUrl) ? tweetUrl : "no url");

  return (
    <div className="box mb-0">
      <article className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src={tweet.user.profile_image_url} alt="Image" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <h5 className="title is-5 mb-1">
              <strong>@{tweet.user.name}</strong>
            </h5>
            <p className="mb-1">{text}</p>
            {Array.isArray(tweetUrl) && <a>{tweetUrl[0]}</a>}
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" aria-label="reply">
                <span className="icon is-small">
                  <i className="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="retweet">
                <span className="icon is-small">
                  <i className="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="like">
                <span className="icon is-small">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
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
        return <Tweet {...{ tweet, index }} key={tweet.user.name} />;
      })}
    </Box>
  );
};
