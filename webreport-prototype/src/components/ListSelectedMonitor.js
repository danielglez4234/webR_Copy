// --- React dependencies
import React, { useState, useEffect, ChangeEvent } from 'react';

// --- Dependencies
import * as $  from 'jquery';
import { getDataFromServer } from '../services/services';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  menuHandleSelectedMonitors,
  reloadGrafic,
  setloadingButton,
  setActualPage,
  setSamples
} from '../actions';

import loadingSls    from '../img/loadingSls.svg';
import blockMonitors from '../img/blockMonitors.svg';

// --- Model Component elements
import {
  Stack,
  Button,
  Pagination,
  LinearProgress,
} from '@mui/material';
import { LtTooltip } from './standarFunctions';


// --- Icons
import DataUsageIcon                from '@mui/icons-material/DataUsage';
import SettingsBackupRestoreIcon    from '@mui/icons-material/SettingsBackupRestore';
import ReplayIcon                   from '@mui/icons-material/Replay';
import ClearAllIcon                 from '@mui/icons-material/ClearAll';
import DetailsIcon                  from '@mui/icons-material/Details';
import ArrowDropUpSharpIcon         from '@mui/icons-material/ArrowDropUpSharp';
import ExpandMoreIcon               from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowDownIcon  from '@mui/icons-material/KeyboardDoubleArrowDown';


// --- React Components
//import MenuGraficOrTable from './MenuGraficOrTable';
import Graphic              from './Graphic';
import SelectedElement      from './SelectedElement';
import ButtonGeneralOptions from './ButtonGeneralOptions';
import PopUpMessage         from './handleErrors/PopUpMessage';





function ListSelectedMonitor(props) {
  const dispatch             = useDispatch();
  const [msg, handleMessage] = PopUpMessage();


  const monitor           = useSelector(state => state.monitor);
  const getResponse       = useSelector(state => state.getResponse);
  const onSearch          = useSelector(state => state.onSearch);
  const totalResponseData = useSelector(state => state.totalResponseData);

  const graphicStillLoading = useSelector(state => state.loadingButton);
  const loadGraphic         = useSelector(state => state.loadingGraphic);

  // pagination
  let url            = useSelector(state => state.url);
  const pagination   = useSelector(state => state.pagination);

  const [countMonitors, setCountMonitors] = useState(0);

  const [elements, setSelectedElements] = useState();
  const [onSelect, setOnSelect]         = useState(true);
  const [disabled, setDisabled]         = useState(true);

  const [startloadingGraphic, setStartloadingGraphic]   = useState(false);

  const [page, setPage]                             = useState(1);
  const [totalPages, setTotalPages]                 = useState(0);
  const [activatePagination, setActivatePagination] = useState(false);
  const [loadingPage, setLoadingPage]               = useState(false);
  const [totalPerPage, setTotalPerPages]            = useState(0);
  

  /*
   * Default State
   */
  let initialInfoText = <div className="no_monitor_selected">
                          <DataUsageIcon className="img_monitor_selected"/>
                          <p className="no_monitor_selected_message">Select a Monitor from the MonitorList</p>
                        </div>;

  /*
   * Map selected elements
   */
  useEffect(() => {
    if (monitor.length > 0) 
    {
      setOnSelect(false);
      setCountMonitors(monitor.length);
      setSelectedElements(monitor);
      console.log("useEffect listMonitor --> on > 0 " + JSON.stringify(monitor))
    }
    else 
    {
      setOnSelect(true);
      setCountMonitors(0);
      console.log("count -- MONITORS --> " + JSON.stringify(monitor))
    }
  }, [monitor]);

  /*
   * Update reload button when 'loadingbutton' and 'responseData'states changes
   */
  useEffect(() => {
    if (graphicStillLoading && getResponse.length !== 0)
    {
        if (getResponse.responseData.length !== 0 && getResponse.responseData.samples.length > 0)
        {
          let calculateTotalPages = Math.ceil(totalResponseData.totalRecords / totalResponseData.totalPerPage);
          setTotalPages(calculateTotalPages);
          setTotalPerPages(totalResponseData.totalPerPage);
          setPage(1); // set default page
          setDisabled(false);
            if (calculateTotalPages <= 1)
            {
              setActivatePagination(false);
            }else
            {
              setActivatePagination(true);
            }
        }else {
          setDisabled(true);
          setTotalPages(0);
        }
    }
    else {
      setDisabled(true);
    }
  }, [totalResponseData, graphicStillLoading]);

  /*
   * Show the loading icon for graphic when the loadingGrahic state changes
   */
  useEffect(() => {
      setStartloadingGraphic(loadGraphic);
      if(loadGraphic){
        setDisabled(true);
        $(".selected-monitors-section").prepend(
          "<div class='block-monitor-selected-when-searching'> \
            <img class='bolck-svg-monitors' alt='...' src='"+ blockMonitors +"'/> \
          </div>")
      }
  }, [loadGraphic]);


  /*
   * If perform is true the monitors selected 'id' will be stored,
   + This will reset the 'reset_button' to 'active' if it returns to
   + the original state of the monitors selected when the search was made
   */
  useEffect(() => {
    if (getResponse?.responseData && onSearch?.perform && monitor.length > 0)
    {
      let monitorLastState    = onSearch.searchedMonitors;
      let monitorsNowSelected = monitor.map(e => e.id);
      // transform object to array, so we can use the every() and includes() functions
      let a = Object.values(monitorLastState)
      let b = Object.values(monitorsNowSelected)

      let comparation = b.every(function (e) {
          let val = (a.includes(e) && a.length === b.length)
          return val
      });

      // if they match disable is set to false
      if (!loadGraphic){ // if the graphic is loading dont compare
        setDisabled(!comparation);
      }
    }
  }, [monitor, onSearch, getResponse]);


  /*
   * Hide Component and monitor list handle arrows movement
   */
  const handleExpandSection = (icon, setHeightPX) => {
    $(".menu-monitorSelected-contain").css('height', setHeightPX + "px");
    if (setHeightPX === 0) {
      $(".menu-monitorSelected-contain").addClass('hide-sections');
      $(".selected-monitors-select-all").addClass('hide-sections');
    }else {
      $(".menu-monitorSelected-contain").removeClass('hide-sections');
      $(".selected-monitors-select-all").removeClass('hide-sections');
    }
    $('.rotback').removeClass('rotate180 activeExpandColor');
    if (icon === "visibilityMiddle-icon") {
      if (!$('.visibilityMiddle-icon').hasClass('activeExpandColor')) {
        $('.' + icon).toggleClass('activeExpandColor');
      }
    }else if (icon === "visibilityOff-icon") {
      $('.' + icon).toggleClass('rotate180 activeExpandColor');
      $('.visibilityMiddle-icon').removeClass('rotate180');
    }else {
      $('.' + icon).toggleClass('rotate180 activeExpandColor');
      $('.visibilityMiddle-icon').toggleClass('rotate180');
    }
  }

  /*
   * Show Less Details
   */
  const lessDatails = () => {
    $('.monitor-selected-info_component_id').toggleClass('display-none');
    $('.lessDetail-icon').toggleClass('color-menu-active');
  }

  /*
   * Reset all options
   */
  const resetOptions = () => {
    $(".checkboxMo-monitor").prop('checked', false);
    $('.color-line').prop('disabled', true);
    $(".monitor-selected-select option").attr('selected', false);
    $(".monitor-selected-select option[value='1']").attr('selected', true);
    $(".input-limits-grafic-options").val('');
  }

  /*
   * Change color when checkbox is disabled 
   */
   const disabledGraficOptions = (menuName) => {
     var checkbox = $('.' + menuName + '-checkbox')
     var menuIcon = $('.' + menuName + '-icon');

    if (checkbox.is(":checked")){
      menuIcon.addClass('color-menu-disabled');
    }else{
      menuIcon.removeClass('color-menu-disabled');
    }
   }

  /*
   * handle all menu global state acions from monitorSelected
   */
  const menuHandle = (id, type) => {
    dispatch(menuHandleSelectedMonitors(id, type));
  }

  /*
   * Disabled reload when the conditions are not compatible
   */
  const diActivateReload = () => {
    dispatch(setloadingButton(false));
    setDisabled(true);
  }

  /*
   * Check all the corresponding checkboxes when you click the selected all 
   */
  const checkAllCheckboxes = (selectedCheckbox) => {
    var checkboxAll       = $("." + selectedCheckbox + "-all");
    var checkboxMonitors  = $("." + selectedCheckbox);

    if (checkboxAll.is(":checked")) {
        checkboxMonitors.prop('checked', true);
    }else {
        checkboxMonitors.prop('checked', false);
    }
  }

  /*
   * Handle pagination input value
   */
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(setActualPage(activatePagination, totalPerPage, value, totalPages));
  };

  /*
   * Handle next page dataSamples
   */
  useEffect(()=>{
      if (getResponse.length !== 0 && pagination.active ) {

        let iDisplayLength = pagination.displayLength
        let iDisplayStart  = pagination.actualPage;

        let start = (iDisplayStart * iDisplayLength) - iDisplayLength;

        dispatch(setloadingButton(true));
        setLoadingPage(true);

        url = url.split('&iDisplayStart');
        url[0] += "&iDisplayStart="+ start +"&iDisplayLength="+ iDisplayLength;
        url = url[0];

        console.log("display - start: "+ start +" end: "+ iDisplayLength);
        console.log("url: " + props.serviceName + url);

        Promise.resolve( getDataFromServer({url}) )
        .then(res => {
          const totalArraysRecive  = res.samples.length;
          const sampling_period    = getResponse.sampling_period;
          if (totalArraysRecive === 0) 
          {
            const noData = res.samples
            dispatch(setSamples(noData));
          }
          dispatch(setSamples(res, sampling_period));

          console.log("MonitorsMagnitude Data was recibe successfully");
          console.log("Arrays recived: " + JSON.stringify(totalArraysRecive));
        })
        .catch(error => {
          handleMessage({
            message: 'Error: Request failed with status code 500', 
            type: 'error', 
            persist: true,
            preventDuplicate: false
          })
          console.error(error);
        })
        .finally(() => {
          dispatch(setloadingButton(true));
          setLoadingPage(false);
          $(".block-monitor-selected-when-searching").remove(); // unlock monitor selected section
        })
    }
  },[pagination]);


    return(
      <div className="grafic-section">

        {/*<MenuGraficOrTable />*/}

        <div  className="selected-monitors-section">
        <div className="selected-monitors-select-all">
          <div className="selected-monitors-select-all-title"> Selected Monitors </div>
            <label onClick={() =>{ checkAllCheckboxes("logarithm") }} className="label-cont-inputchecbox select-all-checkbox">logarithm
              <input type="checkbox" className="checkboxMo checkboxMo-monitor logarithm-all" />
              <span className="checkmark"></span>
            </label>
            <label onClick={() =>{ checkAllCheckboxes("curved") }} className="label-cont-inputchecbox select-all-checkbox">curved
              <input type="checkbox" className="checkboxMo checkboxMo-monitor curved-all" />
              <span className="checkmark"></span>
            </label>
            <label onClick={() =>{ checkAllCheckboxes("filled") }} className="label-cont-inputchecbox select-all-checkbox">filled
              <input type="checkbox" className="checkboxMo checkboxMo-monitor filled-all" />
              <span className="checkmark"></span>
            </label>
             {/*<label onClick={() =>{ checkAllCheckboxes("dotted") }}  className="label-cont-inputchecbox select-all-checkbox">dotted
              <input type="checkbox" className="checkboxMo checkboxMo-monitor dotted-all" />
              <span className="checkmark"></span>
            </label>*/}
        </div>

        <div className="menu-monitorSelected-contain">
            <div className="table-selected-monitors-options">

              <LtTooltip onClick={() => { resetOptions() }} title="Reset Options" placement="left" className="tool-tip-options">
                <SettingsBackupRestoreIcon className="table-selected-clearAll-icon reset-menu-icon"/>
              </LtTooltip>
              <LtTooltip onClick={() => { menuHandle('', 'diselectALLMonitor'); diActivateReload() }} title="Clear All" placement="left" className="tool-tip-options">
                <ClearAllIcon className="table-selected-clearAll-icon"/>
              </LtTooltip>
              <LtTooltip onClick={() => { lessDatails() }} title="Less Details" placement="left" className="tool-tip-options">
                <DetailsIcon id="lessDetail-icon" className="table-selected-clearAll-icon lessDetail-icon"/>
              </LtTooltip>

            </div>
            <div id="resizable" data-bottom="true" className="selected-monitors-box">
            {
              (onSelect) ? initialInfoText :
                <table id="drop-area" className="table-selected-monitors">
                 <tbody>
                   {
                      elements.map((element, index) =>
                        <SelectedElement
                          key           = { index }
                          id            = { element.id }
                          monitorData   = { element.monitorData }
                          component     = { element.component }
                          menuHandle    = { menuHandle }
                          diActivateReload = { diActivateReload }
                          />
                      )
                   }
                 </tbody>
                </table>
            }
            </div>
        </div>
        <div className="selected-monitors-extends-buttons">
          <div className="selected-monitor-count">
            º
            {
              countMonitors
            }
          </div>
          <KeyboardDoubleArrowDownIcon onClick={() => { handleExpandSection("visibilityLarge-icon", 400) }} className="section-selected-extends-icons rotback visibilityLarge-icon" />
          <ExpandMoreIcon onClick={() => { handleExpandSection("visibilityMiddle-icon", 98) }} className="section-selected-extends-icons rotback activeExpandColor visibilityMiddle-icon" />
          <ArrowDropUpSharpIcon onClick={() => { handleExpandSection("visibilityOff-icon", 0) }} className="section-selected-extends-icons rotback visibilityOff-icon" />
        </div>

      </div>


        {
          (startloadingGraphic) ? 
            <div className="img-load-svg-box">
              <img src={loadingSls} alt='loading.....' className="img-load-svg" /> 
            </div>
          : 
            <Graphic />
        }


      <div className="grafic-options-section">
        <div className="cover_amchart5-promotion"></div>

          {
            (loadingPage) ?
              <div className="loading-graphic-page-box">
                <LinearProgress className="loading-graphic-page" color="secondary" />
              </div>
            : ""
          }

        <Stack className="grafic-option-display-width" direction="row" spacing={2}>
          <div className="grafic-option-box">
              <div className="display-option-for-grafic">
                {
                  <ButtonGeneralOptions />
                }
              </div>
              {
                (startloadingGraphic) ? "" :
                (totalResponseData.length === 0) ? "" :
                  <div className="displayTotal-responseData">
                    {
                      (totalPages === 0 || totalPages === 1) ? "" :
                        <div className="pagination-box">
                          <Pagination
                            id="pagination"
                            count={totalPages}
                            disabled={disabled}
                            page={page}
                            onChange={handleChange}
                            showFirstButton
                            showLastButton
                            size="small"
                            shape="rounded"
                            siblingCount={1}
                            boundaryCount={1}
                            defaultValue={1}
                          />
                        </div>
                    }
                    <div className="totalRecord-box">
                      <p>
                        TotalDisplayed:  <span> { totalResponseData.totalArrays } </span>
                      </p>
                      <p>
                        TotalRecords: <span> { totalResponseData.totalRecords } </span>
                      </p>
                    </div>
                  </div>
              }
              <div className="grafic-option-buttons-setbox">
                <Button 
                  disabled={disabled} 
                  onClick={() => { dispatch(reloadGrafic(1)) }} 
                  className="grafic-option-buttons grafic-option-button-save" 
                  variant="contained" 
                  startIcon={<ReplayIcon />}
                >
                  Reload
                </Button>
              </div>
          </div>
        </Stack>
      </div>


    </div>
    );

}
export default ListSelectedMonitor;
