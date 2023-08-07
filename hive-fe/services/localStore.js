export const SPECIAL_KEY_NAMES = {
	TOKEN: "__#_+QWWHSDLNNALDYYEQO_FRISK_ID",
};

export default class StorageService {
	static setKey(key, value) {
		// if (typeof value === 'object') value = JSON.stringify (value);
		// console.log ({vluueeee: value});
		localStorage.setItem(key, value);
	}
	static removeKey(key) {
		localStorage.removeItem(key);
	}
	static clearStorage() {
		localStorage.clear();
	}
	static getValueFromKey(key) {
		return localStorage.getItem(key);
	}
}
