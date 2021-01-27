import config from "../config/config";

export const searchTweets = (search: string) => {
    return fetch(`${config.API_URL}tweets?q=${search}`)
        .then((res) => res.json())
        .then((res) => res.statuses).catch((error) => console.error(error))

}