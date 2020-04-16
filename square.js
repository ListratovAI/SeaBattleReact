import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Context} from 'index.js';

function Square(props) {
    const context = useContext(Context);

    function userShips() {
        return (
            (props.whereIsShip===4 || props.whereIsShip===3 || props.whereIsShip===2 || props.whereIsShip===1)&&context.whoIsThisField==="user"? "userShip4 ":""
        )}
    function shadowShips() {
        return (
            props.shipsShadow===4 || props.shipsShadow===3 || props.shipsShadow===2 || props.shipsShadow===1? "mouseOver4 ":""
        )}
    function cantShips() {
        return (
            (   (props.shipsShadow===4 && props.canPlaceShipHere===false) || (props.shipsShadow===3 &&
                props.canPlaceShipHere===false) || (props.shipsShadow===2 && props.canPlaceShipHere===false) ||
                (props.shipsShadow===1 && props.canPlaceShipHere===false))? "mouseOverBad4 ":""
        )}
    function failShot() {
        return(
            props.shooting === true && props.whereIsShip ===0? "FailShot ":""
        )}
    function crackShip() {
        return(
            props.shooting === true && props.whereIsShip!==0? "crackShip ":""
        )}
    function hover() {
        return(
            context.userShoot&&context.whoIsThisField==="AI"? "hover ":null
        )}
    return (
        <div
            className = {"square " + userShips() + shadowShips() + cantShips() + failShot() + crackShip() + hover()}
            onClick = {props.waitForClick? ((context.whoIsThisField==="AI")?((context.userShoot)?props.battleOnClick:null) : props.onClick) : null}
            onMouseOver={props.waitForClick&&context.whoIsThisField==="user"? props.onMouseOver : null}
            onMouseOut={props.waitForClick&&context.whoIsThisField==="user"? props.onMouseOut : null}
        />
    )
}

export {Square};