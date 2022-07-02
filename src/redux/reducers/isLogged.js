const initialState = {
    isLogged: localStorage.getItem('token')
}

const loggedReducer = (state=initialState, action)=>{
    switch(action.type) {
        case "SIGN_IN":
            return {isLogged:true};
        case "SIGN_OUT":
            return {isLogged:false};
        default:
            return state;
    }
}

export default loggedReducer;