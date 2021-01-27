import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Hashtag from '../Hashtag';

const onHashtagPressMock = jest.fn();

describe('Hashtag Component', () => {
	test('renders hashtag', () => {
		const { container, getByText } = render(<Hashtag hashtag="reactjs" onHashtagPress={onHashtagPressMock} />);
		expect(getByText('#reactjs')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
