import {createStore} from "redux";
import {reducer} from "./reducer"

const defaultState = {
    userShoot: null,
    textOnScreen: "Расставьте корабли",
};

let store = createStore(reducer, defaultState);

export {store}