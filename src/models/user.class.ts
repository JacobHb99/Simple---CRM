export class User {
    firstName!: string;
    lastName!: string;
    dateOfBirth?: number;
    street!: string;
    zipCode!: number;
    city!: string;



    constructor(obj?: any) {
        this.firstName = obj? obj.firstName : '';
        this.lastName = obj? obj.lastName : '';
        this.dateOfBirth = obj? obj.dateOfBirth : '';
        this.street = obj? obj.street : '';
        this.zipCode = obj? obj.zipCode : '';
        this.city = obj? obj.city : '';
    }
}

