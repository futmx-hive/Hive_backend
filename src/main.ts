import { ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./shared/errors/global.filter";
// glpat-JvHxnQFn2GrnVdgP-JD3

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableVersioning({
		type: VersioningType.URI,
	});

	const port = app.get(ConfigService).get<number>("PORT");
	app.setGlobalPrefix("/api/v1/");
	app.use(helmet());
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(port);
}
bootstrap();
