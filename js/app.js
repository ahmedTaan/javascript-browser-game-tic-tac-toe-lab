/*-------------------------------- Constants --------------------------------*/
const winPosipalities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
/*---------------------------- Variables (state) ----------------------------*/
let winner = ""
let randNum = ""
let chosenPositions = []

/*------------------------ Cached Element References ------------------------*/
const sqares = document.querySelectorAll(".sqr")
let message = document.querySelector("#message")
let reset = document.querySelector("#reset")
console.log(sqares)
console.log(message)
message.textContent = "Are You Sure You Can Defeat ME!"

/*-------------------------------- Functions --------------------------------*/
let randChoseFunction = () => {
    randNum = Math.floor(Math.random()*9)
    console.log(randNum)
    if (chosenPositions.indexOf(randNum) !== -1){
        randChoseFunction()
    }
    else {
        return
    }
}
let winnerCheckFunction = () => {
    let countUser = 0
    let countRobt = 0
    winPosipalities.forEach((posipale)=>{
        countRobt = 0
        countUser = 0
        posipale.forEach((element)=>{
            if (sqares[element].textContent == "X"){
                countUser++
            }
            if (sqares[element].textContent == "O"){
                countRobt++
            }

            if (countUser == 3){
                message.textContent = "YOU WIN"
            }
            if (countRobt == 3){
                message.textContent = "YOU LOSE, LOOOOOSER"
            }
        })
    console.log(sqares)
    console.log(`countUser= ${countUser}`)
    console.log(`countRobt= ${countRobt}`)
    })
}

/* Main Function */
let playTheGame  = (event) => {
    if (chosenPositions.length == 0){ 
        message.textContent = "This Will be a Fun Game"       
        /* user first choose */
        event.target.textContent = "X"

        /* Add to the chosen Array */
        chosenPositions.push(Number(event.target.id))
        console.log(event.target.textContent + " in " + event.target.id)

        /* The ropot first choose */
        randChoseFunction()
        chosenPositions.push(randNum)
        sqares[randNum].textContent = "O"
        console.log(sqares[randNum].textContent + " in " + randNum)
    /* أتأكد أن المستخدم ما اختار محل مشغول */
    }
    else if (chosenPositions.indexOf(Number(event.target.id)) == -1 && chosenPositions.length<9){
        if(winner !== true){
        /* اختيار المستخدم */
        event.target.textContent = "X"
        chosenPositions.push(Number(event.target.id))
        console.log(event.target.textContent + " in " + event.target.id)
        winnerCheckFunction()
        if(chosenPositions.length == 9){
            message.textContent = "END OF THE GAME, TIE"
        }
        }
        if(winner !== true){
        /* اختيار الروبوت */
        randChoseFunction()
        chosenPositions.push(randNum)
        sqares[randNum].textContent = "O"
        console.log(sqares[randNum].textContent + " in " + randNum)
        winnerCheckFunction()
        }
    }
    else if (chosenPositions.length == 8 && winner !== true){
        event.target.textContent = "X"
        chosenPositions.push(Number(event.target.id))
        console.log(event.target.textContent + " in " + event.target.id)
        winnerCheckFunction()
    }
}
let resetFunction = (event) => {
    sqares.forEach((sqr)=>{sqr.textContent = ""})
    winner = false
    chosenPositions = []
    message.textContent = "This Will be a Fun Game"
}
/*----------------------------- Event Listeners -----------------------------*/
sqares.forEach((sqr)=>{sqr.addEventListener("click", playTheGame)})
reset.addEventListener("click", resetFunction)