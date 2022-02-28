import { styled, alpha }                                from '@mui/material/styles';
import InputBase                                        from '@mui/material/InputBase';
import Tooltip, { TooltipProps, tooltipClasses }        from '@mui/material/Tooltip';
import ArrowForwardIosSharpIcon                         from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails                              from '@mui/material/AccordionDetails';
import MuiAccordion, { AccordionProps }                 from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, }  from '@mui/material/AccordionSummary';


/*
* This Functions are used in several components as like 'PerformQuery', 'listComponentMonitors'
* and 'getIcons'
*/

  // export const fnconstants = (name) => {
  //  this.UNKNOWN = 'UNKNOWN';
  //  this.STATE_TYPE = "x";
  // }
  /*
   * This function say if a monitor is a state or no.
   */
  export const fnIsState = (type) => {
    if ((type === "state"))
      return true;
   return false;
  }
  /*
   * This function say if a monitor is a magnitude or no.
   */
  export const fnIsMagnitude = (type) => {
     if ((type === "b")  || ( type === "e"))
       return true;
    return false;
  }
  /*
   * This function say if a monitor is a scalar monitor or no.
   */
  export const fnIsMonitor = (type) => {
     if ((type === "d") || (type ==="f") || (type === "l")
        || (type === "s") || (type === "o") )
       return true;
    return false;
  }
  /*
   * This function say if a monitor is a simple array monitor or no.
   */
   export const fnIsSimpleArray = (type) => {
     if ((type === "D") || (type ==="F") || (type ==="L")
        || (type === "S") || (type ==="O"))
       return true;
    return false;
  }
  /*
   * This function say if a monitor is a double array monitor or no.
   */
  export const fnIsDoubleArray = (type) => {
    if ((type ==="9")  || (type ==="8")|| (type ==="7")
        || (type ==="6") || (type === "5"))
       return true;
    return false;
  }
  /*
   * This function say if a monitor is a array monitor or no.
   */
  export const fnIsScalar = (type) => {
     if ((type === "d") || (type ==="f") || (type === "l")
        || (type === "s") || (type === "o") || (type === "b")  || ( type === "e"))
       return true;
    return false;
  }
  /*
   * This function say if a monitor is a array monitor or no.
   */
  export const fnIsArray = (type) => {
    if ((type === "D") || (type ==="F") || (type ==="L")
        || (type === "S") || (type ==="O") || (type ==="9")  || (type ==="8")
        || (type ==="7")  || (type ==="6") || (type === "5") )
       return true;
    return false;
  }

  /*
   * This function return the category type.
   */
  export const getCategory = (type) =>{
    if ((type === "D") || (type ==="F") || (type ==="L") || (type === "S")
            || (type === "O") || (type === "9") || (type === "8")
      			|| (type === "7") || (type === "6") || (type === "5")
      			|| (type === "d") || (type === "f") || (type === "l")
      	    || (type === "s") || (type === "o")){
      	return "monitor";
    }else if ((type === "b")  || (type === "e") ){
      	return "magnitud";
    }else if (type === 'state'){
      	return "state";
    }else if (type === 'unit'){
      return "unit";
    }else if (type === "decimalPattern"){
      return "pattern";
    }
  }



  /* --------------------------------------
   * 
   * STYLES base, mui-material package 
   * 
   * -------------------------------------- */

  /*
   * Search input
   */
  export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  /*
   * Search Icon Wrapper
   */
  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  /*
   * Input Base
   */
  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`
    },
  }));


  /*
   * Accordion Base
   */
  export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  /*
   * AccordionSummary Base
   */
  export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  /*
   * AccordionDetails Base
   */
  export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  /*
   * LtTooltip Base
   */
  export const LtTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#49525e',
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));