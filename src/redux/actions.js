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
    let indMarks={};
    id = Object.keys(data);
        id.map(student => {
            indMarks= (data[student]['marks']);
          marks = Object.values(data[student]['marks']);
          marks.map(mark => {
            sum = sum + mark;
            return sum;
          });
          totalMarks.push(sum);
          students.push({
            name: data[student]['name'],
            rollNo: data[student]['rollNo'],
            class:data[student]['class'],
            totalMarks: sum,
            indMarks: indMarks,
          });
          sum = 0;
          return totalMarks;
        });
    return{
        type:"GET_STUDENTS",
        students:students,
        isFetching: true,
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

export function searchNames(students,input){
    let search = '^' + input;
    let flag = 'i';
    let reg = new RegExp(search, flag);
    let newStudents = [];
    students.map(student => {
      if (reg.test(student['name'])) {
        newStudents.push(student);
      }
      return newStudents;
    });
    return{
        type:"SEARCH",
        searchResult: newStudents,
    }
}

export function fetchFailed(){
    return{
        type:"FETCH_FAIL",
        isFetching:false
    }
}
