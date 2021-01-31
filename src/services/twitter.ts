import { config } from '../config/config';

export const searchTweets = (search: string) => {
	return fetch(`${config.API_URL}tweets${search}`)
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => console.error(error));
};
