import React from 'react';
import { download } from './../../assets';
import { downloadImage } from './../../utils';

const Card = ({ post: { _id, name, prompt, img } }) => {
	return (
		<div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
			<img
				src={img}
				alt={prompt}
				className='w-full h-auto rounded-xl object-cover'
			/>
			<div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-gray-700 p-4 m-2 rounded-md'>
				<p className='text-md text-gray-200 overflow-y-auto prompt'>{prompt}</p>
				<div className='mt-5 flex justify-between items-center gap-2'>
					<div className='flex items-center gap-2'>
						<div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
							{name[0]}
						</div>
						<p className='text-sm text-gray-300'>{name}</p>
					</div>
					<div className='flex items-center gap-2'>
						<button
							type='button'
							onClick={() => downloadImage(_id, img)}
							className='bg-transparent outline-none border-none'
						>
							<img
								src={download}
								alt='Download Button'
								className='w-7 h-7 object-contain'
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
