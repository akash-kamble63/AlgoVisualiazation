
import React, { useState, useEffect } from 'react';
import "./SortingVisu.css"
import {BubbleSort} from "./SortAlgo"



const PRIMARY_COLOR = 'turquoise';

function SortingVisu() {
    const [randomNumbers, setRandomNumbers] = useState([]);

    const generateRandomNumbers = () => {
        const newRandomNumbers = [];
        for (let i = 0; i < 350; i++) {
          newRandomNumbers.push(Math.floor(Math.random() * (700 - 5 + 1)) + 5);
        }
        setRandomNumbers(newRandomNumbers);
      };

    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const BubbleSortAlgo = ()=>{
        const JsSort = randomNumbers.slice().sort((a,b) => a - b);
        const MySort = BubbleSort(randomNumbers);
        console.log(arrayEqual(JsSort,MySort));
    }

    function arrayEqual(arrayOne, arrayTwo){
        if(arrayOne.length !== arrayTwo.length) return false;
        for(let i = 0; i<randomNumbers.length; i++){
            if(arrayOne[i] !== arrayTwo[i]) return false;
        }
        return true;
    }

    const testSort = () => {
        for(let i = 0; i <100; i++){
            generateRandomNumbers();
            BubbleSortAlgo();
        }
    }

  return (
    <div className="array-container">
    {randomNumbers.map((value, index) => (
        <div className='array-bar' key={index} style={{backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,}}></div>
      ))}
    <button onClick={()=>generateRandomNumbers()}>Generate New Array</button>
    <button onClick={()=>BubbleSortAlgo()}>BubbleSortAlgo</button>
    <button onClick={()=>testSort()}>TestBubbleSortAlgo</button>
  </div>
  )
}

export default SortingVisu