// --- Dependecies
import React, { useState } from 'react';
import * as $ from 'jquery';
import {
  fnIsArray,
  fnIsSimpleArray,
  fnIsDoubleArray,
  fnIsMagnitude,
  LtTooltip
}
from './standarFunctions';
// --- Model Component elements
import {Stack, IconButton, Box, TextField, Autocomplete} from '@mui/material';

// --- Icons
import CloseIcon                  from '@mui/icons-material/Close';
import HelpIcon                   from '@mui/icons-material/Help';
import SettingsBackupRestoreIcon  from '@mui/icons-material/SettingsBackupRestore';
import InfoRoundedIcon            from '@mui/icons-material/InfoRounded';

// --- Get other Components
import GetMonitordIconType from './GetMonitordIconType';
import GetUnitSelecttype   from './GetUnitSelecttype';
import TuneIcon            from '@mui/icons-material/Tune';
import AnnouncementIcon    from '@mui/icons-material/Announcement';




function SelectedElement({ id, monitorData, component, menuHandle, diActivateReload }) {
  /*
   * Store the state of all input options
   */
  const [inputState, setInputState] = useState({
    single: "",
    fromRange: "",
    toRange: "",
    single2Dx: "",
    single2Dy: "",
    fromRange2Dx: "",
    fromRange2Dy: "",
    toRange2Dx: "",
    toRange2Dy: ""
  })
  
  const [openIndexModal, setOpenIndexModal]     = useState(false);
  const [enableResetIndex, setEnableResetIndex] = useState(false);

  const [textIndex, setTextIndex]                   = useState("/");
  const [indexTypeChoosen, setIndexTypeChoosen]     = useState("range");
  const [indexTypeChoosen2D, setIndexTypeChoosen2D] = useState("range2D");


  /*
   * Get Icons
   */
  const icontype = <GetMonitordIconType type={ monitorData.type } />;
  
  
  /*
  * Apply changes warning message
  */
 const applyChangesWarning = <LtTooltip
                                title={
                                  <React.Fragment>
                                    <b className="label-indHlp-tooltip">{"To apply these changes you have"}</b><br />
                                    <b className="label-indHlp-tooltip">{"to press the "}<i>{"'Search & Display'"}</i></b><br />
                                    <b className="label-indHlp-tooltip">{"button again."}</b>
                                  </React.Fragment>
                                }
                                placement="left" className="tool-tip-options">
                                <AnnouncementIcon className="index-help-icon"/>
                              </LtTooltip>

  /*
  * Get unit conversion options
  */
  const unitOptions = <GetUnitSelecttype 
                        id={id} 
                        unitType={(monitorData.unitType === undefined) ? "None" : monitorData.unitType} 
                        applyChangesWarning={ applyChangesWarning }
                      />; 


  /*
   * If the button is alredy active when a new monitor is selected, apply the changes
   */
  let lessDetailIfActive;
  if ($('#lessDetail-icon').hasClass('color-menu-active')) {
    lessDetailIfActive = 'display-none';
  }

  /*
   * Handle monitor settings options OPEN popover
   */
  const handleClickOpenSettings = (id) => {
    const offset = $('.id-TuneIcon-sett' + id).offset();
    $('.id-mon-sett' + id).toggleClass('display-none').offset({ top: offset.top, right: offset.right});
    $('.close-settingsMon' + id).toggleClass('display-none');
    setOpenIndexModal(false);
  };

  /*
   * Handle disabled color input
   */
   const handleClickDisabledColor = (id) => {
     if ($('.colorInput' + id).is(":checked")) {
       $('.selectColorInput' + id).prop('disabled', false);
     }else {
       $('.selectColorInput' + id).prop('disabled', true);
     }
   }

   /*
    * handle open "choose index" modal
    */
    const openModal = () => {
      setOpenIndexModal(preState => !preState);
    }

   /*
    * handle add index 1D
    */
    const addIndexNumber = (type, single, fromRange, toRange) => {
      let text = "";
     
      if (type === "range") {
        text += "[" + fromRange + "-" + toRange + "]";
      }
      else {
        text += "[" + single + "]";
      }

      if ((type === "single" && single === "") || ((type === "range" && fromRange === "") || toRange === "")) {

      }
      else if (Number(fromRange) > Number(toRange) || Number(fromRange) === Number(toRange)) {
        
      }
      else {
        if (textIndex === "/") {
          setTextIndex(text);
          setEnableResetIndex(true);
        }
        else {
          setTextIndex(textIndex + ";" + text);
        }
      }
    }

    /*
     * handle add index 2D
     */
     const addIndexNumber2D = (type, single2Dx, single2Dy, fromRange2Dx, fromRange2Dy, toRange2Dx, toRange2Dy) => {
       let text = "";
       if (type === "range2D") {
           text += "[" + ((fromRange2Dx === "") ? "0" : fromRange2Dx) + "," + fromRange2Dy + "-" + ((toRange2Dx === "") ? "0" : toRange2Dx) + "," + toRange2Dy + "]";
       }
       else {
         text += "[" + ((single2Dx === "") ? "0" : single2Dx) + "," + single2Dy + "]";
       }

       if ((type === "single2D" && single2Dy === "") || ((type === "range2D" && fromRange2Dy === "") || toRange2Dy === "")) {
          // $("").addClass("wrong-set-input");
       }
       else if (fromRange2Dx > toRange2Dx) {
         // $("").addClass("wrong-set-input");
       }else{
         // $("").removeClass("wrong-set-input");
         if (textIndex === "/") {
           setTextIndex(text);
           setEnableResetIndex(true)
         }
         else {
           setTextIndex(textIndex + ";" + text);
         }
       }
     }

     /*
      * handle onchange index input
      */
      const handleChange = (e) => {
        const value = e.target.value;
        setInputState({
          ...inputState,
          [e.target.name]: value
        })
      }

      const onRemove = (id) => {
        const elem = document.getElementById(id);
        elem.parentNode.removeChild(elem);
        // $(".tr-monMag" + id).empty();
        // setTimeout(() => {
          menuHandle(id, 'diselectMonitor');
          diActivateReload();
        // }, 2000);

        
      }
  
  return(
    <tr className={`tr-monMag${id}`} id={id} >
      <td>
      <div className="monitor-selected-td-container">

        <Stack className={`monitor-selected-info_component_id ${lessDetailIfActive}`} direction="row">
          <div className="monitor-selected-info-component">
            <span>{ component }</span>
          </div>
          <div className="monitor-selected-info">
              <span>version: { monitorData.version } - </span>
              { 
                (fnIsMagnitude(monitorData.type)) ?
                  <>              
                    <span>MagnitudeType: { monitorData.magnitudeType.name } - </span>
                  </>
                  :
                  <>              
                    <span>unit: { monitorData.unit } - </span>
                  </>
              }
              <span>type: { monitorData.type } - </span>
              <span>id: { id }</span>
          </div>
        </Stack>


        <div className="align-content-flex-row">

        <div className="monitor-seleted-options-icons">
          <div onClick={() => { onRemove(id) }}  className="monitor-seleted-closeIcon">
            <CloseIcon />
          </div>
          {
            icontype
          }
        </div>

        <div className="monitor-seleted-item-box">

          <Stack className="monitor-seleted-item" direction="row">
            <div className="monitor-selected-item-title-box">
              <p className="monitor-selected-item-title monitor-name">
              {
                (!fnIsMagnitude(monitorData.type)) ?
                <>
                    <LtTooltip
                      title={ 
                      <React.Fragment>
                        <b className="label-indHlp-tooltip">{"Descirption:"}</b><br />
                        <span className="indHlp-vis-desc">{ monitorData.description }</span>
                      </React.Fragment>
                        
                      }
                      placement="right" className="tool-tip-options-description">
                      <InfoRoundedIcon className="description-info-icon" />
                    </LtTooltip>
                  </>
                  : ""
                }
              <span className="monitor-selected-monitorMagnitudeName">{ monitorData.magnitude }</span>
              </p>
            </div>

            <IconButton onClick={() => {handleClickOpenSettings(id)}} arai-label="tune-setings" className={`settings-selected-monitor id-TuneIcon-sett` + id}>
              <TuneIcon />
            </IconButton>

            <div className={`close_rangeZone-monitor-settings display-none close-settingsMon` + id} onClick={() => {handleClickOpenSettings(id)}}></div>
            <Box className={`setting-selectd-monitor-options-box display-none id-mon-sett` + id} id="mon-settings-sx" sx={{boxShadow: 3}}>
              <div className="monitor-selected-select-contain">
                <div className="monitor-selected-select-box">

                  <div className="checkbox-monitor-selected">
                    <div className="label-monitor-settings">Presentation:</div>
                    <div className="input-settings-checkbox">
                      <label className="label-cont-inputchecbox settings-checkbox-presnetation">
                        logarithm
                        <input
                          type="checkbox"
                          name="logarithm"
                          // value={inputState.logarithm}
                          // onChange={handleChange}
                          className="checkboxMo checkboxMo-monitor logarithm"
                        />
                        <span className="checkmark"></span>
                      </label>
                        <label className="label-cont-inputchecbox settings-checkbox-presnetation">
                        curved
                        <input
                          type="checkbox"
                          name="curved"
                          // value={inputState.curved}
                          // onChange={handleChange}
                          className="checkboxMo checkboxMo-monitor curved"
                        />
                      <span className="checkmark"></span>
                      </label>
                      <label className="label-cont-inputchecbox settings-checkbox-presnetation">
                        filled
                        <input
                          type="checkbox"
                          name="filled"
                          // value={inputState.filled}
                          // onChange={handleChange}
                          className="checkboxMo checkboxMo-monitor filled"
                        />
                      <span className="checkmark"></span>
                      </label>
                      {/*<label className="label-cont-inputchecbox settings-checkbox-presnetation">
                        dotted
                        <input type="checkbox" className="checkboxMo checkboxMo-monitor dotted" />
                        <span className="checkmark"></span>
                      </label>*/}
                    </div>
                  </div>

                  <div className="limtis-monnitor-settings-box">
                    <div className="label-monitor-settings">Limits:</div>
                    <div className="limtis-monnitor-settings-inputs">
                      <label className="monitor-limits-label "> Max: </label>
                      <input
                        type="text"
                        max="9999999"
                        min="-9999999"
                        placeholder="0.."
                        name="max"
                        className="input-limits-grafic-options yaxisMax"
                      />
                      <label className="monitor-limits-label"> Min: </label>
                      <input
                        type="text"
                        max="9999999"
                        min="-9999999"
                        placeholder="0.."
                        name="min"
                        className="input-limits-grafic-options yaxisMin"
                      />
                    </div>
                  </div>
                </div>

                  <div className="monitor-selected-input-box">
                    <div className="label-monitor-settings">Graphic Type:</div>

                    <span className="monitor-selected-input-label-selects label-selects-grafic-type">Grafic Type:</span>
                    <select defaultValue={{ label: "Grafic Type", value: 0 }} className="monitor-selected-select grafic-type">
                      <option value="Line Series<">Line Series</option>
                      <option value="Step Line Series">Step Line Series</option>
                    </select>

                    <div className="visualization-monitor-settings">
                      <div className="label-monitor-settings label-visualization">Visualization:</div>
                      <span className="monitor-selected-input-label-selects">StrokeWidth:</span>
                      <select className="monitor-selected-select stroke-width">
                        <option value="2">Medium</option>
                        <option value="1">Light</option>
                        <option value="3">Bold</option>
                        <option value="4">Bolder</option>
                      </select>
                      <span className="monitor-selected-input-label-selects">Canvas:</span>
                      <select className="monitor-selected-select canvas-width">
                        <option value="1">Default</option>
                        <option value="3, 3">Dotted</option>
                        <option value="10">Dashed</option>
                        <option value="10, 5">Large Dashed</option>
                        <option value="10, 5, 2, 5">Dotted Dashed</option>
                      </select>
                      <span className="monitor-selected-input-label-selects">Color:</span>
                      <div className="monitor-selected-checkbox-color">
                        <input disabled className={`monitor-selected-input-color color-line selectColorInput` + id} type="color" />
                        <label onClick={() => { handleClickDisabledColor(id)} } className="label-cont-inputchecbox settings-checkbox-presnetation set-color-settings-checkbox">
                        <input type="checkbox" className={`checkboxMo checkboxMo-monitor checkbox-color colorInput` + id} />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="monitor-selected-input-Unit-box">
                    <div>
                      <div className="label-monitor-settings">Unit Conversion:</div>
                        <span className="monitor-selected-input-label-selects label-selects-grafic-type">Conversions:</span>
                        {
                          applyChangesWarning
                        }
                    </div>

                      { // get unit options from component GetUnitType
                        unitOptions
                      }

                    <div className="label-monitor-settings-pattern">Decimal Pattern:</div>
                      <div>
                        <label className="monitor-limits-label "> Pattern: </label>
                        <LtTooltip
                          title={
                            <React.Fragment>
                              <b className="label-indHlp-tooltip">{"Instructions:"}</b><br />
                              <span className="indHlp-vis">{"This option set how many decimals places"}</span><br />
                              <span className="indHlp-vis">{"you want to display in the value."}</span><br />
                            </React.Fragment>
                          }
                          placement="left" className="tool-tip-options">
                          <HelpIcon className="index-help-icon"/>
                        </LtTooltip>
                        {
                          applyChangesWarning
                        }
                      </div>
                      <Autocomplete
                        disablePortal // --> disabled entrys not related with the select
                        // freeSolo
                        id={`Pattern` + id}
                        name="deimnalPattern"
                        className="input-limits-grafic-options input-select-pattern"
                        options={[
                          "00.0",
                          "00.00",
                          "00.000",
                          "00.0000",
                          "00e5",
                          "00e6",
                          "00e7",
                          "00e8",
                        ]}
                        renderInput={(params) => <TextField {...params} />}
                      />
                  </div>
                        
                </div>
                <div className="indexInput-tooltip-contain">
                {
                  (!fnIsArray(monitorData.type)) ? '' :
                    <>
                      <div className="indexInput-tooltip-box">
                        <label className="monitor-limits-label"> Index: </label>
                        {
                          (fnIsSimpleArray(monitorData.type)) ?
                            <LtTooltip
                              title={
                                <React.Fragment>
                                  <b className="label-indHlp-tooltip">{"Available formats:"}</b><br />
                                  <span className="indHlp-vis">{"empty      -  return all"}</span><br />
                                  <span className="indHlp-vis">{"1,3,7        -  return several selected"}</span><br />
                                  <span className="indHlp-vis">{"0-5           -  return a range"}</span><br />
                                  <span className="indHlp-vis"><b className="info-indHlp-tooltip">{"Available Positions:"}</b> {monitorData.dimension_x * monitorData.dimension_y}</span><br />
                                </React.Fragment>
                              }
                              placement="left" className="tool-tip-options">
                              <HelpIcon className="index-help-icon"/>
                            </LtTooltip>
                            :
                              <LtTooltip
                              title={
                                <React.Fragment>
                                  <b className="label-indHlp-tooltip">{"Available formats:"}</b><br />
                                  <span className="indHlp-vis">{"empty      -  return all"}</span><br />
                                  <span className="indHlp-vis">{"0,1 , 0,3   -  return several 2D selected"}</span><br />
                                  <span className="indHlp-vis">{"0,4-6,8     -  return 2D range"}</span><br /><br />
                                  <span className="indHlp-vis"><b className="info-indHlp-tooltip">{"Available Positions:"}</b> {monitorData.dimension_x * monitorData.dimension_y}</span><br />
                                </React.Fragment>
                              }
                              placement="left" className="tool-tip-options">
                              <HelpIcon className="index-help-icon"/>
                              </LtTooltip>
                        }
                         {
                           applyChangesWarning
                         }
                      </div>
                      <LtTooltip title={textIndex} enterDelay={900} leaveDelay={100} placement="left" className="tool-tip-options">
                        <div className="array-index-box">
                          <div onClick={() => { openModal() }} className="array-index-button-box">
                            {"{"}
                              <span className={`array-index-button-text Index${id}`}>
                              {
                                textIndex
                              }
                              </span>
                            {"}"}
                          </div>
                          {
                            (enableResetIndex) ?
                            <div
                              onClick={() => {
                                setEnableResetIndex(false);
                                setTextIndex("/");
                              }}
                              className="clear-choose-index-box"
                            >
                              <SettingsBackupRestoreIcon className="clear-choose-icon"/>
                            </div>
                            : ""
                          }
                        </div>
                      </LtTooltip>
                      {
                      (openIndexModal) ?
                        (fnIsSimpleArray(monitorData.type)) ?
                          <div className="choose-array-index-box">
                            <div className="index-choose-inputs-box">
                        {
                          (indexTypeChoosen === "single") ?
                            <div className="index-inputIndex-choose-single-box">
                              <input
                                type="number"
                                max="999"
                                min="-1"
                                placeholder="0.."
                                name="single"
                                value = {inputState.single}
                                onChange={handleChange}
                                className={`index-inputIndex-choose index-inputIndex-choose-single single-i`}
                              />
                            </div>
                          : (indexTypeChoosen === "range") ?
                            <div className="index-inputIndex-choose-range-box">
                              <input
                                type="number"
                                max="999"
                                min="-1"
                                placeholder="0.."
                                name="fromRange"
                                value = {inputState.fromRange}
                                onChange={handleChange}
                                className={`index-inputIndex-choose index-inputIndex-choose-range range-iF`}
                              />
                                <span className="input-range-separator"> - </span>
                              <input
                                type="number"
                                max="999"
                                min="-1"
                                placeholder="0.."
                                name="toRange"
                                value = {inputState.toRange}
                                onChange={handleChange}
                                className={`index-inputIndex-choose index-inputIndex-choose-range range-iT`}
                              />
                            </div>
                          : ""
                        }
                            </div>
                            <div className="index-choose-button-box">
                                <div onClick={() => { setIndexTypeChoosen("range") }} className="index-choose-button index-choose-range">
                                  <span>Range</span>
                                </div>
                                <div onClick={() => { setIndexTypeChoosen("single") }} className="index-choose-button index-choose-selected">
                                  <span>Single</span>
                                </div>
                                <div onClick={() => {
                                  if (indexTypeChoosen === "single") {
                                    addIndexNumber(indexTypeChoosen, inputState.single, false);
                                  }
                                  else if (indexTypeChoosen === "range") {
                                    addIndexNumber(indexTypeChoosen, false, inputState.fromRange, inputState.toRange);
                                  }
                                }} className="index-choose-button index-choose-add">
                                  <span>Add</span>
                                </div>
                            </div>
                        </div>

                        : (fnIsDoubleArray(monitorData.type)) ?
                          <div className="choose-array-index-box choose-index-box-2D">
                            <div className="index-choose-inputs-box">
                          {
                            (indexTypeChoosen2D === "single2D") ?
                              <div className="index-inputIndex-choose-single-box choose-single-box2D">
                                <input
                                  type="number"
                                  max="999"
                                  min="0"
                                  placeholder="0.."
                                  name="single2Dx"
                                  value = {inputState.single2Dx}
                                  onChange={handleChange}
                                  className={`index-inputIndex-choose index-inputIndex-choose-single`}
                                />
                                  <span className="input-range-separator"> , </span>
                                <input
                                  type="number"
                                  max="999"
                                  min="0"
                                  placeholder="0.."
                                  name="single2Dy"
                                  value = {inputState.single2Dy}
                                  onChange={handleChange}
                                  className={`index-inputIndex-choose index-inputIndex-choose-single`}
                                />
                              </div>
                            : (indexTypeChoosen2D === "range2D") ?
                              <div className="index-inputIndex-choose-range-box">
                                <input
                                  type="number"
                                  max="999"
                                  min="0"
                                  placeholder="0.."
                                  name="fromRange2Dx"
                                  value = {inputState.fromRange2Dx}
                                  onChange={handleChange}
                                  className={`index-inputIndex-choose index-inputIndex-choose-range range-i1F`}
                                />
                                  <span className="input-range-separator"> , </span>
                                <input
                                  type="number"
                                  max="999"
                                  min="0"
                                  placeholder="0.."
                                  name="fromRange2Dy"
                                  value = {inputState.fromRange2Dy}
                                  onChange={handleChange}
                                  className={`index-inputIndex-choose index-inputIndex-choose-range range-i2F`}
                                />
                                <span className="input-range-separator"> - </span>
                                <input
                                  type="number"
                                  max="999"
                                  min="0"
                                  placeholder="0.."
                                  name="toRange2Dx"
                                  value = {inputState.toRange2Dx}
                                  onChange={handleChange}
                                  className={`index-inputIndex-choose index-inputIndex-choose-range range-i1T`}
                                />
                                  <span className="input-range-separator"> , </span>
                                <input
                                  type="number"
                                  max="999"
                                  min="0"
                                  placeholder="0.."
                                  name="toRange2Dy"
                                  value = {inputState.toRange2Dy}
                                  onChange={handleChange}
                                  className={`index-inputIndex-choose index-inputIndex-choose-range range-i2T`}
                                />
                              </div>
                            : ""
                          }
                            </div>
                            <div className="index-choose-button-box">
                                <div onClick={() => { setIndexTypeChoosen2D("range2D") }} className="index-choose-button index-choose-range">
                                  <span>Range</span>
                                </div>
                                <div onClick={() => { setIndexTypeChoosen2D("single2D") }} className="index-choose-button index-choose-selected">
                                  <span>Single</span>
                                </div>
                                <div onClick={() => {
                                  if (indexTypeChoosen2D === "single2D") {
                                    addIndexNumber2D(indexTypeChoosen2D, inputState.single2Dx, inputState.single2Dy);
                                  }
                                  else if (indexTypeChoosen2D === "range2D") {
                                    addIndexNumber2D(indexTypeChoosen2D, false, false, inputState.fromRange2Dx, inputState.fromRange2Dy, inputState.toRange2Dx, inputState.toRange2Dy);
                                  }
                                }} className="index-choose-button index-choose-add">
                                  <span>Add</span>
                                </div>
                            </div>
                        </div>
                        : ""
                      : ""
                      }
                    </>
                  }
                  </div>

            </Box>
          </Stack>
          </div>
        </div>

      </div>
      </td>
    </tr>
  );
}

export default SelectedElement;
