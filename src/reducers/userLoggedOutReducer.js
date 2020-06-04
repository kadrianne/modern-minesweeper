export default function userLoggedOutReducer(state=null, action){
    switch (action.type) {
        case 'LOG_IN':
            return false
        case 'LOG_OUT':
            return true
        default: 
            return state
    } 
}