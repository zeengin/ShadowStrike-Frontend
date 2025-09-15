const getBaseUrl = () => {
    return import.meta.env.VITE_APP_BASEURL || "https://shadowstrike.onrender.com"
}

export const baseurl = getBaseUrl();

export const apis = {
    LOGIN:`${baseurl}/api/auth/login`,
    SIGNUP:`${baseurl}/api/auth/signup`,
}