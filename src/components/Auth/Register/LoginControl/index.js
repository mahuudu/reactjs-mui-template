import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login, register } from 'features/user/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';

LoginControl.propTypes = {
    closeDialog : PropTypes.func,
};


function LoginControl(props) {
    const  dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values) =>{
    
        try{
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            const  {closeDialog} = props;
            
            if(closeDialog){
                closeDialog();
            }
            enqueueSnackbar('Sussces', {variant: 'success'});
        }catch(err){
            console.log(err);
            enqueueSnackbar(err.message, {variant: 'error'});
        }
 
    }

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default LoginControl;