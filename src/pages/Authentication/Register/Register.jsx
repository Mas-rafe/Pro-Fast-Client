import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit,formState:{errors} } = useForm();
    const { createUser } = UseAuth();


    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result=>{
            console.log(result.user);
         })
         .catch(error => {
            console.log(error);
            
         })
    }




    return (


        <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
            <div className="card-body">

                <h1 className="text-3xl font-bold">Create An Account</h1>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input type="email" 
                        {...register('email',{required:true})}
                         className="input" placeholder="Email" autoComplete="off"/>
                         {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email Required</p>
                         }

                        <label className="label">Password</label>
                        <input type="password" {...register('password',{required:true,minLength:6})} className="input" placeholder="Password" autoComplete="new-password" />
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