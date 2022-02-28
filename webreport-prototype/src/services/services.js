import axios from "axios";

/*
 * get server name from .env
 */
const { REACT_APP_SERVICES_IP } = process.env;

/*
 * set headers properties to avoid CORS rejection
 */
const httpHeaderOptions = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

/*
 * calling /components to get all components
 */
export const getComponents = () => {
    return axios.get(REACT_APP_SERVICES_IP + "/WebReport/rest/webreport/components", {header: httpHeaderOptions})
            .then(res => res.data)
}

/*
 * calling /ccomponents/<componentName> to get all monitors from a component
 */
export const getMonitorsFromComponent = ({componentName}) => {
    console.log(componentName);
    return axios.get(REACT_APP_SERVICES_IP + "/WebReport/rest/webreport/components/" + componentName, {header: httpHeaderOptions})
        .then(res => {
            const enumList  = res.data.magnitudeDescriptions;
            const escalList = res.data.monitorDescription;
            if (enumList.length > 0 || escalList.length > 0) 
            {
                return axios.get(REACT_APP_SERVICES_IP + "/WebReport/rest/webreport/state_definition", {header: httpHeaderOptions})
                    .then(res =>  {           
                    const stateInfo = {
                        magnitude: 'STATE',
                        type: 'state',
                        stateValues: res.data
                    };
                    const conactMonitors  = [...escalList, ...enumList, stateInfo];
                    return conactMonitors;
                })
            }
            else 
            {
                return false;
            }
    });
}

/*
 * calling /search to get the data 
 */
export const getDataFromServer = ({url}) => {
    return axios.get(REACT_APP_SERVICES_IP + "/WebReport/rest/webreport/search/" + encodeURI(url), {header: httpHeaderOptions})
            .then(res => res.data)
}

/*
 * calling /download to get csv transform data
 */
export const getDownloadData = ({url}) => { 
    console.log("download url:" + REACT_APP_SERVICES_IP + "/WebReport/rest/webreport/download/" + encodeURI(url));
    return axios.get(REACT_APP_SERVICES_IP + "/WebReport/rest/webreport/download/" + encodeURI(url), {header: httpHeaderOptions})
            .then(res => res.data)
}

/*
 * calling compatible conversion for a Unit type
 */
export const getUnitConversion = (unitType) => {
    return axios.get(REACT_APP_SERVICES_IP + "/WebReport/rest/webreport/unit/" + unitType, {header: httpHeaderOptions})
            .then(res => res.data)
}