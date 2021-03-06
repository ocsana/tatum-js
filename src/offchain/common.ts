import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {Account, Address, BroadcastWithdrawal, TxHash, WithdrawalResponse} from '../model';
import {AddressBatch} from '../model/request/CreateOffchainAddressesBatch';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/generateDepositAddress" target="_blank">Tatum API documentation</a>
 */
export const generateDepositAddress = async (id: string, index?: number): Promise<Address> => {
    const url = `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/${id}/address`;
    return (await axios.post(index === undefined ? url : `${url}?index=${index}`,
        undefined,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/generateDepositAddressesBatch" target="_blank">Tatum API documentation</a>
 */
export const generateDepositAddresses = async (batch: AddressBatch): Promise<Address[]> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/address/batch`,
        batch,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/addressExists" target="_blank">Tatum API documentation</a>
 */
export const checkAddressExists = async (address: string, currency: string, index?: number): Promise<Account> => {
    const url = `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/address/${address}/${currency}`;
    return (await axios.get(index === undefined ? url : `${url}?index=${index}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/assignAddress" target="_blank">Tatum API documentation</a>
 */
export const assignDepositAddress = async (id: string, address: string): Promise<Address> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/${id}/address/${address}`,
        undefined,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/removeAddress" target="_blank">Tatum API documentation</a>
 */
export const removeDepositAddress = async (id: string, address: string): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/${id}/address/${address}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAllDepositAddresses" target="_blank">Tatum API documentation</a>
 */
export const getDepositAddressesForAccount = async (id: string): Promise<Address[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/${id}/address`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/broadcastBlockchainTransaction" target="_blank">Tatum API documentation</a>
 */
export const offchainBroadcast = async (data: BroadcastWithdrawal): Promise<TxHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal/broadcast`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeWithdrawal" target="_blank">Tatum API documentation</a>
 */
export const offchainStoreWithdrawal = async (data: any): Promise<WithdrawalResponse> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/cancelInProgressWithdrawal" target="_blank">Tatum API documentation</a>
 */
export const offchainCancelWithdrawal = async (id: string, revert = true): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal/${id}?revert=${revert}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/completeWithdrawal" target="_blank">Tatum API documentation</a>
 */
export const offchainCompleteWithdrawal = async (id: string, txId: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal/${id}/${txId}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};
