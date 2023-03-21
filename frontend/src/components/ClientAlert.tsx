import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import { useAppSelector } from '../store/hooks';

export default function ClientAlert() {
    const alertPerson = useAppSelector((state) => state.persons.currentPerson)

    return (
        <>
            {
                alertPerson.name!=="" &&
                <Alert variant="success" className="mt-2">
                    Hello {alertPerson.name} from {alertPerson.country} on {moment(alertPerson.birthday).format('D')} of {moment(alertPerson.birthday).format('MMMM')} you will be {alertPerson.years} old!
                </Alert>
            }
        </>
    )
}