import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from 'features/user/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    closeDialog : PropTypes.func,
};


function Register(props) {
    const  dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values) =>{
        
        try{
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            const  {closeDialog} = props;
            
            if(closeDialog){
                closeDialog();
            }
            enqueueSnackbar('Register Sussces', {variant: 'success'});
        }catch(err){
            console.log(err);
            enqueueSnackbar(err.message, {variant: 'error'});
        }
 
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;