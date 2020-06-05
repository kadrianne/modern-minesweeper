export default function scoreFormOpenReducer(state=false, action){
    switch (action.type) {
        case 'OPEN_FORM':
            return true
        case 'CLOSE_FORM':
            return false
        case 'RESET':
            return false
        default: 
            return state
    } 
}