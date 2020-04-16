import React from "react";
import arrow from './img/arrow.png';
import {store} from "./store";

class CenterField extends React.Component {

    information() {
        const classes = "information " + (this.props.colorScreen===null?null:(this.props.colorScreen)? "informationRed":"informationGreen");
        return (
            <div className={classes}>
                <p>
                    {store.getState().textOnScreen}
                </p>
            </div>
        );
    };
    arrow() {
        if (store.getState().userShoot!==null&&this.props.userCounter!==0&&this.props.AICounter!==0){
            const classes = "arrow "+(store.getState().userShoot? "arrow180":null);
            return (
                <img
                    className={classes}
                    src={arrow}
                    alt="=>"
                />
            );
        }
    };
    startGame() {
        if (store.getState().userShoot===null) {
            return (
                <button
                    className="startGame"
                    onClick={() => this.props.clickOnStartGame()}
                >
                    Начать игру
                </button>
            );
        }
    };
    replacing() {
        if (store.getState().userShoot===null) {
            return (
                <button
                    className="replacing"
                    onClick={() => this.props.replacing()}
                >
                    Перереспределить корабли
                </button>
            );
        }
    };
    render () {
        return (
            <div className="centerField">
                {this.information()}
                {this.arrow()}
                {this.startGame()}
                {this.replacing()}
            </div>
        )
    }
}

export {CenterField};