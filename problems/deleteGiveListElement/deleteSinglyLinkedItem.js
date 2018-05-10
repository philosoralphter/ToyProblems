let lists = require('../data-structures/linkedLists.js');

function deleteItem(item) {
    if (!item.next) {
        return false
    }

    item.data = item.next.data;
    item.next = item.next.next;
    return true;
}

(function test() {

    let testListElements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let testList = new lists.SinglyLinked(testListElements);
    let item = testList.head.next.next.next; //should be the 3 at index 3


    console.log('Entire List: ', serializeList(testList.head));
    console.log('Item to Delete: ', item);
    deleteItem(item);
    console.log('Deleted.  Resulting List: ', serializeList(testList.head))




})();


function serializeList(listHead) {
    let serializedList = '';
    {
        let thisItem = listHead.head || listHead;
        do {
            serializedList += thisItem.data;
            if (thisItem.next) {
                serializedList += '->';
            }
            thisItem = thisItem.next;
        }
        while (thisItem && thisItem.data);
    }

    return serializedList;
}
