import Field from "@form-components/Field";
import PasswordField from "@form-components/PasswordField";
import CtaButton from "@sharedUi/CtaButton";
import Link from "next/link";
import React from "react";
import GoogleAuth from "../GoogleAuth";
import { useAuth } from "@components/Auth/context/AuthProvider";

function FormAuth({ isLogin, next }) {
	const { authForm, sendOtp } = useAuth();
	const { onChange, values, errors, formIsValid } = authForm;

	const handleSubmit = async (e) => {
		e.preventDefault();
		await sendOtp();
		next();
	};

	return (
		<>
			<GoogleAuth />
			<div className='hr mt-1'>
				<span className='col-gra-d'>Or with email</span>
			</div>
			<form action='' className='form_pkg' onSubmit={handleSubmit}>
				<Field
					label={"email *"}
					type='email'
					placeholder={"elon@st.futminna.edu.ng"}
					name={"email"}
					handleChange={onChange}
					value={values["email"]}
					error={errors["email"]}
				/>

				<div className='mt-1 grid'>
					<CtaButton buttonType='submit' design='btn_pri tablet' disabled={!formIsValid}>
						{isLogin ? "login" : " create account"}
					</CtaButton>
				</div>

				<AuthFormBaseContent isLogin={isLogin} />
			</form>
		</>
	);
}

export default FormAuth;
function AuthFormBaseContent({ isLogin }) {
	return (
		<div className='mt-2 center-flex flexi gap-15'>
			<span>{isLogin ? "Dont have an account?" : "Already have an account?"} </span>

			<a href={isLogin ? " /auth/signup" : "/auth/login"} className='btn_txt col-pri weit-2'>
				{isLogin ? " sign up" : "Login"}
			</a>
		</div>
	);
}
