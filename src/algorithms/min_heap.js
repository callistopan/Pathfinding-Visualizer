// min heap for smallest f score

export default class MinHeap {

    constructor() {
        this.heap = [];
    }

    get_parent(i) {
        return Math.floor((i - 1) / 2);
    }

    insert(data) {
        this.heap.push(data);
        let parent = this.get_parent(this.heap.length - 1);
        let index = this.heap.length - 1;
        while (parent >=0 && this.heap[index].f < this.heap[parent].f) {
            let temp = this.heap[index];
            this.heap[index] = this.heap[parent];
            this.heap[parent] = temp;
            index = parent;
            parent = this.get_parent(index);
        }
    }

    heapify(arr, n, i) {
        let smallest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < n && arr[left].f < arr[smallest].f) {
            smallest = left;
        }
        if (right < n && arr[right].f < arr[smallest].f) {
            smallest = right;
        }
        if (smallest != i) {
            let temp = arr[i];
            arr[i] = arr[smallest];
            arr[smallest] = temp;
            this.heapify(arr, n, smallest);
        }
    }

    extract_min() {
        if (this.heap.length == 0) {
            return null;
        }
        let min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapify(this.heap, this.heap.length, 0);
        return min;
    }
    is_empty() {
        return this.heap.length == 0;
    }


}