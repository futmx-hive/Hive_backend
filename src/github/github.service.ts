import {
	BadRequestException,
	Injectable,
	UnprocessableEntityException,
} from "@nestjs/common";
import { OctokitService } from "nestjs-octokit";
import { fullProject } from "src/documents/types";

@Injectable()
export class GithubService {
	constructor(private readonly OctoClient: OctokitService) {}
	extractRepoOwnerDetails(repoURI: string): {
		owner: string;
		repoName: string;
	} {
		const [owner, repoName] = repoURI
			.replace(/(https:\/\/)?github.com\//gi, "")
			.split(/\//);
		if (!owner || !repoName) {
			throw new BadRequestException(
				"error occured while processing repo uri",
			);
		}
		return {
			owner,
			repoName,
		};
	}

	generateRepoName(fullProj: fullProject, oldrepoName: string) {
		const { docDetails, projectDetails } = fullProj;
		return `${projectDetails.category.charAt(0)}_${
			docDetails.owner.matric_no
		}_${oldrepoName}`;
	}
	async cloneRepo(
		repoURI: string,
		newRepoName: string,
		organization = "futmx-hive",
	) {
		const { owner, repoName } = this.extractRepoOwnerDetails(repoURI);
		try {
			const res = await this.OctoClient.request(
				"POST /repos/{owner}/{repo}/forks",
				{
					owner,
					repo: repoName,
					organization,
					name: newRepoName,
				},
			);
			return res.data;
		} catch (error) {
			throw new UnprocessableEntityException(
				"error ocuured while processing repo url",
			);
		}
	}
}
