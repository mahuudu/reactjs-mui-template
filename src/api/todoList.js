import axiosClient from './axiosClient';

const todoListApi = {
	getAll(){
		const url = `/todolist/List`;
		return axiosClient.get(url);
	},
	getbyId(id){
		const url = `/todolist/${id}`;
		return axiosClient.get(url);
	},
	add(data){
		const url = '/todolist';
		return axiosClient.post(url, data);
	},
	update(data){
		const url = `/todolist/${data.id}`;
		return axiosClient.path(url, data);
	},
	remove(id){
		const url = `/todolist/${id}`;
		return axiosClient.delete(url);
	},
}


export default todoListApi;