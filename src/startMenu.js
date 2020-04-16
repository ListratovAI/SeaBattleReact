import React from 'react';
import helm from "./img/helm.png";
import './index.css';
import {WrappedGame} from "./game.js";
import {
    Switch,
    Route,
    Link
} from 'react-router-dom';

function Menu(props) {
    return(
        <div className="containerStart">
            <div className="seaBattle">
                <div>
                    <img src={helm}/>
                </div>
                <div className="seaBattleInt">
                    <p>Морской бой</p>
                </div>
                <div>
                    <img src={helm}/>
                </div>
            </div>
            <div className="rules">
                <p>
                    «Морской бой» — игра для двух участников, в которой игроки по очереди называют координаты
                    на неизвестной им карте соперника.
                    <br/><br/>
                     Если у соперника по этим координатам имеется корабль (координаты заняты), то корабль или его
                     часть «топится», а попавший получает право сделать ещё один ход. Цель игрока — первым потопить
                     все корабли противника.
                </p>
            </div>
            <Link to="game">
                <button className="seaBattleBottom">
                    <p>
                        Начать игру!
                    </p>
                </button>
            </Link>
        </div>
    )
}

function StartMenu(props) {
    return(
        <Switch>
            <Route path="/game" exact component={WrappedGame}/>
            <Route path="/" exact component={Menu}/>
        </Switch>
    )
}

export {StartMenu};