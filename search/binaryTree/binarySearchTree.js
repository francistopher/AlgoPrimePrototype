class BinarySearchTree extends BinaryTreeNodeManager {
   constructor() {
      super(2);
      this.root = NaN;
      // binary tree cant balance
      this.hideBalanceButton();
      this.#listenToAddGeneratedValue();
   }

   /**
    * Shuffles the nodes of the tree by
    * unloading the element values into an array
    * shuffles the array with the element values
    * and rebuilds the tree with the shuffled elements
    */
   #shuffleNodes() {}

   #listenToAddGeneratedValue() {
      this.nodeCountSlider.addEventListener("input", () => {
         this.#addGeneratedValue();
         this.#removeGeneratedValue();
      });
   }

   #addGeneratedValue() {
      if (this.values.length < this.nodeCountSlider.value) {
         const randommm = Math.floor(Math.random() * 50 + 1);
         if (this.values.includes(randommm)) {
            // console.log(randommm, "repeat");
            this.#addGeneratedValue();
         } else {
            this.values.push(randommm);
            this.#addNode(randommm);
            console.log(randommm, this.values, this.values.length, this.nodeCountSlider.value);
         }
         if (this.values.length != this.nodeCountSlider.value) {
            this.#addGeneratedValue();
            this.#removeGeneratedValue();
         }
      }
   }

   /**
    * Makes sure values are removed when the slider is set to a value less than the count of values
    */
   #removeGeneratedValue() {
      if (this.values.length > this.nodeCountSlider.value) {
         const removedValue = this.values.pop(this.values.length - 1);
         this.#removeNode(removedValue, this.root);
         if (this.values.length != this.nodeCountSlider.value) {
            this.#addGeneratedValue();
            this.#removeGeneratedValue();
         }
      }
   }

   /**
    * Renders a node with value
    * @param {Number} value displayed on the node
    */
   #addNode(value) {
      if (!this.getRoot()) {
         this.root = new BinaryTreeNode(value, this.maxChildren);
         this.root.setPosition("calc((100vw - 3vw) * 0.5)", "3vw");
      }
   }

   /**
    * Searches through the binary search tree to remove the node with the specified value
    * @param {Number} value
    * @param {BinaryTreeNode} node
    */
   #removeNode(value, node) {
      // the value is equal to the root node's value
      if (node && value == this.root.value) {
         this.root.remove();
         this.root = NaN;
      } else if (node) {
         // the value is less than the root node's value
         if (node.leftChild && value < this.root.value) {
            this.#removeNode(value, node.leftChild);
            node.leftChild = NaN;
         }
         // the value is more than the root node's value
         if (node.rightChild && value > this.root.value) {
            this.#removeNode(value, node.rightChild);
            node.rightChild = NaN;
         }
      }
   }
}
