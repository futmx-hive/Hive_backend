import Document, { Head, Html, NextScript, Main } from "next/document";

export default class MyDocx extends Document {
	render() {
		return (
			<Html>
				<Head>
					<script src='https://accounts.google.com/gsi/client' async defer />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
