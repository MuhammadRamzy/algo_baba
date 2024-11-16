interface Step {
    array: number[];
    visited: number[];
    queue: number[];
  }
  
  export function bfs(arr: number[]): Step[] {
    const steps: Step[] = [];
    const array = [...arr];
    const visited: number[] = [];
    const queue: number[] = [0]; // Start from node 0
  
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (!visited.includes(current)) {
        visited.push(current);
        
        // Simulate getting neighbors (in this case, we'll use adjacent indices)
        const neighbors = [current - 1, current + 1].filter(
          n => n >= 0 && n < array.length && !visited.includes(n)
        );
        
        queue.push(...neighbors);
        
        steps.push({
          array: array,
          visited: [...visited],
          queue: [...queue]
        });
      }
    }
  
    return steps;
  }