
export function BubbleSort(arr) {
    const animations = [];
    const sortedArray = [...arr];
  
    for (var i = 0; i < sortedArray.length; i++) {
      for (var j = 0; j < sortedArray.length - i - 1; j++) {
        // Record the comparison (index j and j + 1) in the animations array
        animations.push({ type: 'comparison', indices: [j, j + 1] });
  
        if (sortedArray[j] > sortedArray[j + 1]) {
          // Record the swap operation in the animations array
          animations.push({ type: 'swap', indices: [j, j + 1] });
  
          // Perform the swap in the sortedArray
          var temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
        }
      }
    }
  
    return animations;
  }

  export function selectionSort (arr){
    const animation = [];
    const sortedArray = [...arr];

    for (let i = 0; i < sortedArray.length - 1; i++){
      var min = i;
      for(let j = i+1; j < sortedArray.length; j++){
        animation.push({ type:"comparison", indices :[ min , j ],  ArrayStart: i});
        if(sortedArray[j]<sortedArray[min]){
          min = j;
        };
        
      };

        if(min !== i){
          animation.push({type:"swap", indices: [min , i], ArrayStart: i});
          var temp = sortedArray[i];
          sortedArray[i] = sortedArray[min];
          sortedArray[min] = temp;
        };
      }
    
    return animation;
  }