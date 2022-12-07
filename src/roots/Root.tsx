import { getVideoMetadata } from '@remotion/media-utils';
import { useEffect, useState } from 'react';
import {
	Composition,
	continueRender,
	delayRender,
	getInputProps,
} from 'remotion';
import { RedditTiktokTest } from '../compositions/RedditTiktokTest';

const { videoUrl, audioUrl, title, id } = getInputProps();

export const RemotionRoot: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const [duration, setDuration] = useState(1);

	useEffect(() => {
		getVideoMetadata(videoUrl)
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
				id="RedditTiktokTest"
				component={RedditTiktokTest}
				durationInFrames={duration}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					videoUrl,
					audioUrl,
					title,
					id,
				}}
			/>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="RedditTiktokTest-debug"
				component={RedditTiktokTest}
				durationInFrames={694}
				fps={30}
				width={1080}
				height={1920}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				defaultProps={{
					videoUrl:
						'https://v.redd.it/zwq4heg7c44a1/DASH_720.mp4?source=fallback',
					audioUrl: 'https://v.redd.it/zwq4heg7c44a1/DASH_audio.mp4',
					title:
						'for being distracted watching the chaos that happened last night',
					id: 'IdiotsInCars-zde88x',
				}}
			/>
		</>
	);
};
