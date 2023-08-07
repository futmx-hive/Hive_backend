import axios from "axios";

export default async function handler(req, res) {
	if (!/hive/i.test(req.query?.temp_url)) {
		res.status(500).json({ message: "url has issues" });
	}
	const data = await axios.get(req.query.temp_url);

	res.status(200).json(data.data);
}
