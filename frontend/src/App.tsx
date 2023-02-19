import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

function App() {
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
                <Form.Control type="text" placeholder="Name here" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSurname">
              <Form.Label column sm={2}>Surname:</Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Surname here" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formCountry">
              <Form.Label column sm={2}>Country:</Form.Label>
              <Col sm={10}>
                <Form.Select aria-label="Default select example">
                  <option>Countries</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBirthday">
              <Form.Label column sm={2}>Birthday:</Form.Label>
              <Col sm={10}>
                <Form.Control type="date" placeholder="mm/dd/yyyy" />
              </Col>
            </Form.Group>
            <Row>
              <Col style={{ textAlign: 'right' }} md={{ span: 2, offset: 10 }}>
                <Button variant="primary" type="submit" >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
          <Alert variant="success" className="mt-2">
            Hello name from Country on day of month you will have years
          </Alert>
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
            <tbody></tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
