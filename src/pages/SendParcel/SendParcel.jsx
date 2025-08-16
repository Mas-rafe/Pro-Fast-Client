import React, { useEffect, } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const generateTrackingId = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "")
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};
const SendParcel = () => {
  const warehouses = useLoaderData();
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  // Reset service center fields when region changes
  useEffect(() => {
    setValue("senderServiceCenter", "");
  }, [senderRegion, setValue]);

  useEffect(() => {
    setValue("receiverServiceCenter", "");
  }, [receiverRegion, setValue]);

  const onSubmit = (data) => {
    let baseCost = 0;
    let breakdown = "";

    const sameDistrict = data.senderRegion === data.receiverRegion;
    const isDocument = data.type === "document";

    if (isDocument) {
      baseCost = sameDistrict ? 60 : 80;
      breakdown = `Parcel Type: Document<br/>${sameDistrict ? 'Within' : 'Outside'} District: ৳${baseCost}`;
    } else {
      const weight = Number(data.weight);
      if (weight <= 3) {
        baseCost = sameDistrict ? 110 : 150;
        breakdown = `Parcel Type: Non-Document<br/>Weight: ${weight}kg<br/>${sameDistrict ? 'Within' : 'Outside'} District: ৳${baseCost}`;
      } else {
        const extraWeight = weight - 3;
        const base = sameDistrict ? 110 : 150;
        const extra = extraWeight * 40;
        const distanceCharge = sameDistrict ? 0 : 40;
        baseCost = base + extra + distanceCharge;
        breakdown = `
          Parcel Type: Non-Document<br/>
          Weight: ${weight}kg<br/>
          Base (${sameDistrict ? "Within" : "Outside"} District): ৳${base}<br/>
          Extra Weight Charge (${extraWeight}kg x ৳40): ৳${extra}<br/>
          ${!sameDistrict ? "Outside District Fee: ৳40<br/>" : ""}
        `;
      }
    }

    Swal.fire({
      title: 'Confirm Delivery Cost',
      html: `
        ${breakdown}<br/>
        <strong>Total Cost: <span style="color: green">৳${baseCost}</span></strong>
      `,
      icon: 'info',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Proceed to Payment',
      cancelButtonText: 'Edit Info',
      denyButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        onConfirm(data, baseCost);
      } else if (result.isDenied) {
        // Cancelled — don't reset
        Swal.fire("Cancelled", "You can still proceed later.", "info");
      }
      // If edit, do nothing
    });
  };

  const onConfirm = (data, cost) => {
    const parcelData = {
      ...data,
      cost,
      created_by: user.email,
      payment_status: 'unpaid',
      delivery_status: 'not_collected',
      trackingId: generateTrackingId(),
      creation_date: new Date().toISOString()
    };
    console.log("Saving to DB:", parcelData);

    axiosSecure.post('/parcels', parcelData)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          //TODO: redirect to the payment page or trigger a payment modal
          Swal.fire({
            title: 'Redirecting!',
            text: 'Proceeding to payment gateway',
            icon: 'success',
            timer:1500,
            // confirmButtonText:false
          });
        }

      })
    //save data to the server




    reset();
  };

  const regions = [...new Set(warehouses.map(w => w.region))];

  const getCenters = (region) => {
    const found = warehouses.find(w => w.region === region);
    return found && Array.isArray(found.covered_area)
      ? found.covered_area.map(area => ({ area, district: found.district }))
      : [];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 p-4 max-w-5xl mx-auto lg:border-2 border-secondary my-4 rounded-tl-2xl rounded-br-2xl">
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold text-secondary text-center">Parcel Info</legend>
        <div className="bg-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 border border-secondary p-3 py-4 rounded-2xl">
          <div>
            <label className="label">Type</label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2">
                <input type="radio" value="document" {...register("type", { required: true })} className="radio radio-primary" />
                <span>Document</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="non-document" {...register("type", { required: true })} className="radio radio-primary" />
                <span>Non-Document</span>
              </label>
            </div>
            {errors.type && <p className="text-red-500 text-sm mt-1">Type is required</p>}
          </div>

          <div>
            <label className="label">Parcel Name</label>
            <input {...register("name", { required: true })} className="input input-bordered w-full" />
            {errors.name && <p className="text-red-500 text-sm">Parcel name is required</p>}
          </div>

          {parcelType === "non-document" && (
            <div>
              <label className="label">Weight (kg)</label>
              <input type="number" {...register("weight", { required: true })} className="input input-bordered w-full" />
              {errors.weight && <p className="text-red-500 text-sm">Weight is required for non-documents</p>}
            </div>
          )}
        </div>
      </fieldset>

      <div className="md:flex lg:flex gap-2 justify-center">
        {/* Sender Info */}
        <fieldset className="space-y-4 w-full">
          <legend className="text-xl font-semibold text-secondary text-center">Sender Info</legend>
          <div className="bg-gray-100 gap-4 border border-secondary p-3 rounded-2xl">
            <div>
              <label className="label">Name</label>
              <input {...register("senderName", { required: true })} className="input input-bordered w-full" defaultValue="Current User" />
              {errors.senderName && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Contact</label>
              <input {...register("senderContact", { required: true })} className="input input-bordered w-full" />
              {errors.senderContact && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Region</label>
              <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              {errors.senderRegion && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Service Center</label>
              <select {...register("senderServiceCenter", { required: true })} key={senderRegion} className="select select-bordered w-full">
                <option value="">Select Center</option>
                {getCenters(senderRegion).map(({ area, district }) => (
                  <option key={area} value={area}>{area} ({district})</option>
                ))}
              </select>
              {errors.senderServiceCenter && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Address</label>
              <textarea {...register("senderAddress", { required: true })} className="textarea textarea-bordered w-full" />
              {errors.senderAddress && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Pick-up Instruction</label>
              <textarea {...register("pickupInstruction", { required: true })} className="textarea textarea-bordered w-full" />
              {errors.pickupInstruction && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>
        </fieldset>

        {/* Receiver Info */}
        <fieldset className="space-y-4 w-full">
          <legend className="text-xl font-semibold text-secondary text-center">Receiver Info</legend>
          <div className="bg-gray-100 gap-4 border border-secondary p-3 rounded-2xl">
            <div>
              <label className="label">Name</label>
              <input {...register("receiverName", { required: true })} className="input input-bordered w-full" />
              {errors.receiverName && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Contact</label>
              <input {...register("receiverContact", { required: true })} className="input input-bordered w-full" />
              {errors.receiverContact && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Region</label>
              <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              {errors.receiverRegion && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Service Center</label>
              <select {...register("receiverServiceCenter", { required: true })} key={receiverRegion} className="select select-bordered w-full">
                <option value="">Select Center</option>
                {getCenters(receiverRegion).map(({ area, district }) => (
                  <option key={area} value={area}>{area} ({district})</option>
                ))}
              </select>
              {errors.receiverServiceCenter && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Address</label>
              <textarea {...register("receiverAddress", { required: true })} className="textarea textarea-bordered w-full" />
              {errors.receiverAddress && <p className="text-red-500 text-sm">Required</p>}
            </div>
            <div>
              <label className="label">Delivery Instruction</label>
              <textarea {...register("deliveryInstruction", { required: true })} className="textarea textarea-bordered w-full" />
              {errors.deliveryInstruction && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>
        </fieldset>
      </div>

      <div className="text-center mt-6">
        <button className="btn btn-primary text-secondary w-40">Calculate Cost</button>
      </div>
    </form>
  );
};

export default SendParcel;