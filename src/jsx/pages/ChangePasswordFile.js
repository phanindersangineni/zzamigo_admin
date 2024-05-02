import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import logo from "../../images/logo-white.png";
import logoWhite from "../../images/logo-whiite-text.png";
import loginbg from "../../images/bg-login.jpg";
import { changepasswordaction, checknewconfirmpassword} from '../../store/actions/AuthActions';
function ChangePasswordFile(props) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    let errObj = {currentPassword:"",newPassword:"",confirmPassword:""};
    const [errors, setErrors] = useState(errObj)
    const [cantChange,setCantChange] = useState(false)

    const dispatch = useDispatch();
    function onChangePassword(e){
        e.preventDefault();
        let error = false;
        const errorObj = {...errObj}
        if(currentPassword===""){
            errorObj.currentPassword="Current Password Required"
            error = true
        }
        if(newPassword===""){
            errorObj.newPassword = "New Password Required"
            error = true
        }
        if(confirmPassword===""){
            errorObj.confirmPassword="Confirm Password Required"
            error = true
        }
        setErrors(errorObj)
        if (error) {
			return ;
		}
    if(newPassword===confirmPassword){
      dispatch(changepasswordaction(currentPassword, newPassword, newPassword, props.history))
    }
    else{
      setCantChange(true)
      setTimeout(()=>{
        setCantChange(false)
      },5000)
    }
    // dispatch(checknewconfirmpassword( newPassword,confirmPassword))
    }
  return (
    <div className="login-main-page" style={{backgroundImage:"url("+ loginbg +")"}}>
    <div className="login-wrapper">
        {/* <div className="login-aside-left" >
            
            <div className="login-description">
                <h2 className="main-title mb-2">Welcome To VisualPath</h2>
                <p className="">VisualpathIT , The IT Hub leader in industry, offers diversified IT services, learning management and training solutions to IT professionals, institutions, and incumbents across the latest technical domain spaces.VisualpathIT pvt ltd has institute visualpath which ranks best among the leading training institutes</p>
                <ul className="social-icons mt-4">
                    <li><Link to={"#"}><i className="fab fa-facebook-f"></i></Link></li>
                    <li><Link to={"#"}><i className="fab fa-twitter"></i></Link></li>
                    <li><Link to={"#"}><i className="fab fa-linkedin-in"></i></Link></li>
                </ul>
                <div className="mt-5 bottom-privacy">
                    <Link to={"#"} className="mr-4">Privacy Policy</Link>
                    <Link to={"#"} className="mr-4">Contact</Link>
                    <Link to={"#"} className="">© 2023 visualpathedu.com</Link>
                </div>
            </div>
        </div> */}
        {/* <div className="login-aside-right"> */}
            <div className="row m-0 justify-content-center h-100 align-items-center">
              <div className="p-5">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form-1 " style={{margin:"0px 150px"}}>
                        <div className="mb-4">
                            <h3 className="dz-title mb-1">Change Password</h3>
                            <p className="">Change Password entering information below</p>
                           {cantChange&& <p style={{color:"red"}}>New Password and Current Password should match</p>}
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
                        <form onSubmit={onChangePassword}>
                            <div className="form-group">
                                <label className="mb-2 ">
                                  <strong>current Password</strong>
                                </label>
                                <input type="password" className="form-control"
                                  value={currentPassword}
                                   onChange={(e) => setCurrentPassword(e.target.value)}
                                   placeholder="Type Current Password"
                                />
                              {errors.currentPassword && <div className="text-danger fs-12">{errors.currentPassword}</div>}
                            </div>
                            <div className="form-group">
                                <label className="mb-2 ">
                                  <strong>New Password</strong>
                                </label>
                                <input type="password" className="form-control"
                                  value={newPassword}
                                   onChange={(e) => setNewPassword(e.target.value)}
                                   placeholder="Type New Password"
                                />
                              {errors.newPassword && <div className="text-danger fs-12">{errors.newPassword}</div>}
                            </div>

                            <div className="form-group">
                                <label className="mb-2 ">
                                  <strong>Confirm Password</strong>
                                </label>
                                <input type="password" className="form-control"
                                  value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   placeholder="Type confirm Password"
                                />
                              {errors.confirmPassword && <div className="text-danger fs-12">{errors.confirmPassword}</div>}
                            </div>
                      
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                             Change Password
                            </button>
                          </div>
                        </form>
                        <div className="new-account mt-2">
                          <p className="">
                           
                            <Link className="text-primary" to="/">
                              Back to home?
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        {/* </div> */}
    </div>
</div>
  )
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.cngpass.errorMessage,
        successMessage: state.cngpass.successMessage,
    };
};
export default connect(mapStateToProps)(ChangePasswordFile);