import axios from "axios";

export function loadData(){
    return(dispatch)=>{
        return axios.get("https://api.myjson.com/bins/1dlper")
        .then(response =>{
            dispatch(getStudents(response.data));
        }).catch(error=>{
            dispatch(fetchFailed(error));
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

export function sortName(students){
    let sortNames = students.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      console.log(sortNames)
      return{
        type:"SORT_NAMES",
        sortStudents:sortNames,
    }

}

export function sortNameZA(students){
    let sortNames = students.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      let reverse = sortNames.reverse();
      return{
          type:"SORT_NAMES_ZA",
          sortStudentsZA:reverse
      }

}

export function sortMarksLH(students){
    let sortMarks = students.sort(function(a, b) {
        return a.totalMarks - b.totalMarks;
      });
      return {
          type:"SORT_MARKS_LH",
          sortMarksLH:sortMarks
      }
}

export function sortMarksHL(students){
    let sortMarks = students.sort(function(a, b) {
        return a.totalMarks - b.totalMarks;
      });
      let reverse = sortMarks.reverse();
      return{
          type:"SORT_MARKS_HL",
          sortMarksHL: reverse
      };
}

export function fetchFailed(){
    return{
        type:"FETCH_FAIL",
        isFetching:false
    }
}
