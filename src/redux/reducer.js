
let defaultState=[];

const mainReducer=(state=defaultState,action)=>{
  switch(action.type){
    case "GET_STUDENTS":
    return {
      ...state,
      students:action.students,
      isFetching:action.isFetching,
      rawData:action.rawData  
    }
    case "SORT_NAMES":
    return{
      ...state,
      sortNames:action.sortStudents
    }
    case "SORT_NAMES_ZA":
    return{
      ...state,
      sortNamesZA:action.sortNamesZA
    }
    case "SORT_MARKS_LH":
    return{
      ...state,
      sortMarksLH:action.sortMarksLH
    }
    case "SORT_MARKS_HL":
    return{
      ...state,
      sortMarksHL:action.sortMarksHL
    }
    case "FETCH_FAIL":
    return{
      ...state,
      isFetching:action.isFetching
    }
    default:
    return {
      ...state
    }
  }
}

export default mainReducer;