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

// TODO: CHECK DEFAULT VALUE
app.get('/tweets', async (req, res) => {
  const { query } = req;
  const q = (typeof query.q == 'string' && query.q.trim().length) ? query.q.trim() : 'science37'
  const response = await nodefetch(`${TWITTER_SEARCH_URL}?q=${q}&result_type=popular`, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  })
  const json = await response.json();
  res.json(json)
})

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Listening on port ${port} 🚀`) })