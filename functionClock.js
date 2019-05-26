let minuteRow = [];
let fiveMinuteRow = [];
let hourRow = [];
let queue = [];



function minute() {
  let ball = queue.shift();
  if (minuteRow.length === 4) {
    for (let i = 4; i > 0; i--) {
      queue.push(minuteRow[i - 1]);
    }
    fiveMinute(ball);
    return minuteRow = [];
  }
  minuteRow.push(ball)
}

function fiveMinute(ball) {
  if (fiveMinuteRow.length === 11) {
    for (let i = 11; i > 0; i--) {
      queue.push(fiveMinuteRow[i - 1])
    }
    hour(ball)
    return fiveMinuteRow = [];
  }
  fiveMinuteRow.push(ball)
}

function hour(ball) {
  if (hourRow.length === 11) {
    for (let i = 11; i > 0; i--) {
      queue.push(hourRow[i - 1])
    }
    queue.push(ball);
    return hourRow = [];
  }
  hourRow.push(ball)
}

function startClock() {
  const $number = Number(document.getElementById('form').value) // grabes the number from the input field and verifies it is a number
  if ($number <= 27 || $number >= 127 || isNaN($number)) {
    return alert('Please put a number between 27 and 127')
  };

  let t1 = performance.now()
  for (let i = 0; i < $number; i++) {
    queue.push(i + 1);
  }

  let time = 0;
  let found = false
  while (!found) {
    time++
    minute();

    if (time % 1440 === 0) {
      for (let i = 1; i < $number + 1; i++) {
        if (queue[i - 1] != i) {
          break;
        }
        if (i === $number){
          if (queue[i - 1] === i) {
            found = true;
            break;
          }
        } 
      }
    }
  }
  
  const days = (time / 60 / 24).toFixed(0); // My way to calculate the days. minutes * 60 minutes in 1 hour * 24 hours in a day
  const answer = `${$number} balls takes ${days} days.` // my answer to return
  let t2 = performance.now();

  // user interface
  const listItem = document.createElement('LI');
  listItem.innerText = answer + '      The run time took: ' + ((t2 - t1) / 1000).toFixed(3) + ' seconds'; // creates list item with answer and run time 
  document.getElementById('test-list').append(listItem); // puts the element onto the dom
  const lineBreak = document.createElement('BR'); // Use to seperate the test results 
  document.getElementById('test-list').append(lineBreak); // puts the line break into the DOM after the last test result
  queue = [];
}

const $button = document.getElementById('submit'); // Grabs the button from the dom
$button.addEventListener('click', startClock) // created the event listener to execute startClock on click. 


