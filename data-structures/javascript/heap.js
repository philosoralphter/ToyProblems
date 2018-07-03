class _BaseHeap {
    /**
     *
     * @param isMinHeap
     * @param elements
     * @param comparator {function} Function should return true if first element should take precedence over second, ie for max heap: elem1 > elem2.
     */
    constructor(isMinHeap, elements, comparator) {
        this._isMinHeap = isMinHeap === true;
        this._data = [];

        if (comparator) {
            this.comparator = comparator;
        } else {
            if (this._isMinHeap) {
                this.comparator = function (elem1, elem2) {
                    return elem1 < elem2;
                }
            } else {
                this.comparator = function (elem1, elem2) {
                    return elem1 > elem2;
                }
            }
        }

        if (elements) {
            for (let i=0; i<elements.length; i++) {
                this.insert(elements[i]);
            }
        }
    }

    insert(value) {
        this._data.push(value);
        let newValueIndex = this._data.length - 1;

        let iEvenChild = newValueIndex & 1 === 0 ? newValueIndex : null;
        let iOddChild = newValueIndex & 1 === 0 ? newValueIndex-1 : newValueIndex;
        let iParent = getParent(iOddChild);
        let iChildToSwap =  this._findChildIndexToBubble(iParent, iOddChild, iEvenChild);

        while (iChildToSwap >= 0 && iParent >=0) { //while one child is greater than parent
            swap (this._data, iParent, iChildToSwap);

            iParent = getParent(iParent);
            iEvenChild = getEvenChild(iParent);
            iOddChild = getOddChild(iParent);
            iChildToSwap = this._findChildIndexToBubble(iParent, iOddChild, iEvenChild);
        }

        return value;
    }

    pop() {
        let returnElement = this._data[0];
        this._data[0] = this._data[this._data.length-1];
        this._data.pop();

        let iParent = 0;
        let iOddChild = 1;
        let iEvenChild = 2;
        let bubbleDownIndex = this._findChildIndexToBubble(iParent, iOddChild, iEvenChild);

        while (bubbleDownIndex >= 1) {
            swap(this._data, iParent, bubbleDownIndex);

            iParent = bubbleDownIndex;
            iOddChild = getOddChild(iParent);
            iEvenChild = getEvenChild(iParent);

            bubbleDownIndex = this._findChildIndexToBubble(iParent, iOddChild, iEvenChild)
        }

        return returnElement;
    }

    _findChildIndexToBubble(iParent, iOddChild, iEvenChild) {
        // console.log('Heaping: evenIndex: %d evenChild: %d, OddChild: %d, Parent Data: %d, index: %d', iEvenChild, this._data[iEvenChild], this._data[iOddChild],  this._data[iParent], iParent, this)

        if (iEvenChild >= 0
            && this._data[iEvenChild] !== undefined
            && (this.comparator(this._data[iOddChild], this._data[iParent]) || this.comparator(this._data[iEvenChild], this._data[iParent]))){
            //have both children and at least one out of place

                return this.comparator(this._data[iEvenChild], this._data[iOddChild]) ? iEvenChild : iOddChild;

        } else if (this.comparator(this._data[iOddChild], this._data[iParent])) {
            //have one child and it's out of place
            return iOddChild;
        } else {
            //no children or parent already lesser
            return -1;
        }
    }
}

module.exports = {
    MaxHeap: class MaxHeap extends _BaseHeap {
        constructor(elements, comparator) {
            super(false, elements, comparator);
        }
    },

    MinHeap: class MinHeap extends _BaseHeap {
        constructor(elements, comparator) {
            super(true, elements, comparator);
        }
    },
};

//functions
function getParent(index) {
    let jnsq = index & 1 === 0 ? 2 : 1;
    return Math.floor((index - jnsq)/2)
}
function getSibling(index) {
    return index & 1 === 0 ? index-1 : index+1;
}
function getChildren(index) {
    return [(index * 2) + 1, (index*2) + 2]
}
function getEvenChild(index) {
    return (index * 2) + 2;
}
function getOddChild(index) {
    return (index * 2) +1
}

function swap (arr, i1, i2) {
    let mem = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = mem;
}



//
//TEST
//
(function (){
    let elements = [1,2,3,4,5];

    let maxHeap = new module.exports.MaxHeap(elements);
    let minHeap = new module.exports.MinHeap(elements);
    console.log('Max Heap: ', maxHeap);
    console.log('Min Heap: ', minHeap);

    console.log(minHeap.pop(), minHeap);
    console.log(maxHeap.pop(), maxHeap);

    maxHeap.insert(3.5);
    console.log(maxHeap);

})();
