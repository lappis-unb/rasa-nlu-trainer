export const TOKEN_API = '@lappis-Token'
export const isAuthenticated = () => localStorage.getItem(TOKEN_API) !== null
export const getToken = () => localStorage.getItem(TOKEN_API)
export const login = (token) => {
  localStorage.setItem(TOKEN_API, token)
}
export const logout = () => {
  localStorage.removeItem(TOKEN_API)
}
