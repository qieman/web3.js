import * as sinonLib from 'sinon';
import {formatters} from 'web3-core-helpers';
import SignMethodModel from '../../../src/models/methods/SignMethodModel';

const sinon = sinonLib.createSandbox();

/**
 * GetStorageAtMethodModel test
 */
describe('SignMethodModelTest', () => {
    let model, formattersMock;

    beforeEach(() => {
        formattersMock = sinon.mock(formatters);
        model = new SignMethodModel({}, formatters, {test: true});
    });

    afterEach(() => {
        sinon.restore();
    });

    it('accounts should be defined', () => {
        expect(model.accounts.test).toBeTruthy();
    });

    it('rpcMethod should return eth_sign', () => {
        expect(model.rpcMethod).toBe('eth_sign');
    });

    it('parametersAmount should return 2', () => {
        expect(model.parametersAmount).toBe(2);
    });

    it('beforeExecution should call the inputSignFormatter and inputAddressFormatter', () => {
        model.parameters = ['string', 'string'];

        formattersMock
            .expects('inputSignFormatter')
            .withArgs(model.parameters[0])
            .returns('string')
            .once();

        formattersMock
            .expects('inputAddressFormatter')
            .withArgs(model.parameters[1])
            .returns('0x0')
            .once();

        model.beforeExecution({});

        expect(model.parameters[0]).toBe('string');
        expect(model.parameters[1]).toBe('0x0');

        formattersMock.verify();
    });

    it('afterExecution should just return the response', () => {
        const object = {};

        expect(model.afterExecution(object)).toBe(object);
    });
});
