class Account {

  constructor() {
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
      if (!this.isAllowed()) return false;
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
  }

class Withdrawal extends Transaction {
// Update the balance in the account
  get value() {
    return -this.amount;
  }
  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {
 // Update the balance in the account
    get value() {
      return this.amount
    }
    isAllowed() {
      // deposits always allowed thanks to capitalism.
      return true;
    }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
// DRIVER CODE (yes, keep everything in one file for now... b/c cog load)
const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
