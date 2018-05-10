let lists = require('../data-structures/linkedLists.js');

function deleteItem(item) {
    if (!item.next) {
        return false
    }

    item.data = item.next.data;
    item.next = item.next.next;
    return true;
}

// (function test() {
//
//     // let testListElements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//     let testListElements = [1, 2, 3,1,2,3];
//
//     let testList = new lists.SinglyLinked(testListElements);
//     let item = testList.head.next.next.next;
//
//
//     console.log('Entire List: ', lists.utils.serializeList(testList.head));
//     console.log('Item to Delete: ', item);
//     deleteItem(item);
//     console.log('Deleted.  Resulting List: ', lists.utils.serializeList(testList.head))
//     // deleteItem(item);
//     // console.log('Deleted.  Resulting List: ', lists.utils.serializeList(testList.head))
//
// })();

module.exports = deleteItem;
