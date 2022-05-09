import { BookModel } from "../../../models/book.model";

export interface CartModel{
    books: BookModel[];
    numberOfProducts: number;
    subTotalPrice: number;
}