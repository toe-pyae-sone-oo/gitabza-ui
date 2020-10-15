export const validator = {
  username: username => (!!username && !!username.trim()) ? '' : 'username is required',
  password: password => (!!password && !!password.trim()) ? '' : 'password is required',
}