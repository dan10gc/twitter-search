import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Tweet from '../Tweet';
import { Status } from '../../types';

const onLoadMoreMock = jest.fn();

const emptyTweetsArr: Array<any> = [];
// Ideally we move this to __mocks__
const mockTweet = {
	entities: { hashtags: [{ text: 'Messi', indices: [75, 101] }] },
	text: '💪 #Messi is back! 🐐 https://t.co/QyEDYPTNp7',
	user: {
		screen_name: 'FCBarcelona',
		profile_image_url: 'http://pbs.twimg.com/profile_images/1333096463916797954/7bzarkH2_normal.jpg',
	},
};

describe('Tweet Component', () => {
	test('renders tweet with white-bis background-color', () => {
		const { container, getByText } = render(<Tweet tweet={mockTweet} index={3} />);
		expect(getByText('#Messi')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
