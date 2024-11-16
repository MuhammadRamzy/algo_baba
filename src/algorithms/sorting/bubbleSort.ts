interface Step {
  array: number[];
  comparing: number[];
  swapping: boolean;
}

export function bubbleSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...array], comparing: [j, j + 1], swapping: false });
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({ array: [...array], comparing: [j, j + 1], swapping: true });
      }
    }
  }

  steps.push({ array: [...array], comparing: [], swapping: false });
  return steps;
}