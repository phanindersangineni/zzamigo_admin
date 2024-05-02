/// Menu
import Metismenu from "metismenujs";
import React, { Component, Suspense, lazy, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Dropdown, Modal } from "react-bootstrap";
//import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';
import ChangePassword from "./ChangePassword";

/// Image
//import user from "../../../images/user.jpg";

import profile from "../../../images/user.jpg";

import { sub } from "date-fns";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const [postModal, setPostModal] = useState(false);
  const [modaltype, setModalType] = useState(0);
  const [showsidebar, setShowsidebar] = useState(true);
  const [subadminbar, setSubAdminbar] = useState(true);
  const [admin, setAdmin] = useState(false)
  const [name, setName] = useState([])

  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));
    // console.log("constuserdetails",constuserdetails);
    setName(constuserdetails.name)



    if (constuserdetails.roles[0] == 'ROLE_ADMIN') {
      setAdmin(true)
    }



    if (constuserdetails.roles[0] != 'ROLE_ADMIN') {
      setShowsidebar(false);
    }

    if (constuserdetails.roles[0] == 'ROLE_SUBADMIN') {
      setShowsidebar(true);
      setSubAdminbar(false)
    }

    //sidebar icon Heart blast


  }, []);
  //let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
    "",
    "dashboard-dark",
    "wallet",
    "invoices-list",
    "create-invoices",
    "card-center",
    "transaction-details",
    "task",
  ],
    app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    email = ["email-compose", "email-inbox", "email-read"],
    shop = [
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "ecom-product-detail",
    ],
    charts = [
      "chart-rechart",
      "chart-flot",
      "chart-chartjs",
      "chart-chartist",
      "chart-sparkline",
      "chart-apexchart",
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",

      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ],
    redux = [
      "redux-form",
      "redux-wizard",
      "todo",
    ],
    widget = ["widget-basic"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      "form-pickers",
      "form-validation-jquery",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];

  const openModal = async (type) => {
    setModalType(type);
    setPostModal(true);
  }
  return (
    <>
      <div
        className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
          sidebarLayout.value === "horizontal" &&
          headerposition.value === "static"
          ? 100 > 120
            ? "fixed"
            : ""
          : ""
          }`}
      >
        <PerfectScrollbar className="dlabnav-scroll">
          <Dropdown className="dropdown header-profile2">
            <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
              <div className="header-info2 d-flex align-items-center border">
                <img src={profile} width={20} alt="" />
                <div className="d-flex align-items-center sidebar-info">
                  {admin ? <div>
                    <span className="font-w700 d-block mb-2">Zzamigo</span>
                    <small className="text-end font-w400">Super Admin</small>
                  </div> : <div>
                    <span className="font-w700 d-block mb-2">{name}</span>
                    <small className="text-end font-w400">Sub Admin</small>
                  </div>}
                  <i className="fas fa-sort-down ms-4"></i>
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right" className=" dropdown-menu dropdown-menu-center">
              <LogoutPage />
              <ChangePassword />
            </Dropdown.Menu>
          </Dropdown>
          <MM className="metismenu" id="menu">
            {/* <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="/dashboard" >
                <i className="fas fa-home"></i>
                <span className="nav-text">Dashboard</span>
              </Link>

            </li> */}

            {subadminbar && <li className={`${app.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="#" >
                <i className="fas fa-home"></i>
                <span className="nav-text">Adminstration</span>
              </Link>
              <ul >
                <li><Link className={`${path === "tenants" ? "mm-active" : ""}`}
                  to="/tenants">Tenant</Link></li>

                <li><Link className={`${path === "banner" ? "mm-active" : ""}`}
                  to={"/banner"} >Banner</Link></li>
                <li><Link className={`${path === "advertisement" ? "mm-active" : ""}`}
                  to={"/advertisement"} >Advertisement</Link></li>
                    <li><Link className={`${path === "intro" ? "mm-active" : ""}`}
                  to={"/intro"} >Intro</Link></li>

              

                {/* {showsidebar && <>   <li><Link className={`${path === "tenants" ? "mm-active" : ""}`}
                  to="/tenants">Tenant</Link></li>


                  <li><Link className={`${path === "coupons" ? "mm-active" : ""}`}
                    to="/coupons">Coupons</Link></li></>} */}



                {/* <li><Link className={`${path === "banners" ? "mm-active" : ""}`}
                  to={"/banners"} >Banner</Link></li>

                <li><Link className={`${path === "bannerwebs" ? "mm-active" : ""}`}
                  to={"/bannerwebs"} >Banner Web</Link></li>

                <li><Link className={`${path === "logos" ? "mm-active" : ""}`}
                  to={"/logos"} >Logo</Link></li>
                <li><Link className={`${path === "events" ? "mm-active" : ""}`}
                  to={"/events"} >Event</Link></li> */}



              </ul>
            </li>}

            {subadminbar && <li className={`${app.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow" to="#" >
                <i className="fas fa-home"></i>
                <span className="nav-text">Stores</span>
              </Link>
              <ul >
                <li><Link className={`${path === "category" ? "mm-active" : ""}`}
                  to={"/category"} >Category</Link></li>
                <li><Link className={`${path === "areas" ? "mm-active" : ""}`}
                  to={"/areas"} >Areas</Link></li>
                <li><Link className={`${path === "stores" ? "mm-active" : ""}`}
                  to={"/stores"} >Stores</Link></li>
                <li><Link className={`${path === "subcategory" ? "mm-active" : ""}`}
                  to={"/subcategory"} >Sub Category</Link></li>
                <li><Link className={`${path === "storecharges" ? "mm-active" : ""}`}
                  to={"/storecharges"} >Store Charges</Link></li>
                <li><Link className={`${path === "drivers" ? "mm-active" : ""}`}
                  to={"/drivers"} >Drivers</Link></li>
                <li><Link className={`${path === "storeitems" ? "mm-active" : ""}`}
                  to={"/storeitems"} >Store Items</Link></li>
                <li><Link className={`${path === "deliverycharges" ? "mm-active" : ""}`}
                  to={"/deliverycharges"} >Delivery Charges</Link></li>
                <li><Link className={`${path === "comission" ? "mm-active" : ""}`}
                  to={"/comission"} >Comission</Link></li>
                <li><Link className={`${path === "globalcharges" ? "mm-active" : ""}`}
                  to={"/globalcharges"} >Global Charges</Link></li>

               


              </ul>
            </li>}

            {/*============== Masters =============*/}







          </MM>
          <div className="copyright">
            <p><strong>Zzamigo </strong> © 2023 All Rights Reserved</p>
            <p className="fs-12">Made with  by zzamigo</p>
          </div>
        </PerfectScrollbar>
      </div>
      <Modal className="modal fade" size="xl" show={postModal} onHide={setPostModal} >
        <div className="" role="document">
          <div className="">
            <form >
              <div className="modal-header">

                <button type="button" className="btn-close" onClick={() => setPostModal(false)} data-dismiss="modal"></button>
              </div>
              <div className="modal-body">

                {
                  modaltype === 1 ? (
                    <Suspense fallback={<div>Loading</div>}>
                      {/* <Tenants /> */}
                    </Suspense>
                  )
                    : null
                }
              </div>

              {/*<div className="modal-footer">
                              <button type="submit" className="btn btn-primary" >Add</button>  
                              <button type="button" onClick={()=> setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
</div>*/}
            </form>

          </div>
        </div>
      </Modal>
    </>
  );
};

export default SideBar;
