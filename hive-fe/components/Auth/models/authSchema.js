import * as yup from "yup";

export const EmailPasswordlessSchema = yup.object().shape({
	email: yup.string().email(" this email is invalid").required("please enter an email"),
});
