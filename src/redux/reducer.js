
let defaultState=[];

const mainReducer=(state=defaultState,action)=>{
  console.log(action.type);
  switch(action.type){
    case "GET_STUDENTS":
    return {
      ...state,
      students:action.students,
      isFetching:action.isFetching,
      rawData:action.rawData  
    }
    case "SORT_NAMES":
    console.log(action.sortStudents);
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
      sortMarksHL:state.sortMarksHL
    }
    default:
    return {
      ...state
    }
  }
}

export default mainReducer;