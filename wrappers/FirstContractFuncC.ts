import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type FirstContractFuncCConfig = {};

export function firstContractFuncCConfigToCell(config: FirstContractFuncCConfig): Cell {
    return beginCell().endCell();
}

export class FirstContractFuncC implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new FirstContractFuncC(address);
    }

    static createFromConfig(config: FirstContractFuncCConfig, code: Cell, workchain = 0) {
        const data = firstContractFuncCConfigToCell(config);
        const init = { code, data };
        return new FirstContractFuncC(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
