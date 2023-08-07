// import { Injectable, NestInterceptor, ExecutionContext } from "@nestjs/common";
// import { Observable } from "rxjs";
// import { tap } from "rxjs/operators";
// import * as mongoose from "mongoose";

// @Injectable()
// export class InjectSessionInterceptor implements NestInterceptor {
// 	async intercept(context: ExecutionContext, call: Observable<any>) {
// 		const req = context.switchToHttp().getRequest();
// 		req.session = await mongoose.startSession();
// 		req.session.startTransaction();
// 		try {
// 			return call.pipe(null, null, async () => {
// 				await req.session.commitTransaction();
// 				req.session.endSession();
// 			});
// 		} catch (error) {
// 			await req.session.abortTransaction();
// 			req.session.endSession();
// 			throw error;
// 		}
// 	}
// }
