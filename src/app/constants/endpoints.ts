import { environment } from "src/environments/environment";

export const MAIN_ENDPOINTS = {
    books: '/books',
    cart: '/cart',
    categories: '/categories',
    login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebase.apiKey,
    users: '/users',
    ratings: '/ratings',
    role: '/admin',
    json: '.json',
    userData: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + environment.firebase.apiKey
}