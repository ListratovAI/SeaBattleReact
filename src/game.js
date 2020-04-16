import React from "react";
import helm from "./img/helm.png";
import {Field} from "./field";
import {CenterField} from "./centerField";
import {BottomsForPlacing} from "./bottomsForPlacing";
import {store} from "./store";
import {changeShootUser, changeShootAI} from './action.js'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeTextOnScreen} from "./action";

class Game extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            fieldAI: this.plasingShips(),
            fieldUser: Array(100).fill({
                shipIsHere: 0,
                shipsShadow: 0,
                waitForClick: false,
                canPlaceShipHere: true,
                shooting: false,
                numberOfShip: 0,
            }),
            pressBotton: 0,
            directionShip: true,
            deleteBotton: {
                four: {
                    deleteThis: false,
                    counterToDelete: 1,
                },
                three: {
                    deleteThis: false,
                    counterToDelete: 2,
                },
                two: {
                    deleteThis: false,
                    counterToDelete: 3,
                },
                one: {
                    deleteThis: false,
                    counterToDelete: 4,
                },
            },
            userHealth: {
                fourDesk: 4,
                threeDeskOne: 3,
                threeDeskTwo: 3,
                twoDeskOne: 2,
                twoDeskTwo: 2,
                twoDeskThree: 2,
            },
            AIHealth: {
                fourDesk: 4,
                threeDeskOne: 3,
                threeDeskTwo: 3,
                twoDeskOne: 2,
                twoDeskTwo: 2,
                twoDeskThree: 2,
            },
            userCoordinates: {
                fourDesk: [],
                threeDeskOne: [],
                threeDeskTwo: [],
                twoDeskOne: [],
                twoDeskTwo: [],
                twoDeskThree: [],
            },
            AICoordinates: {
                fourDesk: [],
                threeDeskOne: [],
                threeDeskTwo: [],
                twoDeskOne: [],
                twoDeskTwo: [],
                twoDeskThree: [],
            },
            angryMode1: false,
            angryMode2: false,
            angryMode3: false,
            firstShootCoordinate: null,
            secondShootCoordinate: null,
            thirdShootCoordinate: null,
            userCounter: 10,
            AICounter: 10,
            colorScreen: null,
        };
    }
    plasingShips() {  //возьмём двумерный массив, расставим в нём корабли, установим соответственно состояние и вернём координаты кораблей
        let intMass = Array(100).fill({
            shipIsHere: 0,
            waitForClick: true,
            shooting: false,
            numberOfShip: 0,
        });
        let massForAutoPlasing = [];
        for (let i = 0; i < 10; i++) {
            // massForAutoPlasing[i] = Array(10).fill({
            //     label: false,
            //     labelShooting: false,
            //     shipIsHere: 0,
            //     numberOfThisTypeShip: 0,});
            massForAutoPlasing[i] = [];
            for (let j = 0; j < 10; j++){
                massForAutoPlasing[i][j] = {
                    label: false,
                    labelShooting: false,
                    shipIsHere: 0,
                    numberOfThisTypeShip: 0,
                }
            }
        }
        const coordinatesShip4 = autoPlasing(massForAutoPlasing, 4, 1);
        intMass.splice(coordinatesShip4[0],1,{shipIsHere: 4, waitForClick: true, shooting: false, numberOfShip: 1});
        intMass.splice(coordinatesShip4[1],1,{shipIsHere: 4, waitForClick: true, shooting: false, numberOfShip: 1});
        intMass.splice(coordinatesShip4[2],1,{shipIsHere: 4, waitForClick: true, shooting: false, numberOfShip: 1});
        intMass.splice(coordinatesShip4[3],1,{shipIsHere: 4, waitForClick: true, shooting: false, numberOfShip: 1});
        const coordinatesShip31 = autoPlasing(massForAutoPlasing, 3, 1);
        intMass.splice(coordinatesShip31[0],1,{shipIsHere: 3, waitForClick: true, shooting: false, numberOfShip: 1});
        intMass.splice(coordinatesShip31[1],1,{shipIsHere: 3, waitForClick: true, shooting: false, numberOfShip: 1});
        intMass.splice(coordinatesShip31[2],1,{shipIsHere: 3, waitForClick: true, shooting: false, numberOfShip: 1});
        const coordinatesShip32 = autoPlasing(massForAutoPlasing, 3, 2);
        intMass.splice(coordinatesShip32[0],1,{shipIsHere: 3, waitForClick: true, shooting: false, numberOfShip: 2});
        intMass.splice(coordinatesShip32[1],1,{shipIsHere: 3, waitForClick: true, shooting: false, numberOfShip: 2});
        intMass.splice(coordinatesShip32[2],1,{shipIsHere: 3, waitForClick: true, shooting: false, numberOfShip: 2});
        const coordinatesShip21 = autoPlasing(massForAutoPlasing, 2, 1);
        intMass.splice(coordinatesShip21[0],1,{shipIsHere: 2, waitForClick: true, shooting: false, numberOfShip: 1});
        intMass.splice(coordinatesShip21[1],1,{shipIsHere: 2, waitForClick: true, shooting: false, numberOfShip: 1});
        const coordinatesShip22 = autoPlasing(massForAutoPlasing, 2, 2);
        intMass.splice(coordinatesShip22[0],1,{shipIsHere: 2, waitForClick: true, shooting: false, numberOfShip: 2});
        intMass.splice(coordinatesShip22[1],1,{shipIsHere: 2, waitForClick: true, shooting: false, numberOfShip: 2});
        const coordinatesShip23 = autoPlasing(massForAutoPlasing, 2, 3);
        intMass.splice(coordinatesShip23[0],1,{shipIsHere: 2, waitForClick: true, shooting: false, numberOfShip: 3});
        intMass.splice(coordinatesShip23[1],1,{shipIsHere: 2, waitForClick: true, shooting: false, numberOfShip: 3});
        const coordinatesShip11 = autoPlasing(massForAutoPlasing, 1, 1);
        intMass.splice(coordinatesShip11[0],1,{shipIsHere: 1, waitForClick: true, shooting: false, numberOfShip: 1});
        const coordinatesShip12 = autoPlasing(massForAutoPlasing, 1, 2);
        intMass.splice(coordinatesShip12[0],1,{shipIsHere: 1, waitForClick: true, shooting: false, numberOfShip: 2});
        const coordinatesShip13 = autoPlasing(massForAutoPlasing, 1, 3);
        intMass.splice(coordinatesShip13[0],1,{shipIsHere: 1, waitForClick: true, shooting: false, numberOfShip: 3});
        const coordinatesShip14 = autoPlasing(massForAutoPlasing, 1, 4);
        intMass.splice(coordinatesShip14[0],1,{shipIsHere: 1, waitForClick: true, shooting: false, numberOfShip: 4});
        return intMass;
    }
    addEventClickForField(i) {
        let intMass = this.state.fieldUser.slice();
        intMass.forEach((element) => element.waitForClick = true);
        this.setState({
            fieldUser: intMass.slice(),
            pressBotton: i,
        });
    }
    deleteEventClickForField() {
        let intMass = this.state.fieldUser.slice();
        intMass.forEach((element) => element.waitForClick = false);
        this.setState({
            fieldUser: intMass.slice(),
            pressBotton: null,
        });
    }
    checkCanPlaceShip(i) {
        for (let j = 0; j < this.state.pressBotton; j++){
            if (this.state.fieldUser[this.changeDirection(i,j)].canPlaceShipHere === false){
                return false;
            }
        }
        return true;
    }
    handlePlasingShip(i){
        if (this.checkCanPlaceShip(i)) {
            let intMass = this.state.fieldUser.slice();
            let intObject = Object.assign({}, this.state.deleteBotton);
            for (let j = 0; j < this.state.pressBotton; j++) {
                let changeKThis = this.changeDirection.bind(this);
                let k = changeKThis(i, j);
                let intMassWithCantPlaceShip = this.impossibilityPlaceShipHere(intMass, k);
                intMass = intMassWithCantPlaceShip.slice();
                let tempForTrueObject = Object.assign({}, intMass[k]);
                tempForTrueObject.shipIsHere = this.state.pressBotton;
                tempForTrueObject.shipsShadow = 0;
                tempForTrueObject.canPlaceShipHere = false;
                if (this.state.pressBotton === 4) {
                    tempForTrueObject.numberOfShip = 1;
                }
                else if(this.state.pressBotton === 3) {
                    tempForTrueObject.numberOfShip = intObject.three.counterToDelete;
                }
                else if(this.state.pressBotton === 2) {
                    tempForTrueObject.numberOfShip = intObject.two.counterToDelete;
                }
                else if(this.state.pressBotton === 1) {
                    tempForTrueObject.numberOfShip = intObject.one.counterToDelete;
                }
                intMass.splice(k, 1, tempForTrueObject);
            }
            console.log(intMass);
            this.deleteEventClickForField();
            if (this.state.pressBotton === 4) {
                intObject.four.deleteThis = true;
                this.setState({
                    deleteBotton: Object.assign({}, intObject)
                });
                console.log(this.state.deleteBotton);
            } else if (this.state.pressBotton === 3 && this.state.deleteBotton.three.counterToDelete > 1) {
                intObject.three.counterToDelete = 1;
                this.setState({
                    deleteBotton: Object.assign({}, intObject)
                });
            } else if (this.state.pressBotton === 3 && this.state.deleteBotton.three.counterToDelete === 1) {
                intObject.three.deleteThis = true;
                this.setState({
                    deleteBotton: Object.assign({}, intObject)
                });
                console.log(this.state.deleteBotton);
            } else if (this.state.pressBotton === 2 && this.state.deleteBotton.two.counterToDelete > 1) {
                intObject.two.counterToDelete--;
                this.setState({
                    deleteBotton: Object.assign({}, intObject)
                });
            } else if (this.state.pressBotton === 2 && this.state.deleteBotton.two.counterToDelete === 1) {
                intObject.two.deleteThis = true;
                this.setState({
                    deleteBotton: Object.assign({}, intObject)
                });
                console.log(this.state.deleteBotton);
            } else if (this.state.pressBotton === 1 && this.state.deleteBotton.one.counterToDelete > 1) {
                intObject.one.counterToDelete--;
                this.setState({
                    deleteBotton: Object.assign({}, intObject)
                });
            } else if (this.state.pressBotton === 1 && this.state.deleteBotton.one.counterToDelete === 1) {
                intObject.one.deleteThis = true;
                this.setState({
                    deleteBotton: Object.assign({}, intObject)
                });
                console.log(this.state.deleteBotton);
            }
            this.setState({
                fieldUser: intMass.slice(),
            });
        }
        else {
            alert("Здесь поставить корабль нельзя");
        }
    }
    impossibilityPlaceShipHere(intMass, i) {
        let intMassTemp = intMass.slice();
        if (Math.floor((i + 1)/10) === Math.floor((i)/10)) {
            //intMassTemp[i+1].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i+1]);
            intObject1.canPlaceShipHere = false;
            intMassTemp.splice(i+1,1,intObject1);
        }
        if (Math.floor((i - 1)/10) === Math.floor((i)/10)) {
            //intMassTemp[i-1].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i-1]);
            intObject1.canPlaceShipHere = false;
            intMassTemp.splice(i-1,1,intObject1);
        }
        if (i + 10 < 100 ) {
            //intMassTemp[i+10].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i+10]);
            intObject1.canPlaceShipHere = false;
            intMassTemp.splice(i+10,1,intObject1);
        }
        if (i - 10 > 0 ) {
            //intMassTemp[i-10].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i-10]);
            intObject1.canPlaceShipHere = false;
            intMassTemp.splice(i-10,1,intObject1);
        }
        if (i + 11 < 99 && Math.floor((i + 11)/10) === Math.floor((i+10)/10)) {
            //intMassTemp[i+11].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i+11]);
            intObject1.canPlaceShipHere = false;
            intMassTemp.splice(i+11,1,intObject1);
        }
        if (i + 9 < 99 && Math.floor((i + 9)/10) === Math.floor((i+10)/10)) {
            //intMassTemp[i+9].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i+9]);
            intObject1.canPlaceShipHere = false;
            intMassTemp.splice(i+9,1,intObject1);
        }
        if (i - 11 > 0 && Math.floor((i - 11)/10) === Math.floor((i-10)/10)) {
            //intMassTemp[i-11].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i-11]);
            intObject1.canPlaceShipHere = false;
            intMassTemp.splice(i-11,1,intObject1);
        }
        if (i - 9 > 0 && Math.floor((i - 9)/10) === Math.floor((i-10)/10)) {
            //intMassTemp[i-9].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i-9]);
            intObject1.canPlaceShipHere = false;
            intMassTemp.splice(i-9,1,intObject1);
        }
        return (intMassTemp);
    }
    handleOverShip(i) {
        let intMass = this.state.fieldUser.slice();
        for (let j = 0; j < this.state.pressBotton; j++){
            let changeKThis = this.changeDirection.bind(this);
            let k = changeKThis(i, j);
            let tempForTrueObject = Object.assign({},intMass[k]);
            tempForTrueObject.shipsShadow = this.state.pressBotton;
            intMass.splice(k, 1, tempForTrueObject);
        }
        this.setState({
            fieldUser: intMass.slice(),
        });
    }
    handleOutShip(i) {
        let intMass = this.state.fieldUser.slice();
        for (let j = 0; j < this.state.pressBotton; j++){
            let changeKThis = this.changeDirection.bind(this);
            let k = changeKThis(i, j);
            let tempForTrueObject = Object.assign({},intMass[k]);
            tempForTrueObject.shipsShadow = 0;
            intMass.splice(k, 1, tempForTrueObject);
        }
        this.setState({
            fieldUser: intMass.slice(),
        });
    }
    changeDirection(i,j){
        if (this.state.directionShip === true) {
            return (i + this.state.pressBotton*10 > 99? (i - j * 10) : (i + j * 10));
        }
        else {
            return (Math.floor(i/10) !== Math.floor((i+this.state.pressBotton)/10)? (i - j): (i + j));
        }
    }
    autoPlasingShip(){
        this.setState({
            fieldUser: this.plasingShips(),
            deleteBotton: {
                four: {
                    deleteThis: true,
                    counterToDelete: 1,
                },
                three: {
                    deleteThis: true,
                    counterToDelete: 1,
                },
                two: {
                    deleteThis: true,
                    counterToDelete: 1,
                },
                one: {
                    deleteThis: true,
                    counterToDelete: 1,
                },
            }
        });
    }
    onKeyPressed(e){ //переключаем по пробелу направление корабля
        if (e.keyCode===32){
            const temp = this.state.directionShip;
            let intMass = this.state.fieldUser.slice();
            intMass.forEach((element) => element.shipsShadow = 0);
            this.setState({
                fieldUser: intMass.slice(),
                directionShip: !temp,
            })
        }
        console.log(this.state.directionShip);
    }
    clickOnStartGame(){
        if (this.state.deleteBotton.four.counterToDelete === 1 && this.state.deleteBotton.three.counterToDelete === 1 &&
            this.state.deleteBotton.two.counterToDelete === 1 && this.state.deleteBotton.one.counterToDelete === 1){
            const whoFirst = getRandomBoolean();
            if (whoFirst) {
                this.props.changeTextOnScreen("Ход противника!");
                store.dispatch(changeShootAI);
                this.restartAI();
            }
            else {
                this.props.changeTextOnScreen("Ваш ход!");
                store.dispatch(changeShootUser);
                this.addEventClickForAIField();
            }
        }
        else {
            alert("Вы не расставили корабли");
        }
    };
    addEventClickForAIField() {
        let intMass = this.state.fieldAI.slice();
        intMass.forEach((element) => element.waitForClick = true);
        this.setState({
            fieldAI: intMass.slice(),
        });
        store.dispatch(changeShootUser);
    };
    deleteEventClickForAIField() {
        let intMass = this.state.fieldAI.slice();
        intMass.forEach((element) => element.waitForClick = false);
        this.setState({
            fieldAI: intMass.slice(),
        });
        store.dispatch(changeShootAI);
    };
    battleAI() {
        let needToShooting = false;
        let intMass = this.state.fieldUser.slice();
        let shooting = () => {
            let shoot;
            if (this.state.angryMode1 === false) {
                do {
                    shoot = getRandom(0, 99);
                }
                while (intMass[shoot].shooting === true);
            }
            else if (this.state.angryMode1 === true && this.state.angryMode2 === false){
                let bad = false;
                do {
                    do {
                        let direction = getRandom(0, 3);
                        if (direction === 0 && Math.floor((this.state.firstShootCoordinate + 1) / 10) === Math.floor((this.state.firstShootCoordinate) / 10)) {
                            shoot = this.state.firstShootCoordinate + 1;
                            bad = false;
                        } else if (direction === 1 && this.state.firstShootCoordinate + 10 < 100) {
                            shoot = this.state.firstShootCoordinate + 10;
                            bad = false;
                        } else if (direction === 2 && this.state.firstShootCoordinate - 10 >= 0) {
                            shoot = this.state.firstShootCoordinate - 10;
                            bad = false;
                        } else if (direction === 3 && Math.floor((this.state.firstShootCoordinate - 1) / 10) === Math.floor((this.state.firstShootCoordinate) / 10)) {
                            shoot = this.state.firstShootCoordinate - 1;
                            bad = false;
                        }
                        else {
                            bad = true;
                        }
                    }
                    while (bad === true);
                }
                while (intMass[shoot].shooting === true);
            }
            else if (this.state.angryMode2 === true && this.state.angryMode3 === false){
                if (Math.abs(this.state.firstShootCoordinate - this.state.secondShootCoordinate) === 1){
                    if (intMass[this.state.secondShootCoordinate+1].shooting === false){
                        shoot = this.state.secondShootCoordinate+1;
                    }
                    else if (intMass[this.state.secondShootCoordinate-1].shooting === false) {
                        shoot = this.state.secondShootCoordinate-1;
                    }
                    else if (intMass[this.state.firstShootCoordinate+1].shooting === false) {
                        shoot = this.state.firstShootCoordinate+1;
                    }
                    else if (intMass[this.state.firstShootCoordinate-1].shooting === false) {
                        shoot = this.state.firstShootCoordinate-1;
                    }
                }
                else if (Math.abs(this.state.firstShootCoordinate - this.state.secondShootCoordinate) === 10){
                    if (intMass[this.state.secondShootCoordinate+10].shooting === false){
                        shoot = this.state.secondShootCoordinate+10;
                    }
                    else if (intMass[this.state.secondShootCoordinate-10].shooting === false) {
                        shoot = this.state.secondShootCoordinate-10;
                    }
                    else if (intMass[this.state.firstShootCoordinate+10].shooting === false) {
                        shoot = this.state.firstShootCoordinate+10;
                    }
                    else if (intMass[this.state.firstShootCoordinate-10].shooting === false) {
                        shoot = this.state.firstShootCoordinate-10;
                    }
                }
            }
            else if (this.state.angryMode3 === true){
                if (Math.abs(this.state.firstShootCoordinate - this.state.secondShootCoordinate) === 1){
                    if (intMass[this.state.thirdShootCoordinate+1].shooting === false){
                        shoot = this.state.thirdShootCoordinate+1;
                    }
                    else if (intMass[this.state.thirdShootCoordinate-1].shooting === false) {
                        shoot = this.state.thirdShootCoordinate - 1;
                    }
                    else if (intMass[this.state.secondShootCoordinate+1].shooting === false){
                        shoot = this.state.secondShootCoordinate+1;
                    }
                    else if (intMass[this.state.secondShootCoordinate-1].shooting === false) {
                        shoot = this.state.secondShootCoordinate-1;
                    }
                    else if (intMass[this.state.firstShootCoordinate+1].shooting === false) {
                        shoot = this.state.firstShootCoordinate+1;
                    }
                    else if (intMass[this.state.firstShootCoordinate-1].shooting === false) {
                        shoot = this.state.firstShootCoordinate-1;
                    }
                }
                else if (Math.abs(this.state.firstShootCoordinate - this.state.secondShootCoordinate) === 10){
                    if (intMass[this.state.thirdShootCoordinate+10].shooting === false){
                        shoot = this.state.thirdShootCoordinate+10;
                    }
                    else if (intMass[this.state.thirdShootCoordinate-10].shooting === false) {
                        shoot = this.state.thirdShootCoordinate - 10;
                    }
                    if (intMass[this.state.secondShootCoordinate+10].shooting === false){
                        shoot = this.state.secondShootCoordinate+10;
                    }
                    else if (intMass[this.state.secondShootCoordinate-10].shooting === false) {
                        shoot = this.state.secondShootCoordinate-10;
                    }
                    else if (intMass[this.state.firstShootCoordinate+10].shooting === false) {
                        shoot = this.state.firstShootCoordinate+10;
                    }
                    else if (intMass[this.state.firstShootCoordinate-10].shooting === false) {
                        shoot = this.state.firstShootCoordinate-10;
                    }
                }
            }
            return shoot;
        };
        const shoot = shooting();
        let intObject = Object.assign({}, intMass[shoot]);
        intObject.shooting = true;
        intMass.splice(shoot, 1, intObject);
        if (this.state.fieldUser[shoot].shipIsHere === 4) {
            let userCoordinatesObject = Object.assign({},this.state.userCoordinates);
            let changeUserCoordinates;
            let userHealth = Object.assign({}, this.state.userHealth);
            changeUserCoordinates = userCoordinatesObject.fourDesk.slice();
            changeUserCoordinates[this.state.userHealth.fourDesk-1] = shoot;
            userCoordinatesObject.fourDesk = changeUserCoordinates;
            --userHealth.fourDesk;
            if(this.state.angryMode1 === false && userHealth.fourDesk !==0){
                this.setState({
                    angryMode1: true,
                    firstShootCoordinate: shoot,
                    colorScreen: true,
                });
                this.props.changeTextOnScreen("В ваш корабль попали!");
            }
            else if(this.state.angryMode1 === true && this.state.angryMode2 === false && userHealth.fourDesk !==0){
                this.setState({
                    angryMode2: true,
                    secondShootCoordinate: shoot,
                    colorScreen: true,
                });
                this.props.changeTextOnScreen("В ваш корабль попали!");
            }
            else if(this.state.angryMode2 === true && this.state.angryMode3 === false && userHealth.fourDesk !==0){
                //alert("В ваш четырёхпалубный корабль попали!");
                this.setState({
                    angryMode3: true,
                    thirdShootCoordinate: shoot,
                    colorScreen: true,
                });
                this.props.changeTextOnScreen("В ваш корабль попали!");
            }
            else if(userHealth.fourDesk === 0){
                //alert("Ваш четырёхпалубный корабль потопили!");
                let intMass2 = this.impossibilityShootAround(intMass, this.state.firstShootCoordinate);
                intMass = intMass2.slice();
                let intMass3 = this.impossibilityShootAround(intMass, this.state.secondShootCoordinate);
                intMass = intMass3.slice();
                let intMass4 = this.impossibilityShootAround(intMass, this.state.thirdShootCoordinate);
                intMass = intMass4.slice();
                let intMass5 = this.impossibilityShootAround(intMass, shoot);
                intMass = intMass5.slice();
                this.setState({
                    angryMode1: false,
                    angryMode2: false,
                    angryMode3: false,
                    colorScreen: true,
                });
                this.props.changeTextOnScreen("Ваш четырёхпалубный корабль потопили!");
                this.doYouFail();
            }
            this.setState({
                userCoordinates: userCoordinatesObject,
                userHealth: userHealth,
            });
            needToShooting = true;
        }
        if (this.state.fieldUser[shoot].shipIsHere === 3) {
            let userCoordinatesObject = Object.assign({},this.state.userCoordinates);
            let changeUserCoordinates;
            let userHealth = Object.assign({}, this.state.userHealth);
            if (this.state.fieldUser[shoot].numberOfShip === 1){
                changeUserCoordinates = userCoordinatesObject.threeDeskOne.slice();
                changeUserCoordinates[this.state.userHealth.threeDeskOne-1] = shoot;
                userCoordinatesObject.threeDeskOne = changeUserCoordinates;
                --userHealth.threeDeskOne;
                if(this.state.angryMode1 === false && userHealth.threeDeskOne !==0){
                    //alert("В ваш трёхпалубный корабль попали!");
                    this.setState({
                        angryMode1: true,
                        firstShootCoordinate: shoot,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("В ваш корабль попали!");
                }
                else if(this.state.angryMode1 === true && userHealth.threeDeskOne !==0){
                    //alert("В ваш трёхпалубный корабль попали!");
                    this.setState({
                        angryMode2: true,
                        secondShootCoordinate: shoot,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("В ваш корабль попали!");
                }
                else if(userHealth.threeDeskOne === 0){
                    //alert("Ваш трёхпалубный корабль потопили!");
                    let intMass2 = this.impossibilityShootAround(intMass, this.state.firstShootCoordinate);
                    intMass = intMass2.slice();
                    let intMass3 = this.impossibilityShootAround(intMass, this.state.secondShootCoordinate);
                    intMass = intMass3.slice();
                    let intMass4 = this.impossibilityShootAround(intMass, shoot);
                    intMass = intMass4.slice();
                    this.setState({
                        angryMode1: false,
                        angryMode2: false,
                        textOnScreen: "Ваш трёхпалубный корабль потопили!",
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("Ваш трёхпалубный корабль потопили!");
                    this.doYouFail();
                }
            }
            else if (this.state.fieldUser[shoot].numberOfShip === 2){
                changeUserCoordinates = userCoordinatesObject.threeDeskTwo.slice();
                changeUserCoordinates[this.state.userHealth.threeDeskTwo-1] = shoot;
                userCoordinatesObject.threeDeskTwo = changeUserCoordinates;
                --userHealth.threeDeskTwo;
                if(this.state.angryMode1 === false && userHealth.threeDeskTwo !==0){
                    //alert("В ваш трёхпалубный корабль попали!");
                    this.setState({
                        angryMode1: true,
                        firstShootCoordinate: shoot,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("В ваш корабль попали!");
                }
                else if(this.state.angryMode1 === true && userHealth.threeDeskTwo !==0){
                    //alert("В ваш трёхпалубный корабль попали!");
                    this.setState({
                        angryMode2: true,
                        secondShootCoordinate: shoot,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("В ваш корабль попали!");
                }
                else if(userHealth.threeDeskTwo === 0){
                    //alert("Ваш трёхпалубный корабль потопили!");
                    let intMass2 = this.impossibilityShootAround(intMass, this.state.firstShootCoordinate);
                    intMass = intMass2.slice();
                    let intMass3 = this.impossibilityShootAround(intMass, this.state.secondShootCoordinate);
                    intMass = intMass3.slice();
                    let intMass4 = this.impossibilityShootAround(intMass, shoot);
                    intMass = intMass4.slice();
                    this.setState({
                        angryMode1: false,
                        angryMode2: false,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("Ваш трёхпалубный корабль потопили!");
                    this.doYouFail();
                }
            }
            this.setState({
                userCoordinates: userCoordinatesObject,
                userHealth: userHealth,
            });
            needToShooting = true;
        }
        if (this.state.fieldUser[shoot].shipIsHere === 2) {
            let userCoordinatesObject = Object.assign({},this.state.userCoordinates);
            let changeUserCoordinates;
            let userHealth = Object.assign({}, this.state.userHealth);
            if (this.state.fieldUser[shoot].numberOfShip === 1){
                changeUserCoordinates = userCoordinatesObject.twoDeskOne.slice();
                changeUserCoordinates[this.state.userHealth.twoDeskOne-1] = shoot;
                userCoordinatesObject.twoDeskOne = changeUserCoordinates;
                --userHealth.twoDeskOne;
                if(this.state.angryMode1 === false && userHealth.twoDeskOne !==0){
                    //alert("В ваш двухпалубный корабль попали!");
                    this.setState({
                        angryMode1: true,
                        firstShootCoordinate: shoot,
                         colorScreen: true,
                    });
                    this.props.changeTextOnScreen("В ваш корабль попали!");
                }
                else if(userHealth.twoDeskOne === 0){
                    //alert("Ваш двухпалубный корабль потопили!");
                    let intMass2 = this.impossibilityShootAround(intMass, this.state.firstShootCoordinate);
                    intMass = intMass2.slice();
                    let intMass3 = this.impossibilityShootAround(intMass, shoot);
                    intMass = intMass3.slice();
                    this.setState({
                        angryMode1: false,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("Ваш двухпалубный корабль потопили!");
                    this.doYouFail();
                }
            }
            else if (this.state.fieldUser[shoot].numberOfShip === 2){
                changeUserCoordinates = userCoordinatesObject.twoDeskTwo.slice();
                changeUserCoordinates[this.state.userHealth.twoDeskTwo-1] = shoot;
                userCoordinatesObject.twoDeskTwo = changeUserCoordinates;
                --userHealth.twoDeskTwo;
                if(this.state.angryMode1 === false && userHealth.twoDeskTwo !==0){
                    //alert("В ваш двухпалубный корабль попали!");
                    this.setState({
                        angryMode1: true,
                        firstShootCoordinate: shoot,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("В ваш корабль попали!");
                }
                else if(userHealth.twoDeskTwo === 0){
                    //alert("Ваш двухпалубный корабль потопили!");
                    let intMass2 = this.impossibilityShootAround(intMass, this.state.firstShootCoordinate);
                    intMass = intMass2.slice();
                    let intMass3 = this.impossibilityShootAround(intMass, shoot);
                    intMass = intMass3.slice();
                    this.setState({
                        angryMode1: false,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("Ваш двухпалубный корабль потопили!");
                    this.doYouFail();
                }
            }
            else if (this.state.fieldUser[shoot].numberOfShip === 3){
                changeUserCoordinates = userCoordinatesObject.twoDeskThree.slice();
                changeUserCoordinates[this.state.userHealth.twoDeskThree-1] = shoot;
                userCoordinatesObject.twoDeskThree = changeUserCoordinates;
                --userHealth.twoDeskThree;
                if(this.state.angryMode1 === false && userHealth.twoDeskThree !==0){
                    //alert("В ваш двухпалубный корабль попали!");
                    this.setState({
                        angryMode1: true,
                        firstShootCoordinate: shoot,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("В ваш корабль попали!");
                }
                else if(userHealth.twoDeskThree === 0){
                    //alert("Ваш двухпалубный корабль потопили!");
                    let intMass2 = this.impossibilityShootAround(intMass, this.state.firstShootCoordinate);
                    intMass = intMass2.slice();
                    let intMass3 = this.impossibilityShootAround(intMass, shoot);
                    intMass = intMass3.slice();
                    this.setState({
                        angryMode1: false,
                        colorScreen: true,
                    });
                    this.props.changeTextOnScreen("Ваш двухпалубный корабль потопили!");
                    this.doYouFail();
                }
            }
            this.setState({
                userCoordinates: userCoordinatesObject,
                userHealth: userHealth,
            });
            needToShooting = true;
        }
        else if (this.state.fieldUser[shoot].shipIsHere === 1){
            //alert("Ваш однопалубный корабль потопили!");
            let intMassWithShootAround = this.impossibilityShootAround(intMass, shoot);
            intMass = intMassWithShootAround.slice();
            needToShooting = true;
            this.setState({
                colorScreen: true,
            });
            this.props.changeTextOnScreen("Ваш однопалубный корабль потопили!");
            this.doYouFail();
        }
        else if (this.state.fieldUser[shoot].shipIsHere === 0) {
            //alert("В вас не попали!");
            this.setState({
                colorScreen: false,
            });
            this.props.changeTextOnScreen("В вас не попали!");
            needToShooting = false;
        }
        this.setState({
            fieldUser: intMass.slice(),
        });
        if (this.state.userCounter!==0) {
            if (needToShooting === true) {
                this.restartAI();
                return;
            } else {
                this.addEventClickForAIField();
                return;
            }
        }
    };
    restartAI(){
        let restartBattleAI = this.battleAI.bind(this);
        setTimeout(restartBattleAI,1000);
    };
    battleUser(i){
        if (this.state.fieldAI[i].shooting === false&&this.state.AICounter!==0) {
            let intMass = this.state.fieldAI.slice();
            let intObject = Object.assign({}, intMass[i]);
            intObject.shooting = true;
            intMass.splice(i, 1, intObject);
            if (this.state.fieldAI[i].shipIsHere === 0) {
                //alert('Мимо!');
                this.deleteEventClickForAIField();
                this.setState({
                    colorScreen: true,
                });
                this.props.changeTextOnScreen("Мимо!");
                store.dispatch(changeShootAI);
                this.restartAI();
            }
            else if (this.state.fieldAI[i].shipIsHere === 1){
                //alert('Вы потопили однопалубный!');
                let intMassTemp = this.impossibilityShootAround(intMass, i);
                intMass = intMassTemp.slice();
                let counter = this.state.AICounter;
                --counter;
                this.setState({
                    AICounter: counter,
                    colorScreen: false,
                });
                this.props.changeTextOnScreen("Вы потопили однопалубный!");
                if (counter===0){
                    this.props.changeTextOnScreen("Вы победили!");
                }
            }
            else if (this.state.fieldAI[i].shipIsHere === 2){
                if (this.state.fieldAI[i].numberOfShip === 1){
                    if (this.state.AIHealth.twoDeskOne===2){
                        //alert('Вы попали!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.twoDeskOne;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.twoDeskOne.slice();
                        intMassCoordinates[0]=i;
                        intObjectCoordinates.twoDeskOne = intMassCoordinates.slice();
                        this.setState({
                            AIHealth: intObject,
                            AICoordinates: intObjectCoordinates,
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы попали!");
                    }
                    else if (this.state.AIHealth.twoDeskOne===1){
                        //alert('Вы потопили двухпалубный!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.twoDeskOne;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.twoDeskOne.slice();
                        intMassCoordinates[1]=i;
                        intObjectCoordinates.twoDeskOne = intMassCoordinates.slice();
                        let intMassTemp = this.impossibilityShootAround(intMass,this.state.AICoordinates.twoDeskOne[0]);
                        intMass = intMassTemp.slice();
                        let intMassTemp2 = this.impossibilityShootAround(intMass,i);
                        intMass = intMassTemp2.slice();
                        this.setState({
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы потопили двухпалубный!");
                        this.doYouWin(intObject,intObjectCoordinates);
                    }
                }
                if (this.state.fieldAI[i].numberOfShip === 2){
                    if (this.state.AIHealth.twoDeskTwo===2){
                        //alert('Вы попали!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.twoDeskTwo;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.twoDeskTwo.slice();
                        intMassCoordinates[0]=i;
                        intObjectCoordinates.twoDeskTwo = intMassCoordinates.slice();
                        this.setState({
                            AIHealth: intObject,
                            AICoordinates: intObjectCoordinates,
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы попали!");
                    }
                    else if (this.state.AIHealth.twoDeskTwo===1){
                        //alert('Вы потопили двухпалубный!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.twoDeskTwo;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.twoDeskTwo.slice();
                        intMassCoordinates[1]=i;
                        intObjectCoordinates.twoDeskTwo = intMassCoordinates.slice();
                        let intMassTemp = this.impossibilityShootAround(intMass,this.state.AICoordinates.twoDeskTwo[0]);
                        intMass = intMassTemp.slice();
                        let intMassTemp2 = this.impossibilityShootAround(intMass,i);
                        intMass = intMassTemp2.slice();
                        this.setState({
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы потопили двухпалубный!");
                        this.doYouWin(intObject,intObjectCoordinates);
                    }
                }
                if (this.state.fieldAI[i].numberOfShip === 3){
                    if (this.state.AIHealth.twoDeskThree===2){
                        //alert('Вы попали!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.twoDeskThree;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.twoDeskThree.slice();
                        intMassCoordinates[0]=i;
                        intObjectCoordinates.twoDeskThree = intMassCoordinates.slice();
                        this.setState({
                            AIHealth: intObject,
                            AICoordinates: intObjectCoordinates,
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы попали!");
                    }
                    else if (this.state.AIHealth.twoDeskThree===1){
                        //alert('Вы потопили двухпалубный!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.twoDeskThree;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.twoDeskThree.slice();
                        intMassCoordinates[1]=i;
                        intObjectCoordinates.twoDeskThree = intMassCoordinates.slice();
                        let intMassTemp = this.impossibilityShootAround(intMass,this.state.AICoordinates.twoDeskThree[0]);
                        intMass = intMassTemp.slice();
                        let intMassTemp2 = this.impossibilityShootAround(intMass,i);
                        intMass = intMassTemp2.slice();
                        this.setState({
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы потопили двухпалубный!");
                        this.doYouWin(intObject,intObjectCoordinates);
                    }
                }
            }
            else if (this.state.fieldAI[i].shipIsHere === 3){
                if (this.state.fieldAI[i].numberOfShip === 1){
                    if (this.state.AIHealth.threeDeskOne===3){
                        //alert('Вы попали!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.threeDeskOne;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.threeDeskOne.slice();
                        intMassCoordinates[0]=i;
                        intObjectCoordinates.threeDeskOne = intMassCoordinates.slice();
                        this.setState({
                            AIHealth: intObject,
                            AICoordinates: intObjectCoordinates,
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы попали!");
                    }
                    else if (this.state.AIHealth.threeDeskOne===2){
                        //alert('Вы попали!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.threeDeskOne;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.threeDeskOne.slice();
                        intMassCoordinates[1]=i;
                        intObjectCoordinates.threeDeskOne = intMassCoordinates.slice();
                        this.setState({
                            AIHealth: intObject,
                            AICoordinates: intObjectCoordinates,
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы попали!");
                    }
                    else if (this.state.AIHealth.threeDeskOne===1){
                        //alert('Вы потопили трёхпалубный!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.threeDeskOne;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.threeDeskOne.slice();
                        intMassCoordinates[2]=i;
                        intObjectCoordinates.threeDeskOne = intMassCoordinates.slice();
                        let intMassTemp = this.impossibilityShootAround(intMass,this.state.AICoordinates.threeDeskOne[0]);
                        intMass = intMassTemp.slice();
                        let intMassTemp2 = this.impossibilityShootAround(intMass,this.state.AICoordinates.threeDeskOne[1]);
                        intMass = intMassTemp2.slice();
                        let intMassTemp3 = this.impossibilityShootAround(intMass,i);
                        intMass = intMassTemp3.slice();
                        this.setState({
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы потопили трёхпалубный!");
                        this.doYouWin(intObject,intObjectCoordinates);
                    }
                }
                if (this.state.fieldAI[i].numberOfShip === 2){
                    if (this.state.AIHealth.threeDeskTwo===3){
                        //alert('Вы попали!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.threeDeskTwo;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.threeDeskTwo.slice();
                        intMassCoordinates[0]=i;
                        intObjectCoordinates.threeDeskTwo = intMassCoordinates.slice();
                        this.setState({
                            AIHealth: intObject,
                            AICoordinates: intObjectCoordinates,
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы попали!");
                    }
                    else if (this.state.AIHealth.threeDeskTwo===2){
                        //alert('Вы попали!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.threeDeskTwo;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.threeDeskTwo.slice();
                        intMassCoordinates[1]=i;
                        intObjectCoordinates.threeDeskTwo = intMassCoordinates.slice();
                        this.setState({
                            AIHealth: intObject,
                            AICoordinates: intObjectCoordinates,
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы попали!");
                    }
                    else if (this.state.AIHealth.threeDeskTwo===1){
                        //alert('Вы потопили трёхпалубный!');
                        let intObject = Object.assign({},this.state.AIHealth);
                        --intObject.threeDeskTwo;
                        let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                        let intMassCoordinates = intObjectCoordinates.threeDeskTwo.slice();
                        intMassCoordinates[2]=i;
                        intObjectCoordinates.threeDeskOne = intMassCoordinates.slice();
                        let intMassTemp = this.impossibilityShootAround(intMass,this.state.AICoordinates.threeDeskTwo[0]);
                        intMass = intMassTemp.slice();
                        let intMassTemp2 = this.impossibilityShootAround(intMass,this.state.AICoordinates.threeDeskTwo[1]);
                        intMass = intMassTemp2.slice();
                        let intMassTemp3 = this.impossibilityShootAround(intMass,i);
                        intMass = intMassTemp3.slice();
                        this.setState({
                            colorScreen: false,
                        });
                        this.props.changeTextOnScreen("Вы потопили трёхпалубный!");
                        this.doYouWin(intObject,intObjectCoordinates);
                    }
                }
            }
            else if (this.state.fieldAI[i].shipIsHere === 4){

                if (this.state.AIHealth.fourDesk===4){
                    //alert('Вы попали!');
                    let intObject = Object.assign({},this.state.AIHealth);
                    --intObject.fourDesk;
                    let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                    let intMassCoordinates = intObjectCoordinates.fourDesk.slice();
                    intMassCoordinates[0]=i;
                    intObjectCoordinates.fourDesk = intMassCoordinates.slice();
                    this.setState({
                        AIHealth: intObject,
                        AICoordinates: intObjectCoordinates,
                        colorScreen: false,
                    });
                    this.props.changeTextOnScreen("Вы попали!");
                }
                else if (this.state.AIHealth.fourDesk===3){
                    //alert('Вы попали!');
                    let intObject = Object.assign({},this.state.AIHealth);
                    --intObject.fourDesk;
                    let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                    let intMassCoordinates = intObjectCoordinates.fourDesk.slice();
                    intMassCoordinates[1]=i;
                    intObjectCoordinates.fourDesk = intMassCoordinates.slice();
                    this.setState({
                        AIHealth: intObject,
                        AICoordinates: intObjectCoordinates,
                        colorScreen: false,
                    });
                    this.props.changeTextOnScreen("Вы попали!");
                }
                else if (this.state.AIHealth.fourDesk===2){
                    //alert('Вы попали!');
                    let intObject = Object.assign({},this.state.AIHealth);
                    --intObject.fourDesk;
                    let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                    let intMassCoordinates = intObjectCoordinates.fourDesk.slice();
                    intMassCoordinates[2]=i;
                    intObjectCoordinates.fourDesk = intMassCoordinates.slice();
                    this.setState({
                        AIHealth: intObject,
                        AICoordinates: intObjectCoordinates,
                        colorScreen: false,
                    });
                    this.props.changeTextOnScreen("Вы попали!");
                }
                else if (this.state.AIHealth.fourDesk===1){
                    //alert('Вы потопили четырёхпалубный!');
                    let intObject = Object.assign({},this.state.AIHealth);
                    --intObject.fourDesk;
                    let intObjectCoordinates = Object.assign({},this.state.AICoordinates);
                    let intMassCoordinates = intObjectCoordinates.fourDesk.slice();
                    intMassCoordinates[3]=i;
                    intObjectCoordinates.fourDesk = intMassCoordinates.slice();
                    let intMassTemp = this.impossibilityShootAround(intMass,this.state.AICoordinates.fourDesk[0]);
                    intMass = intMassTemp.slice();
                    let intMassTemp2 = this.impossibilityShootAround(intMass,this.state.AICoordinates.fourDesk[1]);
                    intMass = intMassTemp2.slice();
                    let intMassTemp3 = this.impossibilityShootAround(intMass,this.state.AICoordinates.fourDesk[2]);
                    intMass = intMassTemp3.slice();
                    let intMassTemp4 = this.impossibilityShootAround(intMass,i);
                    intMass = intMassTemp4.slice();
                    this.setState({
                        colorScreen: false,
                    });
                    this.props.changeTextOnScreen("Вы потопили четырёхпалубный!");
                    this.doYouWin(intObject,intObjectCoordinates);
                }

            }
            this.setState({
                fieldAI: intMass.slice(),
            });
        }
    };
    doYouWin(intObject, intObjectCoordinates) {
        let counter = this.state.AICounter;
        --counter;
        if (counter===0){
            this.setState({
                colorScreen: false,
            });
            this.props.changeTextOnScreen("Вы победили!");
        }
        this.setState({
            AIHealth: intObject,
            AICounter: counter,
            AICoordinates: intObjectCoordinates,
        });
    };
    doYouFail(){
        let counter = this.state.userCounter;
        --counter;
        if (counter===0){
            this.setState({
                colorScreen: true,
            });
            this.props.changeTextOnScreen("Вы проиграли!");
        }
        this.setState({
            userCounter: counter,
        });
    };
    impossibilityShootAround(intMass, i) {
        let intMassTemp = intMass.slice();
        if (Math.floor((i + 1)/10) === Math.floor((i)/10)) {
            //intMassTemp[i+1].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i+1]);
            intObject1.shooting = true;
            intMassTemp.splice(i+1,1,intObject1);
        }
        if (Math.floor((i - 1)/10) === Math.floor((i)/10)) {
            //intMassTemp[i-1].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i-1]);
            intObject1.shooting = true;
            intMassTemp.splice(i-1,1,intObject1);
        }
        if (i + 10 < 100 ) {
            //intMassTemp[i+10].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i+10]);
            intObject1.shooting = true;
            intMassTemp.splice(i+10,1,intObject1);
        }
        if (i - 10 > 0 ) {
            //intMassTemp[i-10].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i-10]);
            intObject1.shooting = true;
            intMassTemp.splice(i-10,1,intObject1);
        }
        if (i + 11 < 99 && Math.floor((i + 11)/10) === Math.floor((i+10)/10)) {
            //intMassTemp[i+11].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i+11]);
            intObject1.shooting = true;
            intMassTemp.splice(i+11,1,intObject1);
        }
        if (i + 9 < 99 && Math.floor((i + 9)/10) === Math.floor((i+10)/10)) {
            //intMassTemp[i+9].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i+9]);
            intObject1.shooting = true;
            intMassTemp.splice(i+9,1,intObject1);
        }
        if (i - 11 > 0 && Math.floor((i - 11)/10) === Math.floor((i-10)/10)) {
            //intMassTemp[i-11].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i-11]);
            intObject1.shooting = true;
            intMassTemp.splice(i-11,1,intObject1);
        }
        if (i - 9 > 0 && Math.floor((i - 9)/10) === Math.floor((i-10)/10)) {
            //intMassTemp[i-9].canPlaceShipHere = false;
            let intObject1 = Object.assign({}, intMassTemp[i-9]);
            intObject1.shooting = true;
            intMassTemp.splice(i-9,1,intObject1);
        }
        return (intMassTemp);
    }
    replacing(){
        this.setState({
            deleteBotton: {
                four: {
                    deleteThis: false,
                    counterToDelete: 1,
                },
                three: {
                    deleteThis: false,
                    counterToDelete: 2,
                },
                two: {
                    deleteThis: false,
                    counterToDelete: 3,
                },
                one: {
                    deleteThis: false,
                    counterToDelete: 4,
                },
            },
            fieldUser: Array(100).fill({
                shipIsHere: 0,
                shipsShadow: 0,
                waitForClick: false,
                canPlaceShipHere: true,
                shooting: false,
                numberOfShip: 0,
            }),
        });
    }
    render () {
        return (
            <div className="containerStart">
                <div className="seaBattle seaBattleInGame">
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
                <div className={"container"}
                     onKeyDown={this.onKeyPressed.bind(this)}
                     tabIndex="0"
                >
                    <div className="leftField">
                        <div className="leftFieldText">
                            <p>Поле противника</p>
                        </div>
                        <Context.Provider value = {{
                            whoIsThisField: "AI"
                        }}>
                            <Field
                                whereIsShip = {this.state.fieldAI}
                                battleOnClick = {(i)=>this.battleUser(i)}
                            />
                        </Context.Provider>
                    </div>
                    <CenterField
                        clickOnStartGame = {()=>this.clickOnStartGame()}
                        replacing = {()=>this.replacing()}
                        colorScreen = {this.state.colorScreen}
                        userCounter = {this.state.userCounter}
                        AICounter = {this.state.AICounter}
                    />
                    <div className="rightField">
                        <div className="leftFieldText">
                            <p>Ваше поле</p>
                        </div>
                        <Context.Provider value = {{
                            deleteButton: this.state.deleteBotton,
                            onClickButton: (i) => this.addEventClickForField(i),
                            onClickButtonAuto: () => this.autoPlasingShip(),
                            whoIsThisField: "user"
                        }}>
                            <Field
                                whereIsShip = {this.state.fieldUser}
                                onClick = {(i) => this.handlePlasingShip(i)}
                                onMouseOver = {(i) => this.handleOverShip(i)}
                                onMouseOut = {(i) => this.handleOutShip(i)}
                            />
                        </Context.Provider>
                    </div>
                </div>
            </div>
        )
    }
}

const putStateToProps = (state) => {
  return{
      textOnScreen: state.textOnScreen,
  }
};

const putActionToProps = (dispatch) => {
  return{
      changeTextOnScreen: bindActionCreators(changeTextOnScreen, dispatch)
  }
};

const WrappedGame = connect(putStateToProps, putActionToProps)(Game);

export const Context = React.createContext();

BottomsForPlacing.contextType = Context;

Field.contextType = Context;

export {WrappedGame}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomBoolean() {
    return (getRandom(0, 1) === 1)
}

function autoPlasing(fieldAuto, lengthOfShip, NumberOfShip) {
    let coordinates = {
        ships: [],
    };
    let bad = false;
    do {
        const I = getRandom(0, 9);
        const J = getRandom(0, 9);
        const direction = getRandomBoolean(); //вертикально или горизонтально ставим
        bad = false;
        //функция для проверки на возможность установки в данном месте корабля
        function checkByLabel(shipLength) {
            if (direction === true && (I + (shipLength - 1)) <= 9) {
                for (let k = 0; k <= shipLength - 1; k++) {
                    if (fieldAuto[I + k][J].label === true) {
                        bad = true;
                        return;
                    }
                }
            } else if (direction === true && (I + (shipLength - 1)) > 9) {
                for (let k = 0; k <= shipLength - 1; k++) {
                    if (fieldAuto[I - k][J].label === true) {
                        bad = true;
                        return;
                    }
                }
            } else if (direction === false && (J + (shipLength - 1)) <= 9) {
                for (let k = 0; k <= shipLength - 1; k++) {
                    if (fieldAuto[I][J + k].label === true) {
                        bad = true;
                        return;
                    }
                }
            } else if (direction === false && (J + (shipLength - 1)) > 9) {
                for (let k = 0; k <= shipLength - 1; k++) {
                    if (fieldAuto[I][J - k].label === true) {
                        bad = true;
                        return;
                    }

                }
            }
        }

        checkByLabel(lengthOfShip);

        if (bad === false) { //если выбранные координаты позволяют установить корабль, ставим его
            autoPlasingInt();
        }

        function autoPlasingInt() {
            fieldAuto[I][J].shipIsHere = lengthOfShip;
            fieldAuto[I][J].numberOfThisTypeShip = NumberOfShip;
            coordinates.ships.push(I * 10 + J);
            intLabel(I, J);
            if (direction === true) {
                for (let i = 1; i <= lengthOfShip - 1; i++) {
                    if ((I + (lengthOfShip - 1)) <= 9) {
                        plasingTheShip(I + i, J);
                    } else {
                        plasingTheShip(I - i, J);
                    }
                }
            } else {
                for (let j = 1; j <= lengthOfShip - 1; j++) {
                    if ((J + (lengthOfShip - 1)) <= 9) {
                        plasingTheShip(I, J + j);
                    } else {
                        plasingTheShip(I, J - j);
                    }
                }
            }
            function plasingTheShip(i,j) {
                fieldAuto[i][j].shipIsHere = lengthOfShip;
                fieldAuto[i][j].numberOfThisTypeShip = NumberOfShip;
                coordinates.ships.push(i * 10 + j);
                intLabel(i, j);
            }
        }

        //функция для создания метки после установки корабля
        function intLabel(i, j) {
            fieldAuto[i][j].label = true;
            try {
                fieldAuto[i + 1][j].label = true;
            } catch (a) {}
            try {
                fieldAuto[i + 1][j + 1].label = true;
            } catch (a) {}
            try {
                fieldAuto[i + 1][j - 1].label = true;
            } catch (a) {}
            try {
                fieldAuto[i][j + 1].label = true;
            } catch (a) {}
            try {
                fieldAuto[i][j - 1].label = true;
            } catch (a) {}
            try {
                fieldAuto[i - 1][j].label = true;
            } catch (a) {}
            try {
                fieldAuto[i - 1][j + 1].label = true;
            } catch (a) {}
            try {
                fieldAuto[i - 1][j - 1].label = true;
            } catch (a) {}
        }
    }
    while (bad === true);
    return (coordinates.ships)
}