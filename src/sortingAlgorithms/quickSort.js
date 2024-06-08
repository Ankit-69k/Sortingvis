export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function partition(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    const pivot = mainArray[endIdx];
    let pivotIdx = startIdx;
  
    for (let i = startIdx; i < endIdx; i++) {
      // Push animation to highlight comparison
      animations.push([i, endIdx]);
  
      if (mainArray[i] <= pivot) {
        // Push animations to represent swapping
        animations.push([i, pivotIdx]);
        animations.push([pivotIdx, i]);
  
        // Swap elements in auxiliaryArray
        const temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[pivotIdx];
        auxiliaryArray[pivotIdx] = temp;
  
        pivotIdx++;
      }
    }
  
    // Push animations to highlight final pivot position
    animations.push([pivotIdx, endIdx]);
    animations.push([endIdx, pivotIdx]);
  
    // Swap pivot element with element at pivot index in auxiliaryArray
    const temp = auxiliaryArray[pivotIdx];
    auxiliaryArray[pivotIdx] = auxiliaryArray[endIdx];
    auxiliaryArray[endIdx] = temp;
  
    // Copy auxiliaryArray back to mainArray
    for (let i = startIdx; i <= endIdx; i++) {
      mainArray[i] = auxiliaryArray[i];
    }
  
    return pivotIdx;
  }
  
  function quickSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx < endIdx) {
      const pivotIdx = partition(mainArray, startIdx, endIdx, auxiliaryArray, animations);
      quickSortHelper(mainArray, startIdx, pivotIdx - 1, auxiliaryArray, animations);
      quickSortHelper(mainArray, pivotIdx + 1, endIdx, auxiliaryArray, animations);
    }
  }
  