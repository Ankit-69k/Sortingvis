export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  buildMaxHeap(array, animations);

  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
      animations.push([0, endIdx, true]); // Highlight bars being compared
      swap(0, endIdx, array);
      siftDown(0, endIdx - 1, array, animations);
      animations.push([0, endIdx, false]); // Revert colors
  }

  return animations;
}

function buildMaxHeap(array, animations) {
  const lastNonLeafIdx = Math.floor(array.length / 2) - 1;
  for (let i = lastNonLeafIdx; i >= 0; i--) {
      siftDown(i, array.length - 1, array, animations);
  }
}

function siftDown(startIdx, endIdx, array, animations) {
  let rootIdx = startIdx;

  while (rootIdx <= endIdx) {
      let leftChildIdx = rootIdx * 2 + 1;
      let rightChildIdx = rootIdx * 2 + 2;
      let swapIdx = rootIdx;

      if (leftChildIdx <= endIdx && array[leftChildIdx] > array[swapIdx]) {
          swapIdx = leftChildIdx;
      }

      if (rightChildIdx <= endIdx && array[rightChildIdx] > array[swapIdx]) {
          swapIdx = rightChildIdx;
      }

      if (swapIdx !== rootIdx) {
          animations.push([rootIdx, swapIdx, true]); // Highlight bars being compared
          swap(rootIdx, swapIdx, array);
          rootIdx = swapIdx;
      } else {
          return;
      }
  }
}

function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
