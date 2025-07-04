import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import UseAuth from '../../../Hooks/UseAuth';


const Login = () => {
    const { signIn } = UseAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/'
    

    const onSubmit = data => {
        signIn(data.email, data.password)
        .then(result => {
            console.log(result.user);
            navigate(from);
        })
        .catch(error => console.log(error))
       

    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
            <div className="card-body">

                <h1 className="text-3xl font-bold text-secondary text-center">Please log In</h1>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input type="email" {...register('email')} className="input" placeholder="Email" autoComplete="off" />

                        <label className="label">Password</label>
                        <input type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input" placeholder="Password" autoComplete="new-password" />
                        {/* for handeling errors */}
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary mt-4 w-auto text-secondary">Login</button>

                    </fieldset>
                    <p><small>New to this website? <Link to="/register" className='text-green-700 font-bold btn btn-link' >Register</Link> </small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default Login;