import React, { Component } from 'react';
import KittyAbi from '../../abi/kittyABI';
import Web3 from 'web3';
import getWeb3 from '../../getWeb3';
import { Table, Button, Image } from 'react-bootstrap';
import { kittyContractAddress } from '../config';
import { tokensOfOwner } from '../api';
import Gift from './Gift';
// import Promise from 'bluebird';
import moment from 'moment';

class Kitty extends Component {
    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            numKitties: 0,
            kitties: [],
            account: null,
            showModal: false,
            kittyId: null
        }
        this.CryptoKittiesContract = null;
        this.closeGiftModal = this.closeGiftModal.bind(this);
    }

    componentWillMount() {
        getWeb3
            .then(results => {
                results.web3.eth.getAccounts((err, accounts) => {
                    return this.setState({
                         web3: results.web3,
                         account: accounts[0].toLowerCase()
                     }, () => {
                         this.getKitties();
                         this.getNumKitties();
                     })
                })
            })
            .catch((err) => {
                console.log(err)
                console.log('Error finding web3.')
            })
    }

    getNumKitties() {
        this.CryptoKittiesContract = new this.state.web3.eth.Contract(KittyAbi, kittyContractAddress);
        this.CryptoKittiesContract.methods.balanceOf(this.state.account).call({from: this.state.account}, (err, result) => {
            this.setState({
                numKitties: result
            });
        })
    }

    // tokensOfOwner method from cryptoKitties github is unavailable. Instead they have tokensOfOwnerByIndex and that goes through a list
    // of about a million or more kittens to find the ones that I own and is dysfunctional. I'm guessing they use their own database to get
    // a user's kittens instead of directly getting them from the blockchain. They have an api endpoint to get kittens so I just used that.
    getKitties() {
        tokensOfOwner(this.state.account).then((kitties) => {
            this.setState({
                kitties
            });
        })
    }

    closeGiftModal() {
        this.setState({
            showModal: false,
            kittyId: null
        });
    }

    renderGiftForm() {
        // debugger;
        if (this.CryptoKittiesContract && this.state.showModal && this.state.account && this.state.kittyId) {
            return (
                <Gift 
                    closeGiftModal={this.closeGiftModal} 
                    CryptoKittiesContract={this.CryptoKittiesContract} 
                    account={this.state.account} 
                    kittyId={this.state.kittyId} 
                />
            )
        }
        return null;
    }

    render() {
        const {
            kitties
        } = this.state;

        return (
            <div>
                {this.renderGiftForm()}
                <h1>Your Kitties - Total {this.state.numKitties}</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>name</th>
                            <th>image</th>
                            <th>generation</th>
                            <th>createdAt</th>
                            <th>color</th>
                            <th>Transfer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kitties.map((kitten, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{kitten.id}</td>
                                    <td>{kitten.name || ''}</td>
                                    <td><Image src={kitten.image_url} thumbnail /></td>
                                    <td>{kitten.generation}</td>
                                    <td>{moment(kitten.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>{kitten.color}</td>
                                    <td>
                                        <Button bsStyle='primary'
                                            onClick={
                                                () => {
                                                    if (this.CryptoKittiesContract && this.state.account) {
                                                        this.setState({
                                                            showModal: true,
                                                            kittyId: kitten.id
                                                        });
                                                    } else {
                                                        alert('please wait while we get cryptoKitties contract and your account!');
                                                    }
                                                }
                                            }
                                        >
                                            Send as Gift!
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Kitty;
