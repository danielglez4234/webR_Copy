const selectedMonitorsReducer = (state = [], action) => {
  switch(action.type) {
    case 'getSelectedMonitor':
      console.log("resucer Slect -> " + action.id)
    return [
      ...state,
        {
          id: action.id,
          monitorData: action.monitorData,
          component: action.component
        }
    ];


    case 'diselectMonitor':
    // var set = [...state];
    // set.splice(set.findIndex(e => e.id === action.idMonitorMagnitude), 1);
    const test = state.filter((item) => item.id !== action.idMonitorMagnitude);
    console.log("filter ---> " +  JSON.stringify(test));
    return state.filter((item) => item.id !== action.idMonitorMagnitude);


    case 'diselectALLMonitor':
    return state = [];


    case 'sortMonitors':
    let setB = [...state];
    return setB.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));


    default:
      return state;

  }


}
export default selectedMonitorsReducer;
