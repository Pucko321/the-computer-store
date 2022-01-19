// Get html elements
const bankBalanceElement = document.getElementById("bankBalance");
const loanBalanceElement = document.getElementById("loanBalance");
const loanButtonElement = document.getElementById("getLoan");
const payBalanceElement = document.getElementById("payBalance");
const bankButtonElement = document.getElementById("bankPayBalance");
const workButtonElement = document.getElementById("work");

// Variables


// IIFE Object
const joesBankAccountObj = (function(){
    let balance = 10;
    let loan = 0;

    return {
        getBalance(){
            return balance
        },
        getLoan(){
            return loan
        },
        getX: function(){
            console.log(loan);
        },
        setLoan(loanAmount){
            balance += loanAmount;
            loan = loanAmount;
            bankBalanceElement.innerText = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(balance);
            loanBalanceElement.innerText = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(loan);
        },
        payJoe(payBalance) {
            balance += payBalance;
            bankBalanceElement.innerText = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(balance);
        },
        payOffLoan(owedMoney) {
            loan -= owedMoney;
            loanBalanceElement.innerText = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(loan);
        }
    }
})();

const joesWorkObj = (function(){
    let payBalance = 0;
    let salary = 100;

    return {
        getPayBalance(){
            return payBalance
        },
        getSalary(){
            return salary;
        },
        getPayed() {
            payBalance += salary;
            payBalanceElement.innerText = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(joesWorkObj.getPayBalance());
        }
    }
})();



const handleLoanButtonClick = e => {
    // If the user don't have a loan, the user can loan up to x2 of his/her balance
    let balance = joesBankAccountObj.getBalance();
    let loan = joesBankAccountObj.getLoan();
    let maxLoanValue = balance * 2;

    if (balance > 0){
        if (loan === 0) {
            const loanAmount = parseInt(window.prompt("How much do you wish to loan?", ""));
    
            if(loanAmount < 0 || loanAmount > maxLoanValue){
                alert(`Loan have to be beween 0-${maxLoanValue}.`);
                handleLoanButtonClick();
            } else {
                joesBankAccountObj.setLoan(loanAmount);
            }
        } else {
            alert("You already have a loan, and need to pay it off before you can get a new one");   
        }
    } else {
        alert("You can't get a loan without capital");
    }
}

const handleBankButtonClick = e => {
    // Transfere work salary to bank balance. If you have an outstanding loan, 10% must go to paying off the loan, the rest goes to bank balance
    let balance = joesBankAccountObj.getBalance();
    let loan = joesBankAccountObj.getLoan();

    if (loan === 0) {
        joesBankAccountObj.payJoe(joesWorkObj.getPayBalance())
    } else {
        joesBankAccountObj.payOffLoan(joesWorkObj.getPayBalance())
    }
}

const handleWorkButtonClick = e => {
    // Get paid (100)
    joesWorkObj.getPayed();

}


// Event liteners
loanButtonElement.addEventListener("click", handleLoanButtonClick);
bankButtonElement.addEventListener("click", handleBankButtonClick);
workButtonElement.addEventListener("click", handleWorkButtonClick);



// Set default values
bankBalanceElement.innerText = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(joesBankAccountObj.getBalance());
loanBalanceElement.innerText = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(joesBankAccountObj.getLoan());
payBalanceElement.innerText = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(joesWorkObj.getPayBalance());
