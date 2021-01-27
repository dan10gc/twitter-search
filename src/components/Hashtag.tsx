import React from 'react';

interface Props {
	hashtag: string;
	onHashtagPress?: () => void;
}

const Hashtag = ({ hashtag, onHashtagPress }: Props) => {
	return (
		<div className="badge is-clickable" onClick={onHashtagPress}>
			<span> #{hashtag}</span>
		</div>
	);
};

export default Hashtag;
