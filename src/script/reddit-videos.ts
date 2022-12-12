import fetch from 'isomorphic-unfetch';
import fs from 'fs/promises';

const subredditUrl =
	'https://www.reddit.com/r/IdiotsInCars/top.json?sort=top&t=day';

async function getPosts() {
	const result = [];
	// Make the GET request to the Reddit API using the fetch API
	const response = await fetch(subredditUrl);
	const json = await response.json(); // Parse the JSON response

	// Loop through the posts and return the video URLs
	const posts = json.data.children;
	for (const post of posts) {
		const { data } = post;
		if (data.media && data.media.reddit_video) {
			const video = data.media.reddit_video.fallback_url;
			// console.log(data.media);

			const audioUrl = `${
				video.match(/^(https?:\/\/[^/]+\/)([^/]+)/)[0]
			}/DASH_audio.mp4`;

			const hasAudio = await fetch(audioUrl).then((res) => res.status === 200);
			result.push({
				videoUrl: video,
				audioUrl: hasAudio ? audioUrl : undefined,
				title: data.title,
				id: `${data.subreddit}-${data.id}${hasAudio ? '' : '-no-audio'}`,
			});
		}
	}
	return result;
}

async function main() {
	const videos = await getPosts();
	await fs.writeFile('./data/videos.json', JSON.stringify(videos));

	console.log('[SCRIPT] Reddit videos successfully fetched!');
}

main();
