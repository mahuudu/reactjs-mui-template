import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import listUserApi from 'api/listUserApi';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import UserControl from './components/addUserControl';
import EditUserControl from './components/editUserControl';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

ListUser.propTypes = {

};

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    btn: {

    },
    content: {
        display: "flex",
        margin: '15px 0',
    }
});

function ListUser(props) {
    const [ListCity, setListCity] = useState([]);
    const [dataId, setdataId] = useState();
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [Reload,setReload] = useState(false);

    useEffect(() => {
        const getListCityApi =
            "http://localhost:8000/codein/";

        axios
            .get(getListCityApi)
            .then((res) => {
                setListCity(res.data);
            })
            .catch((err) => {
                console.log("error loading");
            });
    }, []);

    useEffect(() => {
      
    }, [Reload]);


    useEffect(
        ()=>{
            const getListCityApi =
            "http://localhost:8000/codein/";

        axios
            .get(getListCityApi)
            .then((res) => {
                setListCity(res.data);
            })
            .catch((err) => {
                console.log("error loading");
            });
        }
    )
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleCloseEdit = () =>{
        setOpenEdit(false);
        setReload(true);
        console.log("cl")
    }

    const handleEdit = (event, variable) =>{
        setdataId(variable);
        setOpenEdit(true)
    }

    const handleDelete = (event, variable) =>{
        let id = variable;

        try{
            console.log(id);
            deleteUser(id);
            
        }catch(err){
            console.log(err);
        }
    }
    
    const deleteUser = async(values) => {
        const response  = await listUserApi.deleteUser(values);
    }

    useEffect(() => {

    }, [dataId]);

    const classes = useStyles();


    return (
        <div>
            <Container maxWidth="lg" >
                <h1> USER LIST </h1>
                <Button variant="contained" color="primary" onClick={handleOpen} className={classes.content} style={{ justifyContent: "flex-start", alignItems: "flex-start" }} >
                    Add User
                </Button>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>UserName</TableCell>
                                <TableCell align="right">Full Name</TableCell>
                                <TableCell align="right">birth_of_day</TableCell>
                                <TableCell align="right">is_active</TableCell>
                                <TableCell align="right">Delete</TableCell>
                                <TableCell align="right">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ListCity?ListCity.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.username}
                                    </TableCell>
                                    <TableCell align="right">{row.fullname}</TableCell>
                                    <TableCell align="right">{row.birth_of_day}</TableCell>
                                    <TableCell align="right">{row.is_active === '1' ? <CheckIcon /> : <ClearIcon />}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="secondary"
                                            onClick={e=>
                                                window.confirm("Are you sure you wish to delete this item?") &&
                                                handleDelete(e,row.id)}
                                        >
                                            DELETE
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary"
                                         onClick={e=>handleEdit(e,row.id)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )): null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Add User
                </DialogTitle>
                <DialogContent id="alert-dialog-description">
                    <UserControl closeDialog={handleClose}/>        
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEdit}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Edit User
                </DialogTitle>
                <DialogContent id="alert-dialog-description">
                    <EditUserControl closeDialog={handleCloseEdit} idUser={dataId}  />        
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseEdit} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ListUser;