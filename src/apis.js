const getBaseUrl = () => {
   return "https://shadowstrike.onrender.com"
}

export const baseurl = getBaseUrl();

export const apis = {
    LOGIN:`${baseurl}/api/auth/login`,
    SIGNUP:`${baseurl}/api/auth/signup`,
    GET_PROFILE:`${baseurl}/api/profile`,
    GET_USER:`${baseurl}/api/users`,
    PURCHASE_COINS:`${baseurl}/api/coins/purchase`,
    TRANSANCTIONS:`${baseurl}/api/transactions`,
}