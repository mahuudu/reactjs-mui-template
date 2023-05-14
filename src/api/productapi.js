import axiosClientNode from "./axiosClientNode";


const productApi = {
	getAll(params){
		const url = '/sp';
		return axiosClientNode.get(url,{ params });
	},
	get(id){
		const url = `/category/${id}`;
		return axiosClientNode.get(url);
	},
	add(data){
		const url = '/category';
		return axiosClientNode.post(url, data);
	},
	update(data){
		const url = `/category/${data.id}`;
		return axiosClientNode.path(url, data);
	},
	remove(id){
		const url = `/category/${id}`;
		return axiosClientNode.delete(url);
	},
}


export default productApi;