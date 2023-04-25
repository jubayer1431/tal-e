import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Posts = new Schema({
	name: {
		type: String,
		required: true,
	},
	prompt: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
});

const PostsModel = mongoose.model('Posts', Posts);

export default PostsModel;
