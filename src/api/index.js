import require from './require'

export const require_register = (user_data) => require('/register', user_data, 'post')

export const require_login = ({username, pwd}) => require('/login', {username, pwd}, 'post')

export const require_updateuser = (user) => require('/update', {user}, 'post')

export const require_user = () => require('/user')

export const require_userlist = (user_type) => require('/userlist', {user_type})