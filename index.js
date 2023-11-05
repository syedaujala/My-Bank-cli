#! /usr/bin/env node 
import { faker } from "@faker-js/faker";
import inquirer from "inquirer";
import chalk from "chalk";
// class customer
class Custumer {
    firstname;
    lastname;
    age;
    Gender;
    mobnumber;
    accountnumber;
    constructor(fname, lname, age, Gender, mobnum, accnum) {
        this.firstname = fname;
        this.lastname = lname;
        this.age = age;
        this.Gender = Gender;
        this.mobnumber = mobnum;
        this.accountnumber = accnum;
    }
}
// class bank
class Bank {
    Custumer = [];
    account = [];
    addCustumer(obj) {
        this.Custumer.push(obj);
    }
    addaccountnumber(obj) {
        this.account.push(obj);
    }
    tansaction(accobj) {
        let NewAccount = this.account.filter(acc => acc.accountnum !== accobj.accountnum);
        this.account = [...NewAccount, accobj];
    }
}
let myBank = new Bank();
// console.log (myBank)
// let cus = new Custumer ("Ujala","Fahim", 19, "Male", 2565468432, 100)
// console.log(cus)
for (let i = 1; i <= 10; i++) {
    let fname = faker.person.firstName('male');
    let lname = faker.person.lastName();
    let mobnum = parseInt(faker.phone.number("123######"));
    const cus = new Custumer(fname, lname, 25 * i, "male", mobnum, 100 + i);
    myBank.addCustumer(cus);
    // myBank.addaccountnumber(accountnumber:cus.aaccnum,balance: 100*)
    // myBank.addaccountnumber({accountnumber:cus.aaccnum,balance: 100})
    myBank.addaccountnumber({ accountnum: cus.accountnumber, balance: 100 });
    // console.log(cus)
}
// console.log(myBank)
// Bank Facuntionlity
async function BankService(Bank) {
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please Select the service",
        choices: ["View Balance", "Cash Withdraw", "Cash Deposit"]
    });
    // View Balance
    if (service.select == "View Balance") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please entre your account number"
        });
        let account = myBank.account.find((acc) => acc.accountnum == res.num);
        if (!account) {
            console.log(chalk.red.bold("Invalid account number"));
        }
        if (account) {
            let name = myBank.Custumer.find((item) => item.accountnumber == account?.accountnum);
            console.log(`Dear ${chalk.green.italic(name?.firstname)} ${chalk.green.italic(name?.lastname)}
            Your account Balance is ${chalk.bold.blueBright(`$${account.balance}`)}`);
        }
    }
    // Cash WithDraw
    if (service.select == "Cash Withdraw") {
        if (service.select == "View Balance") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please entre your account number"
            });
            let account = myBank.account.find((acc) => acc.accountnum == res.num);
            if (account) {
                console.log(chalk.red.bold("Invalid account number"));
                let ans = await inquirer.prompt({
                    type: "number",
                    name: "rupee",
                    message: "Please Entre your amount"
                });
                if (ans.rupee > account.balance) {
                    console.log(chalk.red.bold("apka balance nakafi ha....."));
                }
                let newbalance = account.balance - ans.rupee;
                // Transaction method call
                Bank.tansaction({
                    accountnum: account.accountnum, balance: newbalance
                });
            }
        }
        // Cash Deposit
        if (service.select == "Cash Deposit") {
            if (service.select == "Cash Deposit") {
                let res = await inquirer.prompt({
                    type: "input",
                    name: "num",
                    message: "Please entre your account number"
                });
                if (service.select == "Exit") {
                    return;
                }
                let account = myBank.account.find((acc) => acc.accountnum == res.num);
                if (account) {
                    console.log(chalk.red.bold("Invalid account number"));
                    let ans = await inquirer.prompt({
                        type: "number",
                        name: "rupee",
                        message: "Please Entre your amount"
                    });
                    let newbalance = account.balance + ans.rupee;
                    // Transaction method call
                    Bank.tansaction({
                        accountnum: account.accountnum, balance: newbalance
                    });
                }
            }
        }
    }
}
// BankService(myBank)
