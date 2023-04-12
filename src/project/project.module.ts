import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "./model/project.entity";
import { DocService } from "src/documents/document.service";
import { DefaultExtractor } from "src/documents/default-extractor.service";
import { FirebaseService } from "src/firebase/firebase.service";
import { OctokitModule } from "nestjs-octokit";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GithubService } from "src/github/github.service";
import { TypesenseService } from "src/typesense/typesense.service";
import { TypesenseClientService } from "src/typesense/typesenseclient.service";
import { SearchService } from "src/shared/search/search.service";
import { FirebaseFilesGuardianService } from "src/firebase/filesguardian.service";

import { LeapImageGenerator } from "src/image-generators/lisp/services/leap-image-generator.service";
import { LeapClient } from "src/image-generators/lisp/leap-client";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Project.name, schema: ProjectSchema },
		]),
		OctokitModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				octokitOptions: {
					auth: configService.getOrThrow<string>(
						"GITHUB_ACCESS_TOKEN",
					),
				},
			}),
		}),
	],
	providers: [
		ProjectService,
		DocService,
		DefaultExtractor,
		FirebaseService,
		GithubService,
		TypesenseService,
		TypesenseClientService,
		SearchService,
		FirebaseFilesGuardianService,
		LeapClient,
		LeapImageGenerator,
	],
	controllers: [ProjectController],
})
export class ProjectModule {}
