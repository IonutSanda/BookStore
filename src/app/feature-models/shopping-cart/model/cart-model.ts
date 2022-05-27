import { BookModel } from "../../books/models/book.model";

export interface CartModel {
    books: BookModel[];
    numberOfProducts: number;
    subtotalPriceProducts: number;
}