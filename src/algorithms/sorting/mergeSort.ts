interface Step {
    array: number[];
    comparing: number[];
    swapping: boolean;
  }
  
  export function mergeSort(arr: number[]): Step[] {
    const steps: Step[] = [];
    const array = [...arr];
    const n = array.length;
  
    function merge(left: number, middle: number, right: number) {
      const leftArray = array.slice(left, middle + 1);
      const rightArray = array.slice(middle + 1, right + 1);
      let i = 0, j = 0, k = left;
  
      while (i < leftArray.length && j < rightArray.length) {
        steps.push({ array: [...array], comparing: [left + i, middle + 1 + j], swapping: false });
        if (leftArray[i] <= rightArray[j]) {
          array[k] = leftArray[i];
          i++;
        } else {
          array[k] = rightArray[j];
          j++;
        }
        steps.push({ array: [...array], comparing: [k], swapping: true });
        k++;
      }
  
      while (i < leftArray.length) {
        array[k] = leftArray[i];
        steps.push({ array: [...array], comparing: [k], swapping: true });
        i++;
        k++;
      }
  
      while (j < rightArray.length) {
        array[k] = rightArray[j];
        steps.push({ array: [...array], comparing: [k], swapping: true });
        j++;
        k++;
      }
    }
  
    function mergeSortHelper(left: number, right: number) {
      if (left < right) {
        const middle = Math.floor((left + right) / 2);
        mergeSortHelper(left, middle);
        mergeSortHelper(middle + 1, right);
        merge(left, middle, right);
      }
    }
  
    mergeSortHelper(0, n - 1);
    steps.push({ array: [...array], comparing: [], swapping: false });
    return steps;
  }