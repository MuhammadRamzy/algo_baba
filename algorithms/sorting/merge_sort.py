from utils.visualization_helpers import visualize_array

def merge_sort(arr, canvas, step_by_step=False):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sort(left_half, canvas, step_by_step)
        merge_sort(right_half, canvas, step_by_step)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1
            visualize_array(arr, canvas)
            if step_by_step:
                input("Press Enter to continue...")

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1
            visualize_array(arr, canvas)
            if step_by_step:
                input("Press Enter to continue...")

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1
            visualize_array(arr, canvas)
            if step_by_step:
                input("Press Enter to continue...")

    return arr