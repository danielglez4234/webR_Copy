// --- React dependencies
import React, { useState, useEffect }  from 'react';

// --- Dependencies
import * as $                 from 'jquery';
import { getDataFromServer } from '../services/services';

import moment                 from 'moment';
import { DatePicker }         from 'antd';
import 'antd/dist/antd.css';

// --- Imported functions
import { useDispatch, useSelector } from 'react-redux';
import {
  hadleSearch,
  setloadingButton,
  loadGraphic,
  setSamples,
  setTotalResponseData,
  getUrl,
  setActualPage
}
from '../actions';
import {
  fnIsState,
  fnIsScalar,
  fnIsArray,
  getCategory
}
from './standarFunctions'


// --- Model Component elements
import LoadingButton                            from '@mui/lab/LoadingButton';
import {Stack, MenuItem, FormControl, Select }  from '@mui/material';

// --- Icons
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowRightIcon            from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon             from '@mui/icons-material/ArrowLeft';
// import StopCircleIcon            from '@mui/icons-material/StopCircle';


import DownloadEmailData from './DownloadEmailData';
//import AdvancedOptions from './AdvancedOptions';
// import StoreQuery     from './StoreQuery';
import PopUpMessage      from './handleErrors/PopUpMessage';

function PerformQuery(props) {
  const dispatch             = useDispatch();
  const [msg, handleMessage] = PopUpMessage();

  const monitor          = useSelector(state => state.monitor);
  const loadWhileGetData = useSelector(state => state.loadingButton);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [samplingValue, setSamplingValue] = useState('');
 
  /*
   * 'loadWhileGetData' will be set to true when the data has arrive, and then buttons will be active again
   */
  useEffect(() => {
    if (loadWhileGetData) {
      setLoadingSearch(false);
    }
  }, [loadWhileGetData]);



  /*
   * Build url with monitors and place index if necessary
   */
  const constructURL = (begin_date, end_date, sampling) =>{
    let queryRest ="";
    let url;
    for (let i = 0; i < monitor.length; i++)
    {
        const infoMonitor = monitor[i].monitorData;
        /* 
         * magnitud("b","e"); scalar("d","f","l","s","o"); arrays("D","F","L","S","O"); doubleArrays("9","8","7","6","5");
         * state("state");
         */
        queryRest += "id" + getCategory(infoMonitor.type) + "=";

        if (fnIsScalar(infoMonitor.type))
        {
          queryRest += infoMonitor.id;
        }
        else if (fnIsArray(infoMonitor.type))
        {
          /*
           * Get Inex
           */
          let index = $(".Index" + infoMonitor.id).text();
          if (index === '/') {
            index = "[[-1]]";
            queryRest += infoMonitor.id + index;
          }else {
            index = "[" + index + "]";
            queryRest += infoMonitor.id + index;
          }
        }
        else if (fnIsState(infoMonitor.type))
        {
          console.log(infoMonitor.component);
          queryRest += infoMonitor.component;
        }
        else
        {
          handleMessage({ 
            message: 'Error: Type is not supported. \n Please contact the system administrator.', 
            type: 'error',
            persist: true,
            preventDuplicate: false
         })
        }
        
        // /*
        //  * Get Unit
        //  */
        // let unitType = $("#Unit" + infoMonitor.id).val();
        // queryRest += "{" + ((unitType === "") ? "Default" : unitType);
        // /*
        //  * Get decimal Pattern
        //  */
        // let decimalPattern = $("#Pattern" + infoMonitor.id).val();
        // queryRest += "," + ((decimalPattern === "") ? "0" : decimalPattern) + "}";


        if ((i + 1) < monitor.length){
            queryRest += "&";
        }

    }
    console.log("queryRest: " + queryRest);
    return url = begin_date.replace(/\s{1}/,"@")+".000/"+end_date.replace(/\s{1}/,"@")+".000/"+sampling+"?"+queryRest;
  };






  /*
   * Get Samples From Server
   */
  const getSamplesFromServer = (begin_date, end_date, sampling) => {
      /*
       * Construct url
       * we send the data twice because the 'donwload button' uses only the function construct 
       * to avoid displaying it on the graph
       */
      let url = constructURL(begin_date, end_date, sampling);

  		let iDisplayLength  = 30000;
  		let iDisplayStart   = 0;

      dispatch(getUrl(url));
  		url += "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength;
 

      Promise.resolve( getDataFromServer({url}) )
      .then(res => { 
          const totalArraysRecive  = res.samples.length;
          const totalRecords       = res.iTotalRecords;
          const totalPerPage       = iDisplayLength // <----------------- change with backend response
          if (totalArraysRecive === 0) 
          {
            const noData = res.samples // we do this to simplify it to just one array field and thus avoid modifying the sample reducer
            dispatch(setSamples(noData)); // noData ---> []
          }
          dispatch(setSamples(res, sampling));
          dispatch(setTotalResponseData(totalArraysRecive, totalRecords, totalPerPage));
          console.log("samples-arrive");
          console.log(
            "URLbase: "+ props.serviceName  + encodeURI(url) + " \n \
            ------------------------------------------------------------------------------------------------------------ \n \
            MonitorsMagnitude Data was recibe successfully!! \n \
            Sampling Period Choosen: " + sampling + " microsegundos \n \
            Arrays Recived: " + totalArraysRecive + " \n \
            total Records: " + totalRecords + " \n \
            ------------------------------------------------------------------------------------------------------------"
          );
        })
        .catch(error => {
          handleMessage({ 
            message: 'Error: ' + error.response.data + " - Code " + error.response.status, 
            type: 'error',
            persist: true,
            preventDuplicate: false
          })
          console.error(error);
        })
        .finally(() => {
          dispatch(setloadingButton(true));
          dispatch(loadGraphic(false));
          $(".block-monitor-selected-when-searching").remove(); // unlock monitor selected section
        })
  	};

 /*
  * get sampling input value
  */
   const handleChange = (event) => {
       setSamplingValue(event.target.value);
   };

  /*
   * Hide Component and monitor list
   */
  const hideAndShowSection = () => {
    $('.perform-query-section').toggleClass('hide-sections');
    $('.arrow-showPerfomSection').toggleClass('hide-sections');
  }

  /*
   * Check Dates and sampling inputs before submit
   */
  const checkOnSubmit = (button_click) => {
    const perform      = true; // initial state use to check searched monitors selected comparation
    let begin_date     = $('#beginDate').val();
    let end_date       = $('#endDate').val();
    let sampling       = samplingValue;

    // change format to YYYY/MM/DD
    let begin_dateformatA = begin_date.split(" ");
    begin_dateformatA = begin_dateformatA[0].split(/[-/]/).reverse().join('/') + " " + begin_dateformatA[1];

    let end_dateformatA = end_date.split(" ");
    end_dateformatA = end_dateformatA[0].split(/[-/]/).reverse().join('/') + " " + end_dateformatA[1];

    // Tranform to epoch '1678976324'
    const begin_dateLong = new Date(begin_dateformatA).getTime();
    const end_dateLong   = new Date(end_dateformatA).getTime();

    // if sampling is not selected is set to 0 by default
    if (sampling === ""){
      sampling = 0;
    }
    // handle all errors from the date inputs
    if (begin_date === '' || end_date === '')
    {
      handleMessage({ 
        message: 'The Date Fields cannot be empty', 
        type: 'warning', 
        persist: false,
        preventDuplicate: false
     })
     return false
    }
    else if (begin_dateLong > end_dateLong)
    {
      handleMessage({ 
        message: 'The begin Date cannot be greater than end Date', 
        type: 'warning', 
        persist: false,
        preventDuplicate: false
     })
     return false
    }
    else if (begin_date === end_date)
    {
      handleMessage({ 
        message: 'The begin and end Date cannot be the same', 
        type: 'warning', 
        persist: false,
        preventDuplicate: false
     })
     return false
    }
    else if (monitor[0] === undefined)
    {
      handleMessage({ 
        message: 'There are no monitors selected', 
        type: 'warning', 
        persist: false,
        preventDuplicate: false
     })
     return false
    }
    else
    {
      if(button_click !== "download")
      {
        setLoadingSearch(true);
        dispatch(setActualPage(false, 0, 0)); // reset pagination if it is already display
        let searchedMonitors = monitor.map(e => e.id); // save the monitors id's that where choosen for the search
        dispatch(hadleSearch(perform, begin_date, end_date, sampling, searchedMonitors));
        dispatch(setloadingButton(false));
        dispatch(loadGraphic(true));
        /*
         * construct the url and call the server data 
         */
        getSamplesFromServer(begin_date, end_date, sampling);
      }
      else
      {
        /*
         * construct the url for download
         */
        return constructURL(begin_date, end_date, sampling)
      }
      return true
    }
  }


    return(
      <div className="container-adjust-height">
      <div className="arrowShowHide arrow-showPerfomSection hide-sections"><ArrowLeftIcon onClick={() => { hideAndShowSection() }} className="arrow-rightSection" /></div>
      <div className="perform-query-section">
          <div className="sample-header-perform-query">
            <Stack direction="column" spacing={1}>
              <Stack className="stack-row-components-title-buttons" direction="row">
                <p className="components-item-title">Perform Querys</p>
                <ArrowRightIcon onClick={() => { hideAndShowSection() }} className="hide_icon_componentList"/>
             </Stack>

             <div className="perform-query-date-time-picker">
               <DatePicker
                  id="beginDate"
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  format="DD/MM/YYYY HH:mm:ss"
                  placeholder="Start Date"
                />
                <DatePicker
                  id="endDate"
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  format="DD/MM/YYYY HH:mm:ss"
                  placeholder="End Date"
                />
             </div>

             <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                className="select-sampling-perform-query"
                value={samplingValue}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  <em className="default-select-sampling">Sampling (microsecond)</em>
                </MenuItem>
                <MenuItem value={0}>Default</MenuItem>
                <MenuItem value={1000}>1 millisecond</MenuItem>
                <MenuItem value={2000}>2 milliseconds</MenuItem>
                <MenuItem value={5000}>5 milliseconds</MenuItem>
                <MenuItem value={10000}>10 milliseconds</MenuItem>
                <MenuItem value={100000}>100 milliseconds</MenuItem>
                <MenuItem value={200000}>200 milliseconds</MenuItem>
                <MenuItem value={500000}>500 milliseconds</MenuItem>
                <MenuItem value={1000000}>1 second</MenuItem>
                <MenuItem value={10000000}>10 seconds</MenuItem>
                <MenuItem value={60000000}>1 minute</MenuItem>
                <MenuItem value={120000000}>2 minutes</MenuItem>
                <MenuItem value={300000000}>5 minutes</MenuItem>
                <MenuItem value={3600000000}>1 hour</MenuItem>
              </Select>
            </FormControl>
            </Stack>
          </div>

            <div className="perform-query-buttons-box">
              <Stack spacing={1}>

                  { // Advance options component Multi axis
                  /*<AdvancedOptions />*/
                  }
                  {
                    /*
                     * Perform Seacrh Button
                     */
                  }
                  <div className="flex-row">
                    <LoadingButton
                      onClick={() => {
                        checkOnSubmit('display');
                      }}
                      loading={loadingSearch}
                      loadingPosition="start"
                      className="perfrom-query-button-search"
                      variant="contained"
                      startIcon={<PlayCircleFilledWhiteIcon/>}
                    >
                      Search & Display
                    </LoadingButton>
                    {
                      /*
                       * Cancel Button
                       */
                    }
                    {/*<LoadingButton
                      onClick={() => {
                        handleCancelQuery();
                      }}
                      disabled={cancelQuery}
                      loading={loadingCancelQuery}
                      loadingPosition="start"
                      className="perfrom-query-button-cancel-data"
                      variant="contained"
                      startIcon={<StopCircleIcon />}
                    >
                    </LoadingButton>*/}
                  </div>

                  { // Only Download data component
                  <DownloadEmailData 
                    service = { props.serviceIP } 
                    checkOnSubmit = { checkOnSubmit } 
                  />
                  }

              </Stack>
            </div>


            {/* <StoreQuery />  */}


            </div>
          </div>
    );

}
export default PerformQuery;
