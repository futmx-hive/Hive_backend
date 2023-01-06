export interface RepositoryService {
	forkRepo(repoName: string, orgToCloneTo: string): void;
	getRepoData(repoURL: string): object;
}
