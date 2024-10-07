import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { FirstContractFuncC } from '../wrappers/FirstContractFuncC';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('FirstContractFuncC', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('FirstContractFuncC');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let firstContractFuncC: SandboxContract<FirstContractFuncC>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        firstContractFuncC = blockchain.openContract(FirstContractFuncC.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await firstContractFuncC.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: firstContractFuncC.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and firstContractFuncC are ready to use
    });
});
