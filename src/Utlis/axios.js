import axios from "axios"

export const fetchApi = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/question/',
	headers: { 'Content-Type': 'application/json' },
})
