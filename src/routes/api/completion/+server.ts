import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Config } from '@sveltejs/adapter-vercel';

// NOTE: I'm experimenting with vercel ai, adapter-vercel
// just for this single route to use runtime: 'edge', etc.
// U: No luck. Need to step away (again) as I continue to have
// issues with vercel ai + edge functions etc.

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAIApi(
	new Configuration({
		apiKey: OPENAI_API_KEY
	})
);

// Set the runtime to edge for best performance
// Q: Can/should I configure adapter-vercel locally
// to this route?
// REF: https://kit.svelte.dev/docs/adapter-vercel#deployment-configuration
// Original:
export const runtime = 'edge';
// Edits:
// export config: Config = {
//   runtime: 'edge'
// }

export async function POST({ request }) {
	const { prompt } = await request.json();

	// Ask OpenAI for a streaming completion given the prompt
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		stream: true,
		temperature: 0.6,
		prompt: `Create three slogans for a business with unique features.
 
Business: Bookstore with cats
Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
Business: Gym with rock climbing
Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
Business: ${prompt}
Slogans:`
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream);
}
