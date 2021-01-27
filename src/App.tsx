import { Search } from "grommet-icons";
import React from "react";
import "./App.css";
import { Feed } from "./components/Feed";
import Hashtag from "./components/Hashtag";
import { useDebounce } from "./helpers/useDebounce";
import "./scss/app.scss";
import { searchTweets } from "./services/twitter";
import { HashtagModel, Status } from "./types";
import { FaSearch } from "react-icons/fa";

function App() {
  const [value, setValue] = React.useState<string>("");
  const [suggestionOpen, setSuggestionOpen] = React.useState(false);
  const [suggestedFolks, setSuggestedFolks] = React.useState([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const [tweets, setTweets] = React.useState([]);
  const [status, setStatus] = React.useState<Status>(Status.IDLE);
  const [hashtags, setHashtags] = React.useState<Array<string>>([]);

  const debouncedSearchTerm = useDebounce(value, 500);

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      setStatus(Status.PENDING);
      searchTweets(debouncedSearchTerm).then((results) => {
        setStatus(Status.RESOLVED);

        const hashtags: Array<string> = results
          .flatMap((result: any) => result.entities.hashtags)
          .map((hashtag: HashtagModel) => hashtag.text);

        setTweets(results);
        setHashtags(hashtags);
      });
    } else {
      setTweets([]);
    }
  }, [debouncedSearchTerm]);
  return (
    <div className="container mt-4">
      <h1 className="title">Tweet Feed</h1>

      <div className="columns mt-3">
        <div className="column is-two-thirds">
          <div className="control has-icons-left mb-4">
            <span className="icon is-small is-left">
              <FaSearch />
            </span>

            <input
              className="input py-1"
              type="search"
              placeholder="Search by keyword"
              value={value}
              onChange={onChange}
            />
          </div>
          <div className="box is-hidden-tablet">
            <h1 className="title is-4">Filter by hashtag</h1>
            {hashtags.map((hashtag) => (
              <Hashtag {...{ hashtag }} />
            ))}
          </div>
          <Feed {...{ tweets, status }} />
        </div>
        <div className="column is-hidden-mobile">
          <div className="box ">
            <h1 className="title is-4">Filter by hashtag</h1>
            <div className="is-flex-direction-row flex-wrap">
              {hashtags.map((hashtag) => (
                <Hashtag {...{ hashtag }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
