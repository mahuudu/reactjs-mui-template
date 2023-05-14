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
import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import * as yup from "yup";







const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  

RegisterForm.propTypes = {
    onSubmit : PropTypes.func,
};

function RegisterForm(props) {
    const classes = useStyles();
    const dispatch  = useDispatch();

    const schema = yup.object().shape({
      fullname: yup.string().required('Fullname is required').min(3,'Full name min 6'),
      email: yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password'), null], 'Confirm Password does not match')
      });
      
    const { register,control, handleSubmit , formState:{ errors ,  isDirty, isSubmitting }, reset  } = useForm({

        resolver : yupResolver(schema),
    });

     const onSubmit  = async (values) => {
        const {onSubmit} = props;
        
        if(onSubmit){
          await onSubmit(values);
        }

        reset(register);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}  className={classes.root} noValidate  autoComplete="off">
        {isSubmitting && <LinearProgress />}
        <Container component="main" maxWidth="xs">
        <Box px={3} py={2}>
          <Typography variant="h6" align="center" margin="dense">
            React Hook Form - Material UI - Validation
          </Typography>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                margin="dense"
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
        </form>
    );
}

export default RegisterForm;