import '../assets/css/App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useEffect, useState } from 'react';
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import { Country } from '../types/types';
import ClientForm from '../components/ClientForm';
import ClientsTable from '../components/ClientsTable';
import ClientAlert from '../components/ClientAlert';

export default function App() {
  const [countries, setCountries] = useState(Array<Country>);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (countries.length === 0) {
      getCountries();
    }
  }, [countries])

  const getCountries = () => {
    axios.get('http://localhost:3001/countries').then((response) => {
      setCountries(response.data);
      setLoading(false);
    }).catch((res)=>{
      alert(res);
    })
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
              <ClientForm countries={countries} />
              <ClientAlert />
            </Col>
            <Col>
              <ClientsTable />
            </Col>
          </>
        }
      </Row>
    </Container>
  );
}
