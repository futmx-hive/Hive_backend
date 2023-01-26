import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProjectModule } from "./project/project.module";
import { validateENV } from "./config/validate.pipe";
import { MongooseModule } from "@nestjs/mongoose";
import databaseConfig from "./config/database/database.config";
import { DatabaseProvider } from "./config/database/database.config.provider";
import { SearchModule } from "./shared/search/search.module";
import { AuthModule } from "./auth/auth.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { ProfileModule } from "./profile/profile.module";
import { StudentModule } from "./student/student.module";
import { UtilsService } from "./utils";
import { PoolModule } from "./pool/pool.module";

@Module({
	imports: [
		PoolModule,

		StudentModule,

		ProfileModule,

		BookmarkModule,

		ConfigModule.forRoot({
			isGlobal: true,
			validate: validateENV,
			load: [databaseConfig],
		}),
		MongooseModule.forRootAsync({
			useClass: DatabaseProvider,
		}),
		ProjectModule,
		SearchModule,
		AuthModule,
	],
	providers: [UtilsService],
	exports: [UtilsService],
})
export class AppModule {}
