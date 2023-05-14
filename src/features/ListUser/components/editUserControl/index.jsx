import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import listUserApi from 'api/listUserApi';
import EditUserForm from '../editUserForm';

EditUserControl.propTypes = {
    idUser :PropTypes.string,
    closeDialog : PropTypes.func,
};


function EditUserControl(props) {
    
    const idRevice = props.idUser;

    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values, isUpload) =>{

          try{
            //isupload 
            if(isUpload){
              const file = values.file[0];
              const filename = values.file[0]['name'];
              const data = {...values, avatar : filename };
              const fileDelete = values['avatar'];

              uploadFile(file);
              deleteFile(fileDelete);
              updateData(data);

            }else{
                 updateData(values);
            }

            const  {closeDialog} = props;
            if(closeDialog){
                  closeDialog();
            }
            enqueueSnackbar('EditUserControl Sussces', {variant: 'success'});

          }catch(err){
              console.log(err);
              enqueueSnackbar(err.message, {variant: 'error'});
          }
      


    }


    const uploadFile = (file) => {
        let url = "http://localhost:8000/codein/api/upload/";
        let formData = new FormData();
        formData.append("file", file);
        axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((response) => {
            console.log('upload',response);
          }).catch((error) => {
            console.log(error);
          });
      };


    const deleteFile = (fileName) => {
      let url = "http://localhost:8000/codein/api/deleteFile/";

      const file = {
        fileName : fileName,
      }

      axios.post(url, file, {
        headers: {
          'Content-Type' : 'application/json',
        },
      }).then((response) => {
        console.log('delete',response);
      }).catch((error) => {
        console.log(error);
      });

    }
    
      const updateData = async (values) => {
        const response  = await listUserApi.updateUser(values);
        console.log(response);
      }



    return (
        <div>
            <EditUserForm onSubmit={handleSubmit} idUser={idRevice}/>
        </div>
    );
}

export default EditUserControl;