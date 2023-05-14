"<MuiPickersUtilsProvider utils={DateFnsUtils}>"
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useForm } from "react-hook-form";
import * as yup from "yup";






const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
          },
    },
}));


AddUserForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddUserForm(props) {
    const classes = useStyles();
    const [value, onChange] = useState(new Date());



    const schema = yup.object().shape({
        fullname: yup.string().required('Fullname is required').min(3, 'Full name min 6'),
        email: yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        picture : yup.mixed().required('File is required'),
    });

    
    

    const { register, control, handleSubmit, formState: { errors, isDirty, isSubmitting }, reset } = useForm({

        resolver: yupResolver(schema),
    });


    const onSubmit = async (values) => {
    
        const { onSubmit } = props;

        const todayDate = value.toISOString().slice(0, 10);

        console.log(values.picture.length);

        if( values.picture.length > 0){
            var avatar = values.picture[0].name;
        }else{
            var avatar = 'null';
        }

        const data = {...values, avatar: avatar, todayDate : todayDate};

        console.log('form', data);

        if (onSubmit) {
            await onSubmit(data);
        }

        reset(register);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
            {isSubmitting && <LinearProgress />}
            <Container component="main" maxWidth="xs">
                <Box px={3} py={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id="fullname"
                                name="fullname"
                                label="Fullname"
                                fullWidth
                                margin="dense"
                                {...register('fullname')}
                                error={errors.Fullname ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.fullname?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                margin="dense"
                                {...register('email')}
                                error={errors.email ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.email?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                margin="dense"
                                {...register('password')}
                                error={errors.password ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.password?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <DateTimePicker
                                onChange={onChange}
                                value={value}
                                name="time"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                multiple
                                type="file" name="picture"
                                className={classes.input}
                                id="contained-button-file"
                                {...register('picture')}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                    </Grid>

                    <Box mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Container>
        </form >
    );
}

export default AddUserForm;