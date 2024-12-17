import { Link, useNavigate } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
// import whiteBgLogoImg from '../assets/brands/schoolperformance.png';
// import whiteBgLogoImg from '../assets/brands/fultonIcon.jpg';
// import whiteBgLogoImg from '../assets/images/dark_mode_icon.svg';
import DarkTheme from '../assets/images/dark_mode_icon.svg';
import whiteBgLogoImg from '../assets/brands/geogia_img-one.png';
import DarkBgLogoImg from '../assets/brands/geogia_img-one.png';
import { TabView, TabPanel } from 'primereact/tabview';
import HRProfile from "./profile.component";
import { Sidebar } from 'primereact/sidebar';
import school_icon from '../assets/images/school_icon.png';
import school_campus from '../assets/images/school_campus.png';
import avatar_head from '../assets/images/avatar_head.png';
import { Carousel } from 'primereact/carousel';
import { useDispatch, useSelector } from "react-redux";


// import satellite_image from '../../public/satellite_image.png'
// import {
//     fetchSchool_Performance_Fund_Type_Report, fetchSchool_Performance_School_Type_Report, fetchSchool_Performance_Metric_Report,
//     fetchSchool_Performance_Map_Report, fetchSchool_Performance_Pie_Chart_Report
// } from '../redux/slices/schoolperformance';
import {
    fetchSchool_Performance_Fund_Type_Report, fetchSchool_Performance_School_Type_Report, fetchSchool_Performance_Metric_Report,
    fetchSchool_Performance_Map_Report, fetchSchool_Performance_Pie_Chart_Report
} from '../redux/slices/schoolperformance';
import { fetchMenu_School_Level } from "../redux/slices/filter";
import { GoogleMap, useJsApiLoader, Marker, Circle, TrafficLayer, TransitLayer, BicyclingLayer, Polyline } from '@react-google-maps/api';
import locationIcon from "../assets/images/dot_circle.png";
import locationIcon3 from "../assets/images/High_School.png";
import locationIcon1 from "../assets/images/Elementary_School.png";
import locationIcon2 from "../assets/images/Middle_School.png";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

// import locationIcon from "../assets/images/dot_circle.png";
// import locationIcon3 from "../assets/images/green_dot_pin.png";
// import locationIcon1 from "../assets/images/red_dot_pin.png";
// import locationIcon2 from "../assets/images/yellow_dot_pin.png";
import FilterComponent from "../components/filterComponent";
import SchoolPerformanceTableComponent from "../components/tableComponent/schoolPerformTable";
import LoaderContainer from "../components/loaderContainer";
import { OverlayPanel } from 'primereact/overlaypanel';


const Alert = (visible = false, setVisible) => {
    return <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
        <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Dialog>
}




export default function Schoolperformance(props) {
    const op = useRef(null);
    const circleRef = useRef(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [map, setMap] = useState(null);
    const [searchBy, setSearchBy] = useState("Location")
    const [mapBoundary, setMapBoundary] = useState("Radius")
    const [mapType, setMapType] = useState("roadmap")
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [radius, setRadius] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [performanceData, setPerformanceData] = useState(null);
    const mapRef = useRef();
    const [transitLayerVisible, setTransitLayerVisible] = useState(false);
    const [titles, setTitles] = useState({
        traffic: '',
        bicycling: '',
        transit: ''
    });


    useEffect(() => {
        dispatch(fetchMenu_School_Level({
            filters: [],
            dynamicColumns: []
        }));
    }, [])

    // const Menu_School_Leveldata = useSelector(state => state.filter.Menu_School_Level);
    // const dropdownOptions = Menu_School_Leveldata?.map(item => ({ name: item?.SYSTEM_NAME }));

    // console.log(dropdownOptions, 'dropdownOptions');

    // const [city, setCity] = useState('');

    // useEffect(() => {
    //     if (dropdownOptions && dropdownOptions.length > 0 && !city) {
    //         setCity(dropdownOptions[0]);
    //     }
    // }, [dropdownOptions, city]);


    // console.log(city, 'citycity')
    // sessionStorage.setItem("cityDistrict", city?.name);


    // Default styles
    const defaultTransitStyle = [
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#757575" }] // Default color for transit
        },
        {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{ color: "#757575" }]
        }
    ];

    const highlightedTransitStyle = [
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#0000FF" }] // Blue color for transit lines near the location
        },
        {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{ color: "#0000FF" }] // Blue color for transit stations near the location
        }
    ];


    // Default styles for Bicycling
    const defaultBicyclingStyle = [
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#075107" }] // Default color for bicycling paths
        }
    ];

    // Highlighted styles for Bicycling
    const highlightedBicyclingStyle = [
        {
            featureType: "road",
            elementType: "geometry",
            //   stylers: [{ color: "#2c82be" }] // Red color for bicycling paths near the location
            stylers: [{ color: "#066d06" }] // Red color for bicycling paths near the location
        }
    ];

    // Example style for dark theme and light theme
    const darkMapStyle = [
        {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#212121" }] // Default color for the map
        },
        { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#2c2c2c" }] // Color for roads
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#000000" }] // Color for water
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#757575" }] // Default color for transit (not near the specific location)
        },
        {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{ color: "#757575" }]
        },
        ...defaultBicyclingStyle
    ];
    const lightMapStyle = [
        {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }] // Default color for the map
        },
    ];



    var pagename = window.location.pathname
    // console.log("pagename",pagename)
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    const [formData, setFormData] = useState({
        city: '',
        zipcode: '',
        street: '',
        latitude: null,
        longitude: null
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { city, zipcode, street, latitude, longitude } = formData
        const address = `${street}, ${city}, ${zipcode}`;
        handleSearch(address, latitude, longitude);
        if (op.current) {
            op.current.hide()
        }
        handleClear()

    };


    // const center = {
    //     // lat: 30.340004,
    //     // lng: -97.731763
    //     lat: 31.7579,
    //     lng: -82.3548

    // };



    const schoolTypeAbbreviations = {
        'Elementary Schools': 'ES',
        'Middle Schools': 'MS',
        'High Schools': 'HS',
        'Not Reported': 'NR'
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Handle the Enter key event here
            //   console.log('Enter key pressed with query:', searchQuery);
            // Perform the search or any other action
            handleSearch(searchQuery);
        }
    };

    const handleSearch = (address, lat = null, lng = null) => {
        const geocoder = new window.google.maps.Geocoder();
        let geocodeParams = {};

        if (lat && lng) {
            geocodeParams = { location: { lat: parseFloat(lat), lng: parseFloat(lng) } };
        } else if (address) {
            geocodeParams = { address };
        } else {
            console.error('Please provide either latitude and longitude or a valid address.');
            return;
        }

        geocoder.geocode(geocodeParams, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;

                // Set the selected place first
                setSelectedPlace({
                    lat: location.lat(),
                    lng: location.lng(),
                    name: results[0].formatted_address
                });

                setSearchQuery(results[0].formatted_address);

                // Ensure any previous circle is removed
                if (circleRef.current) {
                    circleRef.current.setMap(null);
                }

                // Convert radius from miles to meters
                const radiusInMeters = radius * 1609.34;

                if (mapBoundary != "All Schools") {
                    // Create and display the circle
                    const newCircle = new window.google.maps.Circle({
                        center: location,
                        radius: radiusInMeters,
                        map: map,  // Add circle to the map immediately
                        options: {
                            strokeColor: '#4469ef',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#c1ccf1',
                            fillOpacity: 0.35,
                        }
                    });

                    // Update the circle reference
                    circleRef.current = newCircle;

                    // Set performance data
                    setPerformanceData({
                        name: results[0].formatted_address,
                        performanceData: 'Example Performance Data' // Replace with actual performance data
                    });

                    // Optional: Zoom out to fit the circle within the map view
                    window.google.maps.event.addListenerOnce(map, 'idle', () => {
                        map.fitBounds(newCircle.getBounds());
                    });
                }


            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
                // setAlertVisible(true)
            }
        });
    };


    const getAbbreviation = (fullName) => schoolTypeAbbreviations[fullName] || fullName;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBHkESRyB7oJAtl15zRm6cXnBBoe2rS9Ik",
        libraries: ['geometry'],
    })

    const [darkTheme, setDartTheme] = useState(true)
    const darkModeStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "white"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#181818"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1b1b1b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#2c2c2c"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8a8a8a"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#373737"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3c3c3c"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#3d3d3d"
                }
            ]
        }
    ];

    const darkThemeStyles = [
        { elementType: 'geometry', stylers: [{ color: '#212121' }] },
        { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }],
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ff000' }],
        },
        // Additional styles as needed...
    ];

    const updateMapStyle = () => {
        const map = mapRef.current;
        if (!map) {
            console.error('Map reference is not set.');
            return;
        }

        const currentCenter = map.getCenter();
        const location = new window.google.maps.LatLng(center.lat, center.lng);
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(currentCenter, location);

        const transitStyle = titles?.transit === "Transit"
            ? (distance < 1000 ? highlightedTransitStyle : defaultTransitStyle)
            : defaultTransitStyle;

        const bicyclingStyle = titles?.bicycling === "Bicycling"
            ? highlightedBicyclingStyle
            : defaultBicyclingStyle;

        const styles = darkTheme
            ? darkMapStyle?.filter(item => item["featureType"] != "road").concat(bicyclingStyle)
            : '';

        map.setOptions({ styles });
    };




    const options = {
        // styles: darkTheme ? darkModeStyle : '',
        styles: darkTheme ? darkMapStyle : '',
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        streetViewControl: true,
        // mapTypeId: 'roadmap'
    };

    console.log("darkMapStyle", darkMapStyle)

    useEffect(() => {
        const handleBeforeUnload = () => {
            window.sessionStorage.removeItem('SchoolType');
            window.sessionStorage.removeItem('Schoolname');
            window.sessionStorage.removeItem('Year');
            window.sessionStorage.removeItem('Gender');
            window.sessionStorage.removeItem('Ethincity');
            window.sessionStorage.removeItem('Grade');
            window.sessionStorage.removeItem('allfilter');
            window.sessionStorage.removeItem('selectedoptions');
            window.sessionStorage.removeItem('selectedoptions1');
            window.sessionStorage.removeItem('selectedoptions2');
            window.sessionStorage.removeItem('selectedoptions3');
            window.sessionStorage.removeItem('selectedmetric');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    const handleClick1 = () => {
        window.sessionStorage.removeItem('SchoolType');
        window.sessionStorage.removeItem('Schoolname');
        window.sessionStorage.removeItem('Year');
        window.sessionStorage.removeItem('Gender');
        window.sessionStorage.removeItem('Ethincity');
        window.sessionStorage.removeItem('Grade');
        window.sessionStorage.removeItem('allfilter');
        window.sessionStorage.removeItem('selectedoptions');
        window.sessionStorage.removeItem('selectedoptions1');
        window.sessionStorage.removeItem('selectedoptions2');
        window.sessionStorage.removeItem('selectedoptions3');
        window.sessionStorage.removeItem('selectedmetric');
    };

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
        mapRef.current = mapInstance;
        updateMapStyle();
    }, []);


    useEffect(() => {
        updateMapStyle();
    }, [darkTheme, titles]);



    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);
    //     setMap(map)
    // }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [visibleRight, setVisibleRight] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pieChartData, setpieChartData] = useState([]);



    const handleClick = (key, title) => {
        setTitles(prevTitles => ({
            ...prevTitles,
            [key]: prevTitles[key] === title ? '' : title
        }));

        updateMapStyle()
    };

    console.log("titles", titles)
    const dispatch = useDispatch();
    const School_Performance_Fund_Type_Reportdata = useSelector(state => state.schoolperformance.School_Performance_Fund_Type_Report);
    const School_Performance_Fund_Type_Reportdataloading = useSelector(state => state.schoolperformance.School_Performance_Fund_Type_Reportloading);
    const School_Performance_School_Type_Reportdata = useSelector(state => state.schoolperformance.School_Performance_School_Type_Report);
    const School_Performance_School_Type_Reportdataloading = useSelector(state => state.schoolperformance.School_Performance_School_Type_Reportloading);
    const School_Performance_Metric_Reportata = useSelector(state => state.schoolperformance.School_Performance_Metric_Report);
    const School_Performance_Metric_Reportataloading = useSelector(state => state.schoolperformance.School_Performance_Metric_Reportloading);
    const School_Performance_Map_Reportdata = useSelector(state => state.schoolperformance.School_Performance_Map_Report);
    const School_Performance_Map_Reportdataloading = useSelector(state => state.schoolperformance.School_Performance_Map_Reportloading);
    const School_Performance_Pie_Chart_Reportdata = useSelector(state => state.schoolperformance.School_Performance_Pie_Chart_Report);
    const School_Performance_Pie_Chart_Reportdataloading = useSelector(state => state.schoolperformance.School_Performance_Pie_Chart_Reportloading);
    // console.log("School_Performance_Metric_Reportata",School_Performance_Metric_Reportata)
    console.log("School_Performance_Map_Reportdata", School_Performance_Map_Reportdata)

    /* System Names from Filters */

    /*  */




    // let School_Performance_Metric_Reportatanew = School_Performance_Metric_Reportata;

    var School_Performance_Metric_Reportatanew = JSON.parse(JSON.stringify(School_Performance_Metric_Reportata))
        ?.filter(item => item["METRIC_NAME"] != "% of student above Reading Benchmark"
            && item["METRIC_NAME"] != "% of student above Writing Benchmark"
            && item["METRIC_NAME"] != "% of student above Speaking Benchmark"
            && item["METRIC_NAME"] != "% of student above Listening Benchmark"
            && item["METRIC_NAME"] != "Referral Rate"
            && item["METRIC_NAME"] != "Suspension Rate"
        );

    if (School_Performance_Metric_Reportatanew) {
        School_Performance_Metric_Reportatanew.map(itr => {
            if (itr["METRIC_NAME"] == "Students with >95% Attendance") {
                itr["color"] = "#2C4089"
                itr["order"] = 1
            } else if (itr["METRIC_NAME"] == "Chronic Absence Rate") {
                itr["color"] = "#2C82BE"
                itr["order"] = 2;
            }
            else if (itr["METRIC_NAME"] == "% of student above Math Benchmark") {
                itr["color"] = "#129C83"
                itr["order"] = 3
            } else if (itr["METRIC_NAME"] == "% of student above ELA Benchmark") {
                itr["color"] = "#129C83"
                itr["order"] = 4
            } else if (itr["METRIC_NAME"] == "% of student above Science Benchmark") {
                itr["color"] = "#129C83"
                itr["order"] = 5
            }
            else if (itr["METRIC_NAME"] == "# of Graduates") {
                itr["color"] = "#3A3365"
                itr["order"] = 6
            }
            // if (itr["METRIC_NAME"] == "# of Graduates") {
            //     itr["color"] = "#3A3365"
            //     itr["order"] = 10
            // } else if (itr["METRIC_NAME"] == "Students with >95% Attendance") {
            //     itr["color"] = "#2C4089"
            //     itr["order"] = 1
            // } else if (itr["METRIC_NAME"] == "Chronic Absence Rate") {
            //     itr["color"] = "#2C82BE"
            //     itr["order"] = 2;
            // } else if (itr["METRIC_NAME"] == "Referral Rate") {
            //     itr["color"] = "#892C69"
            //     itr["order"] = 4
            // } else if (itr["METRIC_NAME"] == "Suspension Rate") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 5
            // }
            // else if (itr["METRIC_NAME"] == "% of student above STAAR Reading benchmark") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 6
            // }
            // else if (itr["METRIC_NAME"] == "% of student above STAAR Math benchmark") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 3
            // }
            // else if (itr["METRIC_NAME"] == "% of student above NWEA ELA benchmark") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 8
            // }
            // else if (itr["METRIC_NAME"] == "% of student above NWEA Math benchmark") {
            //     itr["color"] = "#129C83"
            //     itr["order"] = 9
            // }

        })
    }

    if (School_Performance_Metric_Reportatanew) {
        School_Performance_Metric_Reportatanew = School_Performance_Metric_Reportatanew.slice().sort((a, b) => {
            return a.order - b.order
        })

    }

    console.log(School_Performance_Metric_Reportatanew, 'School_Performance_Metric_Reportatanew')




    var School_Performance_School_Type_Reportdatanew = JSON.parse(JSON.stringify(School_Performance_School_Type_Reportdata));
    if (School_Performance_School_Type_Reportdatanew) {
        School_Performance_School_Type_Reportdatanew.map(itr => {
            if (itr["LABEL"] == "All") {
                itr["color"] = "#129C83"
                itr["order"] = 1
            }
            if (itr["LABEL"] == "Not Reported") {
                itr["color"] = "#3A3365"
                itr["order"] = 5
            } else if (itr["LABEL"] == "Middle Schools") {
                itr["color"] = "#2C4089"
                itr["order"] = 3
            } else if (itr["LABEL"] == "Elementary Schools") {
                itr["color"] = "#2C82BE"
                itr["order"] = 2;
            } else if (itr["LABEL"] == "High Schools") {
                itr["color"] = "#892C69"
                itr["order"] = 4
            } else if (itr["LABEL"] == "Other Combination") {
                itr["color"] = "#129C83"
                itr["order"] = 5
            }
            else if (itr["LABEL"] == "Community School") {
                itr["color"] = "#129C83"
                itr["order"] = 6
            }
        })

        // function compareStrings(a, b) {
        //     // Assuming you want case-insensitive comparison
        //     a = a.toLowerCase();
        //     b = b.toLowerCase();

        //     return (a < b) ? -1 : (a > b) ? 1 : 0;
        //   }

        //   School_Performance_School_Type_Reportdatanew.sort(function(a, b) {
        //     return compareStrings(a.LABEL, b.LABEL);
        //   })
        // School_Performance_School_Type_Reportdatanew.slice().sort((a, b) => {
        //     return a.order - b.order
        // })
    }
    School_Performance_School_Type_Reportdatanew = School_Performance_School_Type_Reportdatanew.slice().sort((a, b) => {
        return a.order - b.order
    })
    console.log("School_Performance_School_Type_Reportdatanew", School_Performance_School_Type_Reportdatanew)

    const [selectedmetricschool, setSelectedmetricschool] = useState(School_Performance_School_Type_Reportdatanew[3]?.LABEL);
    sessionStorage.setItem("schoolTypeQuery", selectedmetricschool);

    console.log(selectedmetricschool, 'selectedmetricschool')

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [divRecord, setDivRecord] = useState("% of Students with >95% Attendance");
    sessionStorage.setItem("divRecord", divRecord);

    useEffect(() => {
        setSelectedmetricschool(School_Performance_School_Type_Reportdatanew?.[3]?.LABEL)
    }, [School_Performance_School_Type_Reportdatanew?.[3]?.LABEL])


    console.log(divRecord, 'divRecord')


    let DistrictName = JSON.parse(sessionStorage.getItem("SchoolType"))
    console.log(DistrictName, 'DistrictName')

    useEffect(() => {
        dispatch(fetchSchool_Performance_Fund_Type_Report({
            "elasticQueryName": "School_Performance_Fund_Type_Report",
            "filters": [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            }],
            "dynamicColumns": [],
        }));
        dispatch(fetchSchool_Performance_School_Type_Report({
            "elasticQueryName": "School_Performance_School_Type_Report",
            "filters": DistrictName?.length > 0 ? [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            },
            {
                "columnName": "SYSTEM_NAME",
                "columnValue": DistrictName?.map(item => item?.value),
                "excludeKeyword": false
            }
            ] :
                [{
                    "columnName": "SCHOOL_YEAR",
                    "columnValue": ["2023"],
                    "excludeKeyword": false
                }
                ],
            "dynamicColumns": [],
        }));
        dispatch(fetchSchool_Performance_Metric_Report({
            "elasticQueryName": "School_Performance_School_Type_Report",
            "filters": [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            }],
            "dynamicColumns": [],
        }));
    }, [selectedMarker, divRecord])


    useEffect(() => {
        dispatch(fetchSchool_Performance_Map_Report({
            "elasticQueryName": "School_Performance_Map_Report",
            "filters": DistrictName?.length > 0 ? [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            },
            {
                "columnName": "SYSTEM_NAME",
                "columnValue": DistrictName?.map(item => item?.value),
                "excludeKeyword": false
            }
            ] :
                [{
                    "columnName": "SCHOOL_YEAR",
                    "columnValue": ["2023"],
                    "excludeKeyword": false
                }
                ],

            "filters1": [{
                "columnName": "METRIC_NAME",
                "columnValue": `${divRecord}`,
                "excludeKeyword": false
            }],

            "dynamicColumns": [{
                "columnName": "#{dynamic}",
                "columnValue": selectedmetric === "Total Incidents" ? "SUM" : "AVG",
                "excludeKeyword": false
            }],
        }));
        dispatch(fetchSchool_Performance_Pie_Chart_Report({
            "elasticQueryName": "School_Performance_Pie_Chart_Report",
            "filters": [{
                "columnName": "SCHOOL_YEAR",
                "columnValue": ["2023"],
                "excludeKeyword": false
            },
            {
                "columnName": "SCHOOL_NAME",
                "columnValue": `${selectedMarker?.SCHOOL_NAME}`,
                "excludeKeyword": false
            },
                // {
                //     "columnName": "SCHOOL_TYPE",
                //     "columnValue": `${selectedmetricschool}`,
                //     "excludeKeyword": false
                // }
                // {
                //     "columnName": "SYSTEM_NAME ",
                //     "columnValue": `${city?.name}`,
                //     "excludeKeyword": false
                // }
            ],
            "filters1": [{
                "columnName": "METRIC_NAME",
                "columnValue": `${divRecord}`,
                "excludeKeyword": false
            }],
            // "grad_filters": [{
            //     "columnName": "SCHOOL_YEAR",
            //     "columnValue": ["2023"],
            //     "excludeKeyword": false
            // }, {
            //     "columnName": "MEASURE_TYPE",
            //     "columnValue": ["All"],
            //     "excludeKeyword": false
            // }],
            "dynamicColumns": [],
        }));
    }, [selectedMarker, divRecord])




    // useEffect(()=>{
    //     const ifameData=document.getElementById("iframeId")
    //     const lat=1.305385;
    //     const lon=30.923029;
    //     ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    // })
    const navigate = useNavigate()
    const hangleLogOut = () => {

        sessionStorage?.removeItem("userInfo")
        props.setUserData(null)
        navigate("/")
    }

    const BarHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-bars"></i>
            </div>
        )
    };
    const FilterHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-sliders-v"></i>
            </div>
        )
    };
    const SettingHeaderTemplate = (options) => {
        return (
            <div className="flex px-4 py-4 align-items-center" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <i className="pi pi-cog"></i>
            </div>
        )
    };


    const [divRecordschool, setDivRecordschool] = useState("Middle School");

    let School_Performance_Map_Reportdata11;
    if (School_Performance_Map_Reportdata) {
        School_Performance_Map_Reportdata11 = School_Performance_Map_Reportdata.filter((item) => {
            // return item.METRIC_NAME == divRecord && item.SCHOOL_TYPE == selectedmetricschool

            return selectedmetricschool == 'All' ? item.METRIC_NAME == divRecord : item.METRIC_NAME == divRecord && item.SCHOOL_TYPE == selectedmetricschool
            // return item.METRIC_NAME == divRecord
        }
        );
    }

    const defaultCenter = {
        lat: 31.7579,
        lng: -82.3548
    };

    const center = School_Performance_Map_Reportdata?.length > 0
        ? {
            lat: parseFloat(School_Performance_Map_Reportdata[0]?.LATITUDE),
            lng: parseFloat(School_Performance_Map_Reportdata[0]?.LONGITUDE)
        }
        : defaultCenter;

    console.log("Map Center:", center);

    console.log("School_Performance_Map_Reportdata11", School_Performance_Map_Reportdata11)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const items = School_Performance_Map_Reportdata11; // your array of items
    const totalPages = Math.ceil(items?.length / itemsPerPage);
    const handleNextClick = () => {
        setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
    };
    const handlePrevClick = () => {
        setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items?.slice(startIndex, endIndex);

    useEffect(() => {

    }, []);

    const [isvisible, setVisible] = React.useState(false);
    const onClick = () => setVisible(!isvisible)
    const [selectedone, setSelectedone] = useState('1');
    const handleClickselected = (event, h) => {
        setSelectedone(h);
        // console.log("innerText",event.target.querySelector('div:first-child:div'));
        setDivRecordschool(event.target.innerText);
        setSelectedMarker(null);
    }
    // console.log("divRecordschool",divRecordschool)


    const [selectedmetric, setSelectemetric] = useState('1');
    const handleClickmetric = (event, h) => {
        setSelectemetric(h);
        setDivRecord(event.target.innerText);
        setSelectedMarker(null);
        setCurrentPage(1);
    }

    // useEffect(()=>{
    //     const ifameData=document.getElementById("iframeId")
    //     const lat=1.305385;
    //     const lon=30.923029;
    //     School_Performance_Map_Reportdata11.map(itr => {
    //         ifameData.src=`https://maps.google.com/maps?q=${itr.LATITUDE},${itr.LONGITUDE}&hl=es;&output=embed`
    //     })

    // })
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const mapBoundaryItems = [
        { label: 'Radius', value: 'Radius' },
        { label: 'All Schools', value: 'All Schools' },
    ];

    const locationItems = [
        { label: 'Location', value: 'Location' },
        // { label: 'Select an map', value: 'Select an map' },
    ]



    const [showDiv, setShowDiv] = useState(false);
    const handleTopTileFilterClick = (tile) => {
        setShowDiv(true);
    }
    const handleTopTileFilterClick1 = (tile) => {
        setShowDiv(false);
    }


    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    }

    const handleMarkerClick1 = (marker) => {
        setSelectedMarker(null);
    }

    //   console.log("selectedMarker",selectedMarker)

    const handleClear = () => {
        setFormData({
            city: '',
            zipcode: '',
            street: '',
            latitude: '',
            longitude: ''
        })
    }

    useEffect(() => {
        let School_Performance_Pie_Chart_Reportdata11;
        if (School_Performance_Pie_Chart_Reportdata) {
            School_Performance_Pie_Chart_Reportdata11 = School_Performance_Pie_Chart_Reportdata.filter((item) => {
                // return item.METRIC_NAME == divRecord && item.SCHOOL_TYPE == selectedmetricschool &&
                //     item.SCHOOL_OFFICIAL_NAME == selectedMarker?.SCHOOL_OFFICIAL_NAME
                if (selectedMarker) {
                    return (item?.METRIC_NAME == divRecord) && (item?.SCHOOL_ID == selectedMarker?.SCHOOL_ID)
                }
                return item.METRIC_NAME == divRecord
            }
            );
            setpieChartData(School_Performance_Pie_Chart_Reportdata11)
        }
    }, [School_Performance_Pie_Chart_Reportdata, divRecord, selectedMarker])
    // console.log("School_Performance_Pie_Chart_Reportdata11",School_Performance_Pie_Chart_Reportdata11)

    let uniqueEthnicity = [...new Set(pieChartData?.map(item => item["STUDENT_ETHNICITY"]))]?.sort()
    let uniqueEthnicityColors = ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"]

    const StudentCenters = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(50,50,50,0.7)',
            borderColor: "#333",
            textStyle: {
                fontSize: 12,
                fontWeight: "normal",
                color: '#fff',
            },
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: "0%",
            containLabel: true
        },
        legend: {
            show: true,
            orient: 'horizontal',
            center: 'center',
            data: uniqueEthnicity,
            textStyle: {
                padding: [4, 20, 4, 20],
                borderRadius: 4
            },
            // right: '5%',
            // left: "60%",
            itemWidth: 8.5,
            itemHeight: 6,
            bottom: '10%',
            textStyle: {
                color: "#fff",
                fontSize: '9',
                fontStyle: 'normal'
            }
        },
        series: [
            {
                // name: 'Access From',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['50%', '40%'],

                avoidLabelOverlap: true,
                label: {
                    show: true,
                    position: 'left',
                    formatter: '{d}%',
                    position: 'inside',
                    textStyle: {
                        fontSize: '8',
                        color: "#fff"
                    }
                },

                labelLine: {
                    show: false
                },
                data: pieChartData?.map((item) => {
                    let getIndex = uniqueEthnicity.indexOf(item?.STUDENT_ETHNICITY)
                    let color = uniqueEthnicityColors[getIndex]
                    return {
                        value: item?.PERCENTAGE, actual: item?.VALUE, name: item?.STUDENT_ETHNICITY, itemStyle: { color }
                    }
                }),
                tooltip: {
                    formatter: params => `${params.marker} ${params.data.name}  &nbsp;&nbsp;${params.data.actual}`
                }

            }
        ]
    };

    console.log("StudentCenters", StudentCenters)
    const handleTopTileFilterClickmetric = (tile) => {
        setDivRecord(tile?.METRIC_NAME);
        setSelectedMarker(null);
        setCurrentPage(1);
    }

    const handleTopTileFilterClick2 = (tile) => {
        setSelectedmetricschool(tile?.LABEL)
        setSelectedMarker(null);
        setCurrentPage(1);
    }

    const SchoolType = (props) => {
        let cleanedHexColorCode = `bg-[${props?.color?.replace(/"/g, '')}] w-full flex items-center justify-between p-2 text-white rounded`
        let cleanedHexColorCode1 = `bg-[${props?.color?.replace(/"/g, '')}] w-full flex items-center justify-between p-2 text-white rounded active`
        return (
            <>
                <div onClick={() => props.clickerFunc(props?.clicker)}>
                    {
                        props?.LABEL == selectedmetricschool ?
                            props?.LABEL == "All" ?
                                <div className="bg-[#129C83] w-full flex items-center justify-between p-2 text-white rounded active" >
                                    <div className="text-xs">{props?.LABEL}</div>
                                    <div className="leading-none">
                                        <span className="mr-2">{props?.VALUE}</span>
                                        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                    </div>
                                </div> :
                                props?.LABEL == "Elementary Schools" ?
                                    <div className="bg-[#2C82BE] w-full flex items-center justify-between p-2 text-white rounded active" >
                                        <div className="text-xs">{props?.LABEL}</div>
                                        <div className="leading-none">
                                            <span className="mr-2">{props?.VALUE}</span>
                                            {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                        </div>
                                    </div> :
                                    props?.LABEL == "High Schools" ?
                                        <div className="bg-[#892C69] w-full flex items-center justify-between p-2 text-white rounded active" >
                                            <div className="text-xs">{props?.LABEL}</div>
                                            <div className="leading-none">
                                                <span className="mr-2">{props?.VALUE}</span>
                                                {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                            </div>
                                        </div> :
                                        props?.LABEL == "Middle Schools" ?
                                            <div className="bg-[#2C4089] w-full flex items-center justify-between p-2 text-white rounded active" >
                                                <div className="text-xs">{props?.LABEL}</div>
                                                <div className="leading-none">
                                                    <span className="mr-2">{props?.VALUE}</span>
                                                    {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                </div>
                                            </div> :
                                            props?.LABEL == "Not Reported" ?
                                                <div className="bg-[#3A3365] w-full flex items-center justify-between p-2 text-white rounded active" >
                                                    <div className="text-xs">{props?.LABEL}</div>
                                                    <div className="leading-none">
                                                        <span className="mr-2">{props?.VALUE}</span>
                                                        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                    </div>
                                                </div> : props?.LABEL == "Community School" ?
                                                    <div className="bg-[#129C83] w-full flex items-center justify-between p-2 text-white rounded" >
                                                        <div className="text-xs">{props?.LABEL}</div>
                                                        <div className="leading-none">
                                                            <span className="mr-2">{props?.VALUE}</span>
                                                            {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                        </div>
                                                    </div> : null


                            :
                            props?.LABEL == "All" ?
                                <div className="bg-[#129C83] w-full flex items-center justify-between p-2 text-white rounded" >
                                    <div className="text-xs">{props?.LABEL}</div>
                                    <div className="leading-none">
                                        <span className="mr-2">{props?.VALUE}</span>
                                        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                    </div>
                                </div> :
                                props?.LABEL == "Elementary Schools" ?
                                    <div className="bg-[#2C82BE] w-full flex items-center justify-between p-2 text-white rounded" >
                                        <div className="text-xs">{props?.LABEL}</div>
                                        <div className="leading-none">
                                            <span className="mr-2">{props?.VALUE}</span>
                                            {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                        </div>
                                    </div> :
                                    props?.LABEL == "High Schools" ?
                                        <div className="bg-[#892C69] w-full flex items-center justify-between p-2 text-white rounded" >
                                            <div className="text-xs">{props?.LABEL}</div>
                                            <div className="leading-none">
                                                <span className="mr-2">{props?.VALUE}</span>
                                                {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                            </div>
                                        </div> :
                                        props?.LABEL == "Middle Schools" ?
                                            <div className="bg-[#2C4089] w-full flex items-center justify-between p-2 text-white rounded" >
                                                <div className="text-xs">{props?.LABEL}</div>
                                                <div className="leading-none">
                                                    <span className="mr-2">{props?.VALUE}</span>
                                                    {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                </div>
                                            </div> :
                                            props?.LABEL == "Not Reported" ?
                                                <div className="bg-[#3A3365] w-full flex items-center justify-between p-2 text-white rounded" >
                                                    <div className="text-xs">{props?.LABEL}</div>
                                                    <div className="leading-none">
                                                        <span className="mr-2">{props?.VALUE}</span>
                                                        {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                    </div>
                                                </div> : props?.LABEL == "Community School" ?
                                                    <div className="bg-[#129C83] w-full flex items-center justify-between p-2 text-white rounded" >
                                                        <div className="text-xs">{props?.LABEL}</div>
                                                        <div className="leading-none">
                                                            <span className="mr-2">{props?.VALUE}</span>
                                                            {/* <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link> */}
                                                        </div>
                                                    </div> : null


                    }

                </div>
            </>
        );
    };
    const MetricTemplate = (MetricTemplate) => {
        return (
            <MetricTemplateMertic clicker={MetricTemplate} clickerFunc={handleTopTileFilterClickmetric} METRIC_ID={MetricTemplate?.METRIC_ID} METRIC_NAME={MetricTemplate?.METRIC_NAME} />
        );
    };
    const MetricTemplateMertic = (props) => {
        return (
            <>
                <div id='cardtilesCustomer' onClick={
                    () => props.clickerFunc(props.clicker)
                }>
                    <div className="flex justify-center " style={{ minHeight: 70 }}>
                        {
                            props?.METRIC_NAME == divRecord ?
                                <div className="bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#1B1C31] text-[13px]  p-2 w-full max-w-[145px] 2xl:max-w-[11vw] max-h-[70px] flex items-center text-center justify-center" >{props?.METRIC_NAME != "# of Graduates" ? props?.METRIC_NAME : "Graduation Rate"}</div> :
                                <div className="bg-[#1d1d31] rounded-md box_sha1 text-white  border-4 border-[#1B1C31]  text-[13px] p-2 w-full max-w-[145px] 2xl:max-w-[11vw] max-h-[70px] flex items-center text-center cursor-pointer justify-center" >{props?.METRIC_NAME != "# of Graduates" ? props?.METRIC_NAME : "Graduation Rate"}</div>
                        }

                    </div>
                </div>
            </>
        );
    };

    const handleView = (type) => {
        setMapType(type)
    }

    const style = {
        backgroundImage: `url(${whiteBgLogoImg})`,
        backgroundRepeat: 'no-repeat'
    };


    const handleBoundaryChange = (value) => {
        setMapBoundary(value);

        if (value === "Radius") {
            // Show the circle if a place is selected
            if (selectedPlace) {
                // Ensure any previous circle is removed
                if (circleRef.current) {
                    circleRef.current.setMap(null);
                }

                // Convert radius from miles to meters
                const radiusInMeters = radius * 1609.34;

                // Create a new circle and update the ref
                circleRef.current = new window.google.maps.Circle({
                    center: { lat: selectedPlace.lat, lng: selectedPlace.lng },
                    radius: radiusInMeters,
                    map: map, // Immediately add circle to the map
                    options: {
                        strokeColor: '#4469ef',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#c1ccf1',
                        fillOpacity: 0.35,
                    }
                });

                // Adjust the map view to fit the circle within the bounds
                map.fitBounds(circleRef.current.getBounds());

            }
        } else if (value === "All Schools") {
            // Hide the circle if it exists
            if (circleRef.current) {
                circleRef.current.setMap(null);
            }

            // Adjust the map view to show all schools
            map.setZoom(11);
            map.panTo(center);
        }
    };



    return (
        <div>
            <div className="relative z-10 w-full text-gray-700 py-0  top-0 z-10 headar-wrapper bg-[transparent]">
                <div className="grid grid-cols-7 gap-4">
                    <div className="text-white ">
                        <div className="p-2 px-4">

                            <img src={darkTheme ? DarkBgLogoImg : whiteBgLogoImg} width={150} />
                        </div>
                    </div>

                    <div className=" col-span-1 ">
                        <label className={`text-[12px]  ${darkTheme ? 'text-white' : 'text-black font-bold'} align-left`}>Search by</label>
                        <div className="p-inputgroup w-full md:w-30rem custom-inputgroup">
                            {/* <Dropdown
                                className="p-inputgroup-addon p-rounded-left p-rounded-right !mr-[16px]"
                                optionLabel="name"
                                value={city}
                                options={dropdownOptions}
                                onChange={(e) => setCity(e.value)}
                                placeholder={city}
                            /> */}



                            {/* <Dropdown
                                options={locationItems}
                                placeholder="Location"
                                value={searchBy}
                                onChange={(e) => {
                                    const { value } = e.target
                                    setSearchBy(value)
                                }}
                                className="p-inputgroup-addon p-rounded-left"
                            /> */}
                            <span className="p-inputgroup-addon p-bg-primary">
                                <i className="pi pi-plus-circle cursor-pointer" style={{ fontSize: '1.5rem' }} onClick={(e) => op.current.toggle(e)}> </i>
                                <OverlayPanel ref={op}>
                                    <div className="card flex justify-content-center">
                                        <form className="p-fluid" >
                                            <div className="field">
                                                <label htmlFor="city">City</label>
                                                <InputText
                                                    id="city"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter city"
                                                    autoComplete="city"
                                                />
                                            </div>
                                            <div className="field mt-2">
                                                <label htmlFor="zipcode">Zipcode</label>
                                                <InputText
                                                    id="zipcode"
                                                    name="zipcode"
                                                    value={formData.zipcode}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter zipcode"
                                                    autoComplete="zipcode"

                                                />
                                            </div>
                                            <div className="field mt-2">
                                                <label htmlFor="street">Street</label>
                                                <InputText
                                                    id="street"
                                                    name="street"
                                                    value={formData.street}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter street"

                                                />
                                            </div>
                                            <div className="field grid grid-cols-2 gap-2 mt-2">
                                                <div>
                                                    <label htmlFor="street">Latitude</label>
                                                    <InputText
                                                        id="latitude"
                                                        name="latitude"
                                                        value={formData.latitude}
                                                        onChange={handleInputChange}
                                                        placeholder="Latitude (##,00000...)"
                                                    />

                                                </div>

                                                <div>
                                                    <label htmlFor="street">Longitude</label>
                                                    <InputText
                                                        id="longitude"
                                                        name="longitude"
                                                        value={formData.longitude}
                                                        onChange={handleInputChange}
                                                        placeholder="Longitude (##,00000...)"
                                                    />

                                                </div>
                                            </div>

                                            <div className="grid grid-cols-5 gap-2 mt-5">
                                                <button class="button" onClick={(e) => {
                                                    e.preventDefault()
                                                    if (op.current) {
                                                        op.current.hide();
                                                    }
                                                }}>Cancel</button>
                                                <button class="button" onClick={(e) => {
                                                    e.preventDefault()
                                                    handleClear()

                                                }} >Clear</button>
                                                <button class="button" onClick={handleSubmit} >Submit</button>


                                            </div>
                                        </form>
                                    </div>
                                </OverlayPanel>
                            </span>
                            <InputText value={searchQuery} className="p-rounded-right custom-inputnumber" onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Enter School or City or Zip code...." />

                        </div>
                    </div>
                    <div className="">
                        <label className={`text-[12px]  ${darkTheme ? 'text-white' : 'text-black font-bold'} align-left`}>Map Boundary</label>
                        <div className="p-inputgroup w-full map-boundry-dropdown">
                            <Dropdown
                                options={mapBoundaryItems}
                                value={mapBoundary}
                                placeholder="Location"
                                onChange={(e) => handleBoundaryChange(e.target.value)}
                                // onChange={(e) => {
                                //     const { value } = e.target
                                //     setMapBoundary(value)

                                // }}
                                className="p-inputgroup-addon p-rounded-left"
                            />

                        </div>


                        {/* <div className="grid map-boundary">
                            <label className={`text-[12px]  ${darkTheme ? 'text-white' : 'text-black font-bold'} align-left`}>Map Boundary</label>
                            <Dropdown
                                options={mapBoundaryItems}
                                value={mapBoundary}
                                
                                onChange={(e) => {
                                    const { value } = e.target
                                    setMapBoundary(value)
                                   
                                }}
                                placeholder="Select a Location"
                                className="rounded-dropdown"
                            />
                        </div> */}
                    </div>
                    <div className="text-white">
                        <div className="grid map-boundary ml-2 in-miles">
                            <label className={`text-[12px] mt-[5px]  ${darkTheme ? 'text-white' : 'text-black font-bold'} align-left`}>Radius (in miles)</label>
                            {/* <InputNumber inputId="minmax-buttons" value={radius} mode="decimal" showButtons className="w-[50px] custom-inputnumber" /> */}
                            <InputNumber inputId="minmax-buttons" value={radius} onChange={(e) => {
                                setRadius(e.value)
                            }}
                                onKeyDown={handleKeyDown}
                                onValueChange={(e) => setRadius(e.value)} mode="decimal" showButtons className="w-[50px] custom-inputnumber" />


                        </div>
                    </div>
                    <div className="alert-dialog">
                        <Dialog header="Alert" visible={alertVisible} style={{ width: '50vw' }} onHide={() => { if (!alertVisible) return; setAlertVisible(false); }}>
                            <p className="m-0 mt-2">
                                Location not found! Please try another search.
                            </p>
                        </Dialog>

                    </div>
                    {/* <div className={`absolute top-[12%] right-3 text-lg text-white dark:text-black mt-0.5 cursor-pointer ${darkTheme ? 'bg-[#f0eaea8f] rounded-[50%]' : ''}`} onClick={(e) => { setDartTheme((prev) => !prev) }}>
                        {darkTheme ?
                            <img src={darkTheme ? DarkTheme : DarkTheme} width={24} /> :
                            <img src={darkTheme ? DarkTheme : DarkTheme} width={24} />}

                    </div> */}

                </div>

                {/* <div className={`absolute top-1 right-3 text-lg text-white dark:text-black mt-0.5 cursor-pointer ${darkTheme ? 'bg-[#f0eaea8f] rounded-[50%]' : ''}`} onClick={(e) => { setDartTheme((prev) => !prev) }}>
                    {darkTheme ?
                        <img src={darkTheme ? DarkTheme : DarkTheme} width={24} /> :
                        <img src={darkTheme ? DarkTheme : DarkTheme} width={24} />}
                   
                </div> */}
                {/* {darkTheme ? <i className="pi pi-sun text-white" style={{ fontSize: '1.4rem' }}></i> : 
                <i className="pi pi-moon text-black" style={{ fontSize: '1.4rem' }}></i>} */}
                <div x-data="{ open: false }" className="mt-1 flex flex-col mx-auto md:items-center md:justify-between md:flex-row">

                    <div className="flex flex-row items-center justify-between p-2 px-4">
                        {/* <Link to="/" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"> */}
                        {/* <AppLogo /> */}

                        {/* <img src={darkTheme ? DarkBgLogoImg : whiteBgLogoImg} width={150} /> */}

                        {/* <div>
                                <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for a place" />
                                <button onClick={handleSearch}>Search</button>
                            </div> */}

                        {/* </Link> */}
                        <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                <path x-show="!open" fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                <path x-show="open" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>


                    {/* <div>
                        <div className="card flex justify-content-center">
                            <div className="p-inputgroup w-full md:w-30rem custom-inputgroup">
                                <Dropdown
                                    options={locationItems}
                                    placeholder="Location"
                                    value={"Location"}
                                    className="p-inputgroup-addon p-rounded-left"
                                />
                                <span className="p-inputgroup-addon p-bg-primary">
                                    <i className="pi pi-plus-circle" style={{ fontSize: '1.5rem' }} onClick={(e) => op.current.toggle(e)}> </i>
                                    <OverlayPanel ref={op}>
                                        <div className="card flex justify-content-center">
                                            <form className="p-fluid" onSubmit={handleSubmit}>
                                                <div className="field">
                                                    <label htmlFor="city">City</label>
                                                    <InputText
                                                        id="city"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter city"
                                                    />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="zipcode">Zipcode</label>
                                                    <InputText
                                                        id="zipcode"
                                                        name="zipcode"
                                                        value={formData.zipcode}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter zipcode"
                                                    />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="street">Street</label>
                                                    <InputText
                                                        id="street"
                                                        name="street"
                                                        value={formData.street}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter street"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-5 gap-2">
                                                    <Button type="button" label="Cancel" size="large" />
                                                    <Button type="button" label="Clear" size="small" />
                                                    <Button type="submit" label="Submit" size="small" />
                                                </div>
                                            </form>
                                        </div>
                                    </OverlayPanel>
                                </span>
                                <InputText value={searchQuery} className="p-rounded-right custom-inputnumber" onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search for a place" />
                               
                            </div>
                        </div>
                        <div className="card flex  justify-between ">
                            <div className="grid map-boundary">
                                <label className="text-[12px] text-white align-left">Map Boundary</label>
                                <Dropdown
                                    options={mapBoundaryItems}
                                    value={"Radius"}
                                    placeholder="Select a Location"
                                    className="rounded-dropdown"
                                />
                            </div>

                            <div className="grid map-boundary ml-2">
                                <label className="text-[12px] text-white ">Radius (in miles)</label>
                                <InputNumber
                                    placeholder="e.g. 1, 2"
                                    className="w-[50px]"
                                />
                            </div>
                        </div>


                    </div> */}

                    <nav className="bg-[#1B1C31] py-1 px-2 hidden md:flex md:items-center md:justify-end md:flex-row -mt-[130px] mr-[40px]">
                        <div className="flex-col items-center justify-end max-w-[350px]">
                            <h2 className="text-xl text-white text-end">School Performance</h2>
                            <p className="text-xs text-white text-end" style={{ position: "relative", left: "7px" }}>Comparative View of Key Areas Like Assessments and Behavior</p>
                        </div>

                        <div className="relative flex items-center gap-3 ml-5 profile-block" x-data="{ open: false }">
                            <div className="px-2"><button onClick={() => setVisibleRight(true)}><i className="pi pi-bars text-xl text-white"></i></button></div>
                            {/* <HRProfile /> */}
                        </div>
                    </nav>
                </div>
                <div>
                    <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>


                        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                            <TabPanel header="  " headerTemplate={BarHeaderTemplate} headerClassName="flex align-items-center">
                                <div className="bg-[#0d234c] p-5 h-[120px]">
                                    <h2 className="text-[18px] text-[#fff]">Navigation Menu</h2>
                                    <p className="text-[14px] text-[#fff]">Search through the list of Navigation menus</p>
                                </div>
                                <div className="px-3 py-3 menu">
                                    <ul onClick={handleClick1}>
                                        <li className={pagename == "/dashboard" ? "active" : ''}><Link to='/dashboard'>District at a Glance</Link></li>
                                        <li className={pagename == "/StrengthWeakness" ? "active" : ''}><Link to='/StrengthWeakness'>Strength & Weakness</Link></li>
                                        <li className={pagename == "/StudentPerformance" ? "active" : ''}><Link to='/StudentPerformance'>Student Performance & Progress</Link></li>
                                        {/* <li><Link to='/collegecareerreadiness'>College and Career Readiness</Link></li> */}
                                        {/* <li><Link to='/humanResources'>Human Resources</Link></li> */}
                                        <li className={pagename == "/enrollment" ? "active" : ''}><Link to='/enrollment'>Enrollment</Link></li>
                                        {/* <li><Link to='/districtgoals'>District Goal & Strategy</Link></li> */}
                                        <li className={pagename == "/studentbehavior" ? "active" : ''}><Link to='/studentbehavior'>Student Behaviour</Link></li>
                                        <li className={pagename == "/schoolperformance" ? "active" : ''}><Link to='/schoolperformance'>School Performance</Link></li>
                                        {/* <li><Link to='/GraduationRateAnalysis'>Graduation Rate Analysis</Link></li> */}
                                        <li className={pagename == "/statebenchmarking" ? "active" : ''}><Link to='/statebenchmarking'>State Benchmarking</Link></li>
                                        <li className={pagename == "/financedashboard" ? "active" : ''}><Link to='/financedashboard'>Financial Dashboard</Link></li>

                                    </ul>

                                </div>

                            </TabPanel>
                            <TabPanel header="" headerTemplate={FilterHeaderTemplate} headerClassName="flex align-items-center">
                                <div className="bg-[#0d234c] p-5 h-[auto]">
                                    <h2 className="text-[18px] text-[#fff]">Filters</h2>
                                    <p className="text-[14px] text-[#fff]">Apply filters for Advanced Search</p>
                                    <FilterComponent />
                                </div>
                            </TabPanel>
                            <TabPanel header="" headerTemplate={SettingHeaderTemplate} headerClassName="flex align-items-center">
                                <div className="bg-[#0d234c] p-5 h-[120px]">
                                    <div className="text-[18px] text-[#fff] mb-3" style={{ cursor: "pointer" }} onClick={hangleLogOut}>LogOut</div>
                                    <h2 className="text-[18px] text-[#fff]">Resources</h2>
                                    {/* <p className="text-[14px] text-[#fff]">SApply filters for Advanced Search</p> */}
                                </div>
                            </TabPanel>
                        </TabView>



                    </Sidebar>
                </div>
            </div>
            {console.log("titles", titles)}
            <LoaderContainer loading={School_Performance_Map_Reportdataloading}>
                <div className="fixed left-0 top-0 bottom-0 right-0">
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122283.79110569143!2d74.16882735484785!3d16.708456761646506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1000cdec07a29%3A0xece8ea642952e42f!2sKolhapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1676303987916!5m2!1sen!2sin" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                    {/* <iframe id="iframeId" height="100%" width="100%"></iframe> */}
                    {console.log("selectedPlace", darkTheme)}
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            // center = {{ lat: 51.501904, lng: -0.115871 }}
                            // center = {{  lat: 34.0188859, lng: -84.2396037 }}

                            center={selectedPlace ? { lat: selectedPlace.lat, lng: selectedPlace.lng } : center}
                            // center={selectedPlace ? { lat: selectedPlace.lat, lng: selectedPlace.lng } : center}
                            // zoom={selectedPlace ? 15 : 11}
                            zoom={selectedPlace ? 15 : 11}
                            onLoad={onLoad}
                            // onUnmount={onUnmount}
                            options={options}
                            mapTypeId={mapType}
                        // options={{ styles: darkTheme ? mapStyle : lightMapStyle }}

                        // mapContainerStyle={containerStyle}
                        // center={selectedPlace ? { lat: selectedPlace.lat, lng: selectedPlace.lng } : center}
                        // zoom={selectedPlace ? 15 : 11}
                        // options={{ mapTypeId: 'roadmap' }}
                        >
                            {/* Show the selected place marker and boundary */}

                            {selectedPlace && (
                                <>
                                    <Marker
                                        position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                                        label={{ text: selectedPlace.name, color: "#fff" }}
                                    />
                                    {/* Note: Circle is not rendered here anymore, it is handled via circleRef */}
                                </>
                            )}

                            {/* {selectedPlace && (
                                <>
                                    <Marker
                                        position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                                        label={{
                                            text: selectedPlace.name,
                                            color: "#fff"
                                        }}
                                    />
                                    <Circle
                                        center={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                                        radius={radius}
                                        options={{
                                            strokeColor: '#4469ef',
                                            strokeOpacity: 0.8,
                                            strokeWeight: 2,
                                            fillColor: '#c1ccf1',
                                            fillOpacity: 0.35,
                                        }}
                                    />
                                    {performanceData && (
                                            <InfoWindow
                                                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                                                onCloseClick={() => setPerformanceData(null)}
                                            >
                                                <div>
                                                    <h4>{performanceData.name}</h4>
                                                    <p>Performance Data: {performanceData.performanceData}</p>
                                                </div>
                                            </InfoWindow>
                                        )}
                                </>
                            )} */}

                            {/* Your existing map code for displaying school markers */}
                            {School_Performance_Map_Reportdata11.map((location, index) => {
                                const { SCHOOL_TYPE } = location;
                                // console.log(location,'location1233')
                                let school_name = getAbbreviation(SCHOOL_TYPE);

                                return (
                                    <>
                                        <Marker
                                            key={index}
                                            onClick={() => handleMarkerClick(location)}
                                            position={{ lat: Number(location.LATITUDE), lng: Number(location.LONGITUDE) }}
                                            icon={{
                                                url: SCHOOL_TYPE === "Elementary Schools" ? locationIcon1 : SCHOOL_TYPE === "Middle Schools" ? locationIcon2 : locationIcon3,
                                                scaledSize: new window.google.maps.Size(30, 30) // Adjust the size here
                                            }}
                                            label={{
                                                text: school_name,
                                                color: "#fff",
                                            }}
                                        />

                                        {titles.traffic === "Traffic" ? <TrafficLayer /> : null}
                                        {titles.transit === "Transit" ? <TransitLayer /> : null}
                                        {titles.bicycling === "Bicycling" ? <BicyclingLayer /> : null}

                                    </>
                                );
                            })}

                            {/* Selected marker info window (if any) */}
                            {selectedMarker && (
                                <div className="absolute top-2/5 left-2/4 -translate-x-2/4 z-20" style={{ position: "relative", top: "40%" }}>
                                    <div className="flex justify-center">
                                        <div className="rounded-full relative">
                                            <div className="bg-white p-4 rounded-lg box_sha1 arrow_box">
                                                <div className="flex justify-between gap-5">
                                                    <div className="text-md fontsemibold">{selectedMarker?.SCHOOL_NAME}</div>
                                                    <div onClick={() => setSelectedMarker(null)}>
                                                        <Link><i className="pi pi-times text-[#000000] f-s-9"></i></Link>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <div className="text-[#3c474a] text-sm"><span className="font-semibold">School Type :</span> {selectedMarker?.SCHOOL_TYPE}</div>
                                                    <div className="text-[#3c474a] text-sm"><span className="font-semibold">Address :</span> {selectedMarker?.SCHOOL_STREET}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </GoogleMap>
                    ) : <div>Loading...</div>}
                </div>
            </LoaderContainer>

            <div className="px-4 mt-1 2xl:mt-1  2xl:px-6 3xl:px-7">
                <div className="flex items-start justify-between">
                    <div className="bg-[#181726] w-full max-w-[20%] p-4 box-sha relative z-10 top-[-7px]">
                        <div className="flex items-center justify-between">
                            <div className="text-md text-white">School Details</div>
                            <div className="flex gap-2">
                                <div className="text-lg text-white mt-0.5 cursor-pointer" onClick={(e) => { setDartTheme((prev) => !prev) }}>{darkTheme ? <i className="pi pi-sun" style={{ fontSize: '1.4rem' }}></i> : <i className="pi pi-moon" style={{ fontSize: '1.4rem' }}></i>}</div>
                                {/* <div>
                                    <label class="switch"><input type="checkbox" /> <span class="slider round"></span> </label>
                                </div> */}
                                {/* <div className={`absolute top-[12%] right-3 text-lg text-white dark:text-black cursor-pointer ${darkTheme ? 'bg-[#f0eaea8f] rounded-[50%]' : ''}`} onClick={(e) => { setDartTheme((prev) => !prev) }}>
                                    {darkTheme ?
                                        <img src={darkTheme ? DarkTheme : DarkTheme} width={24} /> :
                                        <img src={darkTheme ? DarkTheme : DarkTheme} width={24} />}
                                </div> */}
                            </div>
                        </div>
                        <LoaderContainer loading={School_Performance_School_Type_Reportdataloading}>

                            <div className="flex items-center space-x-3 mt-5">
                                <div className="text-center">
                                    <div className="w-[64px]">
                                        <img src={school_icon} alt="" />
                                    </div>
                                    <div className="mt-3">
                                        <div className="text-white font-semibold text-2xl leading-none">{School_Performance_School_Type_Reportdatanew[0]?.VALUE}</div>
                                        <div className="text-white text-md">School</div>
                                    </div>
                                </div>
                                {console.log("School_Performance_School_Type_Reportdatanew", School_Performance_School_Type_Reportdatanew)}
                                <div className="w-full h-full bg-red-400 space-y-1 school_tabs">
                                    {
                                        School_Performance_School_Type_Reportdatanew?.map(itr => {
                                            return (
                                                <SchoolType clicker={itr} clickerFunc={handleTopTileFilterClick2} LABEL={itr?.LABEL} VALUE={itr?.VALUE} color={itr?.color} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </LoaderContainer>
                    </div>

                    {selectedMarker && selectedMarker ?
                        <LoaderContainer loading={School_Performance_Pie_Chart_Reportdataloading}>
                            <div className="bg-[#1b1c31]  text-white border-2 border-t-[#1b1c31] border-b-[#1b1c31] border-l-[#1b1c31] border-r-[#1b1c31] w-full max-w-[20%] school_table relative z-10">
                                <p className="head">{divRecord}</p>
                                <div className="flex justify-between gap-4 px-2 py-2">
                                    <div className="text-sm fontsemibold">School Information</div>
                                    <div onClick={handleMarkerClick1}><Link><i className="pi pi-times f-s-9"></i></Link></div>
                                </div>
                                {/* <div className="px-5"><img src={school_campus} alt="" /></div> */}
                                <div className="text-[16px] px-3 py-1 selectd-school">{selectedMarker?.SCHOOL_NAME}</div>
                                <div className="text-[12px] text-white px-2"><i className="f-s-9 pi pi-flag-fill mr-1"></i>{selectedMarker?.SCHOOL_STREET}</div>
                                {/* <div className="text-[10px] text-white px-5"><i className="f-s-9 pi pi-phone mr-1"></i></div> */}
                                <div className="flex items-center mt-2 gap-3 border-b border-white/[5] pb-2 px-2">
                                    <div className="rounded overflow-hidden">
                                        <img src={avatar_head} className="max-w-[38px]" alt="" />
                                    </div>
                                    <div>
                                        <div className="text-xs">Principal</div>
                                        <div className="text-xs">{selectedMarker?.SCHOOL_PRINCIPAL}</div>
                                    </div>
                                </div>
                                <div className="StudentCenters">
                                    <div className="text-xs text-white text-left pt-2">{divRecord}</div>
                                    <div className="flex justify-between mt-0">
                                        <div className="flex items-center space-x-2 w-full">
                                            {/* <div className="bg-[#2acd72] w-3 h-3 rounded-full"></div> */}
                                            {
                                                selectedMarker?.METRIC_PROFICIENCY_BAND == "Chronic" ? <div className="rounded overflow-hidden" style={{ position: "relative", left: "6px" }}>
                                                    <img src={selectedMarker?.TARGET_PERCENTAGE > selectedMarker?.CURRENT_PERCENTAGE ? locationIcon3 : locationIcon1} className="max-w-[38px]" alt="" />
                                                </div> :
                                                    selectedMarker?.METRIC_PROFICIENCY_BAND == "Excellent" ? <div className="rounded overflow-hidden" style={{ position: "relative", left: "6px" }}>
                                                        <img src={darkTheme ? locationIcon3 : locationIcon} className="max-w-[38px]" alt="" />
                                                    </div> :
                                                        selectedMarker?.METRIC_PROFICIENCY_BAND == "Basic" ? <div className="rounded overflow-hidden" style={{ position: "relative", left: "6px" }}>
                                                            <img src={locationIcon2} className="max-w-[38px]" alt="" />
                                                        </div> : null
                                            }
                                            {/* <div className="text-sm">{selectedMarker?.VALUE}%</div> */}
                                            <div className="text-sm">{pieChartData[0]?.OVERALL_AVG_CURR_VALUE?.toFixed(2)}%</div>
                                        </div>
                                        <div className="text-xs text-white w-full" style={{ position: "relative", fontSize: "12px", top: "3px" }}>
                                            {/* Target :{selectedMarker?.TARGET_PERCENTAGE}% */}
                                            Target : {pieChartData[0]?.TARGET?.toFixed(2)}%
                                        </div>
                                        <div className="text-xs text-white w-full" style={{ position: "relative", fontSize: "12px", top: "3px" }}>
                                            {/* Last Period :{selectedMarker?.LAST_PERIOD_PERCENTAGE}% */}
                                            Last Period : {pieChartData[0]?.OVERALL_AVG_PREV_VALUE?.toFixed(2)}%
                                        </div>
                                    </div>
                                    <ReactEcharts option={StudentCenters} />
                                </div>
                            </div>
                        </LoaderContainer> :
                        <>
                            {/* <p>{divRecord}</p> */}

                            <div className="bg-[#1b1c31]  text-[12px] text-white border-2 border-t-[#1b1c31] border-b-[#1b1c31] border-l-[#1b1c31] border-r-[#1b1c31] w-full max-w-[22%] school_table relative z-10 h-[350px] xl:h-[28.229vw] 2xl:h-[28.229vw] overflow-y-auto ">
                                <p className="head">{divRecord}</p>
                                {/* <table className="w-full" cellPadding={0} cellSpacing={0}>
                                    <tr className="bg-[#181725]">
                                        <td align="center" style={{ fontSize: "13px" }}>School Name</td>
                                        <td align="center" style={{ fontSize: "13px" }}>{divRecord}</td>
                                    </tr>
                                    {currentItems && currentItems?.map(itr => {
                                        return (
                                            <tr>
                                                <td width='60%'>{itr?.SCHOOL_OFFICIAL_NAME}</td>
                                                <td>{itr?.CURRENT_PERCENTAGE}%</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td align="center"><button className={`paginationprevious ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevClick} disabled={currentPage === 1}>Previous</button></td>
                                        <td align="center"><button className={`paginationnext ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleNextClick} disabled={currentPage === totalPages}>Next</button></td>
                                    </tr>
                                </table> */}
                                <LoaderContainer loading={School_Performance_Map_Reportdataloading}>
                                    <SchoolPerformanceTableComponent School_Performance_Map_Reportdata={School_Performance_Map_Reportdata} divRecord={divRecord} selectedmetricschool={selectedmetricschool} />
                                </LoaderContainer>
                            </div>


                        </>



                    }




                </div>
                {console.log("School_Performance_Metric_Reportatanew", School_Performance_Metric_Reportatanew)}
                <div className="absolute left-0 right-0 bottom-[2.9rem] mapbottom-matrics"
                //  style = {{width:"54rem",position:"relative",left:"18rem"}}
                >
                    <LoaderContainer loading={School_Performance_Metric_Reportataloading}>
                        <div className="school_per_sldr">
                            {
                                School_Performance_Metric_Reportatanew && <Carousel value={School_Performance_Metric_Reportatanew} numVisible={4} numScroll={1}
                                    itemTemplate={MetricTemplate} />
                            }
                        </div>
                    </LoaderContainer>
                    {/* <Carousel value={School_Performance_Metric_Reportata} numVisible={4} numScroll={1}  itemTemplate={MetricTemplate} /> */}
                    {/* <div className="flex justify-center gap-4">
                        <div onClick={(event) => {handleClickmetric(event,'1');}} className={selectedmetric == '1'?"bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] flex items-center text-center":"bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] flex items-center text-center"} >{School_Performance_Metric_Reportata[0]?.METRIC_NAME}</div>
                        <div onClick={(event) => {handleClickmetric(event,'2');}} className={selectedmetric == '2'?"bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] flex items-center text-center":"bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] flex items-center text-center"}>{School_Performance_Metric_Reportata[1]?.METRIC_NAME}</div>
                        <div onClick={(event) => {handleClickmetric(event,'3');}} className={selectedmetric == '3'?"bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] flex items-center text-center":"bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] flex items-center text-center"}>{School_Performance_Metric_Reportata[2]?.METRIC_NAME}</div>
                        <div onClick={(event) => {handleClickmetric(event,'4');}} className={selectedmetric == '4'?"bg-white rounded-md box_sha1 text-[#1d1d31] border-4 border-t-[#FFC700] text-md p-2 w-full max-w-[173px] flex items-center text-center":"bg-[#1d1d31] rounded-md box_sha1 text-white text-md p-2 w-full max-w-[173px] flex items-center text-center"}>{School_Performance_Metric_Reportata[3]?.METRIC_NAME}</div>
                    </div> */}
                </div>

                <div className="flex justify-between items-center fixed left-[100px] right-[150px] bottom-[-5px] xl:bottom-[--2vw] text-white p-4 gap-[0.7rem] w-[70%]">
                    <div className="flex gap-[0.7rem]">
                        <div className={`relative flex justify-center items-center bg-black bg-opacity-50 p-2 rounded-md cursor-pointer ${mapType === "roadmap" ? 'border-2 border-white-500' : null}`} onClick={() => handleView('roadmap')}
                            style={{ backgroundImage: `url('/road_map.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md z-10"></div>
                            <span className="relative z-20">Map</span>
                        </div>
                        <div className={`relative flex justify-center items-center bg-black bg-opacity-50 p-2 rounded-md cursor-pointer ${mapType === "satellite" ? 'border-2 border-white-500' : null}`} onClick={() => handleView('satellite')}
                            style={{ backgroundImage: `url('/satellite_image.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md z-10"></div>
                            <span className="relative z-20">Satellite</span>
                        </div>


                    </div>
                    <div class="btn-group flex justify-between btn-group bg-white rounded-md box_sha1 text-[#1d1d31] border-4  text-[13px]  w-full max-w-[245px] 2xl:max-w-[11vw] max-h-[70px] flex items-center text-center justify-center h-[30px]">

                        <div className={`${titles.traffic === "Traffic" ? 'bg-[#79a6d0] rounded-[15px]' : null} w-[30%] h-[30px]`} onClick={() => handleClick('traffic', 'Traffic')} >
                            <button class="btn-group__item btn-group__item" style={{ padding: '0.3rem' }} rounded >Traffic</button>

                        </div>
                        <div className={`${titles.transit === "Transit" ? 'bg-[#79a6d0] rounded-[15px]' : null} w-[30%] h-[30px]`} onClick={() => handleClick('transit', 'Transit')}>

                            <button class="btn-group__item" style={{ padding: '0.3rem' }}>Transit</button>
                        </div>
                        <div className={`${titles.bicycling === "Bicycling" ? 'bg-[#79a6d0] rounded-[15px]' : null} w-[30%] h-[30px]`} onClick={() => handleClick('bicycling', 'Bicycling')}>
                            <button class="btn-group__item" style={{ padding: '0.3rem' }}>Bicycling</button>

                        </div>
                    </div>
                    {/* <div className="flex gap-[0.7rem]">
                        <div className={`relative flex justify-center items-center bg-[#dbe4f7] bg-opacity-50 p-2 rounded-md cursor-pointer ${titles.traffic ? 'border-2 border-white-500' : null}`} onClick={() => handleClick('traffic', 'Traffic')}
                            style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md z-10"></div>
                            <span className="relative z-20">{titles.traffic || 'Traffic'}</span>
                        </div>
                        <div className={`relative flex justify-center items-center bg-[#dbe4f7] bg-opacity-50 p-2 rounded-md cursor-pointer ${titles.bycycling ? 'border-2 border-white-500' : null}`} onClick={() => handleClick('bicycling', 'Bicycling')}
                            style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md z-10"></div>
                            <span className="relative z-20">{titles.bicycling || 'Bicycling'}</span>
                        </div>
                        <div className={`relative flex justify-center items-center bg-[#dbe4f7] bg-opacity-50 p-2 rounded-md cursor-pointer ${titles.transit ? 'border-2 border-white-500' : null}`} onClick={() => handleClick('transit', 'Transit')}
                            style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md z-10"></div>
                            <span className="relative z-20">{titles.transit || 'Transit'}</span>
                        </div>
                    </div> */}
                </div>


            </div>
        </div >
    )
}