import React, { useEffect, useState } from 'react';
import SortIcon from '@material-ui/icons/Sort';
import './style.css';

const Tabular = (props) => {

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
        return (<table className="f6 w-100 mw8 center tabular-table">
            <thead>
                <tr className="stripe-dark">
                    <th>Name</th>
                    <th>English</th>
                    <th>Math</th>
                    <th>Science</th>
                    <th>Total Obtained <a href="#" onClick={() => onSortColumn('total')} ><SortIcon style={{ fontSize: 16 }} /></a></th>
                    <th>Total Outof</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody className="lh-copy">
                {students.length ? students.map(student => (
                    <tr className="stripe-dark" key={student.id}>
                        <td>{student.name}</td>
                        {student.subjects && student.subjects.length ? (student.subjects.map((lan, idx) =>
                            (<td key={idx} className="text-right">{student.marks[idx]}</td>))) : <td> </td>}
                        <td className="text-right">{student.total}</td>
                        <td className="text-right">{student.totalOutof}</td>
                        <td className="text-right">{student.percentage}</td>

                    </tr>
                )) : (<tr className="stripe-dark">
                    <td colSpan="6"></td>
                </tr>)}
            </tbody>
        </table>)
    }
    return (
        <>
            {!students ? (<div>Fetching data...</div>) : (createTable(students))}

        </>
    )
}

export default Tabular;