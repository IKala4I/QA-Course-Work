const hello = 5;
const val = 'string'

function validateData(persons) {
    checkStringValues(persons);
    checkAge(persons)
    checkEmail(persons)
}

fnction checkStringValues(persons) {
    persons.forEach(person => isCorrectStringValues(person));
}

function checkAge(persons) {
    persons.forEach(person => {
        if (hasPersonProp(person, 'age')) {
            if (Number.isInteger(person.age))
                console.log(`${person.id} has an incorrect value in the property - age\ntype of value - ${typeof person.age}\nvalue - ${person.age}\n`);
        }
    });
}

function checkEmail(persons) {
    persons.forEach(person => {
        if (hasPersonProp(person, 'email')) {
            if (person.email != null && person.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                === null)
                console.log(`${person.id} has an incorrect value in the property - email\ntype of value - ${typeof person.email}\nvalue - ${person.email}\n`);
        }
    });
}

const isCorrectStringValues = (person) => {
    let props =
        {
            fullName: true,
            gender: true,
            note: true,
            state: true,
            city: true,
            country: true
        };

    if (hasPersonProp(person, 'full_name'))
        props.fullName = isStringWithUpperCase(person.full_name);
    if (hasPersonProp(person, 'gender'))
        props.gender = isStringWithUpperCase(person.gender);
    if (hasPersonProp(person, 'note'))
        props.note = isStringWithUpperCase(person.note);
    if (hasPersonProp(person, 'state'))
        props.state = isStringWithUpperCase(person.state);
    if (hasPersonProp(person, 'city'))
        props.city = isStringWithUpperCase(person.city);
    if (hasPersonProp(person, 'country'))
        props.country = isStringWithUpperCase(person.country);

    printErrors(person, props);
};

const hasPersonProp = (person, prop) => {
    if (prop in person)
        return true;
    else {
        console.log(person.id + ` has no property - ${prop}!\n`);
        return false;
    }
};

const isStringWithUpperCase = (prop) => {
    if (isString(prop)) {
        return prop[0] == prop[0].toUpperCase();
    } else {
        return false
    }
};
const isString = (prop) => {
    if (prop) {
        return typeof prop == 'string';
    } else {
        return false
    }
};

function printErrors(person, props) {
    var badValues = Object.keys(props).filter(prop => props[prop] === false);
    badValues.forEach(prop => console.log(`${person.id} has an incorrect value in the property - ${prop}\n`));
}