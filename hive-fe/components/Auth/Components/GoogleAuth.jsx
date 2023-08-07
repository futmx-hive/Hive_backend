import React from "react";
import Script from "next/script";

export default function GoogleAuth() {
	const handleGoogleLogin = (chunk) => {
		console.log(chunk);
	};
	return (
		<>
			<div
				id='g_id_onload'
				data-client_id='56946969477-ktkhb2tclijvblks2jb1skb3a1hapd4c.apps.googleusercontent.com'
				data-context='signin'
				data-ux_mode='popup'
				data-callback='handleGoogleLogin'
				data-auto_select='true'
				data-itp_support='true'
			></div>

			<div
				className='g_id_signin'
				data-type='standard'
				data-shape='pill'
				data-theme='filled_blue'
				data-text='signin_with'
				data-size='large'
				data-logo_alignment='left'
			></div>
		</>
	);
}
