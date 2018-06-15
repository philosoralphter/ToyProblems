class BinarySearchTree {
    constructor(elements, comparator) {
        if (comparator) {
            this.defaultComparator = comparator;
        } else {
            this.defaultComparator = function compareNumbers(item1, item2) {
                if (item1 instanceof BSTNode && item2 instanceof BSTNode) {
                    return item1.value - item2.value;
                }
                return item1 - item2;
            }
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
        //TODO
        


        this.itemCount--;
    }

    //iteratively, for fun
    find(item, comparator) {
        let targetValue = item instanceof BSTNode ? item.value : item;
        let returnVal = null;
        let isFoundOrPassed = false;
        comparator = comparator || this.defaultComparator;

        let node = this.root;
        let lastValue;
        while (true) {
            if (lastValue !== undefined) {
                if (valueIsBetweenValues.bind(this)(targetValue, lastValue, node.value)){
                    return null;
                }
            }

            if (comparator(targetValue, node.value) === 0) {
                return node;
                break;
            } else if (comparator(targetValue, node.value) > 0) {
                if (!node.rightChild) return null;
                else {
                    node = node.rightChild;
                    continue;
                }
            } else {
                if (!node.leftChild) return null;
                else {
                    node = node.leftChild;
                    continue;
                }
            }
        }

        function valueIsBetweenValues(val, val1, val2) {
            return (comparator(val, val1) >= 0 && comparator(val, val2)<=0) ||
            (comparator(val, val1) <= 0 && comparator(val, val2) >= 0);
        }
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

function traverseBreadthFirst(node, valueIterator) {
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

        if (node) valueIterator(node.value);
        if (node.leftChild) queue.push(node.leftChild);
        if (node.rightChild) queue.push(node.rightChild);
    }
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

//
//TEST
//
(function test(){
    let elements = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]//,17,18,19,20];
    let tree = new BinarySearchTree(elements);

    // console.log('/\\: ', tree);

    tree.prettyPrint();

    let nextTree = new BinarySearchTree();

    elements.map((elem) => {nextTree.insert(elem)});
    nextTree.prettyPrint()
})();

