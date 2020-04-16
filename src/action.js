
const changeShootUser = {
    type: "CHANGE_SHOOT_USER",
};

const changeShootAI = {
    type: "CHANGE_SHOOT_AI",
};

const changeTextOnScreen = (text) => {
    return{
        type: "CHANGE_TEXT_ON_SCREEN",
        payload: text
    }
};


export {changeShootUser, changeShootAI, changeTextOnScreen}