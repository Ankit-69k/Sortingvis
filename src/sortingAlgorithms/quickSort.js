export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx >= endIdx) return;
  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;

  animations.push([pivotIdx, -1, -1, false]); // Mark pivot
  while (rightIdx >= leftIdx) {
    if (mainArray[leftIdx] > mainArray[pivotIdx] && mainArray[rightIdx] < mainArray[pivotIdx]) {
      animations.push([pivotIdx, leftIdx, rightIdx, true]); // Swap bars
      swap(leftIdx, rightIdx, mainArray);
    }
    if (mainArray[leftIdx] <= mainArray[pivotIdx]) {
      animations.push([pivotIdx, leftIdx, rightIdx, false]); // Revert colors
      leftIdx++;
    }
    if (mainArray[rightIdx] >= mainArray[pivotIdx]) {
      animations.push([pivotIdx, leftIdx, rightIdx, false]); // Revert colors
      rightIdx--;
    }
  }
  animations.push([pivotIdx, -1, -1, false]); // Revert pivot color

  animations.push([pivotIdx, pivotIdx, rightIdx, true]); // Swap pivot with rightIdx
  swap(pivotIdx, rightIdx, mainArray);

  const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);

  if (leftSubarrayIsSmaller) {
    quickSortHelper(mainArray, startIdx, rightIdx - 1, auxiliaryArray, animations);
    quickSortHelper(mainArray, rightIdx + 1, endIdx, auxiliaryArray, animations);
  } else {
    quickSortHelper(mainArray, rightIdx + 1, endIdx, auxiliaryArray, animations);
    quickSortHelper(mainArray, startIdx, rightIdx - 1, auxiliaryArray, animations);
  }
}

function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
