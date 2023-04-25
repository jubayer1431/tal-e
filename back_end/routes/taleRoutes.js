import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello TAL-E!');
});

router.route('/').post(async (req, res) => {
	try {
		const { prompt } = req.body;
		const response = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
			response_format: 'b64_json',
		});
		const img = await response.data.data.at(0).b64_json;

		res.status(200).json({ img });
	} catch (error) {
		res.status(500).json({ error });
	}
});
export default router;
