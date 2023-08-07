import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { getFirebaseApp } from "src/config/firebase/firebase";
import { getStorage } from "firebase-admin/storage";
import { ProjectDTO } from "src/project/dto/proj.dto";
import { docDetailsSuccess } from "src/documents/types";
import * as fs from "fs";
import * as path from "node:path";
import { v4 as uuidv4 } from "uuid";
import { Project } from "src/project/model/project.entity";
import { isUint32Array } from "util/types";

@Injectable()
export class FirebaseService {
	private readonly app = getFirebaseApp();
	async uploadProjectFile(
		id: string,
		markup: string,
		projectDetails: Project,
	) {
		const storage = getStorage(this.app);

		let isSuccess = false;
		const filePath: string = id + ".html";
		// path.join(__dirname,
		try {
			fs.writeFileSync(filePath, markup, {
				encoding: "utf-8",
			});
			//
			await storage.bucket().upload(filePath, {
				metadata: {
					contentType: "text/html",
				},
				destination: `projects/${projectDetails.year}/${projectDetails.category}/${id}`,
				public: true,
			});
			// console.log(res);
			isSuccess = true;
		} catch (error) {
			console.log(error);
		} finally {
			fs.unlinkSync(filePath);
			if (!isSuccess) {
				throw new UnprocessableEntityException(
					"failed to store document please check the docx file and try again",
				);
			}
			return {
				id,
				isSuccess,
			};
		}
	}

	generateFileId(title: string) {
		return new Uint32Array(Buffer.from(title.slice(5, 23), "utf-8")).join(
			"",
		);
		//
	}
}
