interface Step {
    array: number[];
    visited: number[];
    stack: number[];
  }
  
  export function dfs(arr: number[]): Step[] {
    const steps: Step[] = [];
    const array = [...arr];
    const visited: number[] = [];
    const stack: number[] = [0]; // Start from node 0
  
    while (stack.length > 0) {
      const current = stack.pop()!;
      
      if (!visited.includes(current)) {
        visited.push(current);
        
        // Simulate getting neighbors (in this case, we'll use adjacent indices)
        const neighbors = [current + 1, current - 1].filter(
          n => n >= 0 && n < array.length && !visited.includes(n)
        );
        
        stack.push(...neighbors);
        
        steps.push({
          array: array,
          visited: [...visited],
          stack: [...stack]
        });
      }
    }
  
    return steps;
  }