const promt = require('prompt-sync')(); // using for taking input


const ROWS = 3;
const COLS = 3;


const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOLS_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}




// step1
// Deposite Some Money
const deposite = () => {
    while(true){ // using because user need to Enter correct value untill it retuen
     const depositeAmount = promt("Enter a deposite Amount: ");
     const numberDepositeAmount = parseFloat(depositeAmount);

     if(isNaN(numberDepositeAmount) || numberDepositeAmount <= 0){
        console.log("Invalid Deposite Amount, Try Again");
     }else{
        return numberDepositeAmount;
     }
    }
}



//step2
// Batting on number of lines
const getNumberOfLines = () => {
    while(true){ // using because user need to Enter correct value untill it retuen
        const lines = promt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
   
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
           console.log("Invalid number Of Lines, Try Again");
        }else{
           return numberOfLines;
        }
    }
}

//step3
//batting start
const getBet = (balance,lines) => {
    while(true){ // using because user need to Enter correct value untill it retuen
        const bet = promt("Enter the Total Bets per Lines: ");
        const numberOfBet = parseFloat(bet);
   
        if(isNaN(numberOfBet) || numberOfBet <= 0 || numberOfBet > balance / lines){
           console.log("Invalid Bet, Try Again"); 
        }else{
           return numberOfBet;
        }
    }
}

//Step4
//Spin the slote Machine
const spin = () => {
    const symbols = [];

    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
         for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
   // console.log(symbols);

   const reels = [];
    for(let i=0;i<COLS;i++){
        reels.push([]);
     const reelSymbols = [...symbols];
     for(let j=0;j<ROWS;j++){
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex,1);
     }
    }
    
    return reels;
}

//step5

const transpose = (reels) => {
    const rows = [];

    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }

    return  rows;
}


//step6


const printRows = (rows) =>{
    for(const row of rows){
        let rowString ="";
        for(const[i,symbol] of row.entries()){
            rowString += symbol
            if( i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
        
    }
}

// step7

const getwinnings = (rows,bet,lines) => {

    let winning =0;

    for(let row=0;row < lines ; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        

        if(allSame){
            winning += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winning;
}





let balance = deposite();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance,numberOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getwinnings(rows,bet,numberOfLines);
console.log("You Won , RS"+winnings.toString());















