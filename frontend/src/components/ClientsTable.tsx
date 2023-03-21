import { Person } from '../types/types';
import { Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentPerson } from '../store/personsSlice';

export default function ClientsTable() {
    const persons = useAppSelector((state) => state.persons.persons)
    const dispatch = useAppDispatch()

    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Birthday</th>
                </tr>
            </thead>
            <tbody>
                {persons.map((person: Person, idx: number) => {
                    return (
                        <tr key={idx} onClick={() => dispatch(setCurrentPerson(person))}>
                            <td>{person.name} {person.surname}</td>
                            <td>{person.country}</td>
                            <td>{person.birthday.toString()}</td>
                        </tr>
                    )
                })
                }
            </tbody>
        </Table>
    )
}