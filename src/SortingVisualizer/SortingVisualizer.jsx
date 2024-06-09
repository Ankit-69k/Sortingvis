import React from 'react';
import './SortingVisualizer.css';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort';
import { getHeapSortAnimations } from '../sortingAlgorithms/heapSort';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort';

const ANIMATION_SPEED_MS = 3;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const MAX_BAR_HEIGHT = 500; // Maximum height for the bars in pixels

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      numberOfArrayBars: 100, // Initial number of array bars
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.debounceResetArray = this.debounce(this.resetArray, 300);
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfArrayBars; i++) {
      array.push(randomIntFromInterval(5, MAX_BAR_HEIGHT));
    }
    this.setState({ array });
  }

  handleSliderChange(event) {
    this.setState({ numberOfArrayBars: parseInt(event.target.value, 10) }, () => {
      this.debounceResetArray();
    });
  }

  debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);

    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const isComparison = i % 3 !== 2; // Every third entry is a swap, others are comparisons.
      
      if (isComparison) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx]?.style;
        const barTwoStyle = arrayBars[barTwoIdx]?.style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (barOneStyle) barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx]?.style;
          if (barOneStyle) barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);

    const arrayBars = document.getElementsByClassName('array-bar');
    let pivotChanged = false;

    for (let i = 0; i < animations.length; i++) {
      const [pivotIdx, barOneIdx, barTwoIdx, swap] = animations[i];

      // Color pivot bar
      if (pivotIdx !== -1 && !pivotChanged) {
        const pivotBarStyle = arrayBars[pivotIdx]?.style;
        setTimeout(() => {
          if (pivotBarStyle) pivotBarStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        pivotChanged = true;
      }

      // Perform swap or revert colors
      setTimeout(() => {
        if (swap) {
          const barOneStyle = arrayBars[barOneIdx]?.style;
          const barTwoStyle = arrayBars[barTwoIdx]?.style;

          // Check if both styles are defined
          if (barOneStyle && barTwoStyle) {
            const tempHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = tempHeight;
          }
        } else {
          const barOneStyle = arrayBars[barOneIdx]?.style;
          const barTwoStyle = arrayBars[barTwoIdx]?.style;

          const color = barOneStyle?.backgroundColor === PRIMARY_COLOR ? SECONDARY_COLOR : PRIMARY_COLOR;

          // Check if both styles are defined
          if (barOneStyle && barTwoStyle) {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }
        }
      }, i * ANIMATION_SPEED_MS);
    }

    // Reset pivot bar color and all other bars
    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barStyle = arrayBars[j]?.style;
        if (barStyle) barStyle.backgroundColor = PRIMARY_COLOR;
      }
    }, animations.length * ANIMATION_SPEED_MS);
}




  

heapSort() {
  const animations = getHeapSortAnimations(this.state.array);

  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, swap] = animations[i];

      // Highlight bars being compared
      setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx]?.style;
          const barTwoStyle = arrayBars[barTwoIdx]?.style;

          if (barOneStyle && barTwoStyle) {
              barOneStyle.backgroundColor = SECONDARY_COLOR;
              barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }
      }, i * ANIMATION_SPEED_MS);

      // Perform swap or revert colors
      setTimeout(() => {
          if (swap) {
              const barOneStyle = arrayBars[barOneIdx]?.style;
              const barTwoStyle = arrayBars[barTwoIdx]?.style;

              // Check if both styles are defined
              if (barOneStyle && barTwoStyle) {
                  const tempHeight = barOneStyle.height;
                  barOneStyle.height = barTwoStyle.height;
                  barTwoStyle.height = tempHeight;
              }
          }

          // Revert colors of bars after comparison
          setTimeout(() => {
              const barOneStyle = arrayBars[barOneIdx]?.style;
              const barTwoStyle = arrayBars[barTwoIdx]?.style;

              if (barOneStyle && barTwoStyle) {
                  barOneStyle.backgroundColor = PRIMARY_COLOR;
                  barTwoStyle.backgroundColor = PRIMARY_COLOR;
              }
          }, ANIMATION_SPEED_MS);
      }, i * ANIMATION_SPEED_MS);
  }
}


  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);

    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const [barOneIdx, barTwoIdx, swap] = animations[i];

        // Highlight bars being compared
        setTimeout(() => {
            const barOneStyle = arrayBars[barOneIdx]?.style;
            const barTwoStyle = arrayBars[barTwoIdx]?.style;

            if (barOneStyle && barTwoStyle) {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
            }
        }, i * ANIMATION_SPEED_MS);

        // Perform swap or revert colors
        setTimeout(() => {
            if (swap) {
                const barOneStyle = arrayBars[barOneIdx]?.style;
                const barTwoStyle = arrayBars[barTwoIdx]?.style;

                // Check if both styles are defined
                if (barOneStyle && barTwoStyle) {
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                }
            }

            // Revert colors of bars after comparison
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx]?.style;
                const barTwoStyle = arrayBars[barTwoIdx]?.style;

                if (barOneStyle && barTwoStyle) {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }
            }, ANIMATION_SPEED_MS);
        }, i * ANIMATION_SPEED_MS);
    }
}





  render() {
    const { array, numberOfArrayBars } = this.state;

    // Calculate the maximum value in the array for scaling
    const maxValue = Math.max(...array);
    const barWidth = Math.max(1, 100 / numberOfArrayBars) + "%"; // Calculate bar width based on the number of bars

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${(value / maxValue) * MAX_BAR_HEIGHT}px`, // Scale the height
              width: `${barWidth}`, // Set the width
            }}
          ></div>
        ))}
        <div className="controls-container">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <input
            type="range"
            min="10"
            max="1000"
            value={numberOfArrayBars}
            onChange={this.handleSliderChange}
          />
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
