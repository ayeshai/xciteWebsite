

const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors');


const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

const port = 5000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


app.post('/students/create-student',async (req, res) => {

  try{
    const post=  await prisma.students.create({
      data: req.body  
  })
  
  res.json(post)
  
  } 
  catch(err){
    console.log(err)
  }
})

app.get('/students/get-all', async (req, res) => {
   try{
    const posts = await prisma.students.findMany({
    })
    res.json({data: posts})
    //res.send({data: posts})
   } 
   catch (err){
    console.log(err)
   }
})



app.get('/students/get-all-class/:studentid', async (req, res) => {
  try{
   const posts = await prisma.students.findUnique({
    where: {
      ID: Number(req.params.studentid),
    },
  })
   const classes = posts.classes
   const retArray=[]
  for (var i= 0; i< classes.length; i++){
    const getClass = await prisma.classes.findUnique({
      where: {
        ID: Number(classes[i])
      },
    })

    retArray.push(getClass)
  }
   

   res.json({data: retArray})
   //res.send({data: posts})
  } 
  catch (err){
   console.log(err)
  }
})



app.get('/students/get-by-id/:id', async (req, res) => {
  try{
   const posts = await prisma.students.findUnique({
    where: {
      ID: Number(req.params.id),
    },
  })
  
   res.json({data: posts})
   //res.send({data: posts})
  } 
  catch (err){
   console.log(err)
  }
})

app.patch('/students/update-student/:id',async (req, res) => {

  try{
    const {id} = req.params
    console.log(req.body)
    const post=  await prisma.students.update({
      where: {
        ID: Number(id),
      },
      data: req.body,  
  })
  
  res.json(post)
  
  } 
  catch(err){
    console.log(err)
  }
})

app.patch('/students/:studentid/add-class/:classid',async (req, res) => {

  try{
    
    const getClass = await prisma.classes.findUnique({
      where: {
        ID: Number(req.params.classid),
      },
    })
   // res.json({"response" :"Not Found"})
    if (getClass ==undefined){
      res.json({"response" :"Class Not Found"})
    }else{

      const addTag = await prisma.students.update({
        where: {
          ID: Number(req.params.studentid),
        },
        data: {
          classes: {
            push: Number(req.params.classid),
          },
        },
      })

      res.json(getClass)
    }
 
  
  
  } 
  catch(err){
    console.log(err)
  }
})


app.patch('/students/:studentid/delete-class/:classid',async (req, res) => {

  try{
    
    const getClass = await prisma.classes.findUnique({
      where: {
        ID: Number(req.params.classid),
      },
    })
   // res.json({"response" :"Not Found"})
    if (getClass ==undefined){
      res.json({"response" :"Class Not Found"})

    }else{

      //Get student's classes array
      const posts = await prisma.students.findUnique({
        where: {
          ID: Number(req.params.studentid),
        },
      })

      console.log(posts)
      //delete id from student class array
      let ar= posts.classes
      var index = ar.indexOf(Number(req.params.classid));
      if (index !== -1) {
        ar.splice(index, 1);
      }

      //update student classes with new array
      const result = await prisma.students.update({
        where: {
          ID: Number(req.params.studentid),
        },
        data: {
          classes: ar
        },
      })
      

      //delete class
      const delClass = await prisma.classes.delete({
        where: {
          ID: Number(req.params.classid),
        }})

      res.json({data: delClass})
    }
  } 
  catch(err){
    console.log(err)
  }
})

app.delete('/students/delete-by-id/:id', async (req, res) => {
  try{
   const {id} = req.params
   const classes= await prisma.students.findUnique({
    where: {
      ID: Number(req.params.id),
    },
  })
  console.log("classes.classes")
  console.log(classes.classes)

  var classID= classes.classes

  for (var i= 0; i< classID.length; i++){
    const findClass = await prisma.classes.findUnique({
      where: {
        ID: Number(classID[i])
      }})

      console.log("Class found")
      console.log(findClass)

      var studentOfClasses= findClass.students
      

      console.log("students of class are")
      console.log(studentOfClasses)
      console.log("Length is "+ studentOfClasses.length)

      //if only 1 student, delete class
      if(studentOfClasses.length===1){
        console.log("Only 1 student")
        const deleteClass = await prisma.classes.delete({
          where: {
            ID: Number(classID[i]),
          }})

      }
      else{ //only delete student from class
        console.log("Many students, delete student " + req.params.id)
        console.log("class before deleting student "+ req.params.id)
        console.log(studentOfClasses)
        var ar= studentOfClasses
        var index = ar.indexOf(Number(classes.classes[i]));
        if (index !== -1) {
          ar.splice(index, 1);
        }
        console.log("class after deleting student "+ req.params.id)
       console.log(ar)


        
        const result = await prisma.classes.update({
          where: {
            ID: Number(classes.classes[i]),
          },
          data: {
            students: ar
          },
        })
      }
      

  }

   const posts = await prisma.students.delete({
    where: {
      ID: Number(id),
    }})
    res.json( posts)
  } 
  catch (err){
   console.log(err)
  }
})




// Class 

//Create a class

app.post('/class/create-class/student-id/:id',async (req, res) => {

  try{
    const studentExist = await prisma.students.findUnique({
      where: {
        ID: Number(req.params.id)
      }})

      if(studentExist == undefined){
        res.json({"error": "student doesn't exist"})

      }
    const post=  await prisma.classes.create({
      data: req.body  
    })
  const addStudentToClass = await prisma.classes.update({
    where: {
      ID: Number(post.ID),
    },
    data: {
      students: {
        push: Number(req.params.id),
      },
    },
  })
  if (post !==undefined){
    const addClass = await prisma.students.update({
      where: {
        ID: Number(req.params.id),
      },
      data: {
        classes: {
          push: Number(post.ID),
        },
      },
    })

  }
 
  
  res.json(post)
  
  } 
  catch(err){
    console.log(err)
  }
 })

app.get('/class/get-all', async (req, res) => {
  try{
   const posts = await prisma.classes.findMany({
   })
  // res.send({data: posts})
   res.json(posts)
  } 
  catch (err){
   console.log(err)
  }
})


app.get('/class/get-class-by-id/:id', async (req, res) => {
  try{
   const posts = await prisma.classes.findUnique({
    where: {
      ID: Number(req.params.id),
    },
   })
  // res.send({data: posts})
   res.json(posts)
  } 
  catch (err){
   console.log(err)
  }
})





// // //Delete a student from a class
// app.patch('/class/:classid/delete-student/:studentid',async (req, res) => {

//   try{
    
//     //make sure class exitsts
//     const getStudent = await prisma.classes.findUnique({
//       where: {
//         ID: Number(req.params.classid),
//       },
//     })
//    // res.json({"response" :"Not Found"})
//     if (getStudent ==undefined){
//       res.json({"response" :"class doesn't exist"})

//     }else{

//       //Get classes students array
//       const posts = await prisma.classes.findUnique({
//         where: {
//           ID: Number(req.params.classid),
//         },
//       })

//       //delete id from array
//       let ar= posts.students
//       var index = ar.indexOf(Number(req.params.classid));
//       if (index !== -1) {
//         ar.splice(index, 1);
//       }

//       //update  class with deleted student with new array
//       const result = await prisma.classes.update({
//         where: {
//           ID: Number(req.params.studentid),
//         },
//         data: {
          
//           students: ar
//         },
//       })
      
  
      
//       res.json(result)
//     }
//   } 
//   catch(err){
//     console.log(err)
//   }
// })


//add a student to a class
app.patch('/classes/:classid/add-student/:studentid',async (req, res) => {

  try{
    
    //make sure student exists before adding them to a class
    const getStudent = await prisma.students.findUnique({
      where: {
        ID: Number(req.params.studentid),
      },
    })
   // res.json({"response" :"Not Found"})
    if (getStudent ==undefined){
      res.json({"response" :"Student Not Found"})
    }else{

      const addStudent = await prisma.classes.update({
        where: {
          ID: Number(req.params.classid),
        },
        data: {
          students: {
            push: Number(req.params.studentid),
          },
        },
      })

      res.json(addStudent)
    }
 
  
  
  } 
  catch(err){
    console.log(err)
  }
})


//update a class's values
app.patch('/class/update-class/:id',async (req, res) => {

  try{
    const {id} = req.params
    
    const post=  await prisma.classes.update({
      where: {
        ID: Number(id),
      },
      data: req.body,  
  })
  
  res.json(post)
  
  } 
  catch(err){
    console.log(err)
  }
})



//Remove from students class list
app.delete('/class/delete-by-id/:id', async (req, res) => {
 try{


  //Delete class 
  const {id} = req.params
  const posts = await prisma.classes.delete({
   where: {
     ID: Number(id),
   }})
   res.json({data: posts})
 } 
 catch (err){
  console.log(err)
 }
})
