import { Injectable, Inject, NotFoundException } from "@nestjs/common";

import { getFirebaseApp } from "src/config/firebase/firebase";
import { Project } from "src/project/model/project.entity";

@Injectable()
export class FirebaseFilesGuardianService {
	private readonly app = getFirebaseApp();
	async getSignedFileURL(project: Project, folder = "projects") {
		const path = `projects/${project.year}/${
			project.class || "undergraduate"
		}/${project.source_writeup}`;
		if (!(await this.app.storage().bucket().file(path).exists())) {
			throw new NotFoundException();
		}
		const [URL] = await this.app
			.storage()
			.bucket()
			.file(path)
			.getSignedUrl({
				expires: 1000 * 60 * 60 * 24 + new Date().getTime(),
				action: "read",
				responseType: "text/html",
				responseDisposition: "inline",
			});

		return URL;
	}
}
