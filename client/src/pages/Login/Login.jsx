<<<<<<< HEAD
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
=======
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
>>>>>>> cfb4f8b2d1b4217a228999654d77fba60ce3bf63
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
=======
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();
    const { storeTokenInLS, API } = useAuth();
>>>>>>> cfb4f8b2d1b4217a228999654d77fba60ce3bf63

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLS(data.token);
        setUser({
          email: "",
          password: "",
        });
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.log(error);
    }
<<<<<<< HEAD
  };
  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <h1 className="AccHeading">Sign In</h1>
            <div className="inputs">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="input"
                autoComplete="off"
                required
              />
              <div className="passwordFiled">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Password"
                  className="input password"
                  required
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    className="eyeIcon"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaRegEye
                    className="eyeIcon"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
=======

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);

        try {
            const response = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                storeTokenInLS(data.token);
                setUser({
                    email: "",
                    password: "",
                })
                toast.success('Login Successful');
                navigate("/");
            } else {
                toast.error("Login Failed");
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
                        <h1 className="AccHeading">Login Account</h1>
                        <div className="inputs">
                            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="input" autoComplete="off" required />
                           <div className='passwordFiled'>
                                <input type={showPassword ? "text" : "password"} name='password' value={user.password} onChange={handleChange} autoComplete='off' placeholder='Password' className='input password' required />
                                {showPassword ? (
                                    <FaRegEyeSlash className='eyeIcon' onClick={togglePasswordVisibility} />
                                ) : (
                                    <FaRegEye className='eyeIcon' onClick={togglePasswordVisibility} />
                                )}
                            </div>
                        </div>
                        <button type='submit' className="button">Continue</button>
                        <p className='registerLink'>Doesn’t have an account yet? <Link to="/register" className='register'>Sign up</Link></p>
                    </div>
                </form>
>>>>>>> cfb4f8b2d1b4217a228999654d77fba60ce3bf63
            </div>
            <button type="submit" className="button">
              Continue
            </button>
            <p className="registerLink">
              Doesn’t have an account yet?{" "}
              <Link to="/register" className="register">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login
>>>>>>> cfb4f8b2d1b4217a228999654d77fba60ce3bf63
