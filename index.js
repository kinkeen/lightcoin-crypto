class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
        let balance = 0;
        for (let trans of this.transactions) {
          balance += trans.value;
        }
        return balance;
      }
      addTransaction(transaction) {
        this.transactions.push(transaction);
      }
    }

class Transaction {
  // Pass in the account that the deposit this for
    constructor(amount, account) {
      this.amount = amount;
      this.account = account;
    }
    commit() {
  //checking if value < 0 then it's withdrawal and if transaction amount > balance in the account then return nothing
      if (this.value < 0 && this.amount > this.account.balance) {
        return;
      }
  // Keep track of the time of the transaction
      this.time = new Date();
  // Add the transaction to the account
      this.account.addTransaction(this);
      console.log("dasdsadsadsa" + this.account.balance,this.amount)
    }
  }

class Withdrawal extends Transaction {
// Update the balance in the account
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
 // Update the balance in the account
    get value() {
      return this.amount
    }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

let t1 = new Deposit(120.00,myAccount);
t1.commit();
console.log(t1);
console.log(myAccount);
console.log("Current balance: " + myAccount.balance);
console.log("Last transaction: " + t1.amount);

let t2 = new Withdrawal(190, myAccount);
t2.commit();
console.log(t2);
console.log(myAccount);
console.log("Current balance: " + myAccount.balance);
console.log("Last transaction: " + t2.amount);
console.log("Transactions: " + myAccount.transactions);
