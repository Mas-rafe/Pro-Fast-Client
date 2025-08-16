import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const formDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      console.log('Fetched payments:', res.data);
      return res.data;
    }
  })
  console.log('Payments from useQuery:', payments); // ✅ Check final payments

  if (isPending) {
    return '...loading'
  }
  return (
     <div className="p-4">
    <h2 className="text-xl font-semibold text-center mb-4">Payment History</h2>

    {payments?.length === 0 && (
      <p className="text-center text-gray-500">No payment records found.</p>
    )}

    {payments.length > 0 && (
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="text-sm">
                <td>{index + 1}</td>
                <td>{payment.parcelId}</td>
                <td>৳{payment.amount}</td>
                <td>{payment.transactionId || 'N/A'}</td>
                <td>{formDate(payment.paid_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
};

export default PaymentHistory;