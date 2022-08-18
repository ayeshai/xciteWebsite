import React, { useState, useEffect } from 'react'
import CardView from './cardView';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { padding } from '@mui/system';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';





// const studentData = [
//     { firstName: 'John', lastName: 'Doe', studentId: '12324324' },
//     { firstName: 'Foo', lastName: 'Bar', studentId: '554123243' },
//     { firstName: 'Jack', lastName: 'Smith', studentId: '23423' },
//     { firstName: 'Fam', lastName: 'Smith', studentId: '23423' },

//   ];
// function RenderItem({ item, handleRemoveFruit }) {
     
//         {studentData.map((item,index)=>{
//             return  <Grid item xs={12} sm={4}>
//            <TransitionGroup>
//             <CardView style ={{padding: "1rem"}}
//             firstName={item.firstName}
//             lastName={item.lastName}
//             email={item.email}
//             studentId={item.studentId}
//             />  
//             </TransitionGroup>     
//           </Grid>
//         })}
//   }

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [dummy, setDummy] = useState(false);



const getData = async () => {
  // run asynchronous tasks here
  fetch('http://localhost:5000/students/get-all')
  .then(res =>res.json())
  .then(data => setStudents(data.data))
};

  useEffect(() => {
    getData();
  },); 


 
  const handleRemoveStudent = async (itemID) => {
    //delete by student id
    console.log("student ID is "+ itemID)
    const deletereq = await fetch(`http://localhost:5000/students/delete-by-id/${itemID}`,{
      method: "DELETE"
    })
    console.log(deletereq)
    const newStudentList = students.filter( student => student.studentID != itemID)
    setStudents (newStudentList)
  
  };
  const handleUpdate= async()=>{
    setDummy(true)
  }
   
  return (
    <Box sx={{  width: '100%'  }}>
    <Grid container sx={{ marginTop: 0 , backgroundColor: "#363640"}}  rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="stretch">
    {students.map((item,index)=>{
         return  <Grid  item xs={12} sm={6} md={4} >
            <CardView 
            handleRemoveStudent={handleRemoveStudent}
            style ={{padding: "1rem"}}
            firstName={item.first_name}
            lastName={item.last_name}
            email={item.email}
            studentId={item.studentID}
            studentuID= {item.ID}
            handleUpdate={handleUpdate}
            />  
       </Grid>
     })}
    </Grid>
  </Box>
  )
}
