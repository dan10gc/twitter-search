import * as dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
	process.exit(1);
}

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10);
const TWITTER_SEARCH_URL = `https://api.twitter.com/1.1/search/tweets.json`;

/**
 *  App Configuration
 */

app.use(morgan('common'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.json({ status: 'success', message: `Welcome to my API service` });
});

app.get('/tweets', async (req: Request, res: Response) => {
	const { query } = req;
	const queryString = Object.keys(query)
		.map((key) => key + '=' + query[key])
		.join('&');
	const response = await fetch(`${TWITTER_SEARCH_URL}?${queryString}`, {
		headers: {
			Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
		},
	});
	const json = await response.json();
	res.json(json);
});

function notFound(req: Request, res: Response, next: NextFunction) {
	res.status(404);
	const error = new Error('Not Found');
	next(error);
}

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
	res.status(res.statusCode || 500);
	res.json({ message: error.message });
}

app.use(notFound);
app.use(errorHandler);

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT} 🚀 `);
});
