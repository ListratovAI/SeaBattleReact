import React from "react";
import {BottomsForPlacing} from "./bottomsForPlacing";
import {Square} from "./square";

class Field extends React.Component {
    addBottomsForPlacing () {
        return <BottomsForPlacing/>
    }

    render () {
        let massStrings = [];
        for (let i = 0; i < 100; i++){
            massStrings.push(<Square
                key={i}
                whereIsShip = {this.props.whereIsShip[i].shipIsHere}
                waitForClick = {this.props.whereIsShip[i].waitForClick}
                shipsShadow = {this.props.whereIsShip[i].shipsShadow}
                canPlaceShipHere = {this.props.whereIsShip[i].canPlaceShipHere}
                onClick = {() => this.props.onClick(i)}
                battleOnClick = {()=> this.props.battleOnClick(i)}
                onMouseOver = {() => this.props.onMouseOver(i)}
                onMouseOut = {() => this.props.onMouseOut(i)}
                shooting = {this.props.whereIsShip[i].shooting}
            />);
        }
        return (
            <div className="field">
                {massStrings}
                {(this.context.whoIsThisField === "user")? this.addBottomsForPlacing(): null}
            </div>
        )
    }
}

export {Field};