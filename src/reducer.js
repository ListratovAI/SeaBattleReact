export function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_SHOOT_USER":
            return {...state, userShoot: true,};
        case "CHANGE_SHOOT_AI":
            return {...state, userShoot: false,};
        case "CHANGE_TEXT_ON_SCREEN":
            return {...state, textOnScreen: action.payload};
        default:
            return state;
    }
}