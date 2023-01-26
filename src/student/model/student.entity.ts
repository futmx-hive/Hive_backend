import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "src/auth/model/user.entity";
import { Project } from "src/project/model/project.entity";

export type StudentDoc = Student & Document;
@Schema({
	toJSON: {
		getters: true,
		virtuals: true,
	},
	toObject: {
		getters: true,
		virtuals: true,
	},
	timestamps: true,
})
export class Student {
	@Prop({
		index: true,
		unique: true,
		uppercase: true,
		validate: {
			validator: function (value: string) {
				return /^\d{4}\/\d{1}\/\d{5}[A-Z]{2}$/i.test(value);
			},
		},
	})
	matric_no?: string;

	@Prop({
		index: true,
		required: true,
		validate: {
			validator: function (value: string) {
				return /^m\d{7}$/i.test(value);
			},
		},
	})
	exam_num?: string;

	@Prop({ type: [{ type: Types.ObjectId, ref: Project.name }] })
	projects?: Array<Types.ObjectId>;
	@Prop({ type: Types.ObjectId, ref: UserEntity.name, required: true })
	owner: Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
StudentSchema.virtual("projects_count").get(function (this: StudentDoc) {
	return this.projects.length;
});
StudentSchema.virtual("department").get(function (this: StudentDoc) {
	return /\w{2}$/gi.exec(this.matric_no)[0];
});
