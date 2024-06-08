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
      this.resetArray(); // Reset the array after updating the number of bars
    });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    this.animateSorting(animations);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    this.animateSorting(animations);
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    this.animateSorting(animations);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    this.animateSorting(animations);
  }

  animateSorting(animations) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        } else {
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                if (barOneIdx < 0 || barOneIdx >= arrayBars.length) {
                    console.error('Invalid bar index:', barOneIdx);
                    return; // Exit this animation
                }
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
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
            }}></div>
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
