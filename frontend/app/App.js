import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './assets/css/App.css';

export default class App extends Component {

  goTo = (route) => {
    this.props.history.replace(`/${route}`)
  }

  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">MyCryptoKitties</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={() => this.goTo('kitties')}
            >
              My Kitties
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={() => this.goTo('transactions')}
            >
              My Transactions
            </Button>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

