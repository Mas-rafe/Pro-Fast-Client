import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import UseAxios from '../../../Hooks/UseAxios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = UseAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = UseAxios();



    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then( async(result) => {
                console.log(result.user);
                
                //update userinfo in the database
                const userinfo = {
                    email: data.email,
                    role: 'user',//default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                 const userRes = await axiosInstance.post('/users',userinfo);
                 console.log(userRes.data);
                 

                //update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name pic updated')
                    })
                    .catch(error => {
                        console.log(error);

                    })

            })
            .catch(error => {
                console.log(error);

            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadUrl, formData)

        console.log(res.data);

        setProfilePic(res.data.data.url);

    }


    return (


        <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
            <div className="card-body">

                <h1 className="text-3xl font-bold">Create An Account</h1>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <fieldset className="fieldset">

                        {/* Name field */}
                        <label className="label">Your Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input" placeholder="Your Name" autoComplete="off" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Name is Required</p>
                        }

                        {/* Photo urlfield */}
                        <label className="label">Photo Url</label>
                        <input type="file" onChange={handleImageUpload}

                            className="input" placeholder="Your Profile Picture" autoComplete="off" />


                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input" placeholder="Email" autoComplete="off" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email Required</p>
                        }
                        {/* password field */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" autoComplete="new-password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }

                        <button className="btn btn-primary text-secondary mt-4">Register</button>
                    </fieldset>
                    <p><small>Already have an account? <Link to="/login" className='text-green-700 font-bold btn btn-link' >Login</Link> </small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default Register;