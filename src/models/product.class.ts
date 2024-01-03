export class Product {
    title!: string;
    price!: string;
    description!: string;
    imagePath!: string;
    timeStamp!: number;
    idField!: string;


    constructor(obj?: any) {
        this.title = obj? obj.title : '';
        this.price = obj? obj.price : '';
        this.description = obj? obj.description : '';
        this.imagePath = obj? obj.imagePath : '';
        this.timeStamp = obj? obj.timeStamp : '';
        this.idField = obj? obj.idField : '';
    }


    public toJson() {
        return {
            title: this.title,
            price: this.price,
            description: this.description,
            imagePath: this.imagePath,
            idField: this.idField,
            timeStamp: Date.now()
        }
    }
}