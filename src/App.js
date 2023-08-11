import React from 'react';
import Header from './components/Header';
import { Container, Row } from 'reactstrap';
import LiveVisitors from './components/LiveVisitors';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <LiveVisitors />
        </Row>
      </Container>
    </>
  );
}

export default App;
