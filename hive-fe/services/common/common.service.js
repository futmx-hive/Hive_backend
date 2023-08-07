import axios from 'axios';
import base from '../config';

export default class Common {
	static async getCountries() {
		const url = `${base.url}CountryDetails`;
		return axios.get(url);
	}
	static async getBanks(countryCode) {
		const url = `${base.url}BankNames/?country=${countryCode}`;
		return axios.get(url);
	}
	static async getTimeUnits() {
		const url = `${base.url}SokoList/?list=timeUnit`;
		return axios.get(url);
	}
	static async getList(listname) {
		const url = `${base.url}SokoList/?list=${listname}`;
		return axios.get(url);
	}
}
