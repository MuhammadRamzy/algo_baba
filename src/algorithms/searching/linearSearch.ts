interface Step {
    array: number[];
    current: number;
    found: boolean;
  }
  
  export function linearSearch(arr: number[]): Step[] {
    const steps: Step[] = [];
    const array = [...arr];
    const target = Math.floor(Math.random() * 100) + 1; // Random target to search for
  
    for (let i = 0; i < array.length; i++) {
      steps.push({
        array: array,
        current: i,
        found: array[i] === target
      });
      
      if (array[i] === target) break;
    }
  
    return steps;
  }