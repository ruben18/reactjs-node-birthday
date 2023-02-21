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
  const [isSaved, setSaved] = useState<boolean>(false);

  const [currentPerson, setCurrentPerson] = useState<Person>({ name: '', surname: '', country: '', birthday: moment().format('DD/MM/YYYY'), years:0});

  useEffect(() => {
    getCountries();
  }, [])

  const getCountries = () => {
    axios.get('http://localhost:3001/countries').then((response) => {
      setCountries(response.data);
    })
  }

  const saveNewPerson = (e: any) => {
    e.preventDefault();
    
    var years = moment().diff(currentPerson.birthday, 'years',true);

    setCurrentPerson({...currentPerson , years: Math.floor(years)});

    setPersons([...persons, currentPerson]);
    setSaved(true);
  }

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h3>Intive - FDV Exercise</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label column sm={2}>Name:</Form.Label>
              <Col sm={10}>
                <Form.Control value={currentPerson.name} onChange={(e) => setCurrentPerson({ ...currentPerson, name: e.target.value })} type="text" placeholder="Name here" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSurname">
              <Form.Label column sm={2}>Surname:</Form.Label>
              <Col sm={10}>
                <Form.Control value={currentPerson.surname} onChange={(e) => setCurrentPerson({ ...currentPerson, surname: e.target.value })} type="text" placeholder="Surname here" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formCountry">
              <Form.Label column sm={2}>Country:</Form.Label>
              <Col sm={10}>
                <Form.Select defaultValue = {currentPerson.country} aria-label="Default select example" onChange={(e) => setCurrentPerson({ ...currentPerson, country: e.target.value })}>
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
                <Form.Control type="date" value = {currentPerson.birthday} onChange={(e) =>setCurrentPerson({ ...currentPerson, birthday: moment(new Date(e.target.value)).format('YYYY-MM-DD')})} />
              </Col>
            </Form.Group>
            <Row>
              <Col style={{ textAlign: 'right' }} md={{ span: 2, offset: 10 }}>
                <Button onClick={(e)=>saveNewPerson(e)}  variant="primary" type="submit" >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
          {isSaved && 
            <Alert variant="success" className="mt-2">
              Hello {currentPerson.name} from {currentPerson.country} on {moment(currentPerson.birthday).format('D')} of {moment(currentPerson.birthday).format('MMMM')} you will be {currentPerson.years} old!
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
              {persons.map((person: Person, idx: number) => {
                return (
                  <tr key={idx} onClick={()=>setCurrentPerson(person)}>
                    <td>{person.name} {person.surname}</td>
                    <td>{person.country}</td>
                    <td>{person.birthday.toString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
