export function getRedirect(user_type, portrait) {
    let path = user_type === 'seller' ? '/seller' : '/consumer'
    path += (portrait ? '' : 'info')
    return path
}