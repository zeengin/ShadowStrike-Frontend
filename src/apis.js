const getBaseUrl = () => {
    return import.meta.env.VITE_APP_BASEURL 
}

export const baseurl = getBaseUrl();

export const apis = {
    LOGIN:`${baseurl}/api/auth/login`,
    SIGNUP:`${baseurl}/api/auth/signup`,
    GET_PROFILE:`${baseurl}/api/profile`,
    GET_USER:`${baseurl}/api/users`,
    PURCHASE_COINS:`${baseurl}/api/coins/purchase`,
    TRANSANCTIONS:`${baseurl}/api/transactions`, // also used to get receipts /<receipt-id>/receipt (prefix of route)
} 