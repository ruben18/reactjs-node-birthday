import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment';
import { Spinner } from 'react-bootstrap';


interface Country {
  _id: string,
  name: string
}

interface Person {
  name: string,
  surname: string,
  country: string,
  birthday: string,
  years: number
}

export default function App() {

  const [countries, setCountries] = useState(Array<Country>);
  const [persons, setPersons] = useState(Array<Person>);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isSaving, setSaving] = useState<boolean>(false);

  const [alertPerson, setAlertPerson] = useState<Person>({ name: '', surname: '', country: '', birthday: "", years: 0 });
  const [newPerson, setNewPerson] = useState<Person>({ name: '', surname: '', country: '', birthday: "", years: 0 });


  useEffect(() => {
    if (countries.length === 0) {
      getCountries();
    }
  }, [countries])

  const getCountries = () => {
    axios.get('http://localhost:3001/countries').then((response) => {
      setCountries(response.data);
      setLoading(false);
    })
  }

  const saveNewPerson = (e: any) => {
    e.preventDefault();
    setPersons([...persons, newPerson]);
    
    setSaving(true);
    
    setTimeout(() => {
      setSaving(false);
      setNewPerson({ name: '', surname: '', country: '', birthday: "", years: 0 })
    }, 500);

    setAlert(newPerson);
  }

  const setAlert = (person: Person) => {
    var years = moment().diff(person.birthday, 'years', true);

    person.years= Math.floor(years);

    setAlertPerson(person);
    
    setTimeout(() => {
      setAlertPerson({ name: '', surname: '', country: '', birthday: "", years: 0 });
    }, 4000);
  }

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h3>Intive - FDV Exercise</h3>
        </Col>
      </Row>
      <Row>
        {isLoading ?
          <Col className="text-center">
            <Spinner animation="border" />
          </Col>
          :
          <>
            <Col>
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
                      {countries.map((item: Country) => {
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
              {!isSaving && alertPerson.name!=='' &&
                <Alert variant="success" className="mt-2">
                  Hello {alertPerson.name} from {alertPerson.country} on {moment(alertPerson.birthday).format('D')} of {moment(alertPerson.birthday).format('MMMM')} you will be {alertPerson.years} old!
                </Alert>
              }
            </Col>
            <Col>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Birthday</th>
                  </tr>
                </thead>
                <tbody>
                  {isSaving ?
                    <tr>
                      <td colSpan={3} className="text-center">
                        <Spinner animation="border" />
                      </td>
                    </tr>
                    :
                    persons.map((person: Person, idx: number) => {
                      return (
                        <tr key={idx} onClick={() => setAlert(person)}>
                          <td>{person.name} {person.surname}</td>
                          <td>{person.country}</td>
                          <td>{person.birthday.toString()}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Col>
          </>
        }
      </Row>
    </Container>
  );
}
