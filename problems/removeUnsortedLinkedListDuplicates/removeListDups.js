let lists = require('../data-structures/linkedLists.js');
let deleteSinglyLinkedElement = require('../deleteGiveListElement/deleteSinglyLinkedItem');




function deDupListFast(list) {
    let seenValues = {};

    {
        let thisNode = list.head;
        while (thisNode && thisNode.data) {

            if (seenValues[thisNode.data] === true) {
                thisNode = deleteNode(thisNode, list.head);

            } else {
                seenValues[thisNode.data] = true;
                thisNode = thisNode.next;
            }
        }
    }

    //delete a node, and return then next (positional replacement) node, or null if it was the last node
    function deleteNode(node, head) {
        if (node.next !== undefined && node.next !== null) {
            deleteSinglyLinkedElement(node);
            return node; //node is now next node
        } else {
            let thisNode = head;
            while (thisNode && thisNode.next && thisNode.next.next) {
                thisNode = thisNode.next;
            }

            //now we have the second to last node
            thisNode.next = null;
            return null;
        }
    }

}

function deDupListSmall(list) {

}


(function test() {
    let testListElements = [1,2,3,4,5,6,2,3,4,5,6,7,4,5,6,6,7,8,5,6,7,7,8,9];
    // let testListElements = [1,2, 3,1,2,3, 1,2,3];
    let testList = new lists.SinglyLinked(testListElements);

    console.log('Original List: ', testList.toString());
    console.log('Deduping...');
    deDupListFast(testList);

    console.log('Done: ', testList.toString());



})();
