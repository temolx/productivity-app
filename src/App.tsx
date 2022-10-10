import './style/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddTask from './component/AddTask';
import List from './component/List';
import Inbox from './component/Inbox';
import { useSelector } from 'react-redux'

const App = () => {

  const sidebarVisible = useSelector((state: any) => state.sidebarVisible);

  return (
      <div className="productivity-app">
      <Container fluid>
        <Row>
          <Col lg={2} className='d-none d-lg-block'><Inbox /></Col>
          <Col lg={sidebarVisible.value ? 7 : 10}><List /></Col>
          {sidebarVisible.value ? <Col lg={3} className='d-none d-lg-block'><AddTask /></Col> : ''}
        </Row>
      </Container>
      </div>
  );
}

export default App;
