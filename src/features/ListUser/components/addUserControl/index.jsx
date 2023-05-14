import listUserApi from 'api/listUserApi';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import AddUserForm from '../addUserForm';

UserControl.propTypes = {
    closeDialog : PropTypes.func,
};


function UserControl(props) {
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values) =>{
        console.log('control',values);
        const file = values.picture[0];
        try{
            let url = "http://localhost:8000/codein/api/upload/";
            uploadFile(url, file);
            insertData(values);
            const  {closeDialog} = props;
            if(closeDialog){
                closeDialog();
            }
            enqueueSnackbar('UserControl Sussces', {variant: 'success'});
        }catch(err){
            console.log(err);
            enqueueSnackbar(err.message, {variant: 'error'});
        }
    }

    const uploadFile = (url, file) => {
        let formData = new FormData();
        formData.append("file", file);
        axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);
          });
      };
    
      const insertData = async (values) => {
        const response  = await listUserApi.addUser(values);
        console.log(response);
      }



    return (
        <div>
            <AddUserForm onSubmit={handleSubmit} />
        </div>
    );
}

export default UserControl;