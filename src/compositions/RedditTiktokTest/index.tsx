import { Audio } from 'remotion';
import { AbsoluteFill, useVideoConfig, Video } from 'remotion';

const offset = 400;

export type RedditTiktokTestProps = {
	videoUrl: string;
	audioUrl?: string;
	title: string;
	id: string;
};

export const RedditTiktokTest: React.FC<RedditTiktokTestProps> = ({
	videoUrl,
	audioUrl,
}) => {
	const { width, height } = useVideoConfig();

	return (
		<>
			<AbsoluteFill style={{ backgroundColor: 'black' }}>
				<Video
					style={{
						width: width + offset,
						height: height + offset,
						// marginLeft: -(offset / 2),
						// marginTop: -(offset / 2),
						objectFit: 'cover',
						filter: 'blur(20px)',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
					src={videoUrl}
				/>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
				}}
			>
				<Video style={{ width: '100%' }} src={videoUrl} />
			</AbsoluteFill>
			{audioUrl ? <Audio src={audioUrl} /> : null}
		</>
	);
};
