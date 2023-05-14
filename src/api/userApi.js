// import axios from 'axios';
import axiosClient from './axiosClient';


const userApi = {
	async register(data){
		const url = 'accounts:signUp?key=AIzaSyBO4K6dfoVOYAj4XsNlq0i6-KoxTL4SQnM';
		
		const dataSend = {
			email: data.email,
			password: data.confirmPassword,
			returnSecureToken: true,
		};

		return  await axiosClient.post(url, dataSend);

	},
	async login(data){
		const url = 'accounts:signInWithPassword?key=AIzaSyBO4K6dfoVOYAj4XsNlq0i6-KoxTL4SQnM';
		
		const dataSend = {
			email: data.email,
			password: data.password,
			returnSecureToken: true,
		};

		return  await axiosClient.post(url, dataSend);

	}



}


export default userApi;