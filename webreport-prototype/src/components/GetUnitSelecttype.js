import { useState } from 'react';
import { getUnitConversion } from '../services/services';
import { TextField, Autocomplete } from '@mui/material';


function GetUnitSelecttype({id, unitType}) {
    const defaultOpt = "Default";    
    const noMatches = "No Matches";
    const [compatibleConversion, setCompatibleConversion] = useState([defaultOpt]);

    
    const getcompatibleconversion = (unitType) => {
      Promise.resolve( getUnitConversion(unitType) )
      .then(res => {
        if (res.length > 0){
          // const posibleConversion = res.map((item) => {title: item})
          // setCompatibleConversion([defaultOpt, posibleConversion]);
        }
        else 
        {
          setCompatibleConversion([defaultOpt, noMatches]); 
        }
      })
      .catch(error => {
        console.log(error);
        setCompatibleConversion([defaultOpt, noMatches]); 
      })
    }

  return (
      <Autocomplete
        disablePortal // --> disabled entrys not related with the select
        // freeSolo
        id={`Unit` + id}
        className="input-limits-grafic-options input-select-unit"
        name="deimnalPattern"
        // defaultValue={[compatibleConversion[0]]}
        onOpen={() => {
          if(true){
            getcompatibleconversion(unitType);
          }else {

          }
        }}
        options={["000"]}
        // getOptionLabel={(option) => option || ""}
        // getOptionDisabled={(option) => 
        //   option === compatibleConversion[1]
        // }
        renderInput={(params) => <TextField {...params} />}
      />
  ); 
}

export default GetUnitSelecttype;
