export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  const auxiliaryArray = array.slice();

  for (let i = 0; i < auxiliaryArray.length - 1; i++) {
      for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
          // Check if the current element is greater than the next element
          animations.push([j, j + 1, false]); // Highlight bars being compared
          if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
              animations.push([j, j + 1, true]); // Swap bars
              swap(j, j + 1, auxiliaryArray);
          }
          animations.push([j, j + 1, false]); // Revert colors
      }
  }
  return animations;
}

function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
