// This is your entry file! Refer to it when you render:
// npx remotion render <entry-file> HelloWorld out/video.mp4

import { registerRoot } from 'remotion';
import { DebugRoot } from './roots/Debug';

registerRoot(DebugRoot);
