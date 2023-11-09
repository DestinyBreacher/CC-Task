const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class expense{
    constructor(amount,category,date,description,limit=null){
        this.amount = amount
        this.category = category
        this.date = date
        this.description = description
        this.limit = limit
    }
}


function catSort(array){
    for(let i = 0 ; i < array.length ; i++){
        for(let j = 0 ; j < array.length - i -1; j++){
            if(array[j].category > array[j+1].category){
                var temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
        }
    }
    for(const i of array){
        console.log(`\n${i.amount} is the amount`)
        console.log(`${i.category} is the category`)
        console.log(`${i.date} is the date`)
        console.log(`${i.description} is the description`)
        console.log(`${i.limit} is the limit\n`)
    }
}


function dateSort(array){
    for(let i = 0 ; i < array.length ; i++){
        for(let j = 0 ; j < array.length - i -1; j++){
            if(array[j].date > array[j+1].date){
                var temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
        }
    }
    for(const i of array){
        console.log(`\n${i.amount} is the amount`)
        console.log(`${i.category} is the category`)
        console.log(`${i.date} is the date`)
        console.log(`${i.description} is the description`)
        console.log(`${i.limit} is the limit\n`)
    }
}

const array = []
function loop() {
    rl.question("\n1 for add expense\n2 for list all expenses\n3 for list expenses of a date\n4 for change the limit of expenses on each date\n5 for delete expenses\n6 for filter expenses based on category\n7 for filter expenses based on date\n8 for exiting program\n\n", (a) => {
        if (a === "1") {
            rl.question("\nEnter the amount of the expense: ", (amount) => {
                rl.question("Enter the category of the expense: ", (category) => {
                    rl.question("Enter the date of the expense (YYYY-MM-DD): ", (datee) => {
                        const date = new Date(datee);
                        rl.question("Enter the description of the expense: ", (description) => {
                            const exp = new expense(amount, category, date, description)
                            array.push(exp)
                            console.log("\n")
                            loop()
                        })
                    })
                })
            })
        }
        else if (a === "2"){
            if(array.length == 0){
                console.log("\nNO EXPENSES!!")
                loop()
            }
            for(const i of array){
                console.log(`\n${i.amount} is the amount`)
                console.log(`${i.category} is the category`)
                console.log(`${i.date} is the date`)
                console.log(`${i.description} is the description`)
                console.log(`${i.limit} is the limit\n`)
            }
            loop()
        }
        else if (a === "3"){
            rl.question("\nEnter the date of expenses(YYYY-MM-DD) : ", (qqdate) =>{
                const qdate = new Date(qqdate)
                if(array.length == 0){
                    console.log("\nNO EXPENSES!!")
                    loop()
                }
                var count = 0
                for(const i of array){
                    if(i.date.getTime() == qdate.getTime()){
                        console.log(`\n${i.amount} is the amount`)
                        console.log(`${i.category} is the category`)
                        console.log(`${i.description} is the description\n`)
                        count = 0
                    }
                    else{
                        count = 1
                    }
                }
                if (count === 1){
                    console.log("\nNo expenses found on that date")
                }
                loop()
            })
        }
        else if (a === "4"){
            rl.question("\nEnter the limit of expenses : ", (limit) =>{
                for(const i of array){
                    i.limit = limit
                    if(i.limit ==  null){
                        console.log("\nAll fine\n")
                    }
                    else if(i.amount <= i.limit){
                        console.log("\nAll fine\n")
                    }
                    else{
                        console.log(`\nOVER LIMIT//rejecting the no. ${array.indexOf(i) + 1} expense\n`)
                        array.pop(i)
                    }
                }
                loop()
            })
        }
        else if (a === "5"){
            if(array.length == 0){
                console.log("\nNO EXPENSES!!")
                loop()
            }
            rl.question("\nEnter the index of the expense you wish to delete : ",(index) =>{
                for(const i of array){
                    if(array.indexOf(i) == index){
                        array.pop(i)
                        console.log("\nDELETED!\n")
                    }
                }
                loop()
            })
        }
        else if (a === "6"){
            catSort(array)
            loop()
        }
        else if (a === "7"){
            dateSort(array)
            loop()
        }
        else if (a === "8") {
            console.log("\nThanks for using the program!\n")
            rl.close()
        }
        else {
            console.log("WRONG INPUT")
            loop()
        }
    })
}

loop()
