import axios from "axios";

export function loadData(){
    return(dispatch)=>{
        return axios.get("https://api.myjson.com/bins/1dlper")
        .then(response =>{
            dispatch(getStudents(response.data));
        })
    }
}

export function getStudents(data){
    let id;
    let marks;
    let sum = 0;
    let totalMarks = [];
    let students = [];
    id = Object.keys(data);
        id.map(student => {
          marks = Object.values(data[student]['marks']);
          marks.map(mark => {
            sum = sum + mark;
            return sum;
          });
          totalMarks.push(sum);
          students.push({
            name: data[student]['name'],
            rollNo: data[student]['rollNo'],
            totalMarks: sum
          });
          sum = 0;
          return totalMarks;
        });
    return{
        type:"GET_STUDENTS",
        students:students,
        isFetching: true,
        rawData:data
    }
}
