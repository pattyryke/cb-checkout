import axios from "axios";

// Checks for user (if !user, it will go to auth url)
export function checkAuth() {
    try {
        const response = axios.get('http://localhost:3000/google/account');
        console.log(response);
        return response;
    } catch(err) {
        console.error('Error in the checkAuth function: '+ err);
        window.location.href = `http://localhost:3000/auth/google/login`;
    }
}

export default checkAuth;