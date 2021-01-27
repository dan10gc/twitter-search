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
	return (
		<div className="box px-0 mb-5 ">
			{Status.PENDING === status && <Spinner />}

			{tweets.map((tweet, index) => {
				return <Tweet {...{ tweet, index }} key={tweet.user?.screen_name + index.toString()} />;
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
