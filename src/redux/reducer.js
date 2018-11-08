
let defaultState=[];

const mainReducer=(state=defaultState,action)=>{
  console.log(action.type);
  switch(action.type){
    case "GET_STUDENTS":
    return {
      state:action.students,
      students:action.students,
      isFetching:action.isFetching,
      rawData:action.rawData  
    }
    default:
    return {
      ...state
    }
  }
}

export default mainReducer;