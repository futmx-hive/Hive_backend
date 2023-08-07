const path = require("path");
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.resolve(__dirname, "styles")],
	},
	redirects() {
		return [
			{
				source: "/",
				destination: "/home",
				permanent: false,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/settings",
				destination: "/settings/profile",
			},
		];
	},
};

module.exports = nextConfig;
