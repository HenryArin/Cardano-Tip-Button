import React, { useState } from 'react';
import { Transaction, BrowserWallet } from '@meshsdk/core';

function Home() {
    const [transactionStatus, setTransactionStatus] = useState('');

    const handleTip = async () => {
        try {
            // Connect to the wallet
            const wallet = await BrowserWallet.enable('eternl');

            // Get assets in the wallet
            const assets = await wallet.getAssets();

            // Proceed with transaction logic using the wallet and assets
            const tx = new Transaction({ initiator: wallet })
                .sendLovelace(
                  //Enter the wallet address that will recive the tip
                    '',
                    //You can change the amount of ada here 1000000 = 1 ada
                    //Dont forget to change the Ada value on the button
                    '5000000'
                );

            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);

            setTransactionStatus('Transaction successful');
        } catch (error) {
            setTransactionStatus('Transaction failed: ' + error.message);
        }
    };

    return (
        <div>

            <button onClick={handleTip} className="tipButton" >Tip 5 ADA</button>
            <p>{transactionStatus}</p>
        </div>
    );
}

export default Home;
