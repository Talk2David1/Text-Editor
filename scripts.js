class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop() {
        if (!this.tail) return undefined;

        const poppedNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = poppedNode.prev;
            this.tail.next = null;
            poppedNode.prev = null;
        }
        this.length--;
        return poppedNode.data;
    }
}

const textEditor = document.getElementById("text-editor");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");

const undoStack = new DoublyLinkedList();
const redoStack = new DoublyLinkedList();

function updateButtons() {
    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
}

textEditor.addEventListener("input", () => {
    undoStack.push(textEditor.value);
    redoStack.length = 0; // Clear the redo stack
    updateButtons();
});

undoBtn.addEventListener("click", () => {
    if (undoStack.length > 1) {
        const currentState = undoStack.pop();
        redoStack.push(currentState);
        textEditor.value = undoStack.tail.data;
    }
    updateButtons();
});

redoBtn.addEventListener("click", () => {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        undoStack.push(nextState);
        textEditor.value = nextState;
    }
    updateButtons();
});

undoStack.push(""); // Initialize with an empty state
updateButtons();
