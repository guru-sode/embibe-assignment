import axios from "axios";

console.log('in action')
export function loadData(){
    return(dispatch)=>{
        return axios.get("https://api.myjson.com/bins/1dlper").then((response)=>{
            dispatch(getStudents(response.data));
        })
    }
}

export function getStudents(students){
  console.log(students);
    return{
        type:"GET_STUDENTS",
        students:students
    }
}
