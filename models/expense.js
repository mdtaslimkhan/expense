export class Expense{
    constructor(value, initValue){
        this.value = value,
        this.initValue = initValue,
        this.data = new Date().toString() + Math.random().toString()
    }
}