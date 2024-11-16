interface Step {
    array: number[];
    current: number;
    found: boolean;
  }
  
  export function binarySearch(arr: number[]): Step[] {
    const steps: Step[] = [];
    const array = [...arr].sort((a, b) => a - b); // Binary search requires sorted array
    const target = array[Math.floor(Math.random() * array.length)]; // Random target from array
  
    let left = 0;
    let right = array.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        array: array,
        current: mid,
        found: array[mid] === target
      });
  
      if (array[mid] === target) {
        break;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return steps;
  }