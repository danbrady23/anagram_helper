let currentOrder;
let fixed = [];
let wordEdges = [];

function updateAnsLen() {

    const cumulativeSum = (sum => value => sum += value)(0);
    let ansLen = document.getElementById("ans-len")

    let ansLenArray = answerInput.value.split(",")
    let ansLenInt = ansLenArray.map(Number)

    wordEdges = ansLenInt.map(cumulativeSum)

    let totAnsLen = ansLenInt.reduce((a,b) => a + b, 0)

    ansLen.innerText = totAnsLen
    anagramInput.maxLength = totAnsLen
}

function updateClueLen() {
    let clueLen = document.getElementById("clue-len")

    clueLen.innerText = anagramInput.value.length
}

function freezeItem(event) {
    target = event.target
    parent = event.target.parentNode

    selectedTile = Array.from(parent.childNodes).indexOf(target)

    if (fixed.includes(selectedTile)) {
        fixed = fixed.filter(item => item !== selectedTile)
        target.classList.remove("fixed")
    } else {
        fixed.push(selectedTile)
        fixed.sort((a, b) => a - b)
        target.classList.add("fixed")
    }

    let clearFixedButt = document.getElementById("clearFixed")
    if (fixed.length > 0) {
        showElement(clearFixedButt)
    } else {
        hideElement(clearFixedButt)
    }
}

function clearFixed() {
    fixed = []

    letterContainer.childNodes.forEach(item => item.classList.remove("fixed"))

    let clearFixedButt = document.getElementById("clearFixed")
    hideElement(clearFixedButt)
}

function createLetter(letter, index) {
    let node = document.createElement("li")
    node.innerText = letter
    node.onclick = freezeItem
    if (wordEdges.includes(index+1)) {
        node.classList.add("word-end")
    }
    letterContainer.appendChild(node)
}

function createLetters(anagramArray) {

    anagramArray.forEach(createLetter)

    currentOrder = anagramArray
}

function clearLetters() {
    while (letterContainer.hasChildNodes()) {
        letterContainer.firstChild.remove()
    }
}

function clearInput() {
    anagramInput.value = ""
    answerInput.value = ""
    document.getElementById("ans-len").innerText = 0
    document.getElementById("clue-len").innerText = 0
}

function clearButtAction() {
    clearLetters()
    clearInput()
    updateClueLen()
    hideElement(shuffButt)
}

function showElement(el) {
    el.classList.remove("hidden")
}

function hideElement(el) {
    el.classList.add("hidden")
}

function setButtAction() {
    fixed = []
    clearLetters()
    let anagramArray = anagramInput.value.split("")

    if (anagramArray.length > 0) {
        createLetters(anagramArray)
        showElement(shuffButt)
    } else {
        hideElement(shuffButt)
    }
}

function anagramEnter(event) {

    if (event.key == "Enter") {
        event.preventDefault()
        document.getElementById("ana-set").click()
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleWithFixed(array, fixed) {
    let outArray = array.filter((el, idx) => !fixed.includes(idx))

    shuffleArray(outArray)

    fixed.forEach((el) => outArray.splice(el, 0, array[el]))

    return outArray
}

function writeLetter(item, index) {
    letterContainer.children[index].innerText = item
}

function shuffleLetters() {

    let newOrder = shuffleWithFixed(currentOrder, fixed)

    newOrder.forEach(writeLetter)

    currentOrder = newOrder
}
