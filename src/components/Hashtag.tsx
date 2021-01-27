import React from "react";

interface Props {
  hashtag: string;
}

const Hashtag = ({ hashtag }: Props) => {
  return <a className="badge">#{hashtag}</a>;
};

export default Hashtag;
