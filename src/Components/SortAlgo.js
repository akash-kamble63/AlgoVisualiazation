
export function BubbleSort(arr) {
    const animations = [];
    const sortedArray = [...arr];
  
    for (var i = 0; i < sortedArray.length; i++) {
      for (var j = 0; j < sortedArray.length - i - 1; j++) {
        // Record the comparison (index j and j + 1) in the animations array
        animations.push({ type: 'comparison', indices: [j, j + 1] });
        
        // if(sortedArray[j] < sortedArray[j + 1]){
        //   animations.push({ type: 'correct', indices: [j, j + 1] });
        // }

        if (sortedArray[j] > sortedArray[j + 1]) {
          // Record the swap operation in the animations array
          animations.push({ type: 'swap', indices: [j, j + 1] });
  
          // Perform the swap in the sortedArray
          var temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
        }else{
          animations.push({ type: 'correct', indices: [j, j + 1] });
        }
      }
    }

    for(var i= 0; i < sortedArray.length; i++){
      animations.push({type:"done", indices:[i]});
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

  // export function InsertioSort(arr){
  //   const animation = [];
  //   const sortedArray = [...arr];

  //   for(var i = 1; i < sortedArray.length; i++){
  //     var temp = sortedArray[i];
  //     var j = i - 1;
  //     animation.push({ type: "comparison", indices: [i, j] });
  //     while( j >= 0 && sortedArray[j] > temp ){
  //       animation.push({ type: "swap", indices: [j + 1, j] });
  //       sortedArray[j+1] = sortedArray[j];
  //       j--;
  //       if (j >= 0) animation.push({ type: "comparison", indices: [i, j] });
  //     }
  //     animation.push({ type: "swap", indices: [j + 1, i] });
  //     sortedArray[ j + 1 ] = temp;
  //   }
  //   return animation;
  // }

  export function InsertionSort(arr) {
    const animations = [];
    const sortedArray = [...arr];
  
    for (let i = 1; i < sortedArray.length; i++) {
      const temp = sortedArray[i];
      let j = i - 1;
      animations.push({ type: "comparison", indices: [i, j] });
  
      while (j >= 0 && sortedArray[j] > temp) {
        animations.push({ type: "swap", indices: [j + 1, j] });
        sortedArray[j + 1] = sortedArray[j];
        j--;
        if (j >= 0) animations.push({ type: "comparison", indices: [i, j] });
      }
      animations.push({ type: "position", indices: [j + 1] });
      sortedArray[j + 1] = temp;
    }
  
    return animations;
  }

// export function mergeSort(arr){

//   const sortedArray = [...arr];
//   const animation = [];

//   const lowerBound = 0;
//   const upperBound = sortedArray.length - 1;


//   function mergeSortHelper( sortedArray, lowerBound, upperBound, animation){


//     if (lowerBound === upperBound){
//       return;
//     }
  
//     const mid = lowerBound + parseInt((upperBound - lowerBound)/2);
//     mergeSortHelper( sortedArray, lowerBound, mid);
//     mergeSortHelper(sortedArray, mid + 1, upperBound);
//     mergeAlgo(sortedArray, lowerBound, mid, upperBound);

  
//   }
//   function mergeAlgo(sortedArray, lowerBound, mid, upperBound){
//     var i = lowerBound;
//     var j = mid + 1;
//     var k = lowerBound;
//     const mergedArray = [];

//     while (i <= mid && j <= upperBound){
//       if(sortedArray[i] <= sortedArray[j]){

//       }
//     }
//   }
  

// }

export function mergeSort(arr) {
  const animations = [];
  const tempArray = [...arr];

  function mergeSortHelper(start, end) {
    if (start === end) return;

    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(start, middle);
    mergeSortHelper(middle + 1, end);
    merge(start, middle, end);
  }

  function merge(start, middle, end) {
    let leftIndex = start;
    let rightIndex = middle + 1;
    const mergedArray = [];

    while (leftIndex <= middle && rightIndex <= end) {
      if (tempArray[leftIndex] <= tempArray[rightIndex]) {
        // Push the indices and values of bars to be compared with 'comparison' type
        animations.push({ indices: [leftIndex, rightIndex], values: [tempArray[leftIndex], tempArray[rightIndex]], type: 'comparison' });
        mergedArray.push(tempArray[leftIndex]);
        leftIndex++;
      } else {
        // Push the indices and values of bars to be compared with 'comparison' type
        animations.push({ indices: [leftIndex, rightIndex], values: [tempArray[leftIndex], tempArray[rightIndex]], type: 'comparison' });
        mergedArray.push(tempArray[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex <= middle) {
      // Push the indices and values of bars to be compared with 'comparison' type
      animations.push({ indices: [leftIndex, leftIndex], values: [tempArray[leftIndex], tempArray[leftIndex]], type: 'comparison' });
      mergedArray.push(tempArray[leftIndex]);
      leftIndex++;
    }

    while (rightIndex <= end) {
      // Push the indices and values of bars to be compared with 'comparison' type
      animations.push({ indices: [rightIndex, rightIndex], values: [tempArray[rightIndex], tempArray[rightIndex]], type: 'comparison' });
      mergedArray.push(tempArray[rightIndex]);
      rightIndex++;
    }

    for (let i = start; i <= end; i++) {
      tempArray[i] = mergedArray[i - start];
      // Push the indices and values of bars to be compared with 'swap' type
      animations.push({ indices: [i, i], values: [tempArray[i], tempArray[i]], type: 'swap' });
    }
  }

  mergeSortHelper(0, tempArray.length - 1);
  return animations;
}

export function quickSortAlgo(arr) {
  const sortedArray = [...arr];
  const animation = [];

  function quickSortHelper(lowerBound, upperBound) {
    if (lowerBound < upperBound) {
      const loc = partition(lowerBound, upperBound);
      quickSortHelper(lowerBound, loc - 1);
      quickSortHelper(loc + 1, upperBound);
    }
  }

  function partition(lowerBound, upperBound) {
    const pivot = sortedArray[lowerBound];
    let i = lowerBound - 1;

    animation.push({ indices: [lowerBound,upperBound], pivotPoint: pivot })
 
    for (let j = lowerBound; j < upperBound; j++) {
      if (sortedArray[j] < pivot) {
        i++;
        swap(i, j);
      }
    }

    swap(i + 1, upperBound);
    return i + 1;
  }

  function swap(i, j) {
    const temp = sortedArray[i];
    sortedArray[i] = sortedArray[j];
    sortedArray[j] = temp;
  }

  quickSortHelper(0, sortedArray.length - 1);
  return sortedArray;
}

export function QuickSortAlgo(arr){
  const sortedArray = [...arr];
  const animation = [];

  function QuickSortHelper(lowerBound, upperBound){
    if(lowerBound < upperBound){
      const loc = partition(lowerBound, upperBound);
      QuickSortHelper(lowerBound, loc - 1);
      QuickSortHelper(loc + 1, upperBound);
    }
  }

  function swap(a, b){
    const temp = sortedArray[a];
    sortedArray[a] = sortedArray[b];
    sortedArray[b] = temp;
  }

  function partition(lowerBound, upperBound) {
    const pivot = sortedArray[lowerBound]; // Choose pivot from lowerBound
    const pivotIdx = lowerBound;
    let start = lowerBound + 1; // Start from the element after the pivot
    let end = upperBound;
  
    while (start <= end) {

      while (start <= end && sortedArray[start] <= pivot) {
        animation.push({type :"comparison", indices:[pivotIdx, start, end]});
        start++;
      }
  
      while (start <= end && sortedArray[end] > pivot) {
        animation.push({type :"comparison", indices:[pivotIdx, end, start]});
        end--;
      }
  
      if (start <= end) {
        animation.push({type:"swap", indices:[start, end]})
        swap(start, end);
      }
    }
  
    // Swap the pivot into its correct position
    animation.push({ type: "swap", indices: [pivotIdx, end] });
    swap(lowerBound, end);
  
    return end;
  }

  QuickSortHelper(0, sortedArray.length - 1);
  return animation;
}

  
  
  
  
  
