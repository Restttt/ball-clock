// Row Class is to create multiple rows using the Clock class.

class Row {
  constructor(limit, name) {
    this.name = name // Gave name to help debug
    this.balls = []; // current balls on the row
    this.limit = limit; // limit of balls, when the ball hits the limit it will tip
  }

  // Connects this row to the other row
  connectToOtherRows(nextRow, ballArray) { // created to connect it to the next row in the class
    this.nextRow = nextRow; 
    this.ballArray = ballArray; // to be able to send the balls that fall back to the ballArray
  }

  addBall(ball) { // adds a ball to this row
    if (this.balls.length === this.limit - 1) { // test to see if the ball is currently one before the limit. 
      for (let i = this.balls.length; i > 0; i--) { // loop over in reverse of the array, to simulate the balls falling onto the floor of the clock
        this.ballArray.push(this.balls[i - 1]); // pushes the balls falling back into the ballArray
      }
      if (this.nextRow === this.ballArray) { // this is to test if this row is the hour, to clear out all rows and push everything back to floor of the clock
        this.ballArray.push(ball) // pushes balls back into ballarray
        this.resetBalls(); // resets this array to an empty array 
        return; // leave the function 
      }
      this.nextRow.addBall(ball); // if this isn't the hour row, will add the ball that caused the fall onto the next row.
      this.resetBalls(); // resets the balls array for this row
    } else {
      this.balls.push(ball) // if the row can hold more balls before tipping, add the ball to this row
      return; // leave this row
    }
  }

  resetBalls() { // used this function to reset the balls on this track
    return this.balls = [];
  }
}

// CLOCK CLASS
class Clock {
  constructor(ballNumber) { // ballNumber to set the amount of balls on the clock
    this.number = ballNumber // used for my answer that I return to the user 
    this.startingBallArray = Array(ballNumber).fill(0).map((val, i) => "B" + (i + 1)); // this function will set an array to the amount determined by a user, then fill each spot incrementing using map and fill.
    this.ballArray = Array(ballNumber).fill(0).map((val, i) => "B" + (i + 1)); // ^^ 
    this.minuteRow = new Row(5, 'minutes'); // Sets the minute row with the limit to 5 and name to minutes
    this.fiveMinuteRow = new Row(12, '5minutes'); // Sets the fiveMinuteRow with the limit to 12 and name to 5minutes
    this.hourRow = new Row(12, 'hours'); // Sets the hourRow with the limit to 12 and name to hours
  }

  initializeRows() { // I used this to connect the rows to each other. I call this function at the start of runClock. 
    this.minuteRow.connectToOtherRows(this.fiveMinuteRow, this.ballArray);
    this.fiveMinuteRow.connectToOtherRows(this.hourRow, this.ballArray);
    this.hourRow.connectToOtherRows(this.ballArray, this.ballArray);
  }

  minute() { // I used this to simulate how many minutes the function will take. Every minute adds a ball to the minute row
    const ball = this.ballArray.shift();
    this.minuteRow.addBall(ball)
  }

  runClock() { // I used this method to start my clock. 
    this.initializeRows(); // connect the rows to each other
    let time = 0; // counts how many "minutes" the clock will run
    while(1) { // used a while(1) loop to make the loop run forever until the arrays match
      time++ // increment the "time" by a minute
      this.minute(); // run my minute method that will push a ball onto the minute track

      if (this.startingBallArray.toString() == this.ballArray.toString()) { // Check to see if my arrays match. I used toString to compare the arrays
        break;
      }
    }
    const days = (time / 60 / 24).toFixed(0); // My way to calculate the days. minutes * 60 minutes in 1 hour * 24 hours in a day
    const answer = `${this.number} balls takes ${days} days` // my answer to return
    return answer; 
  }
}

const myClock = new Clock(30); // Creates myClock.
console.time('runClock') // checks when the function is starting 
const time = myClock.runClock(); // Runs the function 
console.timeEnd('runClock') // logs when the function was finished running
console.log(time); // Sends the answer back