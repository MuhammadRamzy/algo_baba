interface Step {
    array: number[]
    visited: number[]
    mst: [number, number][]
  }
  
  export function prims(arr: number[]): Step[] {
    const steps: Step[] = []
    const n = arr.length
    const visited: number[] = [0]
    const mst: [number, number][] = []
  
    while (visited.length < n) {
      let minEdge: [number, number] | null = null
      let minWeight = Infinity
  
      for (const v of visited) {
        for (let u = 0; u < n; u++) {
          if (!visited.includes(u) && arr[v] < minWeight) {
            minWeight = arr[v]
            minEdge = [v, u]
          }
        }
      }
  
      if (minEdge) {
        const [v, u] = minEdge
        visited.push(u)
        mst.push(minEdge)
        steps.push({ array: [...arr], visited: [...visited], mst: [...mst] })
      }
    }
  
    return steps
  }