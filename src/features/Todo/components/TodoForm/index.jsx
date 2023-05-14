import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../form-control';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


TodoForm.propTypes = {
    onSubmit : PropTypes.func,
};

function TodoForm(props) {

    const schema = yup.object().shape({
        title: yup.string().required('Enter values'),
      });
      
    const { register, handleSubmit, formState:{ errors }, reset  } = useForm({
        defaultValues : {
            title : '',
        },
        resolver : yupResolver(schema),
    });

    const onSubmitEvent = (values) => {
        
        const {onSubmit} = props;
        if(onSubmit){
            onSubmit(values);
        }

        reset(register);

    }


    return (
        <form onSubmit={handleSubmit(onSubmitEvent)}>
            <h1>todoform</h1>
            <input {...register("title")} />
            <p>{errors.title?.message}</p>

        </form>
    );
}

export default TodoForm;