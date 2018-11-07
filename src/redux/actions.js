import axios from "axios";

export function loadData(){
    return(dispatch)=>{
        return axios.get("https://api.myjson.com/bins/1dlper").then((response)=>{
            dispatch(getStudents(response.data));
        })
    }
}

export function getStudents(students){
    return{
        type:"GET_STUDENTS",
        students:students
    }
}
