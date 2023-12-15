import {unionArray} from './Union.js';

var result = findPersonByParamAndValue('age', 24);

function findPersonByParamAndValue(param, value) {
    if (param === 'name')
        return findPersonByName(value);
    else if (param === 'note')
        return findPersonByNote(value)
    else if (param === 'age')
        return findPersonByAge(value);
}

fnction findPersonByName(name) {
    return unionArray.find(person => {
        return person.full_name.includes(name);
    });
}

function findPersonByNote(note) {
    return unionArray.find(person => {
        return person.note === note;
    });
}

function findPersonByAge(age) {
    return unionArray.find(person => {
        return person.age === age;
    });
}