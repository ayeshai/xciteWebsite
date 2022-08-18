import React, { useState } from 'react'
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




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}  />;
});

export default function AddClassPopUp(props) {
  const [open, setOpen] = React.useState(false);
  const [inputField, setInputField] = useState({
    classID: '',
    class_title: '',
    prof:'',
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

  const addClass = async (data) => {
    try{
      //Create a class
      console.log(data.classData)
      const id= props.studentuID
      const createClass = await fetch(`http://localhost:5000/class/create-class/student-id/${id}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })

     // const classID= createStudent.
      console.log(createClass)

    }catch(err){
      console.log(err)
    }
  };

  const  handleSubmit=  async () => {
      if(inputField.classID.length==0||inputField.class_title.length==0 || inputField.prof.length==0){
          console.log("Invalid Entry ")
          alert("Please enter valid fields")
      }else{
        const data={
            classID: inputField.classID,
            class_title: inputField.class_title,
            prof: inputField.prof,
          }

       // console.log(inputField.)

        console.log("ID IS " + props.studentuID)
        addClass(data)
        //props.handleAddClass()
        setOpen(false);


      }        
  }

  const renderIcon =(iconName) => {
      // alert("alert")
      if (props.iconName==="AddIcon"){
      return (        <AddIcon /> )
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
  const addStudent = () =>{

  }
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
                <TextField style={styles.textFieldStyle} helperText="e.x MTH 141" required id="standard-basic" name="classID" label="Class ID"   value={inputField.classID} onChange={inputsHandler}  variant="standard" />
                <TextField style={styles.textFieldStyle} helperText="Intro to Calculus" required id="standard-basic" name="class_title" label="Class Title"  value={inputField.class_title} onChange={inputsHandler} variant="standard" />
                <TextField style={styles.textFieldStyle} helperText="Allen Hertz" required id="standard-basic" name="prof" label="professor" value={inputField.prof} onChange={inputsHandler} variant="standard" />
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
