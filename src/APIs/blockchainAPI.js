
const BITCOIN = `https://blockchain.info/rawaddr`


export const listbtc = async (your_wallet) =>{
    try {
        let response = await fetch(`${BITCOIN}/${your_wallet}`, {
            method: 'GET',

        })
        let responseJson = await response.json();


        if (responseJson){
            return responseJson

        }else {
            return {}
        }
    }catch (error) {
        return {}
    }
}
