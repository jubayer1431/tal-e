import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import PostsModel from './../mongodb/models/posts.js';

dotenv.config();
const router = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
	try {
		const posts = await PostsModel.find();
		res.status(200).json({
			success: true,
			data: posts,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error,
		});
	}
});

router.route('/').post(async (req, res) => {
	try {
		const { name, prompt, img } = req.body;
		const cloudinaryImageURL = await cloudinary.uploader.upload(img);

		const newPost = await PostsModel.create({
			name,
			prompt,
			img: cloudinaryImageURL.secure_url,
		});

		res.status(201).json({
			success: true,
			data: newPost,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error,
		});
	}
});

export default router;
