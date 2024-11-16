interface Step {
    array: number[]
    visited: number[]
    distances: number[]
  }
  
  export function dijkstra(arr: number[]): Step[] {
    const steps: Step[] = []
    const n = arr.length
    const distances = Array(n).fill(Infinity)
    const visited: number[] = []
  
    distances[0] = 0
  
    for (let i = 0; i < n; i++) {
      let minDistance = Infinity
      let minIndex = -1
  
      for (let j = 0; j < n; j++) {
        if (!visited.includes(j) && distances[j] < minDistance) {
          minDistance = distances[j]
          minIndex = j
        }
      }
  
      if (minIndex === -1) break
  
      visited.push(minIndex)
  
      for (let j = 0; j < n; j++) {
        if (!visited.includes(j)) {
          const newDistance = distances[minIndex] + arr[j]
          if (newDistance < distances[j]) {
            distances[j] = newDistance
          }
        }
      }
  
      steps.push({ array: [...arr], visited: [...visited], distances: [...distances] })
    }
  
    return steps
  }