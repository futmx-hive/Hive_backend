import {
	Body,
	Controller,
	Get,
	ParseBoolPipe,
	ParseIntPipe,
	Post,
	Query,
} from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("")
	getHello(): string {
		return this.appService.getHello();
	}
	@Post()
	createGreeting(
		@Body("age", ParseIntPipe) greet: number,
		@Query("is_hungry", ParseBoolPipe) isHungry: boolean,
	) {
		console.log(typeof greet);
		return {
			greet,
			isHungry,
		};
	}
}

// mongodb+srv://<username>:<password>@benjs-cluster.udh1t.mongodb.net/?retryWrites=true&w=majority
// bIyhYuQZL5TK5Auj
