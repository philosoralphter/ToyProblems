let lists = require('../../../data-structures/javascript/linkedLists.js');

function listIsPalindrome(list) {
    if (list.head.next.prev && list.tail) {
        //doubly-linked
        return doublyLinkedListIsPalindrome(list)
    } else {
        return singlyLinkedListIsPalindrome(list)
    }
}

function doublyLinkedListIsPalindrome (list) {
    let headPointer = list.head;
    let tailPointer = list.tail;

    while (headPointer.data === tailPointer.data) {
        headPointer = headPointer.next;
        tailPointer = tailPointer.prev;

        if (headPointer.next === tailPointer.next) {
            return true;
        }
    }

    return false;
}

function singlyLinkedListIsPalindromeFast (list) {
    let doublyLinked = new lists.DoublyLinked();


    //Build doubly linked version
    {
        doublyLinked.head = list.head;

        let oldNode = list.head.next;
        let newTail = doublyLinked.head;
        while (oldNode) {
            newTail.next = oldNode;
            newTail.next.prev = newTail;

            newTail = newTail.next;
            oldNode = oldNode.next;
        }

        doublyLinked.tail = newTail;
    }

    return doublyLinkedListIsPalindrome(doublyLinked);

}


function singlyLinkedListIsPalindromeSmall (list) {
    let listLength = 0;
    {
        let thisNode = list.head;
        while (thisNode) {
            listLength++;
            thisNode = thisNode.next;
        }

    }

    let nodeToCheck = list.head;
    for (let i=1; i<=listLength/2; i++) {

        if (nodeToCheck.data === getSymetricItemPointer(nodeToCheck, i, listLength).data) {
            nodeToCheck = nodeToCheck.next;
            continue;

        } else {
            return false;
        }
    }

    return true;

    function getSymetricItemPointer (node, nonZeroIndex, length) {
        let otherNode = node;
        for (let i=nonZeroIndex; i<=length-nonZeroIndex; i++) {
            otherNode = otherNode.next;
        }
        return otherNode;
    }
}

(function test() {
    let testListElements = [1,2,3,4,5,5,4,3,2,1,];
    // let testListElements = [1,2, 3,1,2,3, 1,2,3];
    let testList = new lists.SinglyLinked(testListElements);

    console.log('Original List: ', testList.toString());
    console.log('Testing For Palindrome...');
    let isPalindrome = singlyLinkedListIsPalindromeSmall(testList);

    console.log('List is ', (isPalindrome ? '': 'not '), 'a palindrome' );
})();
