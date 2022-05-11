import React, { useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function UserForm() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="firstName" label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <TextField id="lastName" label="Last Name" variant="outlined" fullWidth value={lastName} />
            <TextField id="email" label="Email" variant="outlined" fullWidth value={email} />
    </form>
  );
}
