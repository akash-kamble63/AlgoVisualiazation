
import React, { useState, useEffect } from 'react';
import "./SortingVisu.css"
import {BubbleSort} from "./SortAlgo"



const PRIMARY_COLOR = 'turquoise';

function SortingVisu() {
    const [randomNumbers, setRandomNumbers] = useState([]);

    const generateRandomNumbers = () => {
        const newRandomNumbers = [];
        for (let i = 0; i < 25; i++) {
          newRandomNumbers.push(Math.floor(Math.random() * (700 - 5 + 1)) + 5);
        }
        setRandomNumbers(newRandomNumbers);
      };

    useEffect(() => {
        generateRandomNumbers();
    }, []);

    // const BubbleSortAlgo = ()=>{
    //     const JsSort = randomNumbers.slice().sort((a,b) => a - b);
    //     const MySort = BubbleSort(randomNumbers);
    //     console.log(arrayEqual(JsSort,MySort));
    // }

    const BubbleSortAlgo = () => {
        const animations = BubbleSort(randomNumbers);
        const arrayBars = document.getElementsByClassName('array-bar');
      
        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            const [idx1, idx2] = animation.indices;
        
            if (animation.type === 'comparison') {
              // Highlight the bars being compared with different colors
              setTimeout(() => {
                arrayBars[idx1].style.backgroundColor = 'red';
                arrayBars[idx2].style.backgroundColor = 'red';
              }, i * 300); // Adjust this delay as needed
        
              // Revert the color back to the primary color after comparison is done
                setTimeout(() => {
                    arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * 300); // Adjust this delay as needed
            } else if (animation.type === 'swap') {
              // Swap the bars and change their height
              setTimeout(() => {
                const tempHeight = arrayBars[idx1].style.height;
                arrayBars[idx1].style.height = arrayBars[idx2].style.height;
                arrayBars[idx2].style.height = tempHeight;
              }, i * 300); // Adjust this delay as needed
            }
        }
      };
       
    
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