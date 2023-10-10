import {useNavigate} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import {useCartStore} from "../../store/shoppingCartStore"
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NxWZcLXoKZYYBLlqdLbDjkjkwYKPcM41zGJ4q3Sd0k3Fq0vo7Y0MROPgCP09i5a4xP9MdrkJpcQoEP1iT6kvQ52005i9Ru5cN');

export default function Stripe() {
    const [clientSecretKey,setClientSecretKey] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const [validToken, setValidToken] = useState(true)
    const {totalToPay} = useCartStore()

    const themeDesign = {
        theme: 'night',
        labels: 'floating'
        }
    
        const navigate= useNavigate()
        const {user, logout} = useAuthStore()
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    useEffect(() => {
        const getPaymentIntent = async() => {
                if(user.role==='guest'){
                    logout()
                    navigate('/')
                    return toast.error("Login or signUp first!")
                } else{
                    try {
                    const {data}= await axios.post('/verifyToken',{token:getCookie('accessToken')})
                        if(data.valid==='true') {
                            const { data } = await axios.post('/paymentIntent',{amount:totalToPay,currency:'usd'})
                            const client_secret = data.client_secret
                            setClientSecretKey(client_secret);
                            setValidToken(true)
                            setIsLoading(false)
                        }
                        else{
                            setValidToken(false)
                            setIsLoading(false)
                            return toast.error('Invalid or expired token')
                        }
                    } catch (error) {
                        return error
                    }
                }
        }
        return () => getPaymentIntent()
    },[])

    const options = {
        clientSecret:clientSecretKey,
        // Fully customizable with appearance API.
        appearance: themeDesign,
        };
    

    return (
        isLoading ? <Loader />:
        validToken? 
        <div>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </div>
        :
        <div>
            <h1>Invalid Token</h1>
            <p>Please login again</p>
            <button onClick={()=>logout() && navigate('/')}>Login</button>
        </div>
        );
}