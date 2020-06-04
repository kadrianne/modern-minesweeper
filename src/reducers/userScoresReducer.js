export default function userScoresReducer(state=[], action){
    switch (action.type) {
        case 'SET_SCORES':
            return [...state, ...action.scores]
        case 'SUBMIT_SCORE':
            return [...state, action.score]
        case 'LOG_OUT':
            return []
        default: 
            return state
    } 
}