
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import {useCartStore} from "../../store/shoppingCartStore"


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NxWZcLXoKZYYBLlqdLbDjkjkwYKPcM41zGJ4q3Sd0k3Fq0vo7Y0MROPgCP09i5a4xP9MdrkJpcQoEP1iT6kvQ52005i9Ru5cN');

export default function Stripe() {
    const [clientSecretKey,setClientSecretKey] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const {totalToPay} = useCartStore()

    const themeDesign = {
        theme: 'night',
        labels: 'floating'
        }


    useEffect(() => {
        const getPaymentIntent = async() => {
        const { data } = await axios.post('/paymentIntent',{amount:totalToPay,currency:'usd'})
        const client_secret = data.client_secret
        setClientSecretKey(client_secret);
        setIsLoading(false)
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
        <div>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </div>
        );
}