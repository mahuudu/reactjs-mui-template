
import axiosClient2 from './axiosClient2';


const listUserApi = {
	async addUser(data){
		const url = 'insert/';
		const parameter = {
			user_name: data.email,
			full_name: data.fullname,
			password : data.password,
			birth_of_day : data.todayDate,
			avatar : data.avatar,
		};
		return  await axiosClient2.post(url, parameter);
	},
	async getbyId(id){
		const url = `fetchSingle/`;
		const parameter = {
			id : id
		}
		return  await axiosClient2.post(url,parameter);
	},
	async updateUser(data){
		const url = 'updateUser/';
		const parameter= {
			id : data.id,
			user_name: data.username,
			full_name: data.fullname,
			password : data.password,
			birth_of_day : data.birth_of_day,
			avatar : data.avatar,
		};

		return  await axiosClient2.post(url, parameter);
	},

	async deleteUser(data){
		const url = 'deleteUser/';
		const parameter= {
			id : data,
		};
		return  await axiosClient2.post(url, parameter);
	},




}


export default listUserApi;