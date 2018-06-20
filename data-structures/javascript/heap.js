module.exports = {
    MaxHeap: function MaxHeap (elements) {
        return new BaseHeap(false, elements);
    },

    MinHeap: function MinHeap (elements) {
        return new BaseHeap(true, elements)
    }
};

class BaseHeap {
    constructor(isMinHeap, elements) {
        this.isMinHeap = isMinHeap === true;
        this.data = [];

        if (elements) {
            for (let i=0; i<elements.length; i++) {
                this.insert(elements[i]);
            }
        }
    }

    insert(value) {
        this.data.push(value);
        let newValueIndex = this.data.length - 1;

        let iEvenChild = newValueIndex & 1 === 0 ? newValueIndex : null;
        let iOddChild = newValueIndex & 1 === 0 ? newValueIndex-1 : newValueIndex;
        let iParent = getParent(iOddChild);
        let iChildToSwap =  this._findChildIndexToBubble(iParent, iOddChild, iEvenChild);

        while (iChildToSwap >= 0 && iParent >=0) { //while one child is greater than parent
            swap (this.data, iParent, iChildToSwap);

            iParent = getParent(iParent);
            iEvenChild = getEvenChild(iParent);
            iOddChild = getOddChild(iParent);
            iChildToSwap = this._findChildIndexToBubble(iParent, iOddChild, iEvenChild);
        }

        return value;
    }

    pop() {
        let returnElement = this.data[0];
        this.data[0] = this.data[this.data.length-1];
        this.data.pop();

        let iParent = 0;
        let iOddChild = 1;
        let iEvenChild = 2;
        let bubbleDownIndex = this._findChildIndexToBubble(iParent, iOddChild, iEvenChild);

        while (bubbleDownIndex >= 1) {
            swap(this.data, iParent, bubbleDownIndex);

            iParent = bubbleDownIndex;
            iOddChild = getOddChild(iParent);
            iEvenChild = getEvenChild(iParent);

            bubbleDownIndex = this._findChildIndexToBubble(iParent, iOddChild, iEvenChild)
        }

        return returnElement;
    }

    _findChildIndexToBubble(iParent, iOddChild, iEvenChild) {
            // console.log('Heaping: evenIndex: %d evenChild: %d, OddChild: %d, Parent Data: %d, index: %d', iEvenChild, this.data[iEvenChild], this.data[iOddChild],  this.data[iParent], iParent, this)
        if (this.isMinHeap) {
        //MIN HEAP
            if (iEvenChild >= 0
                && this.data[iEvenChild] !== undefined
                && Math.min(this.data[iEvenChild], this.data[iOddChild]) < this.data[iParent]) {
                //have both children

                    return this.data[iEvenChild] < this.data[iOddChild] ? iEvenChild : iOddChild;

            } else if (this.data[iOddChild] < this.data[iParent]) {
                //have one child
                return iOddChild;
            } else {
                //no children or parent already lesser
                return -1;
            }

        } else {
        //MAX HEAP
            if (iEvenChild >= 0
                && this.data[iEvenChild] !== undefined
                && Math.max(this.data[iEvenChild], this.data[iOddChild]) > this.data[iParent]) {
                //have both children
                    return this.data[iEvenChild] > this.data[iOddChild] ? iEvenChild : iOddChild;

            } else if (this.data[iOddChild] > this.data[iParent]) {
                //have one child
                return iOddChild;
            } else {
                //have no children or parent already greater
                return -1;
            }
        }
    }
}

//function
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
    console.log('Max Heap: ', maxHeap)
    console.log('Min Heap: ', minHeap)

    console.log(minHeap.pop(), minHeap)
    console.log(maxHeap.pop(), maxHeap)

    maxHeap.insert(3.5);
    console.log(maxHeap)

})()
