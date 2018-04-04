import React from 'react';
import { Form, FormGroup, Button, FormControl, Modal, ControlLabel } from 'react-bootstrap';
import Api from '../api';
import Config from '../config';


export default class Gift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transferAddress: ''
        };

        this.transfer = this.transfer.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    handleAddressChange = (event) => {
        this.setState({ transferAddress: event.target.value })
    }

    transfer() {
        // debugger;
        return this.props.CryptoKittiesContract.methods.transfer(this.state.transferAddress, this.props.kittyId).send({ from: this.props.account, gas: Config.gasLimit, gasPrice: Config.gasPrice }, (err, txHash) => {
            console.log(err, txHash);
            Api.createTransaction(txHash, Config.gasLimit, Config.gasPrice, this.props.account, this.state.transferAddress, this.props.kittyId).then((response) => {
                alert(response);
            });
            this.props.closeGiftModal();
        });
    }

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>SEND A KITTY AS A GIFT!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <FormGroup controlId="formControlsText">
                                <ControlLabel>Your Friend's Ethereum Address</ControlLabel>
                                <FormControl onChange={this.handleAddressChange} type="text" value={this.state.transferAddress} />
                            </FormGroup>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.closeGiftModal}>Close</Button>
                        <Button onClick={() => {
                            this.transfer();
                            this.props.closeGiftModal();
                        }} bsStyle="primary">Send Gift!</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}