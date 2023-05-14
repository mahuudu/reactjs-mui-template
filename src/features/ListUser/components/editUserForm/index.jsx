import { Avatar } from '@material-ui/core';
import listUserApi from 'api/listUserApi';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

EditUserForm.propTypes = {
    idUser : PropTypes.string,
    onSubmit: PropTypes.func,
};

function EditUserForm(props) {
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset } = useForm();

    // user state for form
    const [user, setUser] = useState(null);

    const id = props.idUser;

    // effect runs on component mount
    useEffect(() => {
        // simulate async api call with set timeout
        (async () => {
        let response = await getUser(id);
            setUser(response[0]);
        })();
    }, []);

    // effect runs when user state is updated
    useEffect(() => {
        // reset form with user data
        reset(user);
    }, [user]);

    const getUser = async (id) => {
        const  response =  await listUserApi.getbyId(id);
        return response;
    }

     function  handleonSubmit(data) {

        const { onSubmit } = props;

        console.log('SUCCESS!! ',  data);

        if(data['file'].length > 0){
            const isisUpload = true;
            if (onSubmit) {
                 onSubmit(data,isisUpload);
            }
        }else{
            const isisUpload = false;
            if (onSubmit) {
                 onSubmit(data,isisUpload);
            }
        }
       
    }

    return (
        <div className="card m-1">
            <div className="card-body">
                {user &&
                    <form onSubmit={handleSubmit(handleonSubmit)}>
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>full name</label>
                                <input name="firstName" type="text" {...register('fullname')} className="form-control" />
                            </div>
                            <div className="form-group col-12">
                                <label>user name</label>
                                <input name="lastName" type="text" {...register('username')} className="form-control" />
                            </div>
                            <div className="form-group col-12">
                                <label>password</label>
                                <input name="password" type="password" {...register('password')} className="form-control" />
                            </div>
                            <div className="form-group col-12">
                                <label>birth of day</label>
                                <input name="birth_of_day" type="date" {...register('birth_of_day')} className="form-control" />
                            </div>
                            <div className="form-group col-12">
                                <label>Change Avatar</label>
                                <Avatar alt="avatar" className="mt-3 mb-3" src={"http://localhost:8000/codein/uploads/"+user['avatar']} />
                                <input name="avatar" type="file" accept="image/png, image/jpeg" {...register('file')} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-1 mt-3">Submit</button>
                        </div>
                    </form>
                }
                {!user &&
                    <div className="text-center p-3">
                        <span className="spinner-border spinner-border-lg align-center"></span>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditUserForm;