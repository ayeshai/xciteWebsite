import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';
import generateUniqueId from 'generate-unique-id';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}  />;
});

export default function EditStudent(props) {
  const [open, setOpen] = React.useState(false);
  const [inputField, setInputField] = useState({
    first_name: '',
    last_name: '',
    studentID: 0,
    email: ''
});
const [ifError, setError] = useState(0)

//https://stackoverflow.com/questions/53519578/forms-as-functional-components-with-react
  const inputsHandler = (e) =>{
      const { name, value } = e.target;
      setInputField((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  }



    const getData = async () => {
        // run asynchronous tasks here
        var id= props.studentuID
        console.log("id is "+ (id))
        fetch(`http://localhost:5000/students/get-by-id/${Number(id)}`)
        .then(res =>res.json())
        .then(data => setInputField(data.data))
    };
    
    useEffect(() => {
      getData();
    },[]); 
  



  const updateStudent = async (data) => {
    try{
        console.log("data is "+ data)
        const id= props.studentuID
        console.log(props.studentuID)
        
        const updateStudent = await fetch(`http://localhost:5000/students/update-student/${id}`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      console.log("update Student return is ")
      console.log( updateStudent)
    }catch(err){
      console.log(err)
    }
  };

  const  handleSubmit=  async () => {
      if(inputField.first_name.length==0||inputField.last_name.length==0 || inputField.email.length==0){
          console.log("Invalid Entry ")
      }else{
       
        const studentData={
          first_name: inputField.first_name,
          last_name: inputField.last_name,
          email: inputField.email
        }

       console.log("student Data ")
        
        console.log(studentData)
        updateStudent(studentData)
        setOpen(false);


      }        
  }

  const renderIcon =(iconName) => {
      // alert("alert")
      if (props.iconName==="AddIcon"){
      return (        <AddIcon sx={{ color: props.color }}/> )
      }else if(props.iconName==="EditIcon"){
      return ( <div> <EditIcon/></div>)

      }else{
      return (<div>No Icon Name </div>)
      }

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles ={
    container:{
    },
    outerCard:{
      width: "30rem",
      border: "black",
      borderRadius: "1rem",
      //borderStyle: "solid",
      boxShadow: "0 0 10px #76767b"
    },
    textFieldStyle:{
      color: "white",
      // marginRight: "0.3rem",
       paddingRight: "2rem",
       fontFamily: "Arial"
    },
    button:{
      padding: "2rem"
    },
    topDiv:{
      // color: "black"
      display: "flex",
      alignItems: "center"
    },
    header:{
      display: "flex"
    },
    title:{
      flex: 5
    },
    iconButton:{
      flex: 1
    },

  };

  return (
    <div className='container'>
    <IconButton  onClick={handleClickOpen}sx={{ p: '10px' }} aria-label="menu">
        {renderIcon()}
    </IconButton>
      
    <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <div className='header' style={styles.header}>
          <div className='title' style={styles.title}>
            <DialogTitle id="alert-dialog-title">
              {props.title}
            </DialogTitle>
          </div>
          <div className='iconButton' style={styles.iconButton}>
            <DialogActions>
                <IconButton  onClick={handleClose} sx={{ p: '10px' }} aria-label="menu">
                    <CloseSharpIcon />
                </IconButton>
            </DialogActions>
          </div>
          
        </div> 

        <DialogContent>
            <div className='textField'>
                <TextField style={styles.textFieldStyle} required id="standard-basic" name="first_name" label="First Name"   value={inputField.first_name} onChange={inputsHandler}  variant="standard" />
                <TextField style={styles.textFieldStyle} required id="standard-basic" name="last_name" label="Last Name"  value={inputField.last_name} onChange={inputsHandler} variant="standard" />
                <TextField style={styles.textFieldStyle} required id="standard-basic" name="email" label="Email" value={inputField.email} onChange={inputsHandler} variant="standard" />
                <TextField style={styles.textFieldStyle} required id="standard-basic" name="StudentID" label="Student ID"  value ={inputField.studentID}   variant="standard" disabled />

            </div>
        </DialogContent>
        
        <DialogActions 
        open={open}
        onClose={handleClose}>
          <Button onClick={handleSubmit} autoFocus>
            {props.buttonTitle}
          </Button>
        </DialogActions>
      
    </Dialog>
    </div>
  );
}
