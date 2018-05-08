//Linked list queue

moduel.exports = Queue;

class Queue {
    constructor () {
        this.__data = new QueueData();
    }

    enqueue (item) {
        let prevTail = this.__data.tail;

        this.__data.tail = new QueueItem(item);
        this.__data.queueLength++;

        //handle if this is the only element (head and tail)
        if (prevTail === null && this.__data.queueLength === 1 ) {

            if (prevTail !== null || this.__data.queueLength !== 1) {
                //queue corrupt;
                throw new Error('Queue data has become corrupt.')
            }

            this.__data.head = this.__data.tail;
        } else {
            prevTail.next = this.__data.tail;
        }

        return this.__data.queueLength;
    }

    dequeue () {
        let item = this.__data.head;

        this.__data.head = item.next;
        this.__data.queueLength--;

        return item;
    }

    peek () {
        return this.__data.head;
    }

    pop () { return this.dequeue.apply(this, arguments)}]
    push () { return this.enqueue.apply(this, arguments)}
    length () { return this.__data.queueLength; }

}

function QueueItem(data) {
    return {
        data: data,
        next: null
    }
}

function QueueData() {
    return {
        queueLength: 0,
        head: null,
        tail: null
    }
}
