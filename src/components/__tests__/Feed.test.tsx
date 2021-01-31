import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Feed } from '../Feed';
import { MetaDataModel, Status } from '../../types';

const onLoadMoreMock = jest.fn();

// let emptyTweetsArr: Array<any> = [];
const mockTweets: Array<any> = [
	{
		entities: { hashtags: [] },
		text:
			'Eight years ago today, Lionel Messi scored four goals for Barcelona against Osasuna ⚽️⚽️⚽️⚽️ The way he sat down thttps://t.co/z81vXrJZnz',
		user: {
			screen_name: 'goal',
			profile_image_url: 'http://pbs.twimg.com/profile_images/1306259078902165515/NFreUk7w_normal.jpg',
		},
	},
	{
		entities: { hashtags: [{ text: 'Messi', indices: [75, 101] }] },
		text: `All 👀's on #Messi https://t.co/akRMPS8eaw`,
		user: {
			screen_name: 'FCBarcelona',
			profile_image_url: 'http://pbs.twimg.com/profile_images/1333096463916797954/7bzarkH2_normal.jpg',
		},
	},
	{
		entities: { hashtags: [{ text: 'Messi', indices: [75, 101] }] },
		text: '💪 #Messi is back! 🐐 https://t.co/QyEDYPTNp7',
		user: {
			screen_name: 'FCBarcelona',
			profile_image_url: 'http://pbs.twimg.com/profile_images/1333096463916797954/7bzarkH2_normal.jpg',
		},
	},
	{
		entities: { hashtags: [] },
		text: `Kauan Basile is eight years old. He's just signed an apparel deal with Nike (which is younger than Neymar and Messi… https://t.co/uknJXTrtHr`,
		user: {
			screen_name: 'brfootball',
			profile_image_url: 'http://pbs.twimg.com/profile_images/1265929170913296385/I54xoXdG_normal.jpg',
		},
	},
	{
		entities: { hashtags: [] },
		text: `📈 Top rated players in Europe's top 5 leagues in 2021 (3+ apps): 1️⃣ L. Messi - 8.80 2️⃣ H. Kane - 8.46 3️⃣ J. San… https://t.co/nbkMTU0ipT`,
		user: {
			screen_name: 'WhoScored',
			profile_image_url: 'http://pbs.twimg.com/profile_images/1020650459349110784/EFuffquU_normal.jpg',
		},
	},
];

const mockMetaData: MetaDataModel = {
	completed_in: 0.025,
	count: 5,
	max_id: 0,
	max_id_str: '0',
	next_results: '?max_id=1354055253520482310&q=messi&count=5&include_entities=1&result_type=popular',
	query: 'messi',
	since_id: 0,
	since_id_str: '0',
};

describe('Feed Component', () => {
	test('renders idleMessage', () => {
		const { container, getByText } = render(
			<Feed
				tweets={[]}
				status={Status.IDLE}
				onLoadMore={onLoadMoreMock}
				paginationStatus={Status.IDLE}
				metaData={null}
			/>
		);
		expect(getByText('Start your search')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
	test('renders noResultsMessage', () => {
		const { container, getByText } = render(
			<Feed
				tweets={[]}
				status={Status.RESOLVED}
				onLoadMore={onLoadMoreMock}
				paginationStatus={Status.IDLE}
				metaData={null}
			/>
		);
		expect(getByText('No results')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
	test('renders 5 tweets and load more button', () => {
		const { container, getByText } = render(
			<Feed
				tweets={mockTweets}
				status={Status.RESOLVED}
				onLoadMore={onLoadMoreMock}
				paginationStatus={Status.IDLE}
				metaData={mockMetaData}
			/>
		);
		expect(getByText('Load more')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
