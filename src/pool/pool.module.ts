import { Module } from "@nestjs/common";
import { PoolController } from "./pool.controller";
import { PoolService } from "./pool.service";

@Module({
	imports: [],
	providers: [PoolService],
	controllers: [PoolController],
})
export class PoolModule {}
