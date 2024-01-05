export class Product {
    title!: string;
    price!: string;
    description!: string;
    imagePath!: string;
    timeStamp!: number;
    idField!: string;
    amount!: number;
    orderId!: number;
    orderTimeStamp!: number;


    constructor(obj?: any) {
        this.title = obj? obj.title : '';
        this.price = obj? obj.price : '';
        this.description = obj? obj.description : '';
        this.imagePath = obj? obj.imagePath : '';
        this.timeStamp = obj? obj.timeStamp : '';
        this.idField = obj? obj.idField : '';
        this.amount = obj? obj.amount : 0;
        this.orderId = obj? obj.orderId : 0;
        this.orderTimeStamp = obj? obj.orderTimeStamp : '';
    }


    public toJson() {
        return {
            title: this.title,
            price: this.price,
            description: this.description,
            imagePath: this.imagePath,
            idField: this.idField,
            timeStamp: Date.now(),
            amount: this.amount,
            orderId: this.orderId,
            orderTimeStamp: this.orderTimeStamp
        }
    }
}