import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';




const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const [error, setError] = useState('');

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    if (isPending) {
        return '...loading'
    }
    console.log(parcelInfo);
    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    console.log(amountInCents);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        //step:1 validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message);

        }
        else {
            setError('');
            console.log('payment method', paymentMethod);
        }

        //step-2: create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })

        const clientSecret = res.data.clientSecret;

        //step-3: confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
                console.log(result);
                //step-4: mark parcel paid also create payment history
                const paymentData = {
                    parcelId,
                    userEmail: user.email,
                    amount,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types
                }
                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if (paymentRes.data.insertedId) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: 'Your payment has been processed successfully.',
                        confirmButtonText: 'OK',
                    });

                }
            }
        }


        console.log('res form intent', res);


        console.log('res form intent', res);

    }

    return (
        <div className='my-auto justify-center'>
            <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className='p-2 border rounded' />
                <button type='submit' className='btn btn-primary text-secondary w-full' disabled={!stripe}>Pay ${amount}</button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;