export function getBubbleSortAnimations(array) {
    const animations = [];
    bubbleSortHelper(array, animations);
    return animations;
  }
  
  function bubbleSortHelper(array, animations) {
    const length = array.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        animations.push([j, j + 1]); // Highlight comparison
        animations.push([j, j + 1]); // Revert highlight
        if (array[j] > array[j + 1]) {
          animations.push([j, array[j + 1]]); // Swap animation
          animations.push([j + 1, array[j]]); // Swap animation
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
  }
  