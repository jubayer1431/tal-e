// file-saver
import { saveAs } from 'file-saver';

export const downloadImage = async (id, img) => {
	saveAs(img, `image-${id}.png`);
};

import { surpriseMePrompts } from './constants';

export const getRandomPrompt = (prompt) => {
	const promptIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const newPrompt = surpriseMePrompts.at(promptIndex);
	return newPrompt === prompt ? getRandomPrompt(prompt) : newPrompt;
};
