const express = require('express')
const morgan = require('morgan');
const config = require('dotenv').config()
const cors = require('cors');
const nodefetch = require('node-fetch')

const app = express();

const TWITTER_SEARCH_URL = `https://api.twitter.com/1.1/search/tweets.json`

app.use(morgan('common'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: `It's alive!` })
})

app.get('/tweets', async (req, res) => {
  const { query } = req;
  const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
  const response = await nodefetch(`${TWITTER_SEARCH_URL}?${queryString}`, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  })
  const json = await response.json();
  res.json(json)
})

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Listening on port ${port} 🚀 `) })