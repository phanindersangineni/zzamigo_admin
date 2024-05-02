import { Link } from "react-router-dom"
const DoctorDetails =() =>{
 return (
    <>
    <div className="col-xl-12">
                <div className="card">
                    <div className="card-body pb-3">
                        <div className="row align-items-center">
                            <div className="col-xl-3 mb-3">
                                <p className="mb-2 fs-16 font-w600">Doctor Details</p>
                                <h2 className="mb-0 fs-32 font-w800">Teju</h2>
                            </div>
                            <div className="col-xl-9 d-flex flex-wrap justify-content-between align-items-center">
                                <div className="d-flex me-3 mb-3 ms-2 align-items-start payment">
                                    <i className="fas fa-phone-alt me-4 mt-2 scale5"></i>
                                    <div>
                                        <p className="mb-2 fs-16 font-w600">Telephone</p>
                                        <h4 className="mb-0 fs-18 font-w700">+ 91-88727277</h4>
                                    </div>
                                </div>
                                <div className="d-flex me-3 mb-3 ms-2 align-items-start payment">
                                    <i className="fas fa-envelope scale5 me-4 mt-2"></i>
                                    <div>
                                        <p className="mb-2 fs-16 font-w600">Email</p>
                                        <h4 className="mb-0 fs-18 font-w700">svasthaa.tg@gmail.com</h4>
                                    </div>
                                </div>
                                <div className="d-flex mb-3">
                                    <Link to={"#"} className="btn btn-primary">
                                        <i className="las la-download scale5 me-3">
                                            </i>Update</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-body pb-3 transaction-details d-flex flex-wrap justify-content-between align-items-center">
                        <div className="me-3 mb-3">
                            <p className="mb-2">Experience</p>
                            <h4 className="mb-0">5 years</h4>
                        </div>
                        <div className="me-3 mb-3">
                            <p className="mb-2">Consultancy Fees</p>
                            <h4 className="mb-0">Rs 500</h4>
                        </div>
                        <div className="me-3 mb-3">
                            <p className="mb-2">Availability</p>
                            <h4 className="mb-0">9:00 am -12:00 pm</h4>
                        </div>
                        <div className="me-3 mb-3">
                            <p className="mb-2">Speciality</p>
                            <h4 className="mb-0">Dietician</h4>
                        </div>
                        <div className="me-3 mb-3">
                            <p className="mb-2">Services</p>
                            <h4 className="mb-0">Diet Treatment ,Pregancy Treatment</h4>
                        </div>
                       <div className="amount-bx mb-3 border">
                            <div>
                                <p className="mb-1">Service At</p>
                                <h3 className="mb-0">hospital name</h3>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
    </>
 )

}
export default DoctorDetails
