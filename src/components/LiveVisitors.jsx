import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import openClient from 'socket.io-client';

const socket = openClient('http://localhost:3000');

function LiveVisitors() {
  const [visitors, setVisitors] = useState([]);

  const renderTableBody = () => {
    return visitors?.map((visitor, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{visitor.ip}</td>
        <td>{visitor.flag}</td>
        <td>{visitor.city}</td>
        <td>{visitor.state}</td>
        <td>{visitor.country}</td>
      </tr>
    ));
  };

  useEffect(() => {
    axios.get('http://geoplugin.net/json.gp').then((res) => {
      const visitor = {
        ip: res.data.geoplugin_request,
        flag: res.data.geoplugin_countryCode,
        city: res.data.geoplugin_city,
        country: res.data.geoplugin_countryName,
        state: res.data.geoplugin_region,
      };

      socket.emit('new_visitor', visitor);
      socket.on('visitors', (visitor) => {
        setVisitors((prevValue) => [...prevValue, visitor]);
      });
    });
  }, []);
  console.log(visitors);
  return (
    <>
      <h2>Live Visitors</h2>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>IP</th>
            <th>Flag</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{visitors ? renderTableBody() : 'Loading'}</tbody>
      </Table>
    </>
  );
}

export default LiveVisitors;
