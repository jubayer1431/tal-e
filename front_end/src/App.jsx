import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { logo } from './assets';
import { CreatePost, Home } from './pages';
const App = () => {
	return (
		<BrowserRouter>
			<header className='w-full flex justify-between items-center bg-gray-900 px-4 sm:px-8 py-4'>
				<Link to={'/'}>
					<img src={logo} alt='Logo' className='w-28 object-contain' />
				</Link>
				<Link to={'/create-post'}>
					<button className=' font-inter font-medium text-white px-4 py-2 rounded-md shadow-sm  bg-violet-800 hover:bg-violet-900 focus:bg-violet-900 focus:outline-none'>
						Create
					</button>
				</Link>
			</header>
			<main className='sm:p-8 px-4 py-8 w-full bg-gray-950 min-h-[calc(100vh-73px)]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/create-post' element={<CreatePost />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
