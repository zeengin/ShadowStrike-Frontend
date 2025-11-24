const getBaseUrl = () => {
    return import.meta.env.VITE_APP_BASEURL
}

export const baseurl = getBaseUrl();

export const apis = {
    LOGIN: `${baseurl}/api/auth/login`,
    SIGNUP: `${baseurl}/api/auth/signup`,
    GET_PROFILE: `${baseurl}/api/users/userdata`,
    GET_USER: `${baseurl}/api/users`,
    PURCHASE_COINS: `${baseurl}/api/coins/purchase`,
    DEPOSITS: `${baseurl}/api/deposit`, // also used to get receipts /<receipt-id>/receipt (suffix of route)
    WITHDRAWALS: `${baseurl}/api/withdrawal`,
    GET_PLAYER_BRANDS: `${baseurl}/api/brand/player`,
    GET_PURCHASE_OPTIONS: `${baseurl}/api/purchase-options`,    
    GENERATE_PAYMENT_TOKEN: `${baseurl}/web/payment/generateClientToken`,    
    PROCESS_PAYMENT: `${baseurl}/web/payment/processPayment`,    
    SUBMIT_KYC:`${baseurl}/web/local-kyc/create`,
    GET_KYC:`${baseurl}/web/local-kyc/details`,
    GET_TICKETS:`${baseurl}/api/tickets`, // suffix :id to get by id
    CREATE_TICKET:`${baseurl}/api/tickets/create`,
    GET_MESSAGES: `${baseurl}/api/chat-messages`,
    CREATE_MESSAGE: `${baseurl}/api/chat-messages/create`,


} 