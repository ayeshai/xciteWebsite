import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import PopUp from './addStudent'
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClassListItem from './classListItem';
import EditStudent from './editStudent'



import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardView(props, {handleRemoveStudent}) {
  const [expanded, setExpanded] = React.useState(false);
  const [updated, isUpdated] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [checked, setChecked] = React.useState(true);
  const deleteButton = (index) =>{
    setChecked((prev) => !prev);
    props.handleRemoveStudent(index)
  }

  const updatState = () => {
    const upd= updated
    isUpdated(true)
    props.handleUpdate()
  }
  const styles = {
    card: {
      background: 'rgba(0, 150, 136, 1)',
     // padding: "1rem"
    //  height: '100%',
    //  width: '100%',
    //  display: 'flex',
    //  flexDirection: 'row',
    },
    text: {
      color: 'rgba(54, 54, 64, 1)',

    },
    icon: {
      //color: 'rgba(255, 255, 255, 1)', //light
      color: 'rgba(54, 54, 64, 1)', //Dark
      paddingRight: "0.2rem"
    },
    button:{
      color: "red"
    },
  };
  return (
   // <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
//sx={{ maxWidth: 345, minWidth:345, minHeight: 180, maxHeight:180 }}
    <Card elevation={1}  style={styles.card}>
    
      <CardContent>
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          style={styles.text}
        >
          {props.firstName} {props.lastName}
        </Typography>
        <div> 
        <Typography variant="body1" style={styles.text}>
          {props.email}
        </Typography>
        <Typography variant="body1" style={styles.text}>
          {props.studentId}
        </Typography>
        </div>
      </CardContent>
      <CardActions className='test'>
        <div className='expanded'>
          
        </div>
            <IconButton edge="end" aria-label="delete" 
            onClick={() => {
                deleteButton(props.studentuID)
              }}
              >
              <DeleteIcon style={styles.icon} />
            </IconButton>
            <EditStudent
              iconName="EditIcon"
              title="Edit Student Info"
              fieldLength="5"
              buttonTitle="Update"
              studentuID= {props.studentuID}
            />
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
      </CardActions>
      <Collapse in={expanded} orientation="vertical" timeout="auto" unmountOnExit>
        <CardContent>
          <ClassListItem
          studentuID= {props.studentuID}
          updatState= {updatState}

          />         
        </CardContent>
      </Collapse>
    
   
    </Card>
   // </Slide>
  );
}
