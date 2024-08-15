import { Link } from 'react-router-dom';
import './register.css'
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import { FcGoogle } from "react-icons/fc";
import useAxiosCommon from '../../Hooks/useAxiosCommon';

const Register = () => {
    const {
        createUser,
        // loading,
        // setLoading,
        GoogleLogin
    } = useAuth();
    const axiosCommon = useAxiosCommon();
    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const username = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(username, email, password);

        const newUser = { email, password, displayName: username };
        console.log(newUser);
        try {
            createUser(email, password);
            const { data } = await axiosCommon.post('/users', newUser);
            console.log(data);
            if (data.insertedId) {
                toast.success('user created');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            GoogleLogin();

        }
        catch (err) {
            toast.error(err.message);
            console.log(err.message);
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white rounded-2xl px-7 py-5">
                <span className="shadow-lg">Register to join out family</span>
                {/* <input name='' id="file" type="file" /> */}
                <label htmlFor=""></label>
                <label htmlFor="userName">Username</label>
                <input name='userName' type="text" className="border-0 outline-none shadow-xl px-4 py-2 w-full focus:border-2 focus:border-solid focus:shadow-xl focus:rounded-2xl" placeholder="username" />
                <input name='email' type="email" className="border-0 outline-none shadow-xl px-4 py-2 w-full focus:border-2 focus:border-solid focus:shadow-xl focus:rounded-2xl" placeholder="email" />
                <input name='password' type="password" className="border-0 outline-none shadow-xl px-4 py-2 w-full focus:border-2 focus:border-solid focus:shadow-xl focus:rounded-2xl" placeholder="password" />
                <span className="">Already have an account ? <Link className='btn btn-link'>Sign in</Link>
                </span>
                <input className='btn btn-outline btn-info' type='submit' value='Register' />
            </form>
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-success"><FcGoogle className='text-3xl' /> Join with Google</button>
        </div>
    );
};

export default Register;