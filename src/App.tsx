import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Grommet, TextInput } from "grommet";
import { SearchBar } from "./components/Searchbar";
import { Search } from "grommet-icons";
// import Feed from "./components/Feed";

const options = {
  method: "GET",
  // credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAANF5MAEAAAAAcWtT3vZMAFaTuCUSzAqIAqwNa5k%3DNa9TwFHVTYWCWP4CTiVcUDNuWBxzLoQj02v6DiQq5ez37V4n3D`,
  },
};

const API_URL = "http://localhost:5000";

function App() {
  const [value, setValue] = React.useState("");
  const [suggestionOpen, setSuggestionOpen] = React.useState(false);
  const [suggestedFolks, setSuggestedFolks] = React.useState([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  React.useEffect(() => {
    fetch(`${API_URL}/tweets`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.warn(error));

    // (async () => {
    //   const res = await fetch(`https://api.twitter.com/1.1/search/tweets.json?q=twitterdev`);
    //   console.log({ res });
    // })();
  }, []);
  return (
    // <div className="App">
    <Grommet full plain>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Box background="dark-1" fill align="center" pad={{ top: "large" }}>
        <Box
          width="large"
          direction="row"
          align="center"
          pad={{ horizontal: "small", vertical: "xsmall" }}
          elevation={suggestionOpen ? "medium" : undefined}
        >
          <Search color="brand" />
          <TextInput
            type="search"
            placeholder="Search by keyword"
            plain
            value={value}
            onChange={onChange}
          />
        </Box>
        {/* <Feed /> */}
      </Box>

      {/* 
      Feed
      // TODO:
      // 1. display results of the search on key up
      // 2. within search results, each tweet displays:
      // 3. Username of the author
      // 4. Avatar of the author (optional I think to check if image is present)
      // 5. URL of the tweet
       */}
    </Grommet>

    // </div>
  );
}

export default App;
