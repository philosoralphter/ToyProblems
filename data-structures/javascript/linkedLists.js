//very basic implementation of singly and doubly linked lists.  list constructors only create a list from an array, no helper methods
//


////////
//SINGLE
////////
class SinglyLinkedList {
    constructor(arr) {
        if (arr && Array.isArray(arr)) {
            this.head = new SinglyLinkedNode(arr[0]);

            for (let i=1, prevItem=this.head; i<arr.length; i++) {
                prevItem.next = new SinglyLinkedNode(arr[i]);
                prevItem = prevItem.next;
            }
        } else {
            this.head = null;
        }
    }
}

class SinglyLinkedNode {
    constructor(data, next) {
        this.data = data;
        this.next = next || null;

    }
}





////////
//DOUBLE
////////
class DoublyLinkedList {
    constructor(arr) {
        if (arr && Array.isArray(arr)) {
            this.head = new DoublyLinkedNode(arr[0]);
            this.tail = this.head;


            for (let i=1, prevItem = this.head; i<arr.length; i++) {
                prevItem.next = new DoublyLinkedNode(arr[i], prevItem);

                prevItem = prevItem.next;
            }
        } else {
            this.head = null;
            this.tail = null;
        }
    }

}

class DoublyLinkedNode {
    constructor(data, prev, next) {
        this.data = data;
        this.prev = prev || null;
        this.next = next || null;

    }
}

DoublyLinkedList.prototype.toString = function () {
    return listUtils.serializeList(this);
};
SinglyLinkedList.prototype.toString = function () {
    return listUtils.serializeList(this);
};




//UTILS
let listUtils = {
    serializeList: function (listOrHead) {
        let serializedList = '';

        {
            let thisItem = listOrHead.head || listOrHead;
            do {
                serializedList += thisItem.data;
                if (thisItem.next) {
                    serializedList += '->';
                }
                thisItem = thisItem.next;
            }
            while (thisItem && thisItem.data !==undefined && thisItem.data !== null);
        }

        return serializedList;
    }
};


//EXPORTS
module.exports = {
    SinglyLinked: SinglyLinkedList,
    DoublyLinked: DoublyLinkedList,

    nodes: {
        SinglyLinked: SinglyLinkedNode,
        DoublyLinked: DoublyLinkedNode
    },

    utils: listUtils
};
