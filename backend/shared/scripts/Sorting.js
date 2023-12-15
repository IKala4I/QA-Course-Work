import {unionArray} from './Union.js';

sortByPropertyInAsc('age')

sortByPropertyInDesc('age')

function sortByPropertyInDesc(prop) {
    sortByPropertyInAsc(prop);
    unionArray.reverse();
}

function sortByPropertyInAsc(prop) {
    if (prop === 'full_name' || prop == 'country')
        sortByString(prop);
    else if (prop === 'age')
        sortByAge();
    else if (prop === 'b_day')
        sortByDate();
}

function sortByString(prop) {
    unionArray.sort((a, b) => {
        var fa = a[prop].toLowerCase(),
            fb = b[prop].toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
}

function sortByAge() {
    unionArray.sort((a, b) => {
        return a.age - b.age;
    });
}

function sortByDate() {
    unionArray.sort((a, b) => {
        let da = new Date(a.b_date),
            db = new Date(b.b_date);
        return da - db;
    });
}