import React from 'react';

import { MetaDataModel, Status } from '../types';
import { Spinner } from './Spinner';
import Tweet from './Tweet';

interface Props {
	tweets: Array<any>;
	status: Status;
	onLoadMore: () => void;
	paginationStatus: Status;
	metaData: MetaDataModel | null;
}

export const Feed = ({ tweets, status, onLoadMore, paginationStatus, metaData }: Props) => {
	const idleMessage = () => {
		if (Status.IDLE === status) {
			return (
				<div className="content py-4">
					<figure className="image is-400x400">
						<img src="https://ik.imagekit.io/tb8dhpn3xiv/graphs_statistics_outline_II_q-M4DXaqR.png" />
					</figure>
					<div className="px-5">
						<h1>Start your search</h1>
						<p>Search Twitter for keywords and monitor trends and hashtags in your industry.</p>
					</div>
				</div>
			);
		}
	};
	const noResultsMessage = () => {
		if (tweets.length === 0 && Status.RESOLVED === status)
			return (
				<div className="content py-4">
					<figure className="image is-400x400">
						<img src="https://ik.imagekit.io/tb8dhpn3xiv/search_outline_II_gW4C46dD5.png" />
					</figure>
					<div className="px-5">
						<h1>No results</h1>
						<p>The term you entered did not bring up any results, you may have mistyped your term.</p>
					</div>
				</div>
			);
	};
	return (
		<div className="box px-0 mb-5 ">
			{idleMessage()}
			{Status.PENDING === status && <Spinner />}
			{noResultsMessage()}
			{tweets.map((tweet, index) => {
				return <Tweet {...{ tweet, index }} key={index + tweet.user?.screen_name} />;
			})}
			{tweets.length > 0 && (
				<button
					className={`button is-ghost mt-4 is-fullwidth ${
						Status.PENDING === paginationStatus && `is-loading`
					}`}
					onClick={onLoadMore}
				>
					{/* @ts-ignore */}
					{!metaData?.next_results ? `Back to top` : `Load more`}
				</button>
			)}
		</div>
	);
};
