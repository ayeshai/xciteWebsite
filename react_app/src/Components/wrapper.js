import React from 'react'
import PopUp from './addStudent'
import StudentList from './studentList'
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function wrapper() {
  const styles ={
    text:{
      color: 'rgba(255, 255, 255, 1)',
    },
    addcontainer:{
      backgroundColor: "#363640"
    }
  }
  return (
    
        <div className="App">
            <div name="Header">
            <Typography variant="h2" style={styles.text}>
              Students
            </Typography>
            
            </div> {/* Header*/}
            
            <div name="listView">
              <StudentList/>
            </div>

            <div name="addButton" style={styles.addcontainer}>
             
              <PopUp
                iconName="AddIcon"
                color= "#ffff"
                title="Enter New Student"
                buttonTitle="Submit"

                />
            </div>  {/* addButton*/}
         
        </div>
      
    
  )
}
