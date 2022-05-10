import { environment } from "src/environments/environment";

export const MAIN_ENDPOINTS = {
    books: '/books',
    cart: '/cart',
    categories: '/categories',
    users: '/users',
    ratings: '/ratings',
    role: '/role',
    json: '.json',
    login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=' + environment.firebase.apiKey,
    userData: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + environment.firebase.apiKey
}