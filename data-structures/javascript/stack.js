module.exports = Stack;

class Stack  {

    constructor () {
        this.__data = new StackData();
    }

    pop () {
        let nextHead = this.__data.head.next;
        let item = this.__data.head;

        this.__data.length--;
        this.__data.head = nextHead;

        return item;
    }

    push (data)  {
        let prevHead = this.__data.head;

        this.__data.head = new Item(data, prevHead);
        return ++this.__data.length;

    }

    peek () {
        return this.__data.head.data;
    }

    length () {
        return this.__data.length;
    }
}


function Item(data, next) {
    return {
        next: next || null,
        data: data
    }
}

function StackData() {
    return {
        length: 0,
        head: null
    };
}
