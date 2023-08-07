import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { basicErrorResponse } from "./types/error_types";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		try {
			if (!("getStatus" in exception)) {
				const res: basicErrorResponse = {
					success: false,
					status: "error",
					message: "internal server error",
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				};
				return response
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json(res);
			}
		} catch (error) {
			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				success: false,
				status: "error",
				message: "internal server error",
			});
		}
		const status = exception?.getStatus() || 500;
		const message = exception?.getResponse();
		console.log(message);
		const res: { message: basicErrorResponse } = {
			message: {
				statusCode: status,
				success: false,
				status: "error",
			},
		};
		if (typeof message === "object") {
			res.message = { ...res.message, ...message };
		}
		if (typeof message === "string") {
			res.message = { ...res.message, message };
		}
		response.status(status).json(res.message);
	}
}
