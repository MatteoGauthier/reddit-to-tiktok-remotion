import { getVideoMetadata } from '@remotion/media-utils';
import { useEffect, useState } from 'react';
import {
  Composition,
  continueRender,
  delayRender
} from 'remotion';
import { RedditTiktokTest } from '../compositions/RedditTiktokTest';

const defaultProps = {
	videoUrl: 'https://v.redd.it/acuptup2we4a1/DASH_1080.mp4?source=fallback',
	audioUrl: 'https://v.redd.it/acuptup2we4a1/DASH_audio.mp4',
	title: 'for being distracted watching the chaos that happened last night',
	id: 'IdiotsInCars-zde88x',
};
export const DebugRoot: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const [duration, setDuration] = useState(1);

	useEffect(() => {
		getVideoMetadata(defaultProps.videoUrl)
			.then(({ durationInSeconds }) => {
				setDuration(Math.round(durationInSeconds * 30));
				continueRender(handle);
			})
			.catch((err) => {
				console.log(`Error fetching metadata: ${err}`);
			});
	}, [handle]);

	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="RedditTiktokTest-debug"
				component={RedditTiktokTest}
				durationInFrames={duration}
				fps={30}
				width={1080}
				height={1920}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				defaultProps={defaultProps}
			/>
		</>
	);
};
