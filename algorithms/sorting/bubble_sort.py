from utils.visualization_helpers import visualize_array

def bubble_sort(arr, canvas, step_by_step=False):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                visualize_array(arr, canvas)
                if step_by_step:
                    input("Press Enter to continue...")
    return arr