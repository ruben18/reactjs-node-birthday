export interface Country {
    _id: string,
    name: string
}

export interface Person {
    name: string,
    surname: string,
    country: string,
    birthday: string,
    years: number
}


export interface CounterState {
    persons: Array<Person>,
    currentPerson: Person
}