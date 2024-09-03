const x_image_url = 'images/x.svg';
const o_image_url = 'images/o.png';

function assingSpace(space, owner) {
    const image = document.createElement('img');
    image.src = owner === 'x' ? x_image_url : o_image_url;
    space.appendChild(image);

    takenBoxes[space.id] = owner;
    const indexToRemove = freeBoxes.indexOf(space);
    freeBoxes.splice(indexToRemove,1);
    space.removeEventListener('click',changeToX);
}
function changeToX(event){
    assingSpace(event.currentTarget, 'x');
    if(isGameOver()) {
        displayWinner();
    }else {
        computerChoose0();
    }
//     const image = document.createElement('img');
//     image.src = 'images/x.svg';
//     container.appendChild(image);
//     container.removeEventListener('click', changeToX);

// }

// const boxes = document.querySelectorAll('#grid div');
// for (const box of boxes){
//     box.addEventListener('click', changeToX);
}

function computerChoose0(){
    const allBoxes = document.querySelectorAll('#grid div');
    const index = Math.floor(Math.random() * freeBoxes.length);
    const freeSpace = freeBoxes[index];
    assingSpace(freeSpace, 'o');
    if(isGameOver()) {
        displayWinner();
    }
    // for (const box of allBoxes){
    //     let imageChild =  box.querySelector('img');
    //     if(!imageChild){
    //         freeBoxes.push(box);
    //     }
    // }
}
function isGameOver(){
    return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner(){
    const winner = getWinner();

    const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    header.textContent = 'You win!';
  } else if (winner === 'o'){
    header.textContent = 'Computer wins';
  } else {
    header.textContent = 'Tie';
  }
  resultContainer.appendChild(header);

  // Remove remaining event listeners
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

// const image = document.createElement('img');
// image.src = 'image/0.png';
// freeSpace.removeEventListener('click', changeToX);
// freeSpace.appendChild(image);

function checkBoxes(one, two, three) {
    if (takenBoxes[one] !== undefined &&
        takenBoxes[one] === takenBoxes[two] &&
        takenBoxes[two] === takenBoxes[three]) {
      return takenBoxes[one];
    }
    return null;
  }
  
  // Returns 'x', 'o', or null for no winner yet.
  function getWinner() {
    // Check rows
    let rowResult = checkBoxes('one', 'two', 'three') ||
        checkBoxes('four', 'five', 'six') ||
        checkBoxes('seven', 'eight', 'nine');
  
    // Check columns
    let colResult = checkBoxes('one', 'four', 'seven') ||
        checkBoxes('two', 'five', 'eight') ||
        checkBoxes('three', 'six', 'nine');
  
    // Check diagonal
    let diagonalResult = checkBoxes('one', 'five', 'nine') ||
        checkBoxes('three', 'five', 'seven');
    return rowResult || colResult || diagonalResult;
  }
  
  const freeBoxes = [];
  // Map of box number -> 'x' or 'o'
  const takenBoxes = {};
  const boxes = document.querySelectorAll('#grid div');
  for (const box of boxes) {
    box.addEventListener('click', changeToX);
    freeBoxes.push(box);
  }
  

// const sectionElement = document.querySelector('section');
// //All h1s that are children of sectionElement:
// const headers = sectionElement.querySelector('h1');