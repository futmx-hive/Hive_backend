export enum Roles {
	SUPER_ADMIN = 10,
	SUPERVISOR = 4,
	STUDENT = 3,
	BASIC = 1,
}

export type connectionTypes = "passwordless" | "sso-google";

export type TokenPayload = {
	sub: string;
	nonce: string;
	email: string;
};
