import LoginForm from "@components/Auth/Components/Forms/LoginForm";
import MainAuthLayout from "@components/Auth/Components/Layout/MainAuthLayout";
import Script from "next/script";
import React from "react";

function login() {
	return (
		<MainAuthLayout>
			<Script src='https://accounts.google.com/gsi/client' async />
			<LoginForm />
		</MainAuthLayout>
	);
}

export default login;
