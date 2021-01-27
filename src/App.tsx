import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import {
  // Box,
  Button,
  // Card,
  CardBody,
  CardHeader,
  Grid,
  Grommet,
  Text,
  TextInput,
} from "grommet";
import { SearchBar } from "./components/Searchbar";
import { Search } from "grommet-icons";
import { Feed } from "./components/Feed";
// @ts-ignore
import { Flex, Box } from "reflexbox";
// @ts-ignore
import { Label, Input } from "@rebass/forms";
import { Card, Heading } from "rebass";
import "./scss/app.scss";

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
  const [value, setValue] = React.useState<string>("");
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
    // <Grommet full plain>
    //   <Box background="dark-1" fill align="center" pad={{ top: "large" }}>
    //     <Box
    //       width="large"
    //       direction="row"
    //       align="center"
    //       pad={{ horizontal: "small", vertical: "xsmall" }}
    //       elevation={suggestionOpen ? "medium" : undefined}
    //       // gridArea="header"
    //       // background="brand"
    //     >
    //       <Search color="brand" />
    //       <TextInput
    //         type="search"
    //         placeholder="Search by keyword"
    //         plain
    //         value={value}
    //         onChange={onChange}
    //       />
    //     </Box>
    //     <Grid
    //       fill
    //       rows={["flex"]}
    //       columns={["fill", "flex"]}
    //       gap="small"
    //       areas={[
    //         // { name: "header", start: [0, 0], end: [1, 0] },
    //         { name: "feed", start: [0, 0], end: [0, 0] },
    //         { name: "filter", start: [1, 0], end: [1, 0] },
    //       ]}
    //     >
    //       <Box gridArea="feed" background="light-2">
    //         <Feed searchTerm={value} />
    //       </Box>

    //       <Box gridArea="filter" background="light-5">
    //         <Text>
    //           <strong>Filter by hashtag</strong>
    //         </Text>
    //         {/* <Box fill background="light-4" align="center" justify="center"> */}
    //         <Button
    //           primary
    //           label="#coding"
    //           // onClick={() => setShowLayer(false)}
    //         />
    //         {/* </Box> */}
    //       </Box>
    //     </Grid>
    //   </Box>
    // </Grommet>
    <div className="container mt-4">
      <h1 className="title">Tweet Feed</h1>

      <div className="mb-4">
        <input
          className="input py-1"
          type="search"
          placeholder="Search by keyword"
          value={value}
          onChange={onChange}
        />
      </div>

      <div className="columns mt-3">
        <div className="column is-two-thirds">
          <Feed searchTerm={value} />
          {/* <h1 className="title">Filter by hashtag</h1> */}
        </div>
        <div className="column">
          <div className="box">
            <h1 className="title is-4">Filter by hashtag</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
