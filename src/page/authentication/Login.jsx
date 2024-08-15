import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const {
        signInUser,
        loading,
        setLoading,
        GoogleLogin
    } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            signInUser(email, password);
            toast.success('log in successfully')
            navigate('/');
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
        }
    }
    const handleGoogleLogin = async () => {
        try {
            GoogleLogin();
            toast.success('log in successfully')
            navigate('/');
            setLoading(false);
        }
        catch (err) {
            toast.error(err.message);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white rounded-2xl px-7 py-5">
                <span className="shadow-lg">Login to see our features</span>
                {/* <input name='' id="file" type="file" /> */}
                <label htmlFor=""></label>
                <input name='email' type="email" className="border-0 outline-none shadow-xl px-4 py-2 w-full focus:border-2 focus:border-solid focus:shadow-xl focus:rounded-2xl" placeholder="email" />
                <input name='password' type="password" className="border-0 outline-none shadow-xl px-4 py-2 w-full focus:border-2 focus:border-solid focus:shadow-xl focus:rounded-2xl" placeholder="password" />
                <span className="">Do not have an account ? <Link to={'/register'} className='btn btn-link'>Register</Link>
                </span>
                <input className='btn btn-outline btn-info' disabled={loading} type='submit' value='Register' />
            </form>
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-success" disabled={loading}><FcGoogle className='text-3xl' /> Join with Google</button>
        </div>
    );
};

export default Login;