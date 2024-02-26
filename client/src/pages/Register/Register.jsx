import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify';

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    const { storeTokenInLS, API } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);

        try {
            const response = await fetch(`${API}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            })

            const data = await response.json();
            // console.log(data);

            if (response.ok) {
                storeTokenInLS(data.token);
                setUser({
                    username: "",
                    email: "",
                    password: ""
                })
                toast.success('Registration Successful');
                navigate("/");
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <h1 className="AccHeading">Create Account</h1>
                        <div className="inputs">
                            <input type="text" name="username" placeholder="Name" className="input" value={user.username} onChange={handleInput} autoComplete="off" required />
                            <input type="email" name="email" placeholder="Email" className="input" value={user.email} onChange={handleInput} autoComplete="off" required />
                            <div className='passwordFiled'>
                                <input type={showPassword ? "text" : "password"} name='password' value={user.password} onChange={handleInput} autoComplete='off' placeholder='Password' className='input password' required />
                                {showPassword ? (
                                    <FaRegEyeSlash className='eyeIcon' onClick={togglePasswordVisibility} />
                                ) : (
                                    <FaRegEye className='eyeIcon' onClick={togglePasswordVisibility} />
                                )}
                            </div>
                        </div>
                        <button type='submit' className="button">Continue</button>
                        <p className='loginLink'>Already have an account? <Link to="/login" className='login'>Sign in instead</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
