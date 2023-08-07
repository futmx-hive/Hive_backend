import * as yup from "yup";
export const projectTypes = ["masters", "undergraduate", "PHD"];
export const uploadOptionsSchema = yup.object().shape({
	category: yup.number("specify project type").required("project type is required").min(0).max(2),
});
