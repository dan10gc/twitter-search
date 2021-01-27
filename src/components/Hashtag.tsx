import React from 'react';

interface Props {
	hashtag: string;
	onHashtagPress?: () => void;
}

const Hashtag = ({ hashtag, onHashtagPress }: Props) => {
	return (
		<a className="badge" onClick={onHashtagPress}>
			#{hashtag}
		</a>
	);
};

export default Hashtag;
