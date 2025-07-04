import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [] ,refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    console.log(parcels);

    const handleView = (id) => {
        console.log("Viewing:", id);
        // Navigate to details page or modal
    };

    const handlePay = (id) => {
        console.log("Paying for:", id);
        navigate(`/dashboard/payment/${id}`)
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (confirm.isConfirmed) {
            try {


                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: 'Deleted',
                                text: "Parcel has been deleted",
                                icon: 'success',
                                timer:1500,
                                
                            });
                        }
                        refetch();
                    })




            } catch (error) {
                console.error(error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };



    return (
        <div className="overflow-x-auto mt-6">
            <table className="table table-zebra w-full border border-gray-300 rounded-lg">
                {/* Table Header */}
                <thead className="bg-gray-100">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost (৳)</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.name}</td>
                            <td className="capitalize">{parcel.type.replace('-', ' ')}</td>
                            <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                            <td>৳{parcel.cost}</td>
                            <td>
                                <span
                                    className={`badge px-4 py-2 text-white ${parcel.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                >
                                    {parcel.payment_status}
                                </span>
                            </td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => handleView(parcel)}
                                    className="btn btn-sm btn-outline btn-info"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handlePay(parcel)}
                                    disabled={parcel.payment_status === 'paid'}
                                    className="btn btn-sm btn-outline btn-success"
                                >
                                    Pay
                                </button>
                                <button
                                    onClick={() => handleDelete(parcel._id)}
                                    className="btn btn-sm btn-outline btn-error"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {parcels.length === 0 && (
                        <tr>
                            <td colSpan="6" className='py-6'>No parcels found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;