import axios, { Axios } from "axios";

export const client = axios.create({
	baseURL: `http://localhost:4000/api/v1/`,
	transformRequest: [...axios.defaults.transformRequest],
	transformResponse: [...axios.defaults.transformRequest, (data, headers) => ({ ...JSON.parse(data) })],
});
