import React, { Component } from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import Promise from 'bluebird';
import getWeb3 from '../../getWeb3';
import moment from 'moment';
import Api from '../api';

class Transaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            incomingTransactions: [],
            outgoingTransactions: [],
            web3: null,
            account: null
        }
        this.getTransactions = this.getTransactions.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.location.pathname, "I mounted");
        getWeb3
            .then(results => {
                results.web3.eth.getAccounts((err, accounts) => {
                    return this.setState({
                        web3: results.web3,
                        account: accounts[0].toLowerCase()
                    }, () => {
                        this.getTransactions();
                        this.backgroundProcess = setInterval(this.getTransactions, 5000);
                    })
                })
            })
            .catch((err) => {
                console.log(err)
                console.log('Error finding web3.')
            })
    }
    
    componentWillUnmount() {
        clearInterval(this.backgroundProcess);
    }

    getTransactions() {
        // console.log('fired!')
        Api.getIncomingTransactions(this.state.account).then((transactions) => {
            this.setState({
                incomingTransactions: transactions
            });
        });
        Api.getOutgoingTransactions(this.state.account).then((transactions) => {
            this.setState({
                outgoingTransactions: transactions
            });
        });
    }

    renderTable(transactions) {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>status</th>
                        <th>txHash</th>
                        <th>createdAt</th>
                        <th>fromAddress</th>
                        <th>toAddress</th>
                        <th>blockHeight</th>
                        <th>kittenId</th>
                        <th>gasLimit</th>
                        <th>gasUsed</th>
                        <th>gasPrice</th>
                        <th>transactionIndex</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.status || 'Please Wait...'}</td>
                                <td>{transaction.txHash}</td>
                                <td>{moment(transaction.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td>{transaction.fromAddress}</td>
                                <td>{transaction.toAddress}</td>
                                <td>{transaction.blockHeight || ''}</td>
                                <td>{transaction.kittenId}</td>
                                <td>{transaction.gasLimit}</td>
                                <td>{transaction.gasUsed || ''}</td>
                                <td>{transaction.gasPrice}</td>
                                <td>{transaction.transactionIndex}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    render() {
        const {
            incomingTransactions,
            outgoingTransactions
        } = this.state;

        return (
            <div>
                <h2>Incoming Gifts</h2>
                {this.renderTable(incomingTransactions)}
                <h2>Outgoing Gifts</h2>
                {this.renderTable(outgoingTransactions)}                
            </div>
        );
    }
}

export default Transaction;
