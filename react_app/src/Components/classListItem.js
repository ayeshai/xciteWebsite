import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import PopUp from './addStudent'
import EditClass from './editClass';
import AddClassPopUp from './addClass';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';




export default function ClassListItem(props) {



  //const [students, setStudents] = useState([]);

  const [classes, setClasses] = useState([]);
  const [update, setUpdate]= useState(false)


  const getData = async () => {
    // run asynchronous tasks here
    const id= props.studentuID
    fetch(`http://localhost:5000/students/get-all-class/${id}`)
    .then(res =>res.json())
    .then(data => {setClasses(data.data)
     
      })
  };
  
    useEffect(() => {
      getData();
    },[]); 

    
    const handleAddClass = async () =>{
      // console.log("Class added")
      // const id= props.itemID
      // fetch(`http://localhost:5000/students/get-all-class/${id}`)
      // .then(res =>res.json())
      // .then(data => {setClasses(data.data)
       
      //   })
      // console.log("Get data")
      // const id= props.itemID
      // fetch(`http://localhost:5000/students/get-all-class/${id}`)
      // .then(res =>res.json())
      // .then(data => {setClasses(data.data)
       
      //   })
      //class added
      console.log("class added")

      setUpdate(true)
      //props.updatState()
      // const newStudentList = classes.filter( classes => classes.ID != "b")
      // setClasses(newStudentList)
      // let arr = [...classes]; // creates a copy of subNames on a new reference
      // arr.slice(); // updates the content of the newly created array 
      // setClasses(arr);   
      // var currentToCompare = toCompare.slice();
      // currentToCompare.push(chiptoadd);
      // setToCompare(currentToCompare);
  
      //getData()
    }



  const deleteButton = async ( studentid, classid) => {

    const classID =  classid
    const studentID= studentid
    console.log("Student ID is" + studentID)
    console.log("Class ID is" + classID)

    const deletereq = await fetch(`http://localhost:5000/students/${studentID}/delete-class/${classID}`,{
      method: "PATCH"
    })
    console.log(deletereq)
    console.log(classes)
    const newStudentList = classes.filter( classes => classes.ID != classid)
    setClasses (newStudentList)
  
  //   console.log("delete button called")
  //   const id= props.itemID
  //   fetch(`http://localhost:5000/students/get-all-class/${id}`)
  //   .then(res =>res.json())
  //   .then(data => {setClasses(data.data)
     
  //     })
  // };
  //  setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };


  // const addClass = (
  //   <AddClassPopUp
  //   iconName="AddIcon"
  //   className="MTH142"
  //   title="Add class"
  //   Professor="5"
  //   buttonTitle="Add Class"
  //   handleAddClass={handleAddClass}

  //   />
  // );

  const styles ={
    text:{
      color: 'rgba(255, 255, 255, 1)',
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          
          <div className='listHeader'>

            <AddClassPopUp
            iconName="AddIcon"
            title="Add a class"
            stud= {props.itemID}
            buttonTitle="Add class"
            handleAddClass={handleAddClass}
            studentuID= {props.studentuID}

            />

            <Typography style={styles.text} sx={{ mt: 4, mb: 2 }} variant="p" component="div">
            Student Enrolled in: 
            </Typography>

          </div>
         
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={6}>
         
          <List>
          {classes.map((item,index)=>{
             return <ListItem>
                {item.class_title}
                <EditClass
                iconName="EditIcon"
                title="Edit Student Info"
                fieldLength="5"
                buttonTitle="Update"
                studentuID= {props.studentuID}
                classID={item.ID}
              />
               <IconButton edge="end" aria-label="delete" 
                onClick={() => deleteButton(props.studentuID, item.ID)}
                  >
                  <DeleteIcon style={styles.icon} />
                </IconButton>
             </ListItem>
           })}

          </List>
          
         
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}
