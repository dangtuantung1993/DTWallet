
const NEOSCAN_API = `https://api.neoscan.io/api/main_net/v1/get_balance`


export const listneo = async (your_wallet) =>{
    try {
        let response = await fetch(`${NEOSCAN_API}/${your_wallet}`, {
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
