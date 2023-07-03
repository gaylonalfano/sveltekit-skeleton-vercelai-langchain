// import adapter from '@sveltejs/adapter-vercel';
import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// Q: Do I need to specify the adapter.runtime to node in order to get streaming to work???
		// U: Don't think it makes a difference...
		// U: You can have the whole app have runtime: 'edge',
		// or you can configure per route.
		// REF: https://kit.svelte.dev/docs/adapter-vercel#deployment-configuration
		adapter: adapter()
		// adapter: adapter({
		//   runtime: 'nodejs18.x'
		// })
	}
};

export default config;
