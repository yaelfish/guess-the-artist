import axios from 'axios';
import { getRandomId } from './utils.js';
// import storageService from './storageService.js';
// const Axios = axios.create();
// const Axios = axios.create({
    // withCredentials: true
    // crossorigin: true
// });
let limit = 35;
const URL = `https://itunes.apple.com/rss/topalbums/limit=${limit}/json`;
const BASE_URL = (process.env.NODE_ENV !== 'development') ? URL : URL;


export default {
    query,
    deleteToy,
    addToy,
    getToyById,
    editToy
};

function query() {
    return axios.get(BASE_URL)
    .then(res => res.data)
}

// function query(filterBy, sortBy, sortOrder) {
//     console.log(filterBy);
//     console.log(typeof filterBy.inStock);
//     return Axios.get(BASE_URL + `?name=${filterBy.name}&inStock=${filterBy.inStock}&type=${filterBy.type}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
//         .then(res => res.data);
// }

function getToyById(toyId) {
    return axios.get(BASE_URL + '/' + toyId)
        .then(res => res.data);
}

function addToy(toy) {
    return axios.post(BASE_URL,
        {
            _id: getRandomId(),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            createdAt: Date.now(),
            inStock: toy.inStock
        })
        .then(res => res.data);
}

function editToy(toy, changedToyProps) {
    console.log(changedToyProps);

    const { name, price, type, inStock } = changedToyProps;
    toy.name = name;
    toy.price = price;
    toy.type = type;
    toy.inStock = inStock;

    return axios.put((BASE_URL + '/' + toy._id), { ...toy })
        .then(updatedToy => updatedToy.data);
}

function deleteToy(toyId) {
    return axios.delete(BASE_URL + '/' + toyId)
        .then(res => res.data);
}

// function _getUrl(_id) {
//     return `${BASE_URL}/${_id}`
// }