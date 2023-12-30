export class User {
    firstName!: string;
    lastName!: string;
    dateOfBirth?: number;
    street!: string;
    zipCode!: number;
    city!: string;
    email!: string;
    idField!: string;
    orders!: any;
    timeStamp!: number;




    constructor(obj?: any) {
        this.firstName = obj? obj.firstName : '';
        this.lastName = obj? obj.lastName : '';
        this.dateOfBirth = obj? obj.dateOfBirth : '';
        this.street = obj? obj.street : '';
        this.zipCode = obj? obj.zipCode : '';
        this.city = obj? obj.city : '';
        this.email = obj? obj.email : '';
        this.idField = obj? obj.idField : '';
        this.orders = [];
        this.timeStamp = Date.now();
    }


    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            dateOfBirth: this.dateOfBirth,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
            idField: this.idField,
            orders: [],
            timeStamp: Date.now()
        }
    }
}




