import React, { useEffect, useState } from 'react';
import { calculatePercentage, calculateTotalMarks, getStudents, totalMarksOutof } from '../../services';
import MUITabular from '../mui-tabular';
import Tabular from '../tabular';

const Students = (props) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents().then(data => {
            if (!data.students) return;
            data.students.forEach(student => {
                student['total'] = calculateTotalMarks(student.marks);
                student['totalOutof'] = totalMarksOutof(student.marks.length);
                student['percentage'] = calculatePercentage(calculateTotalMarks(student.marks), totalMarksOutof(student.marks.length))
            });

            setStudents(prevState => {
                return data.students

            })
        });
    }, [])


    return (
        <div>
            <h2>Students Marks Board</h2>
            <Tabular data={students} />


            <h2>Using Material UI (alternative)</h2>
            <MUITabular data={students} />
        </div>
    )
}

export default Students;