import React, { useState,useEffect } from 'react'
import UserService from '../services/UserService';
import { Card, CardContent, Grid } from '@material-ui/core';
import UserFormDialog from './UserFormDialog';
import Button from '@mui/material/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Typography
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table:{
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell:{
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    }
}));

function UserTable() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);

  const [deleteId, setDeleteId] = useState('');

  const handleClose = () => {
    setOpen(false);
  };  


  useEffect(() => {
      getUsers()
  }, [])


  const getUsers = () => {
      UserService.getUsers().then((response) => {
          setUsers(response.data)
      })
  }

  function handleDelete(){
    UserService.deleteUser(deleteId).then((response) => {
        setUsers(response.data)
        console.log(response.data)
        setOpen(false)
    })
  };

  function confirmDelete(e){
    setDeleteId(e)
    setOpen(true)
  };

  return (
    <Card>
        <h2>Users List</h2>
        <CardContent>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={6} >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>First Name</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Last Name</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                                    <TableCell className={classes.tableHeaderCell} align={"center"}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Avatar src="." className={classes.avatar}>{user.id}</Avatar>
                                        </TableCell>
                                        <TableCell><Typography>{user.firstName}</Typography></TableCell>
                                        <TableCell><Typography>{user.lastName}</Typography></TableCell>
                                        <TableCell><Typography>{user.email}</Typography></TableCell>
                                        <TableCell>
                                            <Grid container spacing={3} justifyContent="center">
                                                <Grid item><UserFormDialog btnLabel={'Update'} pId={user.id} pFirstName={user.firstName} pLastName={user.lastName} pEmail={user.email} version={user.version} setUsers={setUsers} color={'primary'}/></Grid>
                                                <Grid item><Button onClick={() => confirmDelete(user.id)} variant="contained" color="error"><DeleteIcon /></Button></Grid>
                                            </Grid>
                                        </TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} >
                    <UserFormDialog btnLabel={'Add'} pId={''} setUsers={setUsers} color='success'/>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Conformation"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Confrim delete User Id:{deleteId}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">
                    No
                </Button>
                <Button onClick={handleDelete} variant="contained" color="success">
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </CardContent>
    </Card>
  );
}

export default UserTable