import AuthFormMain from "@components/Auth/Components/Forms/AuthFormMain";
import SignUpForm from "@components/Auth/Components/Forms/SignUpForm";
import HeadText from "@components/Auth/Components/HeadText";
import MainAuthLayout from "@components/Auth/Components/Layout/MainAuthLayout";
import Script from "next/script";

function signup() {
	return (
		<MainAuthLayout>
			<Script src='https://accounts.google.com/gsi/client' async />
			<SignUpForm />
		</MainAuthLayout>
	);
}

export default signup;

export async function getServerSideProps(context) {
	return {
		props: {}, // will be passed to the page component as props
	};
}
