import { Link, useNavigate } from 'react-router-dom';
import './register.css'
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import { FcGoogle } from "react-icons/fc";
import useAxiosCommon from '../../Hooks/useAxiosCommon';

const Register = () => {
    const {
        createUser,
        loading,
        setLoading,
        GoogleLogin
    } = useAuth();
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const username = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;

        const newUser = { email, displayName: username };
        try {
            const isThere = await axiosCommon.get(`/user/${email}`)
            if (isThere) {
                toast.error('user already exits');
                form.reset();
                navigate('/login');
                setLoading(false)
                return;
            }
            createUser(email, password);
            const { data } = await axiosCommon.post('/users', newUser);
            if (data.insertedId) {
                toast.success('user created');
                form.reset();
                navigate('/login')
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.message);
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await GoogleLogin();
            console.log(result);
            const isThere = await axiosCommon.get(`/user/${result?.user?.email}`)
            if (isThere) {
                navigate('/login');
                setLoading(false)
                return;
            }
            const displayName = result?.user?.displayName;
            const email = result?.user?.email;
            const newUser = { email, displayName };
            const { data } = await axiosCommon.post('/users', newUser);
            if (data.insertedId) {
                toast.success('user created');
                navigate('/login')
                setLoading(false)
            }
        }
        catch (err) {
            toast.error(err.message);
            setLoading(false)
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
                <span className="">Already have an account ? <Link to={'/login'} className='btn btn-link'>Sign in</Link>
                </span>
                <input className='btn btn-outline btn-info' disabled={loading} type='submit' value='Register' />
            </form>
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-success" disabled={loading}><FcGoogle className='text-3xl' /> Join with Google</button>
        </div>
    );
};

export default Register;