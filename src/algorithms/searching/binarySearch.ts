interface Step {
  array: number[]
  current: number
  found: boolean
}

export function binarySearch(arr: number[], target: number): Step[] {
  const steps: Step[] = []
  const sortedArr = [...arr].sort((a, b) => a - b)
  let left = 0
  let right = sortedArr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    steps.push({ array: sortedArr, current: mid, found: false })

    if (sortedArr[mid] === target) {
      steps.push({ array: sortedArr, current: mid, found: true })
      return steps
    } else if (sortedArr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  steps.push({ array: sortedArr, current: -1, found: false })
  return steps
}