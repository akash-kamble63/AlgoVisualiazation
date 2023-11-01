
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
    const [animationSpeed, setAnimationSpeed] = useState(200);
    const [speed,setSpeed] =useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    const [timeoutIds, setTimeoutIds] = useState([]);
    const [rangeValue, setRangeValue] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    let animationTimeout;

    const handleButtons = () =>{
      generateRandomNumbers();
      setIsButtonsDisabled(false);
    }

    const handleRangeChange = (event) => {
      const newValue = parseInt(event.target.value, 10);
      setRangeValue(newValue);
    };

    const handlePause = () => {
      setIsPaused(!isPaused);
    }

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

    // useEffect(() => {
    //     generateRandomNumbers();
    // }, [NUMBERVAL]);

    useEffect(() => {
      generateRandomNumbers();
    }, [NUMBERVAL]);

    useEffect(()=>{
      return () => {
        clearAllTimeouts();
      };
    },[])

    useEffect(() => {
      // Update the speed based on the range input value
      const newSpeed = rangeValue;
      setSpeed(newSpeed);
  
      // You can call other functions here that depend on the speed
      // Example: updateSpeedDependentFunctions(newSpeed);
    }, [rangeValue]);

    // useEffect(()=>{
    //   setSpeed
    // },[speed])

    //Testing function
    const SortAlgoTest = ()=>{
        const JsSort = randomNumbers.slice().sort((a,b) => a - b);
        const MySort = QuickSortAlgo(randomNumbers);
        // console.log("javascript sort",JsSort);
        // console.log("My alogo",MySort);
        console.log(arrayEqual(JsSort,MySort));

        //animation array
        // console.log(MySort);
    }

    const BubbleSortAlgo = () => {
        clearAllTimeouts();
        setIsButtonsDisabled(true);
        const animations = BubbleSort(randomNumbers);
        const arrayBars = document.getElementsByClassName('array-bar');
        const localTimeoutIds = [];
        for (let i = 0; i < animations.length; i++) {
            if(isPaused){
              break;
            }
            console.log(i)
            const animation = animations[i];
            const [idx1, idx2] = animation.indices;
            
            if (animation.type === 'comparison') {
              // Highlight the bars being compared with different colors
              const timeoutId1 = setTimeout(() => {
                arrayBars[idx1].style.backgroundColor = 'yellow';
                arrayBars[idx2].style.backgroundColor = 'yellow';
              }, i * ANIMATION_SPEED_MS /speed); // Adjust this delay as needed
        
              // Revert the color back to the primary color after comparison is done
              const timeoutId2 = setTimeout(() => {
                    arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS /speed); // Adjust this delay as needed
                localTimeoutIds.push(timeoutId1, timeoutId2);
            } else if (animation.type === 'swap') {
              const timeoutId1 = setTimeout(() => {
                arrayBars[idx1].style.backgroundColor = 'red';
                arrayBars[idx2].style.backgroundColor = 'red';
              }, i * ANIMATION_SPEED_MS /speed);
              // Swap the bars and change their height
              const timeoutId2 = setTimeout(() => {
                const tempHeight = arrayBars[idx1].style.height;
                arrayBars[idx1].style.height = arrayBars[idx2].style.height;
                arrayBars[idx2].style.height = tempHeight;
              }, i * ANIMATION_SPEED_MS /speed); // Adjust this delay as needed

              const timeoutId3 = setTimeout(() => {
                arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
                arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS /speed);

            localTimeoutIds.push(timeoutId1, timeoutId2, timeoutId3);
            }
            else if(animation.type ==="correct"){
              const timeoutId1 = setTimeout(() => {
                arrayBars[idx1].style.backgroundColor = 'green';
                arrayBars[idx2].style.backgroundColor = 'green';
              }, i * ANIMATION_SPEED_MS /1);

              const timeoutId2 = setTimeout(() => {
                arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
                arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS /speed);
            localTimeoutIds.push(timeoutId1, timeoutId2);
            }
            else if(animation.type ==="done"){
              const timeoutId1 = setTimeout(() => {
                arrayBars[idx1].style.backgroundColor = 'green';
              }, i * ANIMATION_SPEED_MS /speed);

              const timeoutId2 = setTimeout(() => {
                arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS /speed);
            localTimeoutIds.push(timeoutId1, timeoutId2);
            }
        }
        clearAllTimeouts(localTimeoutIds);
        setTimeout(() => {
          setIsButtonsDisabled(false);
          clearAllTimeouts();
        }, animations.length * ANIMATION_SPEED_MS / speed);
      };

      const SelectionSortVisu = () => {
        const animations = selectionSort(randomNumbers);
        const arrayBars = document.getElementsByClassName('array-bar');
      
        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            const [idx1, idx2] = animation.indices;
            const compElement = animation.ArrayStart;
        
            if (animation.type === 'comparison') {
              // Highlight the bars being compared with different colors
              setTimeout(() => {
                arrayBars[compElement].style.backgroundColor = "#ffdb58";
                arrayBars[idx1].style.backgroundColor = "#ffdb58";
                arrayBars[idx2].style.backgroundColor = 'red';
              }, i * ANIMATION_SPEED_MS); // Adjust this delay as needed
        
              // Revert the color back to the primary color after comparison is done
                setTimeout(() => {
                    arrayBars[compElement].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS); // Adjust this delay as needed
            } else if (animation.type === 'swap') {
              // Swap the bars and change their height
              setTimeout(() => {
                const tempHeight = arrayBars[idx1].style.height;
                arrayBars[idx1].style.height = arrayBars[idx2].style.height;
                arrayBars[idx2].style.height = tempHeight;
              }, i * ANIMATION_SPEED_MS); // Adjust this delay as needed
            }
        }
      }

      const MyMergeSortVisu = () => {
        const animations = mergeSort(randomNumbers);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
          const { indices, type } = animations[i];
          const [idx1, idx2] = indices;
      
          if (type === 'comparison') {
            // Highlight the bars being compared with different colors
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
              arrayBars[idx2].style.backgroundColor = SECONDARY_COLOR;
            }, i * ANIMATION_SPEED_MS);
      
            // Revert the color back to the primary color after comparison is done
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
          } else if (type === 'swap') {
            // Swap the bars and change their height
            const [value1, value2] = animations[i].values;
            setTimeout(() => {
              arrayBars[idx1].style.height = `${value2}px`;
              arrayBars[idx2].style.height = `${value1}px`;
            }, i * ANIMATION_SPEED_MS);
          } else if (type === 'secondary') {
            // Highlight the secondary bar with a different color
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
            }, i * ANIMATION_SPEED_MS);
          }
        }
        for (let i = 0; i < animations.length; i++) {
          const { indices, type } = animations[i];
          const [idx1, idx2] = indices;
      
          if (type === 'comparison') {
            // Highlight the bars being compared with different colors
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
              arrayBars[idx2].style.backgroundColor = SECONDARY_COLOR;
            }, i * ANIMATION_SPEED_MS);
      
            // Revert the color back to the primary color after comparison is done
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
          } else if (type === 'swap') {
            // Swap the bars and change their height
            const [value1, value2] = animations[i].values;
            setTimeout(() => {
              arrayBars[idx1].style.height = `${value2}px`;
              arrayBars[idx2].style.height = `${value1}px`;
            }, i * ANIMATION_SPEED_MS);
          } else if (type === 'secondary') {
            // Highlight the secondary bar with a different color
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      
      }

      const insertionSortVisu = () => {
        const animations = InsertionSort(randomNumbers);
        const arrayBars = document.getElementsByClassName('array-bar');
        const PRIMARY_COLOR = 'turquoise';
      
        for (let i = 0; i < animations.length; i++) {
          const animation = animations[i];
          const [idx1, idx2] = animation.indices;
      
          if (animation.type === 'comparison') {
            // Highlight the bars being compared with different colors
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = "#ffdb58";
              arrayBars[idx2].style.backgroundColor = 'red';
            }, i * ANIMATION_SPEED_MS); // Adjust this delay as needed
      
            // Revert the color back to the primary color after comparison is done
            setTimeout(() => {
              // arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS); // Adjust this delay as needed
          } else if (animation.type === 'swap') {
            // Swap the bars and change their height
            setTimeout(() => {
              const tempHeight = arrayBars[idx1].style.height;
              arrayBars[idx1].style.height = arrayBars[idx2].style.height;
              arrayBars[idx2].style.height = tempHeight;
            }, i * ANIMATION_SPEED_MS); // Adjust this delay as needed
          }else if (animation.type === 'position'){
            // Highlight the correct position for the element
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = "#00FF00"; // Green color to show the correct position
            }, i * ANIMATION_SPEED_MS); // Adjust this delay as needed

            // Revert the color back to the primary color after positioning is done
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS); // Adjust this delay as needed
            }
        }
      };
      
      const mergeSortVisu = () => {
        const animations = getMergeSortAnimations(randomNumbers);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

      const QuickSortVisu = ()=> {
        const animations = QuickSortAlgo(randomNumbers);
        const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
          const animation = animations[i];
          const [idx1, idx2, idx3] = animation.indices;    
          console.log(arrayBars);
          if (animation.type === 'comparison') {
            // Highlight the bars being compared with different colors
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = "#E9B824";
              arrayBars[idx2].style.backgroundColor = 'red';
              arrayBars[idx3].style.backgroundColor = 'red';

            }, i * ANIMATION_SPEED_MS); // Adjust this delay as needed
      
            // Revert the color back to the primary color after comparison is done
              setTimeout(() => {  
                  arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
                  arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
                  arrayBars[idx3].style.backgroundColor = PRIMARY_COLOR;
              }, (i + 1) * ANIMATION_SPEED_MS); // Adjust this delay as needed

          } else if (animation.type === 'swap') {
            // Swap the bars and change their height
            setTimeout(() => {
              const tempHeight = arrayBars[idx1].style.height;
              arrayBars[idx1].style.height = arrayBars[idx2].style.height;
              arrayBars[idx2].style.height = tempHeight;
            }, i * ANIMATION_SPEED_MS); // Adjust this delay as needed
          }
      }
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
            <button onClick={()=>SelectionSortVisu()} disabled={isButtonsDisabled}>SelectionSortAlgo</button>
            <button onClick={()=>insertionSortVisu()} disabled={isButtonsDisabled}>insertionSortAlgo</button>
            <button onClick={()=>MyMergeSortVisu()} disabled={isButtonsDisabled}>MergeSortAlgo</button>
            <button onClick={()=>QuickSortVisu()} disabled = {isButtonsDisabled}>Quick sort</button>
            <button onClick={()=>handlePause()} >Pause</button>


        
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

