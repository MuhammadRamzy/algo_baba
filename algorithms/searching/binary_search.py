from utils.visualization_helpers import visualize_array

def binary_search(arr, canvas, target, step_by_step=False):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        visualize_array(arr, canvas)
        if step_by_step:
            input("Press Enter to continue...")
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1