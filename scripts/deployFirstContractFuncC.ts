import { toNano } from '@ton/core';
import { FirstContractFuncC } from '../wrappers/FirstContractFuncC';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const firstContractFuncC = provider.open(FirstContractFuncC.createFromConfig({}, await compile('FirstContractFuncC')));

    await firstContractFuncC.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(firstContractFuncC.address);

    // run methods on `firstContractFuncC`
}
