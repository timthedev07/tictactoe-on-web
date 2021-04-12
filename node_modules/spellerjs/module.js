// Node for hash tables
module.exports.jsNode = class {
    /**
     * Creates a new node with value `value`, by default, next is null, but you could fill it in with another node as well.
     * @param {*} val 
     * @param {*} next 
     */
    constructor(val, next=null) {
        this.val = val;
        this.next = next;
    }

    // Getters and setters
    getVal() {
        return this.val;
    }

    getNext() {
        return this.next;
    }

    setVal(new_val) {
        this.val = new_val;
    }

    setNext(next_node) {
        this.next = next_node;
    }

    toString() {
        let res = `${this.getVal()}`;
        let pt = this.getNext();
        while (pt !== null) {
            res = res.concat(` -> ${pt.getVal()}`);
            pt = pt.getNext();
        }
        return res
    }
}


// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////

// Hash table class
module.exports.Hashtable = class  {

    /**
     * Constructs an empty hash table of `size`.
     * @param {Number} size 
     */
    constructor(size) {
        this.size = size;
        this.nodes = Array(size);
    }

    /**
     * Returns the hash value of a given string.
     * @param {String} string 
     */
    hash(string) {
        var hashFV = 0;
        var _string = string.toString().toLowerCase();
        for (var c = 0; c < _string.length; c++) {
            hashFV = _string.charCodeAt(c);
        }
        return hashFV % this.size;
    }
    /**
     * Inserts a node into the hash table based on its hash value
     * @param {jsNode} node 
     */
    insert(node) {
        const value = node.val.trim().trim('\n')
        node.setVal = value;
        const index = this.hash(value);
        var location = this.nodes[index];
        if (location === null || location === undefined) {
            this.nodes[index] = node;
        } else {
            if (location.getNext() === null) {
                this.nodes[index].setNext(node);
            } else {
                node.setNext(location.getNext());
                this.nodes[index].setNext(node); 
            }
        }
    }


    /**
     * Checks to see if the given node is indeed in the linked list.
     * 
     * Returns the index of that node if yes, returns False if not.
     * @param {Node} target 
     */
    lookup(target) {
        
        const index = this.hash(target.getVal());
        if (this.nodes[index] === null){
            return false;
        }
        try {
            if (this.nodes[index].val == target.val){
                return index;
            }
        } catch {
            return false
        }
        
        var location = this.nodes[index];
        while (location.getNext() !== null){
            location = location.getNext();
            if (location.getVal() == target.val) {
                return index;
            }
        }
        return false
    }
}
