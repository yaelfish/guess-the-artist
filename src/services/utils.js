export function getRandomId() {
    let letters = '1234567890poiiytreqwasdfghjklmnbvcxxssersgyushquiz';
    let id = '';
    for (let i = 0; i < 10; i++) {
        let ind = Math.floor(Math.random() * letters.length)
        id += letters[ind];
    }
    return id;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}