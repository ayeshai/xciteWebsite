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

export default function EditClass(props) {
  const [open, setOpen] = React.useState(false);
  const [inputField, setInputField] = useState({
    classID: "",
    class_title: "",
    prof: "",
   
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
        var id= props.classID
        console.log("class id is "+ (id))
        fetch(`http://localhost:5000/class/get-class-by-id/${Number(id)}`)
        .then(res =>res.json())
        .then(data => setInputField(data))
    };

    useEffect(() => {
    getData();
    },[]); 




  const updateStudentClass = async (data) => {
    try{
        console.log("data is "+ data)
        const id= props.classID
        const updateStudent = await fetch(`http://localhost:5000/class/update-class/${id}`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      console.log("update class return is ")
      //console.log(updateStudent.data)
     // console.log( updateStudent)
    }catch(err){
      console.log(err)
    }
  };

  const  handleSubmit=  async () => {
      if(inputField.classID.length==0||inputField.class_title.length==0 || inputField.prof.length==0){
          console.log("Invalid Entry ")

      }else{
       
        const studentData={
          classID: inputField.classID,
          class_title: inputField.class_title,
          prof: inputField.prof
        }

       console.log("student Data ")
        
        console.log(studentData)
        updateStudentClass(studentData)
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
              {props.classID}
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
                <TextField style={styles.textFieldStyle} helperText="Allen Hertz" required id="standard-basic" name="prof" label="Prof" value={inputField.prof} onChange={inputsHandler} variant="standard" />

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
