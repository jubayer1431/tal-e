import React from 'react';

const FormField = ({
	labelName,
	name,
	type,
	value,
	isSurpriseMe,
	handleSurpriseMe,
	placeholder,
	handleChange,
}) => {
	return (
		<div>
			<div className='flex items-center gap-2 mb-2'>
				<label
					htmlFor={name}
					className='block text-sm font-medium text-gray-400'
				>
					{labelName}
				</label>
				{isSurpriseMe && (
					<button
						type='button'
						className=' px-2 py-1 border border-transparent rounded-md shadow-sm text-xs font-semibold text-white bg-violet-800 hover:bg-violet-900 focus:bg-violet-900 focus:outline-none'
						onClick={handleSurpriseMe}
					>
						Surprise Me
					</button>
				)}
			</div>
			<input
				id={name}
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				required
				className='bg-gray-600 border border-gray-900 text-[#E9C46A] focus:ring-blue-500 focus:border-gray-400 text-sm rounded-lg outline-none block w-full p-3'
			/>
		</div>
	);
};

export default FormField;
