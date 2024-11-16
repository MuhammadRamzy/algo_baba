interface Step {
  array: number[];
  comparing: number[];
  swapping: boolean;
}

export function quickSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];

  function partition(low: number, high: number): number {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({ array: [...array], comparing: [j, high], swapping: false });
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({ array: [...array], comparing: [i, j], swapping: true });
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({ array: [...array], comparing: [i + 1, high], swapping: true });

    return i + 1;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, array.length - 1);
  steps.push({ array: [...array], comparing: [], swapping: false });
  return steps;
}