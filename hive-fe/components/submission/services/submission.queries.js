import { useQuery, useMutation } from "@tanstack/react-query";
import { Submission } from "./submission.service";

export function useSubmitChapters() {
	useMutation(Submission.submitChapters);
}
