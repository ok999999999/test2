import Web3 from "web3"
let web3 = undefined


export const connectWallet = async () => {
    if (!window.ethereum) {
        window.alert('Please install MetaMask first.')
        return
    }
    if (!web3) {
        try {
            await window.ethereum.enable()
            web3 = new Web3(window.ethereum)
        } catch (error) {
            window.alert('You need to allow MetaMask.')
            return
        }
    }
    const coinbase = await web3.eth.getCoinbase()

    if (!coinbase) {
        window.alert('Please activate MetaMask first.')
        return
    }
}

export const mint = async (amount) => {
    var tmp = await new web3.eth.Contract([{
        "inputs": [
            {
                "internalType": "string",
                "name": "roundName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
    ], "0x4df844490006fa8098cce548508956896d6496c2")

    var user = await web3.eth.getCoinbase()
    return await tmp.methods.mint("Public1", amount).send({
        from: user, value: web3.utils.toWei(0.069 * amount, "ether")
    });
}