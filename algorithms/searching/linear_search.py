from utils.visualization_helpers import visualize_array

def linear_search(arr, canvas, target, step_by_step=False):
    for i, item in enumerate(arr):
        visualize_array(arr, canvas)
        if step_by_step:
            input("Press Enter to continue...")
        if item == target:
            return i
    return -1