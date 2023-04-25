import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField, Loader } from './../../components';
import { preview } from '../../assets';
import { getRandomPrompt } from '../../utils';

const CreatePost = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		prompt: '',
		img: '',
	});
	const [generatingImg, setGeneratingImg] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSurpriseMe = (e) => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	};

	const handleGenerateImage = async (e) => {
		if (form.prompt) {
			try {
				setGeneratingImg(true);

				const response = await fetch('http://localhost:8080/api/v1/tale', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ prompt: form.prompt }),
				});

				const data = await response.json();
				setForm({ ...form, img: `data:image/jpeg;base64,${data.img}` });
			} catch (error) {
				console.log(error);
			} finally {
				setGeneratingImg(false);
			}
		} else {
			alert('Please Enter a Prompt');
		}
	};

	const handleShare = async (e) => {
		e.preventDefault();

		if (form.name && form.prompt) {
			try {
				setLoading(true);
				const res = await fetch('http://localhost:8080/api/v1/posts/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(form),
				});

				await res.json();
				navigate('/');
			} catch (error) {
				alert(error);
			} finally {
				setLoading(false);
			}
		} else {
			alert('Enter a prompt and generate an image first');
		}
	};

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-gray-50 text-[32px]'>Create</h1>
				<p className='mt-2 text-gray-300 text-[16px] max-w-lg'>
					Create imaginative and visually stunning images generated by DALL-E AI
					and share them with the community
				</p>
			</div>
			<form action='' className='mt-16 max-w-3xl'>
				<div className='flex flex-col gap-5'>
					<FormField
						labelName='Your Name'
						name='name'
						type='text'
						placeholder='John Smith'
						value={form.name}
						handleChange={handleChange}
					/>
					<FormField
						labelName='Prompt'
						name='prompt'
						type='text'
						placeholder='"a sea otter with a pearl earring" by Johannes Vermeer'
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>
					<div className='relative bg-gray-900 border border-gray-600 text-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-64 w-64 flex justify-center items-center'>
						{form.img ? (
							<img
								className='h-full w-full object-contain'
								src={form.img}
								alt={form.prompt}
							/>
						) : (
							<img
								src={preview}
								alt='preview'
								className='h-full w-9/12 object-contain opacity-40'
							/>
						)}

						{generatingImg && (
							<div className=' absolute flex justify-center items-center inset-0 z-0 bg-gray-100 opacity-50'>
								<Loader />
							</div>
						)}
					</div>
				</div>
				<div className='mt-5 flex gap-5'>
					<button
						type='button'
						className=' px-3 py-2 border border-transparent rounded-md shadow-sm text-xs font-semibold text-white text-center bg-green-700 hover:bg-green-800 focus:bg-green-800 focus:outline-none w-full sm:w-auto'
						onClick={handleGenerateImage}
					>
						{generatingImg ? 'Generating...' : 'Generate'}
					</button>
				</div>
				<div className='mt-10'>
					<p className='mt-2 text-[14px] text-gray-300'>
						Once you have created the image you want, you can share it with
						others in the community
					</p>
					<button
						type='submit'
						className='mt-3 px-3 py-2 border border-transparent rounded-md shadow-sm text-xs font-semibold text-white text-center bg-violet-800 hover:bg-violet-900 focus:bg-violet-900 focus:outline-none w-full sm:w-auto'
						onClick={handleShare}
					>
						{loading ? 'Sharing' : 'Share with the community'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default CreatePost;
