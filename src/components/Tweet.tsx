import React from 'react';
// @ts-ignore
import extractUrls from 'extract-urls';
import Hashtag from './Hashtag';
import { HashtagModel } from '../types';

interface Props {
	tweet: any;
	index: number;
}

const Tweet = ({ tweet, index }: Props) => {
	const tweetUrl = extractUrls(tweet.text);
	const hashtags: Array<string> = tweet.entities.hashtags.map((hashtag: HashtagModel) => hashtag.text);
	const text = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

	return (
		<div
			className={`box mb-0 px-mobile is-shadowless is-radiusless ${
				index % 2 !== 0 && `has-background-white-bis`
			}`}
		>
			<article className="media">
				<div className="media-left">
					<figure className="image is-48x48">
						<img className="is-rounded" src={tweet.user.profile_image_url} alt="user profile" />
					</figure>
				</div>
				<div className="media-content">
					<div className="content">
						<h5 className="title is-5 mb-2">
							<strong>@{tweet.user.screen_name}</strong>
						</h5>
						<p className="mb-1 has-text-weight-medium tweet-text">{text}</p>
						{Array.isArray(tweetUrl) && (
							<a href={tweetUrl[0]} target="_blank" rel="noreferrer">
								{tweetUrl[0]}
							</a>
						)}
					</div>
					<div className="is-flex-direction-row flex-wrap is-justify-content-start">
						{hashtags.map((hashtag: string) => (
							<Hashtag {...{ hashtag }} />
						))}
					</div>
				</div>
			</article>
		</div>
	);
};

export default Tweet;
