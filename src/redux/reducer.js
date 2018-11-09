
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
    default:
    return {
      ...state
    }
  }
}

export default mainReducer;