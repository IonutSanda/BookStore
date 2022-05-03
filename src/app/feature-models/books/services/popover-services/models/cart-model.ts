import { BookModel } from "../../../models/book.model";

export interface CartModel{
    book: BookModel[];
    numberOfProducts: number;
    subTotalPrice: number;
}