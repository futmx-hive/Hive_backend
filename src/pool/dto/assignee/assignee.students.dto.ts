import { IsNotEmpty, IsMongoId } from "class-validator";
import { degreeType } from "../../types";
import { Types } from "mongoose";

export class AssigneeStudentsPayload {
	@IsNotEmpty()
	@IsMongoId()
	"assignee_id": Types.ObjectId;

	@IsNotEmpty()
	@IsMongoId()
	"pool_id": degreeType;
}
