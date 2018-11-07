let defaultState=[];

const mainReducer=(state=defaultState,action)=>{
  console.log(action.type);
  switch(action.type){
    case "GET_STUDENTS":
    return {
      ...state,
      students:action.students  
    }
    default:
    return {
      ...state
    }
  }
}

export default mainReducer;