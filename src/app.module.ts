import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProjectModule } from "./project/project.module";
import { validateENV } from "./config/validate.pipe";
import { MongooseModule } from "@nestjs/mongoose";
import databaseConfig from "./config/database/database.config";
import { DatabaseProvider } from "./config/database/database.config.provider";
import { SearchModule } from "./shared/search/search.module";

@Module({
	imports: [
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
	],
})
export class AppModule {}
