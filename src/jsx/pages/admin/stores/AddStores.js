import React, { useEffect, useRef, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer, toast } from "react-toastify";
import { GetAllAreas, GetCategory, SaveCategory, SaveStores, UpdateCategory, UpdateStores } from '../../../../services/CommonService';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import { Accordion, Button, Table } from 'react-bootstrap';
import L, { Icon } from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import customIconUrl from './placeholder.png';
const AddStores = ({ tenantprops, updateprop }) => {

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
    const [selected, setSelected] = useState([]);
    const options = [
        { label: "tdpyuva", value: "7e71674b" }
    ];

    const fields = {
        displayposition: '',
        status: '',
        tenant: [],
        categoryid: '',
        name: '',
        shortdesc: '',
        address: '',
        mobileno: '',
        email: '',
        servicearea: '',
        deliverytime: '',
        storetimings: [],
        restauranttype: '',
        reviewcount: '',
        razorpayaccount: '',
        landlineno: '',
        storediscount: '',
        allowdiscount: '',
        maxdiscount: '',
        location: [],
        password: '',
        area: "",
        loc: ''

    }

    const errors = {
        displayposition: '',
        status: '',
        area: '',
        email: "",
        mobileno: "",
        name: "",
        password: "",
        loc: ""
    }

    const fields2 = {
        day: '',
        starttime: '',
        endtime: '',
    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [category, setCategory] = useState([])
    const [storeaddress, setStoreaddress] = useState('');
    const [latitude, setLatitude] = useState(51.5073219);
    const [longitude, setLongitude] = useState(-0.1276474);
    const [areas, setAreas] = useState([])
    const [percent, setPercent] = useState(50);
    const [filefields, setFileFields] = useState(null);
    const [imageshow, setImageShow] = useState(null);
    const [morefields, setMoreFields] = useState(fields2)
    const [data, setData] = useState([]);

    useEffect(() => {
        //getBanner();
        console.log("updateprop", updateprop);
        getCategories()
        getAreas()
        if (updateprop?.id) {
            setFromFields(updateprop);
            setSelected(updateprop.tenant);
            setFileFields(updateprop.image)
            setImageShow(true)
            setData(updateprop.storetimings)
            setLatitude(updateprop.location?.coordinates[0])
            setLongitude(updateprop.location?.coordinates[1])

        }
    }, []);

    const { displayposition, status, categoryid, name,
        shortdesc, address, mobileno, email, servicearea, rating, deliverytime,
        restauranttype, reviewcount, razorpayaccount, landlineno, storediscount, allowdiscount,
        maxdiscount, loc, password, area,comissiontype,comissionval } = formfields;

    const { day, starttime, endtime } = morefields;


    const handleChange1 = async (e) => {
        setStoreaddress(e.target.value)
        handleGeocode(e)

    }

    const handleGeocode = async (e) => {
        // console.log("e.target.value",e.target.value);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(e.target.value)}`
            );
            // console.log("response data of openstreet", response.data);

            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setLatitude(lat);
                setLongitude(lon);
            } else {
                // alert('Address not found!');
            }
        } catch (error) {
            console.error('Error geocoding address:', error);
        }
    };

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;

        if (!fields["displayposition"]) {
            formIsValid = false;
            errors["displayposition"] = "*Please enter display position .";
        }

        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }

        if (!fields["area"]) {
            formIsValid = false;
            errors["area"] = "*Please select area .";
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter email .";
        }

        if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter mobileno .";
        }
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter name .";
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter password .";
        }
        if (storeaddress == '') {
            errors["loc"] = "*Please enter location .";
        }

        if (!fields["comissiontype"]) {
            formIsValid = false;
            errors["comissiontype"] = "*Please enter comission type .";
        }
        if (!fields["comissionval"]) {
            formIsValid = false;
            errors["comissionval"] = "*Please enter comission val .";
        }
        

        setErrorFields(errors)
        return formIsValid;

    }

    const deleteRow = (index) => {
        const updatedItems = data.filter((_, i) => i !== index);
        setData(updatedItems);
        notifyTopFullWidth("store timings deleted successfully")


    }

    const getCategories = async () => {
        const reqparams = {
            pageno: '-1',
            query: { status: "Active" }
        }
        const ResponseData = await GetCategory(reqparams)
        setCategory(ResponseData.data)
    }
    const getAreas = async () => {
        const reqparams = {
            pageno: '-1',
            query: { status: "Active" }
        }
        const ResponseData = await GetAllAreas(reqparams)
        setAreas(ResponseData?.data)
    }

    const submitForm = async () => {
        console.log("lat lng", latitude, longitude);
        const isValid = await validateForm();
        let locarray = [];
        locarray.push(latitude);
        locarray.push(longitude);
        if (isValid) {
            formfields.tenant = selected;
            formfields.image = filefields;
            formfields.storetimings = data;
            formfields.location = {
                type: "Point",
                coordinates: [parseFloat(latitude), parseFloat(longitude)]
            }

            // console.log("formfields final", formfields);
            if (!formfields.id) {
                //save
                const Response = await SaveStores(formfields);
                if (Response?.data?.id) {
                    notifyTopFullWidth("Data saved successfully");
                    formfields.id = Response?.data?.id;
                }

            } else {
                //update
                const Response = await UpdateStores(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data updated successfully");
                    formfields.id = Response.data.id;
                }
            }

        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFromFields((prevState) => ({
            ...prevState,
            [name]: value
        }));

    }

    function handleChangeFile(files) {
        // console.log(files);
        setFileFields(files[0]);
        if (files[0].type === 'image/png' || files[0].type === 'image/jpeg' || files[0].type === 'image/jpg') {
            let sz = files[0].size.split(' ');
            if (sz[0] > 200) {
                toast('File size should be below 200 kb', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setFileFields(files[0].base64);
                //setImageShow(files[0].base64);
                setImageShow(true);
            }
        } else {
            toast('Please upload only png or jpg', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        //setFile(event.target.files[0])
    }

    const handleChange2 = (e) => {
        const { name, value } = e.target;

        setMoreFields((prevState) => ({
            ...prevState,
            [name]: value
        }));

    }

    const submitTimings = async () => {

        setData([...data, morefields])
        setMoreFields(fields2)
        notifyTopFullWidth("store timings saved")

    }

    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        // Initialize map
        console.log("latitude", latitude);
        console.log("longitude", longitude);

        const mapOptions = {
            center: [latitude, longitude],
            zoom: 20
        }; 

        const mapInstance = L.map('map', mapOptions)
        console.log("mapInstance", mapInstance);
        setMap(mapInstance); 

        let customIcon=''
         customIcon = L.icon({
            iconUrl: customIconUrl,
            iconSize: [40, 40], 
            iconAnchor: [20, 32] 
          });
      

        // Add Tile Layer
        let layer = ''
 
        layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        mapInstance.addLayer(layer);

        // Initialize Address Search Control
        const apiKey = "9098219d18994560be55415be86df062"; // Replace with your actual API key
        const addressSearchControl = L.Control.geocoder({
            position: 'topleft', 
            placeholder: "Enter an address here", 
            defaultMarkGeocode: false, // We will handle the marker ourselves
              apiKey: apiKey
        });

        addressSearchControl.on('markgeocode', function (e) {
            const { center } = e.geocode;

            // Remove existing marker
            if (marker) {
                mapInstance.removeLayer(marker);
            }

            // Create new marker

            const newMarker = L.marker(center, { draggable: true,icon: customIcon,});
            newMarker.addTo(mapInstance); 

            setLatitude(newMarker._latlng.lat)
            setLongitude(newMarker._latlng.lng)


            newMarker.on('dragend', function (e) {
                const newLatLng = e.target.getLatLng();
                setLatitude(newLatLng.lat)
                setLongitude(newLatLng.lng)
            });


            // Set map view to the selected address
            mapInstance.setView(center, 20);


            // Update marker state
            setMarker(newMarker);

        });



        mapInstance.addControl(addressSearchControl);

        return () => {  
            mapInstance.remove();
        };
    }, []);


    useEffect(() => {
        if (marker) {
            marker.setLatLng([latitude, longitude]);
            map.setView([latitude, longitude], 20);
        }
    }, [latitude, longitude]);





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

            <div className='row'>
                <div className="form-group mb-3 col-md-6">
                    <label

                    >
                        Display position
                    </label>
                    <input component="input"
                        placeholder="Display position"
                        name="displayposition"
                        className="form-control"

                        value={displayposition} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.displayposition}</div>
                </div>
                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Name
                    </label>
                    <input component="input"
                        placeholder="store name"
                        name="name"
                        className="form-control"
                        value={name} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.name}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Mobileno
                    </label>
                    <input component="input"
                        placeholder="mobileno"
                        name="mobileno"
                        className="form-control"
                        value={mobileno} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.mobileno}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Email
                    </label>
                    <input component="input"
                        placeholder="email"
                        name="email"
                        className="form-control"
                        value={email} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.email}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Password
                    </label>
                    <input component="input"
                        placeholder="password"
                        name="password"
                        className="form-control"
                        value={password} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.password}</div>
                </div>

                {/* <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Location
                    </label>
                    <input component="input"
                        placeholder="location"
                        className="form-control"
                        value={storeaddress} maxLength={50} onChange={handleChange1} />

                </div> */}

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Short Description
                    </label>
                    <textarea
                        rows={4}
                        className="form-control"
                        name="shortdesc"
                        placeholder="shortdesc"
                        id="comment"
                        onChange={handleChange}
                        value={shortdesc}
                    />
                    <div className="errorMsg">{errorFields.shortdesc}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Address
                    </label>
                    <input component="input"
                        placeholder="address"
                        name="address"
                        className="form-control"
                        value={address} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.address}</div>
                </div>


                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Tenants
                    </label>
                    <MultiSelect
                        options={tenantprops}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />

                </div>

                <div className="form-group mb-3 col-md-6">
                    <label>Category</label>
                    <select className="form-control" name="categoryid"
                        value={categoryid} onChange={handleChange}>
                        <option value=''>Select Category</option>
                        {category?.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.categoryname}
                            </option>
                        ))}
                    </select>
                    <div className="errorMsg">{errorFields.categoryid}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label>Area</label>
                    <select className="form-control" name="area"
                        value={area} onChange={handleChange}>
                        <option value=''>Select Area</option>
                        {areas?.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <div className="errorMsg">{errorFields.categoryid}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Status
                    </label>
                    <select
                        className="form-control" name='status'
                        onChange={handleChange} value={status}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <div className="errorMsg">{errorFields.status}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Service Area
                    </label>
                    <input component="input"
                        placeholder="servicearea"
                        name="servicearea"
                        className="form-control"
                        value={servicearea} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.servicearea}</div>
                </div>

                {/* <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Rating
                    </label>
                    <input component="input"
                        placeholder="rating"
                        name="rating"
                        className="form-control"
                        value={rating} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.rating}</div>
                </div> */}

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Delivery Time
                    </label>
                    <input component="input"
                        placeholder="deliverytime"
                        name="deliverytime"
                        className="form-control"
                        value={deliverytime} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.deliverytime}</div>
                </div>
                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Restaurant Type
                    </label>
                    <select
                        className="form-control" name='restauranttype'
                        onChange={handleChange} value={restauranttype}>
                        <option value="">Select restauranttype</option>
                        <option value="Veg">Veg</option>
                        <option value="NonVeg">NonVeg</option>
                        <option value="Both">Both</option>
                    </select>

                    <div className="errorMsg">{errorFields.restauranttype}</div>
                </div>
                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Review Count
                    </label>
                    <input component="input"
                        placeholder="reviewcount"
                        name="reviewcount"
                        className="form-control"
                        value={reviewcount} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.reviewcount}</div>
                </div>
                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Razorpay account
                    </label>
                    <input component="input"
                        placeholder="razorpayaccount"
                        name="razorpayaccount"
                        className="form-control"
                        value={razorpayaccount} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.reviewcount}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Landlineno
                    </label>
                    <input component="input"
                        placeholder="landlineno"
                        name="landlineno"
                        className="form-control"
                        value={landlineno} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.reviewcount}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Store discount
                    </label>
                    <input component="input"
                        placeholder="storediscount"
                        name="storediscount"
                        className="form-control"
                        value={storediscount} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.storediscount}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Allow discount
                    </label>
                    <input component="input"
                        placeholder="allowdiscount"
                        name="allowdiscount"
                        className="form-control"
                        value={allowdiscount} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.allowdiscount}</div>
                </div>
                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Max discount
                    </label>
                    <input component="input"
                        placeholder="maxdiscount"
                        name="maxdiscount"
                        className="form-control"
                        value={maxdiscount} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.maxdiscount}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Comission Type
                    </label>
                    <select
                        className="form-control" name='comissiontype'
                        onChange={handleChange} value={comissiontype}>
                        <option value="">Select comission type</option>
                        <option value="F">Flat</option>
                        <option value="P">Percentage</option>
                    </select>

                    <div className="errorMsg">{errorFields.comissiontype}</div>
                </div>
                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Comission Value
                    </label>
                    <input component="input"
                        placeholder="comission value"
                        name="comissionval"
                        className="form-control"
                        value={comissionval} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.comissionval}</div>
                </div>



            </div>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
            {/* <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                <Accordion.Item key={percent} eventKey={`${percent}`}>
                    <Accordion.Header className="accordion-header">
                        Add Location
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                        <div className="accordion-body">
                        


                        </div>
                    </Accordion.Collapse>
                </Accordion.Item>

            </Accordion> */}


            <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                <Accordion.Item key={percent} eventKey={`${percent}`}>
                    <Accordion.Header className="accordion-header">
                        Add Store Timings
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                        <div className="accordion-body">

                            {/* <Addons/> */}
                            <div className="row">
                                <div className="form-group mb-3 col-md-3">
                                    <label>Day</label>
                                    <input component="input"
                                        placeholder="day"
                                        name="day"
                                        className="form-control"
                                        value={day} maxLength={50} onChange={handleChange2} />

                                </div>
                                <div className="form-group mb-3 col-md-3">
                                    <label>Starttime</label>
                                    <input component="input"
                                        placeholder="starttime"
                                        name="starttime"
                                        className="form-control"
                                        value={starttime} maxLength={50} onChange={handleChange2} />
                                </div>
                                <div className="form-group mb-3 col-md-3">
                                    <label>Endtime</label>
                                    <input component="input"
                                        placeholder="endtime"
                                        name="endtime"
                                        className="form-control"
                                        value={endtime} maxLength={50} onChange={handleChange2} />
                                </div>
                                <div className="form-group mb-3 col-md-3">
                                    <Button onClick={submitTimings} className="me-2" variant="info">
                                        Save Timings
                                    </Button>

                                </div>


                            </div>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>
                                            <strong>Day</strong>
                                        </th>
                                        <th>
                                            <strong>StartTime</strong>
                                        </th>
                                        <th>
                                            <strong>EndTime</strong>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item, index) => (
                                        <tr>
                                            <td>
                                                <strong>{item.day}</strong>
                                            </td>
                                            <td>{item.starttime}</td>
                                            <td>{item.endtime}</td>
                                            <td>


                                                <Button onClick={() => deleteRow(index)} className="me-2" variant="danger">
                                                    Delete
                                                </Button>

                                            </td>


                                        </tr>
                                    ))}

                                </tbody>
                            </Table>

                        </div>
                    </Accordion.Collapse>
                </Accordion.Item>

            </Accordion>


            <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                <Accordion.Item key={percent} eventKey={`${percent}`}>
                    <Accordion.Header className="accordion-header">
                        Add Image
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                        <div className="accordion-body">

                            <div className="form-group mb-3 row">
                                <label
                                    className="col-lg-4 col-form-label"
                                    htmlFor="val-username"
                                >
                                    Image
                                </label>
                                <div className="custom-file">
                                    <FileBase64
                                        multiple={true}
                                        onDone={handleChangeFile} />
                                </div>
                                <div className="errorMsg">{errorFields.base64}</div>
                            </div>

                            {imageshow && <> <div className="form-group mb-3 row">
                                <label
                                    className="col-lg-4 col-form-label"
                                    htmlFor="val-username"
                                >
                                    Uploaded Image
                                </label>
                                <img src={filefields} alt="Red dot" />

                            </div> </>}

                        </div>
                    </Accordion.Collapse>
                </Accordion.Item>

            </Accordion>



            <div className="form-group">
                <button onClick={submitForm} className="btn btn-primary" type="button"
                >Save</button>
            </div>
        </>
    )

}

export default AddStores