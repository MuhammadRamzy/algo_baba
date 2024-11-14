from utils.visualization_helpers import visualize_array

def quick_sort(arr, canvas, step_by_step=False):
    def partition(low, high):
        pivot = arr[(low + high) // 2]
        i = low - 1
        j = high + 1
        while True:
            i += 1
            while arr[i] < pivot:
                i += 1
            j -= 1
            while arr[j] > pivot:
                j -= 1
            if i >= j:
                return j
            arr[i], arr[j] = arr[j], arr[i]
            visualize_array(arr, canvas)
            if step_by_step:
                input("Press Enter to continue...")

    def _quick_sort(low, high):
        if low < high:
            split_index = partition(low, high)
            _quick_sort(low, split_index)
            _quick_sort(split_index + 1, high)

    _quick_sort(0, len(arr) - 1)
    return arr