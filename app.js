// Get html elements
const bankBalanceElement = document.getElementById("bankBalance");
const loanBalanceElement = document.getElementById("loanBalance");
const loanButtonElement = document.getElementById("getLoan");

// Variables
let balance = 1000;
let loan = 0;


// IIFE Object
const joesBankAccountObj = (function(){
    let balance = 0;
    let loan = 0;

    return {
        getX: function(){
            console.log(loan);
        },
        setLoan(loanAmount){
            loan = loanAmount;
            loanBalanceElement.innerText = loanAmount;
        }
    }
})();



const handleLoanButtonClick = e => {
    // If the user don't have a loan, the user can loan up to x2 of his/her balance
    if (loan === 0) {
        const loanAmount = Number(window.prompt("How much do you wish to loan?", ""));
        joesBankAccountObj.setLoan(loanAmount);

        if (loanAmount > 0 && loanAmount <= (balance * 2)) {
            alert("You can get a loan");
        }
    } else {
        alert("You already have a loan");   
    }
}


// Event liteners
loanButtonElement.addEventListener("click", handleLoanButtonClick);