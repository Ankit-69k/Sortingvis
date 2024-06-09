  export function getMergeSortAnimations(array) {
      const animations = [];
      if (array.length <= 1) return array;
      const auxiliaryArray = array.slice();
      mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
      return animations;
    }
    
    function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
      if (startIdx === endIdx) return;
      const middleIdx = Math.floor((startIdx + endIdx) / 2);
      mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
      mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
      doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
    }
    
    function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
      let k = startIdx;
      let i = startIdx;
      let j = middleIdx + 1;
      while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
          animations.push([k, auxiliaryArray[i]]); // Push the index and value for height update
          mainArray[k++] = auxiliaryArray[i++];
        } else {
          animations.push([k, auxiliaryArray[j]]); // Push the index and value for height update
          mainArray[k++] = auxiliaryArray[j++];
        }
      }
      while (i <= middleIdx) {
        animations.push([i, i]); // Push the index twice for color change
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]); // Push the index and value for height update
        mainArray[k++] = auxiliaryArray[i++];
      }
      while (j <= endIdx) {
        animations.push([j, j]); // Push the index twice for color change
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]); // Push the index and value for height update
        mainArray[k++] = auxiliaryArray[j++];
      }
    }