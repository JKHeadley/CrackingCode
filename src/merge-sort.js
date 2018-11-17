function mergeSort(arr, helper, low, high) {
    if (low < high) {
        let mid = Math.floor((high + low) / 2);
        mergeSort(arr, helper, low, mid);
        mergeSort(arr, helper, mid + 1, high);
        merge(arr, helper, low, mid, high);
    }

    return arr;
}

function merge(arr, helper, low, mid, high) {
    for (let i = low; i <= high; i++) {
        helper[i] = arr[i];
    }

    let helperLeft = low;
    let helperRight = mid + 1;
    let current = low;

    while (helperLeft <= mid && helperRight <= high) {
        if (helper[helperLeft] <= helper[helperRight]) {
            arr[current] = helper[helperLeft];
            helperLeft++;
        } else {
            arr[current] = helper[helperRight];
            helperRight++;
        }
        current++
    }

    while (helperLeft <= mid) {
        arr[current] = helper[helperLeft];
        helperLeft++;
        current++;
    }
}


function sort(arr) {
    const low = 0;
    const high = arr.length - 1;
    return mergeSort(arr, new Array(high + 1), low, high);
}

const arr = [5,9,3,7,59,1,4,8,3];
console.log(sort(arr))