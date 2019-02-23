import React, {Component} from 'react';
import data from '../data.js';
import MonopolyList from '../components/MonopolyList';
import DiceRoll from '../components/DiceRoll';
import DiceNumbers from '../components/DiceNumbers';
import PlayerPropertyList from '../components/PlayerPropertyList';
import CardDisplay from '../components/CardDisplay';

class MonopolyBox extends Component {
  constructor(props){
    super(props);
    this.state = data
    this.playerMove = this.playerMove.bind(this)
    this.endTurn = this.endTurn.bind(this);
  }

  setStateHelper(stateName, arrayIndex, propertyName, newValue){
    const stateToUpdate = this.state[stateName];
    if (arrayIndex === "ignore"){
      stateToUpdate[propertyName] = newValue;
      this.setState({[stateName]: stateToUpdate});
    }
    else {
      stateToUpdate[arrayIndex][propertyName] = newValue;
      this.setState({[stateName]: stateToUpdate});
    }
  }

  buttonToggleHelper(id, toggleValue){
    const button = document.getElementById(id);
    if (toggleValue === "add"){
      button.classList.add('disabled-button');
    }
    if (toggleValue === "remove"){
      button.classList.remove('disabled-button');
    }
  }

  diceRoll(){
    this.buttonToggleHelper('dice-roll', 'add');
    const dice1 = Math.floor(Math.random() * (6) +1);
    const dice2 = Math.floor(Math.random() * (6) +1);
    this.setStateHelper("game", "ignore", "current_roll1", dice1);
    this.setStateHelper("game", "ignore", "current_roll2", dice2);
  }

  findNewPosition(){
    const total = this.state.game.current_roll1 + this.state.game.current_roll2;
    const newPosition = this.state.players[this.state.game.current_player].current_position + total;
    this.setStateHelper("players", this.state.game.current_player, "current_position", newPosition);
  }

  passGo(){
    if (this.state.players[this.state.game.current_player].current_position > 39){
      const newPosition = this.state.players[this.state.game.current_player].current_position - 40;
      const updatedMoney = this.state.players[this.state.game.current_player].money + 200;
      this.setStateHelper("players", this.state.game.current_player, "current_position", newPosition);
      this.setStateHelper("players", this.state.game.current_player, "money", updatedMoney);
    }
  }

  goToJail(){
    if (this.state.players[this.state.game.current_player].current_position === 30){
      const newPosition = 10;
      this.setStateHelper("players", this.state.game.current_player, "current_position", newPosition);
    }
  }

  updateDoubleCounter(){
    let updatedDoubles = null;
    if (this.state.game.current_roll1 === this.state.game.current_roll2){
      updatedDoubles = this.state.game.double_counter + 1;
      this.buttonToggleHelper('dice-roll', 'remove');
    }
    else {
      updatedDoubles = 0
      this.buttonToggleHelper('end-turn', 'remove');
    }
    this.setStateHelper("game", "ignore", "double_counter", updatedDoubles);
  }

  checkOwner(){
    const currentPlayer = this.state.game.current_player;
    const currentPosition = this.state.players[currentPlayer].current_position;
    const currentProperty = this.state.properties[currentPosition];
    this.buttonToggleHelper('buy-property', 'add');

    if (currentProperty.owner != ""){
      if (parseInt(currentProperty.owner) != currentPlayer){
        console.log("Pay Rent", currentProperty, currentPlayer);
      }
      else {
        console.log("Your Property", currentProperty, currentPlayer);
      }
    }
    else {
      this.buttonToggleHelper('buy-property', 'remove');
      console.log("Available", currentProperty.name, currentPlayer);
    }
  }

  checkSwitch(){
    if (this.state.game.double_counter === 0){
      this.switchPlayer();
    }
  }

  switchPlayer(){
    let newPlayer = null;
    if (this.state.game.current_player === 0){
      newPlayer = 1;
    }
    else {
      newPlayer = 0;
    }
    this.setStateHelper("game", "ignore", "current_player", newPlayer);
  }

  playerMove(){
    this.diceRoll();
    this.findNewPosition();
    this.passGo();
    this.goToJail();
    this.updateDoubleCounter();
    this.checkOwner();

  }

  endTurn(){
    this.checkSwitch();
    console.log("Hi");
    this.buttonToggleHelper('end-turn', 'add');
    this.buttonToggleHelper('buy-property', 'add');
    this.buttonToggleHelper('dice-roll', 'remove');
  }
  //   const currentPlayers = {...this.state.players};
  //   const currentPosition = currentPlayers[this.state.game.current_player].current_position;
  //
  //
    // const diceRoll = this.diceRoll();
    // this.findNewPosition();
  //   const total = diceRoll[0] + diceRoll[1];
  //
  //   let newPosition = currentPosition+total;
  //
  //   // GO TO JAIL
  //   if (newPosition === 30){
  //     newPosition = 10;
  //   }
  //
  //   // PASS GO
  //   if (newPosition > 39){
  //     newPosition = newPosition-40
  //     console.log('hey', this.state.players[this.state.game.current_player]);
  //     currentPlayers[this.state.game.current_player].money += 200;
  //     this.setState({players: currentPlayers});
  //   }
  //
  //
  //   currentPlayers[this.state.game.current_player].current_position = newPosition;
  //   this.setState({players: currentPlayers});
  //   const newPlayer = this.state.game.current_player;
  //   if (newPlayer === 0) {
  //     if (diceRoll[0] === diceRoll[1]){
  //       const updatedDoubles = this.state.game.double_counter + 1;
  //       const updatedGame = {current_player: 0, current_roll1: diceRoll[0], current_roll2: diceRoll[1], double_counter: updatedDoubles}
  //       // console.log('updatedGame', updatedGame);
  //       this.setState({game: updatedGame})
  //     }
  //     else {
  //       const updatedGame = {current_player: 1, current_roll1: diceRoll[0], current_roll2: diceRoll[1], double_counter: 0}
  //       // console.log('updatedGame', updatedGame);
  //       // var theGame = {...this.state.game}
  //       // theGame.current_player = 1;
  //       this.setState({game: updatedGame})
  //     }
  //   }
  //   else {
  //     if (diceRoll[0] === diceRoll[1]){
  //       const updatedDoubles = this.state.game.double_counter + 1;
  //       const updatedGame2 = {current_player: 1, current_roll1: diceRoll[0], current_roll2: diceRoll[1], double_counter: updatedDoubles}
  //       // console.log('updatedGame2', updatedGame2);
  //       this.setState({game: updatedGame2})
  //     }
  //     else {
  //       const updatedGame2 = {current_player: 0, current_roll1: diceRoll[0], current_roll2: diceRoll[1], double_counter: 0}
  //       // console.log('updateGame2', updatedGame2);
  //       // var theGame = {...this.state.game}
  //       // theGame.current_player = 0;
  //       this.setState({game: updatedGame2})
  //     }
  //   }
  // }


  render(){

    const player1Properties = this.state.properties.filter((property) => {
      return parseInt(property.owner) === 0;
    });

    const player2Properties = this.state.properties.filter((property) => {
      return parseInt(property.owner) === 1;
    });

    const row1 = this.state.properties.filter((property) => {
      return property.row === 1
    });

    const row2 = this.state.properties.filter((property) => {
      return property.row === 2
    });

    const row3 = this.state.properties.filter((property) => {
      return property.row === 3
    });

    const row4 = this.state.properties.filter((property) => {
      return property.row === 4
    });

    const currentProperty = this.state.properties[this.state.players[this.state.game.current_player].current_position]

    return(
      <div className="monopoly-box">
        <PlayerPropertyList player={this.state.players[0]} properties={player1Properties}/>
        <div className="monopoly-container">
          <CardDisplay propertyData={currentProperty}/>
          <DiceRoll playerMove={this.playerMove} endTurn={this.endTurn}/>
          <DiceNumbers dice1={this.state.game.current_roll1} dice2={this.state.game.current_roll2}/>
          <MonopolyList properties={row1} players={this.state.players}/>
          <MonopolyList properties={row2} players={this.state.players}/>
          <MonopolyList properties={row3} players={this.state.players}/>
          <MonopolyList properties={row4} players={this.state.players}/>
        </div>
        <PlayerPropertyList player={this.state.players[1]} properties={player2Properties}/>
      </div>
    )

  }
}

export default MonopolyBox;
