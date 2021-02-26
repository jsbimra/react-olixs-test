export const STUDENTS_API = './../../data/students.json'

export const getStudents = () => {

    return fetch(STUDENTS_API, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json());
}

export const calculateTotalMarks = marks => {
    let sum = 0;
    if (marks.length) {
        for (let mark of marks) {
            sum += parseInt(mark);
        }
    }
    return sum;
};

export const totalMarksOutof = (marks) => {
    let outof = 0;
    if (marks) {
        outof = parseInt(marks * 100);
    }
    return outof;
};

export const calculatePercentage = (obtained, outof) => {
    let percentage = 0;
    if (obtained === '' || outof === '') return percentage;
    percentage = Math.floor((obtained / outof * 100), 2)
    return percentage + '%';
};