import { BookModel } from "../../books/models/book.model";

export interface UserModel{
    email: string;
    id: string;
    token: string;
    tokenExpiryDate: Date;
    role?: string;
    wishList?: BookModel;
}