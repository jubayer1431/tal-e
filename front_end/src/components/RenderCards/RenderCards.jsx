import React from 'react';
import { Card } from './..';

const RenderCards = ({ posts, title }) => {
	if (posts?.length > 0) {
		return posts.map((post) => <Card key={post._id} post={post} />);
	}

	return (
		<div className='mt-5 font-bold text-xl uppercase text-[#6449ff]'>
			{title}
		</div>
	);
};

export default RenderCards;
