export function getHeapSortAnimations(array) {
    const animations = [];
    heapSortHelper(array, animations);
    return animations;
  }
  
  function heapSortHelper(array, animations) {
    const length = array.length;
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
      heapify(array, length, i, animations);
    }
    for (let i = length - 1; i > 0; i--) {
      animations.push([0, i]); // Highlight the elements being swapped
      animations.push([0, i]); // Revert highlight
      animations.push([0, array[i]]); // Swap animation
      animations.push([i, array[0]]); // Swap animation
      [array[0], array[i]] = [array[i], array[0]];
      heapify(array, i, 0, animations);
    }
  }
  
  function heapify(array, length, rootIdx, animations) {
    let largest = rootIdx;
    const leftChild = 2 * rootIdx + 1;
    const rightChild = 2 * rootIdx + 2;
  
    if (leftChild < length && array[leftChild] > array[largest]) {
      largest = leftChild;
    }
    if (rightChild < length && array[rightChild] > array[largest]) {
      largest = rightChild;
    }
    if (largest !== rootIdx) {
      animations.push([rootIdx, largest]); // Highlight the elements being swapped
      animations.push([rootIdx, largest]); // Revert highlight
      animations.push([rootIdx, array[largest]]); // Swap animation
      animations.push([largest, array[rootIdx]]); // Swap animation
      [array[rootIdx], array[largest]] = [array[largest], array[rootIdx]];
      heapify(array, length, largest, animations);
    }
  }
      