class BinarySearchTree {
    constructor(elements, comparator) {
        if (comparator) {
            this.defaultComparator = comparator;
        } else {
            this.defaultComparator = compareNumbers;
        }

        this.itemCount = 0;

        if (elements) {
            let sortedElements = elements.slice(0).sort(this.defaultComparator);

            fillTreeWithSortedElements(this, sortedElements);
            this.itemCount = elements.length;
        }
    }

    insert(value) {
        if (!this.root) {
            this.root = new BSTNode(value);
        } else {
            insertValueOnRootRecursive(this.root, value);
        }
        this.itemCount++;
    }

    remove(value) {
        let nodeAndParent = findNodeWithParentIterative(this, value);
        let node = nodeAndParent.node;
        let parent = nodeAndParent.parent;

        deleteNodeRecursive(node, parent);

        this.itemCount--;
    }

    //iteratively, for fun
    find(item) {
        let found = findNodeWithParentIterative(this, item);
        return found ? found.node : found;
    }

    prettyPrint() {
        //doesn't really work but close enough for checking, assumes balanced tree, etc. etc.

        //find depth: (more or less)
        let node = this.root;
        let depth = 1;
        while (node.leftChild) {
            depth++;
            node = node.leftChild
        }

        //traverse BFS to log in terminal
        traverseBreadthFirst(this.root, (function (){
            let callCount = 0;
            let bigTab = '-';
            let smallTab = '__'

            return function (value) {
                callCount++;
                let outputString = '';

                let jnsq = Math.log(callCount) / Math.log(2);
                let currentDepth = Math.floor(jnsq);

                //first tabs of each line
                if (jnsq % 1 === 0){
                    let openLineTabs = depth - currentDepth;
                    outputString += '\n';
                    for (let i = 0; i < Math.pow(2, openLineTabs-1); i++) {
                        outputString += bigTab;
                    }
                } else {
                    for (let i=0; i<Math.pow(2, depth - currentDepth); i++) {
                        outputString += bigTab;// jnsq % 2 === 0 ? bigTab : smallTab;
                    }

                }

                outputString += value;

                process.stdout.write(outputString);
            };
        })())
    }
}

class BSTNode {
    constructor(value, leftChild, rightChild) {
        this.value = value;
        this.leftChild = leftChild || null;
        this.rightChild = rightChild || null;
    }
}

module.exports = BinarySearchTree;


// Functions
function insertValueOnRootRecursive(root, value) {
    if (value <= root.value) {
        if (root.leftChild && root.leftChild.value !== null) insertValueOnRootRecursive(root.leftChild, value);
        else root.leftChild = new BSTNode(value);
    } else if (value > root.value) {
        if (root.rightChild && root.rightChild.value !== null) insertValueOnRootRecursive(root.rightChild, value);
        else root.rightChild = new BSTNode(value);
    }
}

function traverseBreadthFirst(node, iteratee) {
    let queue = {
        head: null,
        tail: null,
        pop: function() {
            if (!this.head) return null;
            let item = this.head;
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            return item.node;
        },
        push: function(node) {
            if (!this.head) {
                this.head = {node: node, next: null};
                this.tail = this.head;
            } else {
                this.tail.next = {node: node, next: null};
                this.tail = this.tail.next;
            }
        }
    };

    queue.push(node);


    while (queue.head) {
        let node = queue.pop();

        if (node) iteratee(node.value);
        if (node.leftChild) queue.push(node.leftChild);
        if (node.rightChild) queue.push(node.rightChild);
    }
}

function traverseInorderRecursive (root, iteratee){
    //left, self, right (value order)
    if (root.leftChild) traverseInorderRecursive(root.leftChild, iteratee);
    iteratee(root.value);
    if (root.rightChild) traverseInorderRecursive(root.rightChild, iteratee);
}

function traversePostorderRecursive (root, iteratee){
    //left, right, self
    if (root.leftChild) traverseInorderRecursive(root.leftChild, iteratee);
    if (root.rightChild) traverseInorderRecursive(root.rightChild, iteratee);
    iteratee(root.value);
}

function traversePreorderRecursive (root, iteratee){
    //self, left, right
    iteratee(root.value);
    if (root.leftChild) traverseInorderRecursive(root.leftChild, iteratee);
    if (root.rightChild) traverseInorderRecursive(root.rightChild, iteratee);
}

function fillTreeWithSortedElements(tree, elements) {

    tree.root = getRoot(elements, 0, elements.length-1);

    function getRoot(elements, lo, hi) {
        if (lo > hi) return null;
        let median = Math.floor((hi + lo)/2);

        let root = new BSTNode(elements[median], getRoot(elements, lo, median-1), getRoot(elements, median+1, hi));

        return root;
    }
}

function deleteNodeRecursive(node, parent) {

    let childrenCount = countChildren(node);

    switch (childrenCount) {
        case 0 :
            if (node === parent.rightChild) {
                parent.rightChild = null;
            } else if (node === parent.leftChild){
                parent.leftChild = null;
            }
            break;

        case 1 :
            if (node.value > parent.value) {
                parent.rightChild = node.leftChild || node.rightChild;
            } else {
                parent.leftChild = node.leftChild || node.rightChild;
            }
            break;

        case 2 :
            //node has multiple children.  find it's lowest item to right, copy value here,
            // and repeat with that node to delete it from down there until another case exists
            let lowestNextNode = node.rightChild;
            let lowestNextNodesParent = node;
            while (lowestNextNode.leftChild) {
                lowestNextNodesParent = lowestNextNode;
                lowestNextNode = lowestNextNode.leftChild;
            }

            node.value = lowestNextNode.value;
            return deleteNodeRecursive(lowestNextNode, lowestNextNodesParent);
    }
}

function countChildren(node) {
    let count = 0;
    if (node.leftChild) count++;
    if (node.rightChild) count++;

    return count;
}

function compareNumbers(item1, item2) {
    let val1 = item1 instanceof BSTNode ? item1.value : item1;
    let val2 = item2 instanceof BSTNode ? item2.value : item2;

    return val1 - val2;
}

function valueIsBetweenValues(val, val1, val2, comparator) {
    return (comparator(val, val1) >= 0 && comparator(val, val2) <= 0) ||
        (comparator(val, val1) <= 0 && comparator(val, val2) >= 0);
}

/*
  returns: {node: <BSTNode>, parent: <BSTNode>}
*/
function findNodeWithParentIterative (tree, valueOrNode) {
    let targetValue = valueOrNode instanceof BSTNode ? valueOrNode.value : valueOrNode;
    let comparator = tree.defaultComparator;

    let node = tree.root;
    let parent = null;

    while (true) {
        if (comparator(targetValue, node.value) === 0) {
            return {
                node: node,
                parent: parent
            };
        } else if (comparator(targetValue, node.value) > 0) {
            if (!node.rightChild) return null;
            else {
                parent = node;
                node = node.rightChild;
            }
        } else {
            if (!node.leftChild) return null;
            else {
                parent = node;
                node = node.leftChild;
            }
        }
    }
}




//
//TEST
//
(function test(){
    let elements = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]//,17,18,19,20];
    let tree = new BinarySearchTree(elements);

    // console.log('/\\: ', tree);

    // tree.prettyPrint();

    tree.remove(10)
    tree.prettyPrint();

    console.log('\n')
    traverseInorderRecursive(tree.root, (item) => {process.stdout.write(' ' +item)})
    console.log();
    traversePreorderRecursive(tree.root, (item) => {process.stdout.write(' ' +item)})
    console.log();
    traversePostorderRecursive(tree.root, (item) => {process.stdout.write(' ' + item)})
    console.log();
    


})();

