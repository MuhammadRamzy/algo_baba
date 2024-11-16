interface Step {
    array: number[]
    visited: number[]
    mst: [number, number][]
  }
  
  export function kruskal(arr: number[]): Step[] {
    const steps: Step[] = []
    const n = arr.length
    const edges: [number, number, number][] = []
    const parent = Array.from({ length: n }, (_, i) => i)
  
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        edges.push([i, j, arr[i] + arr[j]])
      }
    }
  
    edges.sort((a, b) => a[2] - b[2])
  
    const find = (x: number): number => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x])
      }
      return parent[x]
    }
  
    const union = (x: number, y: number) => {
      const rootX = find(x)
      const rootY = find(y)
      if (rootX !== rootY) {
        parent[rootY] = rootX
      }
    }
  
    const mst: [number, number][] = []
    const visited: number[] = []
  
    for (const [u, v, _] of edges) {
      if (find(u) !== find(v)) {
        union(u, v)
        mst.push([u, v])
        visited.push(u, v)
        steps.push({ array: [...arr], visited: [...new Set(visited)], mst: [...mst] })
      }
    }
  
    return steps
  }