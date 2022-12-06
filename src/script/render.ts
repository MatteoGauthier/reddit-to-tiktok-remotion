import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia } from '@remotion/renderer';
import path from 'path';
import videosData from '../../data/videos.json';
import { RedditTiktokTestProps } from '../compositions/RedditTiktokTest';

const renderOne = async (
	redditVideo: RedditTiktokTestProps,
	bundleLocation: string,
	compositionId: string,
	entry: string
) => {
	// Parametrize the video by passing arbitrary props to your component.

	// Extract all the compositions you have defined in your project
	// from the webpack bundle.
	const comps = await getCompositions(bundleLocation, {
		// You can pass custom input props that you can retrieve using getInputProps()
		// in the composition list. Use this if you want to dynamically set the duration or
		// dimensions of the video.
		inputProps: redditVideo,
	});

	// Select the composition you want to render.
	const composition = comps.find((c) => c.id === compositionId);

	// Ensure the composition exists
	if (!composition) {
		throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entry}" for the correct ID.`);
	}

	const currentDate = new Date().toISOString().split('T')[0];
	const outputLocation = `out/${currentDate}_${redditVideo.id}.mp4`;
	console.log('⏳ Attempting to render:', outputLocation);
	const startTimer = performance.now();

	await renderMedia({
		composition,
		serveUrl: bundleLocation,
		codec: 'h264',
		outputLocation,
		inputProps: redditVideo,
		imageFormat: 'jpeg',
		quality: 75,
		overwrite: true,
		concurrency: 6,
	});
	const stopTimer = performance.now();

	const inSeconds = (stopTimer - startTimer) / 1000;
	const rounded = Number(inSeconds).toFixed(3);
	console.log(`✅ Render done in ${rounded}s!`);
};

async function start() {
	const startTimer = performance.now();

	// The composition you want to render
	const compositionId = 'RedditTiktokTest';

	// You only have to do this once, you can reuse the bundle.
	const entry = 'src/index.ts';
	console.log('🔧 Creating a Webpack bundle of the video');

	const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
		// If you have a Webpack override, make sure to add it here
		webpackOverride: (config) => config,
	});

	for (const element of videosData) {
		await renderOne(element, bundleLocation, compositionId, entry);
	}

	const stopTimer = performance.now();

	const inSeconds = (stopTimer - startTimer) / 1000;
	const rounded = Number(inSeconds).toFixed(3);
	console.log(`🎉 All videos have been rendered in ${rounded}s!`);
}

start();
