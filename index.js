let randomize_array = document.getElementById("randomize_array_Btn");
let sortBtn = document.getElementById("sort_Btn");
let barsContainer = document.getElementById("bars_container");
let minRange = 1;
let maxRange = 70;
let numOfBars = 70;
let unsortedArray = new Array(numOfBars);

function randNum(min, max){
    return Math.floor(Math.random() * (max-min + 1)) + 1;
}
function setArray(){
    for (let index = 0; index < numOfBars; index++) {
        unsortedArray[index] = randNum(minRange, maxRange);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    setArray();
    drawBars(unsortedArray);
});

function drawBars(array){
    for (let index = 0; index < array.length; index++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[index]*10 + "px";
        barsContainer.appendChild(bar);

        
    }
}
randomize_array.addEventListener("click", function(){
    setArray();
    barsContainer.innerHTML = "";
    drawBars(unsortedArray);
});

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
    var len = arr.length;
    let bars = document.getElementsByClassName("bar");
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - 1; j++) {
        for (let k = 0; k < arr.length; k++) {
            if(k !== j && k !== j+1)
            bars[k].style.backgroundColor = "aqua"; 
        }

        if (arr[j] > arr[j + 1]) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          bars[j].style.height = arr[j]*10 + "px";
          bars[j].style.backgroundColor = "lightgreen"; 

          bars[j + 1].style.height = arr[j + 1]*10 + "px";
          bars[j + 1].style.backgroundColor = "lightgreen"; 
          await sleep(30);
        }
      }
      await sleep(30);
    }
    return arr;
  }

  
  async function insertionSort(arr) {
    let len = arr.length;
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;

        for (let k = 0; k < arr.length; k++) {
            if(k !== i && k !== j+1)
                bars[k].style.backgroundColor = "aqua"; 
        }

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            bars[j].style.height = arr[j + 1]*10 + "px";
            bars[j].style.backgroundColor = "lightgreen"; 

            await sleep(30);

            j = j - 1;
        }
        arr[j + 1] = key;
        bars[j + 1].style.height = arr[j + 1]*10 + "px";
        bars[j + 1].style.backgroundColor = "lightgreen"; 
        await sleep(30);
    }
    return arr;
}


  
async function selectionSort(arr) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = 0; k < arr.length; k++) {
                if (k !== i && k !== j) {
                    bars[k].style.backgroundColor = "aqua";
                }
            }
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            bars[j].style.backgroundColor = "lightgreen";
            await sleep(30);
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        bars[minIndex].style.height = arr[minIndex] * 10 + "px";
        bars[minIndex].style.backgroundColor = "aqua";
        bars[i].style.height = arr[i] * 10 + "px";
        bars[i].style.backgroundColor = "lightgreen";
        await sleep(30);
    }
    return arr;
}

async function shellSort(arr) {
    let bars = document.getElementsByClassName("bar");
    let n = arr.length;
    let gap = Math.floor(n / 2);
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            for (; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
                bars[j].style.height = arr[j] * 10 + "px";
                bars[j].style.backgroundColor = "aqua";
                await sleep(30);
            }
            arr[j] = temp;
            bars[j].style.height = arr[j] * 10 + "px";
            bars[j].style.backgroundColor = "lightgreen";
            await sleep(30);
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}

async function quickSort(arr, low, high) {
    
  if (low < high) {
    console.log("Oi");
    let pivotIndex = await partition(arr, low, high);
    await Promise.all([
      quickSort(arr, low, pivotIndex - 1),
      quickSort(arr, pivotIndex + 1, high),
    ]);
  }
  return arr;
}

async function partition(arr, low, high) {
    console.log("Ola");
  let pivot = arr[high];
  let i = low - 1;
  let bars = document.getElementsByClassName("bar");
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      await swap(arr, i, j, bars);
    }
  }
  await swap(arr, i + 1, high, bars);
  return i + 1;
}

async function swap(arr, i, j, bars) {
    
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  bars[i].style.height = arr[i] * 10 + "px";
  bars[j].style.height = arr[j] * 10 + "px";

  bars[i].style.backgroundColor = "lightgreen";
  bars[j].style.backgroundColor = "lightgreen";

  await sleep(30);

  bars[i].style.backgroundColor = "aqua";
  bars[j].style.backgroundColor = "aqua";
}


  
  

const selectElement = document.getElementById("selectedAlg");
sortBtn.addEventListener("click", function(event){
    const selectedValue = selectElement.value;
    event.preventDefault();
    
    switch(selectedValue){
        case "bubble":
            bubbleSort(unsortedArray);
        case "insert":   
            insertionSort(unsortedArray);
        case "selec":   
            selectionSort(unsortedArray);
        case "shell":   
            shellSort(unsortedArray);
        case "quick":   
            quickSort(unsortedArray, 0, unsortedArray.length - 1);
        
    }
})