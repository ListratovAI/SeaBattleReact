import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



//import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
//
// class Square extends React.Component {
//    render () {
//        const classes = "square " + (this.props.isShipHere? "userShip4":"")
//        return (
//            <div className = {classes} />
//        )
//     }
// }
//
// // class Row extends React.Component {
// //     render () {
// //         let massSquares = [];
// //         for (let i = 0; i < 10; i++){
// //             let numberOfSquare = i+this.props.numberOfString*10;
// //             massSquares.push(<Square
// //                 key={numberOfSquare}
// //                 whoIsThisSquares={this.props.whoIsThisString}
// //                 whereIsOneDeskShip = {this.props.whereIsOneDeskShip}
// //                 isShipHere = {this.props.whereIsOneDeskShip === numberOfSquare}
// //                 />)
// //         }
// //         return (
// //             <div className = "row">
// //             {massSquares}
// //             </div>
// //         )
// //     }
// // }
//
// class Field extends React.Component {
//     render () {
//         let stringCounter = 0;
//         let massStrings = [];
//            for (let i = 0; i < 100; i++){
//                massStrings.push(<Square
//                    key={i}
//                    isShipHere = {this.props.whereIsOneDeskShip === i}
//                    // numberOfString={stringCounter}
//                    // whoIsThisString={this.props.whoIsThisField}
//                    // whereIsOneDeskShip = {this.props.whereIsOneDeskShip}
//                />);
//                stringCounter++;
//             }
//         return (
//             <div className="row">
//                 {massStrings}
//             </div>
//         )
//     }
// }
//
// class Game extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             fieldAI: Array(100).fill(null),
//             fieldUser: Array(100).fill(null),
//         };
//     }
//     render () {
//         //const fieldUser = this.state.fieldUser.slice();
//         //fieldUser[ONEDESKSHIP] = true;
//
//         const ONEDESKSHIP = getRandom(0,99);
//         return <div className={"container"}>
//             <Field
//                 whoIsThisField = "AI"
//                 whereIsOneDeskShip = {ONEDESKSHIP}
//             />
//             <Field whoIsThisField = "user"/>
//         </div>
//
//     }
// }
// // ========================================
//
// ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
// );
//
// function getRandom(min, max) {
//     return Math.floor(Math.random() * (max + 1 - min) + min);
// }