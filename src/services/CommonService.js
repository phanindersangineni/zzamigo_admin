import axios from 'axios';
//let apiurl = "http://43.204.36.226";
// let apiurl ="https://asseshub.com";
let apiurl = "http://localhost:8080";

//local


export const Signup = async (fields) => {
    return await axios.post(apiurl + "/api/v1/auth/signup", fields)
        .then((res) => {
            return res.data;
        }).catch((error) => {
            // window.location = "/";
            return error;
        });


}




export const LoginForm = async (fields) => {
    return await axios.post(apiurl + "/api/auth/login", fields)
        .then((res) => {
            return res.data;
        }).catch((error) => {
            // window.location = "/";
            return error;
        });


}


//change password
export const ChangeTenantPassword = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/auth/changetenantpassword", data, { 'headers': headers })
        .then((res) => {
            console.log("getting data", res.data);
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });

}


// Tenants

export const GetAllTenants = async (data) => {

    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/tenant/get", data, { 'headers': headers })

        .then((res) => {
            console.log("getting data", res.data);
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveTenants = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/tenant/save", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateTenants = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/tenant/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');

            window.location.reload();
            return error;
        });



}
export const DeleteTenants = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/tenant/delete", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });
}

// Area

//Logo

export const GetAllLogos = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    console.log(headers);
    return await axios.post(apiurl + "/api/v1/logo/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveLogos = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/logo/save", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });
}

export const UpdateLogos = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/logo/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const deletLogoImages = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/logo/delete", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

//SliderImages

export const GetAllBanner = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/banner/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}


export const SaveBanner = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/banner/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateBanner = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/banner/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}
export const DeleteBannerImage = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/banner/delete", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const forgotPasswordAdmin = async (fields) => {
    return await axios.post(apiurl + "/api/v1/auth/forgotpasswordadmin", fields)
        .then((res) => {
            return res.data;
        }).catch((error) => {
            // window.location = "/";
            return error;
        });


}

export const GetAllAdvertisements = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    console.log(headers);
    return await axios.post(apiurl + "/api/v1/advertisement/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveAdvertisement = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/advertisement/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateAdvertisement = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/advertisement/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const DeleteAdvertisement = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/advertisement/delete", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetCategory = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/category/get", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveCategory = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/category/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateCategory = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/category/update", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const GetAllStores = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/stores/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveStores = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/stores/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateStores = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/stores/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetAllAreas = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/areas/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveAreas = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/areas/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateAreas = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/areas/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetAllSubCategory = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/subcategory/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveSubCategory = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/subcategory/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateSubCategory = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/subcategory/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const DeleteSubCategory = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/subcategory/delete", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetAllStoreCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    console.log(headers);
    return await axios.post(apiurl + "/api/v1/storecharges/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveStoreCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/storecharges/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateStoreCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/storecharges/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const DeleteStoreCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,


    }
    return await axios.post(apiurl + "/api/v1/storecharges/delete", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetAllDrivers = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/drivers/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveDrivers = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/drivers/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const UpdateDrivers = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/drivers/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetAllItems = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/items/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveItems = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/items/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });

}

export const UpdateItems = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/items/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetAllDeliveryCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/deliverycharges/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveDeliveryCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/deliverycharges/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });

}

export const UpdateDeliveryCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/deliverycharges/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetAllComission = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/comission/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveComission = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/comission/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });

}

export const UpdateComission = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/comission/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const GetAllGlobalCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/globalcharges/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveGlobalCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/globalcharges/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });

}

export const UpdateGlobalCharges = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/globalcharges/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}


export const GetAllAddons = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/addons/get", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });


}

export const SaveAddons = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,



    }
    return await axios.post(apiurl + "/api/v1/addons/save", data, { 'headers': headers })
        .then((res) => {

            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            // window.location.reload();
            return error;
        });

}

export const UpdateAddons = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/addons/update", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


}

export const DeleteAddons = async (data) => {
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));

    const headers = {
        'content-type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'x-access-token': constuserdetails.accessToken,

    }
    return await axios.post(apiurl + "/api/v1/addons/delete", data, { 'headers': headers })
        .then((res) => {
            return res.data;
        }).catch((error) => {
            localStorage.removeItem('userDetails');
            window.location.reload();
            return error;
        });


} 

