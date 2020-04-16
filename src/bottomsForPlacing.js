import React from "react";
import {store} from "./store";

class BottomsForPlacing extends React.Component{
    renderShip1(){
        if (this.context.deleteButton.one.deleteThis === false)
            return (<button
                    className="buttonShip1"
                    onClick={()=>this.context.onClickButton(1)}
                >
                    {this.context.deleteButton.one.counterToDelete}
                </button>
            );
    }
    renderShip2(){
        if (this.context.deleteButton.two.deleteThis === false)
            return (<button
                    className="buttonShip2"
                    onClick={()=>this.context.onClickButton(2)}
                >
                    {this.context.deleteButton.two.counterToDelete}
                </button>
            );
    }
    renderShip3(){
        if (this.context.deleteButton.three.deleteThis===false)
            return (<button
                    className="buttonShip3"
                    onClick={()=>this.context.onClickButton(3)}
                >
                    {this.context.deleteButton.three.counterToDelete}
                </button>
            );
    }
    renderShip4(){
        if (this.context.deleteButton.four.deleteThis === false)
            return (<button
                    className="buttonShip4"
                    onClick={()=>this.context.onClickButton(4)}
                >
                    {this.context.deleteButton.four.counterToDelete}
                </button>
            );
    }
    renderAuto(){
        if (store.getState().userShoot===null){
            return (<button
                className="buttomAutoPlasing"
                onClick={this.context.onClickButtonAuto}
            >АВТОМАТИЧЕСКИ</button>);
        }
    }
    render () {
        return (<div className="buttomsForChange">
                {this.renderAuto()}
                <div className="buttomsShips">
                    {this.renderShip4()}
                    {this.renderShip3()}
                    {this.renderShip2()}
                    {this.renderShip1()}
                </div>
            </div>
        )
    }
}

export {BottomsForPlacing};