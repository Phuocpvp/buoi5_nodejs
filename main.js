const express = require('express')
const app = express()
const port = 3000
let mongoose = require('mongoose');

app.use(express.json())



var students = [{
    id: "21",
    MSSV: "12345678901",
    HoTen: "Phạm Văn Phúc",
    DTB: 8.0,
    isDelete: false
  }
]


//http://127.0.0.1:3000/?view[$gte]=200&view[$lte]=300
app.get('/', (req, res) => {
    console.log(req.query);
    let newStudent = students;
    if(req.query.HoTen){
        newStudent = newStudent.filter(p=>p.HoTen.includes(req.query.HoTen))
    }
    if(req.query.DTB){
        //view: { '$gte': '200', '$lte': '200' } 
        //newPost = newPost.filter(p=>p.views>=req.query.view)
        if(req.query.DTB.$gte){
            newStudent = newStudent.filter(p=>p.DTB>=req.query.DTB.$gte)
        }
        if(req.query.DTB.$lte){
            newStudent = newStudent.filter(p=>p.DTB<=req.query.DTB.$lte)
        }
    }
    res.send(newStudent)
})
app.get('/:id', (req, res) => {
    let id = req.params.id;
    let student = students.find(p=>p.id == id);
    if(student){
        res.status(200).send(student)
    }else{
        res.status(404).send({message:"iD khong ton tai"})
    }
})
app.post('/', (req, res) => {
    let student = req.body;
    student.id = GenString(16);
    student.MSSV = GenStringNumber(11);
    students.push(student);
    student.isDelete = false;
    res.status(200).send(student);
})

app.put('/:id', (req, res) => {
    let id = req.params.id;
    let student = students.find(p=>p.id==id);
    if(student){
        student.HoTen = req.body.HoTen;
        student.DTB = req.body.DTB;
        res.status(200).send(student)
    }else{
        res.status(404).send({message:"iD khong ton tai"})
    }
 })
 app.delete('/:id', (req, res) => {
    let id = req.params.id;
    let student = students.find(p=>p.id==id && p.isDelete==false);
    if(student){
        student.isDelete=true;
        res.status(200).send(student)
    }else{
        res.status(404).send({message:"iD khong ton tai"})
    }
 })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function GenString(length){
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = "";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random()*source.length);
        result+=source.charAt(rd);
    }
    return result;
}

function GenStringNumber(length){
    let source = "0123456789"
    let result = "";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random()*source.length);
        result+=source.charAt(rd);
    }
    return result;
}
