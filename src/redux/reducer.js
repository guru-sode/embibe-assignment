
let defaultState=[];

const mainReducer=(state=defaultState,action)=>{
  switch(action.type){
    case "GET_STUDENTS":
    return {
      ...state,
      students:action.students,
      isFetching:action.isFetching, 
    }
    case "SORT_NAMES":
    return{
      ...state,
      students:action.sortStudents
    }
    case "SORT_NAMES_ZA":
    return{
      ...state,
      students:action.sortStudentsZA
    }
    case "SORT_MARKS_LH":
    return{
      ...state,
      students:action.sortMarksLH
    }
    case "SORT_MARKS_HL":
    return{
      ...state,
      students:action.sortMarksHL
    }
    case "SEARCH":
    return{
      ...state,
      students:action.searchResult,
    }
    case "FETCH_FAIL":
    return{
      ...state,
      students:action.isFetching
    }
    default:
    return {
      ...state
    }
  }
}

export default mainReducer;