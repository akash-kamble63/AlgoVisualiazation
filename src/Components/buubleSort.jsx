
import React, { useState, useEffect } from 'react';
import "./SortingVisu.css"
import {BubbleSort, selectionSort, InsertionSort, mergeSort, QuickSortAlgo} from "./SortAlgo"
import { getMergeSortAnimations } from "./MergeAlgo"

const ANIMATION_SPEED_MS = 200;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = '#ffdb58';



function SortingVisu() {
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [NUMBERVAL, setNumberVal] = useState(120);

    const [speed,setSpeed] =useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    const [timeoutIds, setTimeoutIds] = useState([]);
    const [rangeValue, setRangeValue] = useState(1);
    let animationTimeout;

    const handleButtons = () =>{
      generateRandomNumbers();
      setIsButtonsDisabled(false);
    }

    const handleRangeChange = (event) => {
      const newValue = parseInt(event.target.value, 10);
      setRangeValue(newValue);
    };

    const skipForword = ()=>{
      setSpeed(1000);
    }

    const generateRandomNumbers = () => {
      clearAllTimeouts();
      setIsAnimating(false);
        const newRandomNumbers = [];
        for (let i = 0; i < NUMBERVAL; i++) {
          newRandomNumbers.push(Math.floor(Math.random() * (700 - 5 + 1)) + 5);
        }
        setRandomNumbers(newRandomNumbers);
      };

      const clearAllTimeouts = () => {
        timeoutIds.forEach(clearTimeout);
        setTimeoutIds([]);
      };

    useEffect(() => {
      generateRandomNumbers();
    }, [NUMBERVAL]);

    useEffect(()=>{
      return () => {
        clearAllTimeouts();
      };
    },[])

    useEffect(() => {
      const newSpeed = rangeValue;
      setSpeed(newSpeed);

    }, [rangeValue]);


    //Testing function
    const SortAlgoTest = ()=>{
        const JsSort = randomNumbers.slice().sort((a,b) => a - b);
        const MySort = QuickSortAlgo(randomNumbers);

        console.log(arrayEqual(JsSort,MySort));
    }

    const BubbleSortAlgo = () => {
        clearAllTimeouts();
        setIsButtonsDisabled(true);
        const animations = BubbleSort(randomNumbers);
        const arrayBars = document.getElementsByClassName('array-bar');
        const localTimeoutIds = [];
      
        let dynamicSpeed = speed; // Use a dynamicSpeed variable to track changes during the loop
      
        for (let i = 0; i < animations.length; i++) {
          const animation = animations[i];
          const [idx1, idx2] = animation.indices;
      
          if (animation.type === 'comparison') {
            const timeoutId1 = setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = 'yellow';
              arrayBars[idx2].style.backgroundColor = 'yellow';
            }, i * ANIMATION_SPEED_MS / dynamicSpeed);
      
            const timeoutId2 = setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS / dynamicSpeed);
      
            localTimeoutIds.push(timeoutId1, timeoutId2);
          } else if (animation.type === 'swap') {
            const timeoutId1 = setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = 'red';
              arrayBars[idx2].style.backgroundColor = 'red';
            }, i * ANIMATION_SPEED_MS / dynamicSpeed);
      
            const timeoutId2 = setTimeout(() => {
              const tempHeight = arrayBars[idx1].style.height;
              arrayBars[idx1].style.height = arrayBars[idx2].style.height;
              arrayBars[idx2].style.height = tempHeight;
            }, i * ANIMATION_SPEED_MS / dynamicSpeed);
      
            const timeoutId3 = setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS / dynamicSpeed);
      
            localTimeoutIds.push(timeoutId1, timeoutId2, timeoutId3);
          } else if (animation.type === "correct") {
            const timeoutId1 = setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = 'green';
              arrayBars[idx2].style.backgroundColor = 'green';
            }, i * ANIMATION_SPEED_MS / dynamicSpeed);
      
            const timeoutId2 = setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS / dynamicSpeed);
      
            localTimeoutIds.push(timeoutId1, timeoutId2);
          } else if (animation.type === "done") {
            const timeoutId1 = setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = 'green';
            }, i * ANIMATION_SPEED_MS / dynamicSpeed);
      
            const timeoutId2 = setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS / dynamicSpeed);
      
            localTimeoutIds.push(timeoutId1, timeoutId2);
          }
      
          // Check if speed has changed during the loop iteration
          if (dynamicSpeed !== speed) {
            // Update dynamicSpeed for the remaining iterations
            dynamicSpeed = speed;
            clearAllTimeouts(localTimeoutIds); // Clear existing timeouts
          }
        }
      
        clearAllTimeouts(localTimeoutIds);
      
        // Reset buttons and timeouts when the sorting is done
        setTimeout(() => {
          setIsButtonsDisabled(false);
          clearAllTimeouts();
        }, animations.length * ANIMATION_SPEED_MS / speed);
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
            SortAlgoTest();
        }
    }

  return (
      <div>
        <div className="array-container">
        {randomNumbers.map((value, index) => (
            <div className='array-bar' key={index} style={{backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,width: `${Math.max(10, 60 - NUMBERVAL / 2)}px`}}></div>
          ))}

        
        
      </div>

        <div>
            <button onClick={()=>generateRandomNumbers()}>Generate New Array</button>
            <button onClick={()=>SortAlgoTest()}>single test</button>
            <button onClick={()=>testSort()}>Robost Test</button>


            <button onClick={()=>BubbleSortAlgo()} disabled={isButtonsDisabled}>BubbleSortAlgo</button>
            <button onClick={()=>skipForword()} >Skip forword</button>


        
            <label htmlFor="arraySizeRange">Adjust Array Size:</label>
                    <input
                        type="range"
                        id="arraySizeRange"
                        value={NUMBERVAL}
                        min="10"
                        max="120"
                        onChange={(e) => setNumberVal(parseInt(e.target.value))}
                        disabled={isButtonsDisabled}
                    />


            <label htmlFor="animationSpeedRange">Adjust Animation Speed:</label>
              <input
                  type="range"
                  id="animationSpeedRange"
                  value={speed}
                  min="1"
                  max="200"  
                  onChange={handleRangeChange}
                  disabled={false}
              />

        </div>


      </div>
        
  )
}

export default SortingVisu