import localStore, { SPECIAL_KEY_NAMES } from "./localStore";

import axios from "axios";
export const base = {
	url: process.env.NODE_ENV === "development" ? "http://localhost:3002/api/v1/" : "https://myduka.co/webapi/",

	basicH: {
		"Content-Type": "application/json",
	},
	authHBasic() {
		return {
			...this.basicH,
			Authorization: `Bearer ${this.getToken()}`,
		};
	},
	authH() {
		return {
			...this.basicH,
			Authorization: `Bearer ${this.getToken()}`,
		};
	},
	getToken() {
		let token = localStore.getValueFromKey(SPECIAL_KEY_NAMES.TOKEN);

		// console.log(encodedToken);
		return token;
	},
	getMerchant() {
		const value = localStore.getValueFromKey("merchant");
		if (value) return JSON.parse(value);
		return false;
	},
	defaults: {},
	async makeReq(callback) {
		try {
			const data = await callback();
			return data;
		} catch (error) {
			throw error;
		}
	},

	doCRUD(endpoint, headers) {
		return async (data, crud = "create", key = "crud", addHeaders = {}) => {
			const { id, ...rest } = data;
			data = crud === "create" || crud === "Add" || crud === "save" ? rest : data;
			// console.log ({crud});
			if (key !== "crud") {
				Reflect.deleteProperty(data, "crud");
			}
			const url = `${base.url}${endpoint}`;
			return this.makeReq(async () =>
				axios.post(
					url,
					{ ...data, [key]: crud },
					{
						headers: headers
							? { ...headers(), ...addHeaders }
							: { ...this.authHBasic(), ...addHeaders },
					},
				),
			);
		};
	},
};
