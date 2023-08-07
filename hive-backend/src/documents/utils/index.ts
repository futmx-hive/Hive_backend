const monthRegexp = () =>
	/(january|february|march|april|may|june|july|august|september|november|december).*(\d{4})/gi;
export function matchedDate(text: string) {
	return {
		data: monthRegexp().exec(text),
		matched: monthRegexp().test(text),
	};
}
