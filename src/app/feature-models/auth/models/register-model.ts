export interface RegisterDataModel{
    firstName: string;
    lastName: string;
    email: string;
    userId?: string;
    cart: {
        subTotalPrice?: Number;
        numberOfProducts?: Number;
    }
}