const axios = require("axios");

const json = { votes: { "face of 100": "2021/1/80416AE" }, user: "2016/1/59409ci" };

for (let i = 0; i < 100; i++) {
	const rand = Math.random().toString().slice(2, 7);
	json.user = json.user.replace(/\d{5}/, rand);
	axios.post("https://sauce-votify.vercel.app/api/voters", json)
		.then((response) => console.log(`API call ${i + 1} status: ${response.status}`))
		.catch((error) => console.error(`API call ${i + 1} error: ${error}`));
}
