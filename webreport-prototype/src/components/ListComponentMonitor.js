// --- React dependencies
import React, { useState, useEffect } from 'react';

// --- Dependencies
import $                              from "jquery";
import { fnIsState }                  from './standarFunctions';

import { 
  getComponents, 
  getMonitorsFromComponent 
} from '../services/services'

import { useDispatch, useSelector }   from 'react-redux';
import {
  selectMonitor,
  setloadingButton
}
from '../actions';
import Fuse                           from 'fuse.js';

// --- Model Component elements
import { Stack, Skeleton }            from '@mui/material';
import { 
  Search,
  SearchIconWrapper,
  StyledInputBase 
} from './standarFunctions';

// --- Icons
import SearchIcon                     from '@mui/icons-material/Search';
import SnippetFolderIcon              from '@mui/icons-material/SnippetFolder';
import ArrowLeftIcon                  from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon                 from '@mui/icons-material/ArrowRight';
import HelpOutlineIcon                from '@mui/icons-material/HelpOutline';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';

// --- React Components link
import ComponentElement               from './ComponentElement';
import MonitorElement                 from './MonitorElement';
import PopUpMessage                   from './handleErrors/PopUpMessage';



function ListComponentMonitor(props) {
  const dispatch             = useDispatch();
  const [msg, handleMessage] = PopUpMessage();

  const monitorAlreadySelected  = useSelector(state => state.monitor);

  const [idMonitorsAlreadySelected, setIdMonitorsAlreadySelected] = useState([]);

  const [data_components, setData_components]            = useState([]);
  const [loadingComponent, setLoadingComponent]          = useState(true);
  const [component_clicked, setComponent_clicked]        = useState('');
  const [resultQueryComponent, setResultQueryComponent]  = useState([]);

  const [data_monitors, setData_monitors]                = useState([]);
  const [initialStateMonitors, setInitialStateMonitors]  = useState(true);
  const [loadingMonitors, setLoadingMonitors]            = useState(true);
  const [resultQueryMonitor, setResultQueryMonitor]      = useState([]);
  const [monitorsAvailable, setNoMonitorsAvailable]      = useState(true);

  const [connectionError, setConnectionError] = useState(false);


  /*
   * Declare condition html variables
   */
  const noSelectedComponent = <div className="noComponentSelected-box">
                                <SnippetFolderIcon className="noComponentSelected-icon" />
                                <p className="noComponentSelected-title">No Component Selected From Component Item List</p>
                              </div>;
  const skeleton            = <div>
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                              </div>;
  const noResultFound       = <div className="noComponentSelected-box">
                                <HelpOutlineIcon className="noComponentSelected-icon" />
                                <p className="noComponentSelected-title">No Results Found</p>
                              </div>;
  const noMonitorElements    = <div className="noComponentSelected-box">
                                <HelpOutlineIcon className="noComponentSelected-icon" />
                                <p className="noComponentSelected-title">No Monitors Found</p>
                              </div>;
  const error               = <div className="noComponentSelected-box">
                                <ReportGmailerrorredRoundedIcon className="noComponentSelected-icon" />
                                <p className="noComponentSelected-title">Connection Error</p>
                              </div>;



  /*
   * Get All Components
   */
  useEffect(() => {
    $("#initialImg").removeClass('display-none');
    Promise.resolve( getComponents() )
      .then(res => {
        setData_components(res);
        setResultQueryComponent(res); 
        console.log("Comoponet Data was recibe successfully");
      })
      .catch(error => { 
        setConnectionError(true);
        handleMessage({ 
          message: 'Error fetching components data on the Server', 
          type: 'error', 
          persist: true,
          preventDuplicate: false
        })
        console.error(error);
      })
      .finally(() => { 
        setLoadingComponent(false);
      });
    handleMessage({ 
      message: 'WARNING: Pagination is currently not working properly, we are working on fixing it', 
      type: 'warning', 
      persist: true,
      preventDuplicate: true
    });
  }, []);

  /*
   * Check if monitor is alredy selected
   */
  useEffect(() => {
    setIdMonitorsAlreadySelected(monitorAlreadySelected)
  }, [monitorAlreadySelected]);


  /*
   * Get All MonitorsMagnitude and state from a Component
   */
  const getMonitors = (title) =>{
    document.getElementById('searchInputCompMon').value = ''; // reset the value of the input search when a component is clicked
    if (component_clicked !== title)
    {
      setInitialStateMonitors(false); // initial monitors section state to false
      setComponent_clicked(title);
      setLoadingMonitors(true);
      Promise.resolve( getMonitorsFromComponent({componentName: title}) )
      .then(res => {
        if (res) 
        {
          setLoadingMonitors(false);
          setNoMonitorsAvailable(false);
          setData_monitors(res);
          setResultQueryMonitor(res);
          console.log("Get monitors from component successfully");
        }
        else 
        {
          setLoadingMonitors(false);
          setNoMonitorsAvailable(true);
        }
      })
      .catch(() => {
      handleMessage({ 
         message: 'Error fetching monitors data on the Server', 
         type: 'error', 
         persist: true,
         preventDuplicate: true
      })
        console.error(error);
      })
    }
  }

    /*
     * Handle Search For Components
     */
    const handleSearchComponent = value => {
      $('.component-list-items').scrollTop(0);
      const fuse = new Fuse(data_components);
      const results = fuse.search(value);
      const searchResult = results.map(result => result.item);
      if (value === '')
      {
        setResultQueryComponent(data_components);
      }else
      {
        setResultQueryComponent(searchResult);
      }
    }

    /*
     * Get current value of the input search from Components
     */
    const handleOnSeacrhComponent = ({ currentTarget = [] }) => {
      const { value } = currentTarget;
      handleSearchComponent(value);
    }

    /*
     * Handle Search For Monitors
     */
    const handleSearchMonitors = value => {
      $('.monitors-list-items').scrollTop(0);
      const fuse = new Fuse(data_monitors, {
        keys: ['magnitude']
      });
      const results = fuse.search(value);
      const searchResult = results.map(result => result.item);
      if (value === '')
      {
        setResultQueryMonitor(data_monitors);
      }else
      {
        setResultQueryMonitor(searchResult);
      }
    }

    /*
     * Get current value of the input search from Monitors
     */
    const handleOnSeacrhMonitors = ({ currentTarget = [] }) => {
      const { value } = currentTarget;
      handleSearchMonitors(value);
    }

    /*
     * Hide or Show Component and monitor list
     */
    const hideAndShowSection = () => {
      $('.SampleMonitorList-section').toggleClass('hide-sections');
      $('.arrow-showListSection').toggleClass('hide-sections');
    }

    /*
     * diActivate the reload button when a new component is selected
     */
    const diActivateReload = () => {
      dispatch(setloadingButton(false));
    }

    /*
     * dispatch variables to the global state action selectMonitor
     * we do it here and no inside the map of 'MonitorElement.js' to avoid duplication
     */
    const select = (id, monitorData, component) => {
      if (fnIsState(monitorData.type)){
        handleMessage({ 
          message: 'STATE monitors are not available at the moment, they will be added in a future update', 
          type: 'warning', 
          persist: false,
          preventDuplicate: false
        })
      }else {
        if (idMonitorsAlreadySelected.length > 0){
          if (idMonitorsAlreadySelected.filter(e => e.id === id).length > 0){
            handleMessage({ 
              message: 'The monitor ' + monitorData.magnitude + ' is alredy selected', 
              type: 'info', 
              persist: false,
              preventDuplicate: false
            })
          }
          else{
            dispatch(selectMonitor(id, monitorData, component));
          }
        }else {
          dispatch(selectMonitor(id, monitorData, component));
        }
      }
    }


  return (
    <div className="container-adjust-height">
    <div className="arrowShowHide arrow-showListSection hide-sections"><ArrowRightIcon onClick={() => { hideAndShowSection() }} className="arrow-rightSection" /></div>
    <div className="SampleMonitorList-section">
      <div className="sample-list-box">
        <div className="sample-header sample-items-components">
          <Stack direction="column" spacing={2}>
              <Stack className="stack-row-components-title-buttons" direction="row">
                <p className="components-item-title">Components Item List</p>
                <ArrowLeftIcon onClick={() => { hideAndShowSection() }} className="hide_icon_componentList"/>
             </Stack>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={handleOnSeacrhComponent}
                inputProps={{ 'aria-label': 'search' }}
                className="searchInputCompMon"
              />
            </Search>
          </Stack>
          </div>

          <div className="sample-items component-list-items">

          {
            (connectionError)  ? error :
            (loadingComponent) ? skeleton :
            (resultQueryComponent.length === 0) ? noResultFound :
            resultQueryComponent.map((element, index) =>
                <ComponentElement
                 key                = { index }
                 title              = { element }
                 getMonitors        = { getMonitors }
                 />
              )
          }

        </div>
      </div>

      <div className="monitor-of-selected-sample-box">
        <div className="sample-header sample-header-monitors">
          <Stack direction="column" spacing={2}>
             <Stack className="stack-row-components-title-buttons" direction="row">
               <p className="components-item-title">Monitors Item List</p>
             </Stack>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={handleOnSeacrhMonitors}
                inputProps={{ 'aria-label': 'search' }}
                id="searchInputCompMon"
              />
          </Search>
          </Stack>
          <p className="component-title">
            {
              component_clicked
            }
          </p>
        </div>

        <div id="offer-area" className="sample-items monitors-list-items">

          {
          (initialStateMonitors) ? noSelectedComponent :
          (loadingMonitors) ? skeleton :
          (resultQueryMonitor.length === 0 || monitorsAvailable) ? noMonitorElements :
          resultQueryMonitor.map((element, index) =>
            <MonitorElement
             key                = { index }
             id                 = { element.id }
             monitorData        = { element }
             component          = { component_clicked }
             select             = { select }
             diActivateReload   = { diActivateReload }
             />
           )
          }

        </div>

      </div>

    </div>
    </div>
  );
}

export default ListComponentMonitor;
