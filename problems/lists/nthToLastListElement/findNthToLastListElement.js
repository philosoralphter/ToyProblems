let lists = require('../../../data-structures/javascript/linkedLists.js');

function findNthToLast(list, n) {
    let lastN = new lists.SinglyLinked();

    //set up two pointers
    let tailNode = list.head;
    let tailMinusNth = list.head;
    for (let i=1; i<n; i++) { //check this
        tailNode = tailNode.next;
    }
    //now pointers are n-1 away. (last element would be 1st to last not 0th)

    //increment both pointers til last is the last one
    while (tailNode.next !== null) {
        tailNode = tailNode.next;
        tailMinusNth = tailMinusNth.next;
    }

    return tailMinusNth;
}
