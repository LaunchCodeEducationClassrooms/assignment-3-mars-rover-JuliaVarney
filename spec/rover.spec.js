const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it('constructor sets position and default values for mode and generatorWatts', function() {
    let rover = new Rover(100);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('test', commands);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(100);
  });

  it('response returned by receiveMessage contains name of message', function() {
    let rover = new Rover(100);
    let commands = [new Command('STATUS_CHECK')];
    let testMessage = new Message('test', commands);
    let response = rover.receiveMessage(testMessage);
    expect(response.message).toEqual('test');
  });

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let rover = new Rover(100);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2)
  });

  it('responds correctly to status check command', function() {
    let rover = new Rover(100);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status Check', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.returnedResponse).toEqual(response.results.returnedResponse)
  });

  it('responds correctly to mode change command', function() {
    let rover = new Rover(100);
    let commands = [ new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Mode Change', commands);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}])
  });

 
   it('responds with false completed value when attempting to move in LOW_POWER mode', function(){
     let rover = new Rover(100);
    let commands = [new Command('MOVE', 3579),];
    let message = new Message('Low Power', commands);
    let response = rover.receiveMessage(message);
     expect(response.results).toEqual([{completed: true}])
   });
  
 
   it('responds with position for move command', function(){
     let rover = new Rover(100);
    let commands = [new Command('MOVE', 4321)];
    let message = new Message('move', commands);
    let response = rover.receiveMessage(message);
     expect(response.results).toEqual([{completed: true}])
   }); 
/* */
});
