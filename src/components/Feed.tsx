import React from 'react';

import { Status } from '../types';
import { Spinner } from './Spinner';
import Tweet from './Tweet';

interface Props {
	tweets: Array<any>;
	status: Status;
	onLoadMore: () => void;
}

export const Feed = ({ tweets, status, onLoadMore }: Props) => {
	console.log(tweets.length);
	return (
		<div className="box px-0">
			{Status.PENDING === status && <Spinner />}

			{tweets.map((tweet, index) => {
				return <Tweet {...{ tweet, index }} key={tweet.user?.screen_name + index.toString()} />;
			})}
			{tweets.length > 0 && (
				<button className="button is-ghost is-fullwidth" onClick={onLoadMore}>
					Load more
				</button>
			)}
		</div>
	);
};
