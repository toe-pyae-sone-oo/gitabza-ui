export const saveToken = token => localStorage.setItem('adminToken', token)
export const getToken = () => localStorage.getItem('adminToken')