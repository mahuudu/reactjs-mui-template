import axios from 'axios';


const axiosClientNode = axios.create({
	baseURL : 'http://localhost:6300/',
	headers:{
		'Content-Type' : 'application/json',
	},
});

// Add a request interceptor
axiosClientNode.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClientNode.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // const { config, status, data } = error.response;
    // console.log('sendata',error.response);
    // if(config.url === 'accounts:signUp?key=AIzaSyBO4K6dfoVOYAj4XsNlq0i6-KoxTL4SQnM' && status === 400){
    //   const errorList = data.error.message;
    //   throw new Error(errorList);
    // }

    return Promise.reject(error);
  });


export default axiosClientNode;