import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SortIcon from '@material-ui/icons/Sort';
import './style.css';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const MUITabular = (props) => {

    const [students, setStudents] = useState([]);
    const [toggle, setToggle] = useState(0);

    const onSortColumn = (type) => {
        // event.preventDefault();

        switch (type) {
            case 'total':
                const sortedStudents = !toggle ? students.sort((a, b) => a.total - b.total) : students.sort((a, b) => b.total - a.total);

                console.log({ sortedStudents });
                setToggle(!toggle);
                setStudents(prevState => sortedStudents)
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        setStudents(prevState => props.data)
    });

    const createTable = (students) => {

        const classes = useStyles();

        return (
            <>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">English</TableCell>
                                <TableCell align="right">Math</TableCell>
                                <TableCell align="right">Science</TableCell>
                                <TableCell align="right">Total Obtained <a href="#" onClick={() => onSortColumn('total')} ><SortIcon style={{ fontSize: 16 }} /></a></TableCell>
                                <TableCell align="right">Total Outof</TableCell>
                                <TableCell align="right">Percentage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.length ? students.map(student => (
                                <TableRow className="stripe-dark" key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    {student.subjects && student.subjects.length ? (student.subjects.map((lan, idx) =>
                                        (<TableCell key={idx} className="text-right">{student.marks[idx]}</TableCell>))) : <TableCell> </TableCell>}
                                    <TableCell className="text-right">{student.total}</TableCell>
                                    <TableCell className="text-right">{student.totalOutof}</TableCell>
                                    <TableCell className="text-right">{student.percentage}</TableCell>

                                </TableRow>
                            )) : (<TableRow className="stripe-dark">
                                <TableCell colSpan="6"></TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
    return (
        <>
            {!students ? (<div>Fetching data...</div>) : (createTable(students))}

        </>
    )
}

export default MUITabular;