import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const TypesenseCollectionNames: {
	[key: string]: {
		name: string;
		schema: CollectionCreateSchema;
	};
} = {
	PROJECT: {
		name: "project",
		schema: {
			fields: [
				{
					facet: true,
					index: true,
					name: "application_type",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "cloned_code_repo_url",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "code_repo_url",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "createdAt",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "description",
					optional: true,
					type: "string",
				},
				{
					facet: true,
					index: true,
					name: "isApproved",
					optional: true,
					type: "bool",
				},
				{
					facet: true,
					index: true,
					name: "month",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "owner",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "source_writeup",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "supervisor",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "title",
					optional: true,
					type: "string",
				},
				{
					facet: false,
					index: true,
					name: "updatedAt",
					optional: true,
					type: "string",
				},
				{
					facet: true,
					index: true,
					name: "year",
					optional: true,
					type: "int64",
				},
				{
					facet: false,
					index: true,
					name: "is_application",
					optional: true,
					type: "bool",
				},
			],
			name: "project",
		},
	},
};

export const generalSchema: (
	collName: string,
) => CollectionCreateSchema = p => ({
	fields: [{ name: ".*", type: "auto" }],
	name: p,
	default_sorting_field: "title",
});
