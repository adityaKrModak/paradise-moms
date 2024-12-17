import axios from "axios";

const Url = process.env.NEXT_PUBLIC_BASE_URL;

const loginSignup = async () => {
    try {
        window.location.href = (`${Url}/auth/google`);
        
    } catch (error) {
        console.log(error);
    }
}

export {loginSignup};