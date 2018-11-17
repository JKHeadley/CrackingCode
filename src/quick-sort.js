function quickSortRec(arr, left, right) {
    const pivot = arr[left];
    const index = partition(arr, left, right, pivot);
    if (left < index - 1) quickSortRec(arr, left, index - 1);
    if (index < right) quickSortRec(arr, index, right);
}

function partition(arr, left, right, pivot) {
    while (left <= right) {
        while (arr[left] < pivot) left++;
        while (arr[right] > pivot) right--;
        if (left <= right) {
            swap(arr, left, right);
            left++;
            right--;
        }
    }
    return left;
}

function swap(arr, left, right) {
    const tmp = arr[left];
    arr[left] = arr[right];
    arr[right] = tmp;
}

function quickSort(arr) {
    quickSortRec(arr, 0, arr.length - 1);
    return arr;
}

const arr = [5,9,3,7,1,8,3];

console.log(quickSort(arr))