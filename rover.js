const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
  constructor(position, mode, generatorWatts) {
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

        } else if (command[i].commandType === 'MODE_CHANGE') {
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
    return response
    
    

  }
}

module.exports = Rover;








/*
   for (let i = 0; i < message.commands.length; i++) {
        returnedResponse['completed'] = true;

        if (commands[i].commandType === 'STATUS_CHECK') {
          returnedResponse['roverStatus'] = roverStatus
          //response['results'] = returnedResponse;
          //response.results.push(returnedResponse)

        } else if (commands[i].commandType === 'MODE_CHANGE') {
          if (commands[i].value == 'LOW_POWER') {
            this.mode = 'LOW_POWER';
            //returnedResponse['completed'] = false;
            //response['results'] = returnedResponse;
            //response.results.push(returnedResponse)
          }

        } else if (commands[i].commandType === 'MOVE') {
          if (commands[i].value === 'LOW_POWER'){
            returnedResponse['completed'] = false;
          }
          //response.results.push(returnedResponse)
        }
        console.log(commands[i]);
        response.results.push(returnedResponse);
        //response['results'] = returnedResponse;
      }
     console.log(roverStatus)
    console.log(response);
    return response
    }
  */

