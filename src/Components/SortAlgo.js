export function BubbleSort(arr){
    const sortedArray = [...arr];

    for (var i = 0; i < sortedArray.length; i++) {
  
        for (var j = 0; j < (sortedArray.length - i - 1); j++) {
  
            if (sortedArray[j] > sortedArray[j + 1]) {
  
                var temp = sortedArray[j]
                sortedArray[j] = sortedArray[j + 1]
                sortedArray[j + 1] = temp
            }
        }
    }

    return sortedArray;
}