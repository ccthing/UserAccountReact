import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../services/UserService';
import { ErrorSharp } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';

const useStyles2 = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  errorField:{
    fontWeight: 'bold',
    color: 'red'
  },
  backendErrorField:{
    fontWeight: 'bold',
    color: 'red',
    margin: '0px 0px 0px 20px'
  },
}));

function UserFormDialog(props) {
  const classes2 = useStyles2();
  const [open, setOpen] = useState(false);
  const { btnLabel, pId, pFirstName, pLastName, pEmail, setUsers, version, color} = props;

  const [id, setId] = useState(pId);
  const [firstName, setFirstName] = useState(pFirstName);
  const [lastName, setLastName] = useState(pLastName);
  const [email, setEmail] = useState(pEmail);

  const [formErrors, setFormErrors] = useState({});

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validate = () => {
    let errors = {}
    errors.firstName = firstName ? "" : "First Name is required."
    errors.lastName = lastName ? "" : "Last Name is required."
    errors.email = email ? (regex.test(email) ? "" : "Email is not valid.") : "Email is required."
    return errors
  }

  const handleClickOpen = () => {
    setOpen(true);
    setId(pId)
    setFirstName(pFirstName)
    setLastName(pLastName)
    setEmail(pEmail)
  };

  const handleClose = () => {
    handleClear();
    setOpen(false);
  };

  const handleClear = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setFormErrors({})
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let validateMsg = validate();
    setFormErrors(validate());

    if(validateMsg.firstName === '' && validateMsg.lastName === '' && validateMsg.email === '' ){
      const user={id,firstName,lastName,email,version}
    
      UserService.createUser(user).then(response => {
        console.log("response: ",response.data)
        if(response.data[0].errors.length){
          let backendError = {};
          backendError.backendError = response.data[0].errors[0];
          setFormErrors(backendError);
        }else{
          setUsers(response.data);
          handleClear();
          setOpen(false);
        }
      })
    }
  };

  return (
    <div>
      <Button variant="contained" color={color} onClick={handleClickOpen}>
        {(btnLabel === 'Update' ? <EditIcon /> : "Add")}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{btnLabel} User</DialogTitle>
        <DialogContent>
          <p className={classes2.backendErrorField}>{formErrors.backendError}</p>
          <form className={classes2.root} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} hidden={(id === '') ? true : false}>
                <TextField id="id" label="Id" variant="filled" fullWidth value={id} disabled hidden={(id === '') ? true : false}/>
              </Grid>
              <Grid item xs={12}>
                <TextField id="firstName" label="First Name" variant="filled" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <p className={classes2.errorField}>{formErrors.firstName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField id="lastName" label="Last Name" variant="filled" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <p className={classes2.errorField}>{formErrors.lastName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField id="email" label="Email" variant="filled" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className={classes2.errorField}>{formErrors.email}</p>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear} variant="outlined" color="error">
            Clear
          </Button>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color={color}>
            {btnLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default UserFormDialog