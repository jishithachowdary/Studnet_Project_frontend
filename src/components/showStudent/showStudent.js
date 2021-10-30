import React,{useState,useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default function ShowStudent() {

    const [studentsList,setStudentsList]=useState([]); 

    const deleteStudent=(id)=>{
        axios.delete(`https://student-data-jishitha.herokuapp.com/students/${id}`).then(()=>{
            window.location.reload(false);
        })
    }

    useEffect(()=>{
        axios.get('https://student-data-jishitha.herokuapp.com/students').then((allStudents)=>{
            setStudentsList(allStudents.data);
        })
    },[])

  return (
      <>
        <h2>All Students</h2> 
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="right">Registration No</TableCell>
                <TableCell align="right">Student Name</TableCell>
                <TableCell align="right">Grade</TableCell>
                <TableCell align="right">Section</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {studentsList.map((student,key) => (
                <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="right">{student.regNo}</TableCell>
                <TableCell align="right">{student.studentName}</TableCell>
                <TableCell align="right">{student.grade}</TableCell>
                <TableCell align="right">{student.section}</TableCell>
                <TableCell align="right"><IconButton aria-label="delete"  onClick={()=>deleteStudent(student._id)}>
  <DeleteIcon />
</IconButton></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}
