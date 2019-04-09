import jwt_decode from 'jwt-decode';
// Set iscompany for access control
const setAccessControl = token => {
    if(token) {
        // Decode token
        const decoded = jwt_decode(token)
        if(decoded.iscompany) {
            return true
        } else {
            return false
        }
    } else {
        // No token found
        return
    }
}
export default setAccessControl;