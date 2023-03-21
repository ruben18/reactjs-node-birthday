import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState } from 'react';
import { Person, Country } from '../types/types';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../store/hooks';
import { addPerson } from '../store/personsSlice';
import moment from 'moment';

interface Countries {
    countries: Country[];
}

export default function ClientForm(props: Countries) {
    const [newPerson, setNewPerson] = useState<Person>({ name: '', surname: '', country: '', birthday: "", years: 0 });
    const [isSaving, setSaving] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const saveNewPerson = (e: any) => {
        e.preventDefault();
        setSaving(true);
        
        if(newPerson.name==="" || newPerson.surname ==="" || newPerson.country==="" || newPerson.birthday === ""){
          alert("All fields are required.");
          return;
        }
    
        var years = moment().diff(newPerson.birthday, 'years', true);
    
        dispatch(addPerson({...newPerson, years: Math.floor(years) }));
        
        setNewPerson({ name: '', surname: '', country: '', birthday: "", years: 0 });
        setSaving(false);
    }

    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formName">
                    <Form.Label column sm={2}>Name:</Form.Label>
                    <Col sm={10}>
                        <Form.Control value={newPerson.name} onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })} type="text" placeholder="Name here" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formSurname">
                    <Form.Label column sm={2}>Surname:</Form.Label>
                    <Col sm={10}>
                        <Form.Control value={newPerson.surname} onChange={(e) => setNewPerson({ ...newPerson, surname: e.target.value })} type="text" placeholder="Surname here" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formCountry">
                    <Form.Label column sm={2}>Country:</Form.Label>
                    <Col sm={10}>
                        <Form.Select value={newPerson.country} aria-label="Default select example" onChange={(e) => setNewPerson({ ...newPerson, country: e.target.value })}>
                            <option>Countries</option>
                            {props.countries.map((item: Country) => {
                                return (
                                    <option key={item._id} value={item.name}>{item.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBirthday">
                    <Form.Label column sm={2}>Birthday:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="date" value={newPerson.birthday} onChange={(e) => setNewPerson({ ...newPerson, birthday: e.target.value.toString() })} />
                    </Col>
                </Form.Group>
                <Row>
                    <Col style={{ textAlign: 'right' }} md={{ span: 2, offset: 10 }}>
                        {!isSaving ?
                            <Button onClick={(e) => saveNewPerson(e)} variant="primary" type="submit" >
                                Save
                            </Button>
                            :
                            <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Saving...
                            </Button>
                        }
                    </Col>
                </Row>
            </Form>
            {/*
                !isSaving && alertPerson.name !== '' &&
                <Alert variant="success" className="mt-2">
                    Hello {alertPerson.name} from {alertPerson.country} on {moment(alertPerson.birthday).format('D')} of {moment(alertPerson.birthday).format('MMMM')} you will be {alertPerson.years} old!
                </Alert>
            */}
        </>
    )
}