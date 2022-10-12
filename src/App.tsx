import './style/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddTask from './component/AddTask';
import List from './component/List';
import Inbox from './component/Inbox';
import { useSelector } from 'react-redux'
import { useState, FC } from 'react';
import { RootState } from './redux/store';

const App: FC = () => {

  const sidebarVisible = useSelector((state: RootState) => state.sidebarVisible);

  const[filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const[siderbarMobile, setSidebarMobile] = useState<boolean>(false);

  return (
      <div className="productivity-app">
      <Container fluid>
        <Row>
          <Col lg={2} sm={12} className={filtersVisible ? 'd-xs-block' : 'd-none d-lg-block'}><Inbox setFiltersVisible={setFiltersVisible} /></Col>

          <Col lg={sidebarVisible.value ? 7 : 10} className={siderbarMobile || filtersVisible ? 'd-none d-lg-block' : ''}><List setFiltersVisible={setFiltersVisible} setSidebarMobile={setSidebarMobile} /></Col>

          {sidebarVisible.value ? <Col lg={3} className={siderbarMobile ? '' : 'd-none d-lg-block'} ><AddTask setSidebarMobile={setSidebarMobile} /></Col> : null}
        </Row>
      </Container>
      </div>
  );
}

export default App;
