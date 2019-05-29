export const TOKEN_API = '@lappis-Token'
export const isAuthenticated = () => {
  let userAuth = true
  if (process.env.PRODUCTION) {
    userAuth = localStorage.getItem(TOKEN_API) !== null
  }
  return userAuth
}
export const getToken = () => localStorage.getItem(TOKEN_API)
export const login = token => {
  localStorage.setItem(TOKEN_API, token)
}
export const logout = () => {
  localStorage.removeItem(TOKEN_API)
}
