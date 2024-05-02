import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';

// image
import logo from "../../images/logo-white.png";
import logoWhite from "../../images/logo-whiite-text.png";
import loginbg from "../../images/bg-login.jpg";
import { ToastContainer, toast } from 'react-toastify';
import { forgotPasswordAdmin } from '../../services/CommonService';

function Login(props) {
  const notifyTopFullWidth = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const [email, setEmail] = useState('demo@example.com');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('123456');

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }
  const forgotpassword = async () => {
    if (email === '') {
      notifyTopFullWidth("Email is Required");
    } else {
      const reqparams = {
        email: email
      }
      const ResponseData = await forgotPasswordAdmin(reqparams)
      // console.log("Responsedata===",ResponseData.data);
      if (ResponseData.data == 'USER_NON_EXISTS') {
        notifyTopFullWidth("Invalid email")
      } else {
        const result = window.confirm('Temporary password has been sent to your registered email id , Please login and change your password');
      }
    }

  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="login-main-page" style={{ backgroundImage: "url(" + loginbg + ")" }}>
        <div className="login-wrapper">
          <div className="login-aside-left" >

            <div className="login-description">
              <h2 className="main-title mb-2">Welcome To Zzamigo</h2>
              <p className="">VisualpathIT , The IT Hub leader in industry, offers diversified IT services, learning management and training solutions to IT professionals, institutions, and incumbents across the latest technical domain spaces.VisualpathIT pvt ltd has institute visualpath which ranks best among the leading training institutes</p>
              <ul className="social-icons mt-4">
                <li><Link to={"#"}><i className="fab fa-facebook-f"></i></Link></li>
                <li><Link to={"#"}><i className="fab fa-twitter"></i></Link></li>
                <li><Link to={"#"}><i className="fab fa-linkedin-in"></i></Link></li>
              </ul>
              <div className="mt-5 bottom-privacy">
                <Link to={"#"} className="mr-4">Privacy Policy</Link>
                <Link to={"#"} className="mr-4">Contact</Link>
                <Link to={"#"} className="">© 2024 Zzamigo.com</Link>
              </div>
            </div>
          </div>
          <div className="login-aside-right">
            <div className="row m-0 justify-content-center h-100 align-items-center">
              <div className="p-5">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form-1">
                        <div className="mb-4">
                          <h3 className="dz-title mb-1">Sign in</h3>
                          <p className="">Sign in by entering information below</p>
                        </div>
                        {props.errorMessage && (
                          <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                            {props.errorMessage}
                          </div>
                        )}
                        {props.successMessage && (
                          <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                            {props.successMessage}
                          </div>
                        )}
                        <form onSubmit={onLogin}>
                          <div className="form-group">
                            <label className="mb-2 ">
                              <strong>Email</strong>
                            </label>
                            <input type="email" className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Type Your Email Address"
                            />
                            {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                          </div>
                          <div className="form-group">
                            <label className="mb-2 "><strong>Password</strong></label>
                            <input
                              type="password"
                              className="form-control"
                              value={password}
                              placeholder="Type Your Password"
                              onChange={(e) =>
                                setPassword(e.target.value)
                              }
                            />
                            {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                          </div>
                          <div className="form-row d-flex justify-content-between mt-4 mb-2">
                            <div className="form-group">
                              <div className="form-check custom-checkbox ml-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="basic_checkbox_1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="basic_checkbox_1"
                                >
                                  Remember my preference
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Sign In
                            </button>
                          </div>
                        </form>
                        <div className="new-account mt-2">
                          <p className="">
                            Don't have an account?{" "}
                            <Link className="text-primary" to="./page-register">
                              Sign up
                            </Link>
                          </p>
                        </div>
                        <div className="text-center fw-bold fs-6 text-primary">
                          <label onClick={forgotpassword} class="forgot-password">Forgot Password</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
