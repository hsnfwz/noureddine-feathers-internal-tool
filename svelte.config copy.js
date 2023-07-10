import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { resolve } from 'path';

const config = {
  preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			'$components': resolve('./src/components/'),
			'$interfaces': resolve('./src/interfaces/'),
			'$stores': resolve('./src/stores/'),
			'$config': resolve('./src/config/'),
			'$api': resolve('./src/api/'),
			'$helpers': resolve('./src/helpers/'),
    }
	},
};

export default config;