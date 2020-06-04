export default function scoreSubmittedReducer(state=false, action){
    switch (action.type) {
        case 'SUBMIT_SCORE':
            return true
        case 'RESET':
            return false
        default: 
            return state
    } 
}