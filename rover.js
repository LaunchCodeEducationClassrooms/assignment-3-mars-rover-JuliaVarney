const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
  constructor(position) {
    this.position = position,
      this.mode = 'NORMAL',
      this.generatorWatts = 110
  }

  receiveMessage(message) {
    let response = {
      message: message.name,
      results: []
    }

    let roverStatus = {
      mode: this.mode,
      generatorWatts: this.generatorWatts,
      position: this.position
    };
    let command = message.commands;

      for (let i = 0; i < command.length; i++) {

        if (command[i].commandType === 'STATUS_CHECK') {
          response.results.push({ completed: true, roverStatus });

        } else if (message.commands[i].commandType === 'MODE_CHANGE') {
          roverStatus['mode'] = command[i].value
          response.results.push({ completed: true });

        } else if (command[i].commandType === 'MOVE') {
          if (roverStatus['mode'] === 'LOW_POWER') {
            response.results.push({ completed: false });

          } else if (roverStatus['mode'] === 'NORMAL') {
          roverStatus['position'] = command[i].value
          response.results.push({ completed: true });
          }
        }
         
      }
 
    

    console.log(response);
    console.log(roverStatus['mode'])
    return response
  }
}

module.exports = Rover;










