import logo from './logo.svg';
import './App.css';
import StudentList from './Components/studentList';
import React, { useState } from 'react'
import Wrapper from './Components/wrapper'



import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardView from './Components/cardView';



function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  

  return (

    <Box sx={{
        height: 224,
      }}>
        <Wrapper/>      
    </Box>
  );
}

export default App;
