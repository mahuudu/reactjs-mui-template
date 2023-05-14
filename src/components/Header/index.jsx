import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Register from 'components/Auth/Register/FormControl';
import LoginControl from 'components/Auth/Register/LoginControl';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { logout } from 'features/user/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  colorwhite : {
    color: 'white',
    padding: '0 10px',
    textDecoration: 'none',
  },
}));

const MODE = {
  LOGIN : 'login',
  REGISTER : 'register'
}

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.email;
  const [mode,setmode] = useState(MODE.LOGIN);
  const [open, setOpen] = React.useState(false);
  const [openAcount, setopenAcount] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setopenAcount((prevopenAcount) => !prevopenAcount);
  };

  const handleCloseAMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setopenAcount(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setopenAcount(false);
    }
  }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(openAcount);
    useEffect(() => {
      if (prevOpen.current === true && openAcount === false) {
        // anchorRef.current.focus();
      }
  
      prevOpen.current = openAcount;
    }, [openAcount]);
  
  const handleLogout = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setopenAcount(false);

    const action = logout();
    dispatch(action);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <NavLink to="/products" className={classes.colorwhite} >
                Productlist
            </NavLink>
            <NavLink to="/todo" className={classes.colorwhite} >
                Todo
            </NavLink>
            <NavLink to="/listuser" className={classes.colorwhite}>
                List User
            </NavLink>
            <NavLink to="/counter" className={classes.colorwhite}>Counter</NavLink>
            </Typography>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>Login</Button>
            )
            }
            {isLoggedIn && (
               <Button
               ref={anchorRef}
               aria-controls={openAcount ? 'menu-list-grow' : undefined}
               aria-haspopup="true"
               onClick={handleToggle}
             >
                Account
             </Button>
            )
            }
        </Toolbar>
      </AppBar>
      
        <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContent id="alert-dialog-description">
             {mode === MODE.REGISTER &&(
               <>
                <Register closeDialog={handleClose}/>
                <Box textAlign="center">
                    <Button color="primary" onClick={() => setmode(MODE.LOGIN)}>
                          Already have acount , Login
                    </Button>
                </Box>
                </>
             )}
               {mode === MODE.LOGIN &&(
               <>
                 <LoginControl closeDialog={handleClose}/>
                <Box textAlign="center">
                    <Button color="primary" onClick={() => setmode(MODE.REGISTER)}>
                          Create acount
                    </Button>
                </Box>
                </>
             )}
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Popper open={openAcount} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={openAcount} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleCloseAMenu}>Profile</MenuItem>
                    <MenuItem onClick={handleCloseAMenu}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}
