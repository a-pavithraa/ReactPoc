import React, { useState } from "react";
import {  DialogActionsBar } from "@progress/kendo-react-dialogs";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { DatePicker } from '@progress/kendo-react-dateinputs';
import styled from 'styled-components';
import{darken} from 'polished';
import * as Styled from '../../styledJS/common/common.styled';

const StyledTab = styled(TabStrip)`

& div.k-state-active{
  background-color:${props=>props.theme.dialogColor};
  font-size:12px;
}
& span.k-link{
  color:${props=>darken(0.1,props.theme.inputFontColor)};
  font-weight:bold;
}


`
const advancedSearchDialog = React.memo(props => {
  const [advancedSearchFields, setAdvancedSearchFields] = useState(
    props.advancedSearchFields
  );
  const [selectedTab, setSelectedTab] = useState(0);
  // const actionTypesTemp=['Missing Invoice','Missing Milestone'];

  const handleSubmit = event => {
    event.preventDefault();
  };
  const handleSelect = e => {
    setSelectedTab(e.selected);
  };

  const onDialogInputChange = event => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.props ? target.props.name : target.name;
  

    const searchFields = { ...advancedSearchFields, [name]: value };
//console.log("searchFields==>"+JSON.stringify(searchFields));
    setAdvancedSearchFields(searchFields);
  };

  return (
    <Styled.StyledDialog onClose={props.cancel}>
      <fieldset >
        <form onSubmit={handleSubmit}>
          <StyledTab
            selected={selectedTab}
            onSelect={handleSelect}
            tabPosition="left"
          >
            <TabStripTab title="Shipment">
              <div className="smart-form">
                <div className="row">
                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                      Job Number
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="jobNumber"
                      name="jobNumber"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.jobNumber || ''}
                    />
                  </div>

                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                     Invoice Number
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="invoiceNumber"
                      name="invoiceNumber"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.invoiceNumber || ''}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                      Owning Station
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="owningStation"
                      name="owningStation"
                     
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.owningStation || ''}
                    />
                  </div>

                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                      Selling Station
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="sellingStation"
                      name="sellingStation"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.sellingStation || ''}
                    />
                  </div>
                </div>
                <div className="row">
                <div className="col col-sm-12 col-md-4 col-lg-6">
                <Styled.FieldLabel
                    >
                      Status
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="status"
                      name="status"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.status || ''}
                    />
                </div>
                 <div className="col col-sm-12 col-md-4 col-lg-6">
                 <Styled.FieldLabel
                    >
                      Sales Rep
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="salesRep"
                      name="salesRep"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.salesRep || ''}
                    />
                </div>
                    

                </div>
              </div>
            </TabStripTab>
            <TabStripTab title="Dates">
            <div className="smart-form">
                <div className="row">
                  <div className="col col-sm-12 col-md-4 col-lg-12">
                    <Styled.FieldLabel
                    >
                      Flt Date
                    </Styled.FieldLabel>
                    <Styled.StyledDatePicker>
<DatePicker size="md" name="fltDateFrom" placeholder="From" 
                     
                    format="dd/MMM/yyyy" onChange={onDialogInputChange} weekNumber={true}  value={advancedSearchFields.fltDateFrom || ''}/>
                 </Styled.StyledDatePicker>
                   &nbsp;
                   <Styled.StyledDatePicker>
<DatePicker size="md" name="fltDateTo" placeholder="To" 
                     
                    format="dd/MMM/yyyy" onChange={onDialogInputChange} weekNumber={true}  value={advancedSearchFields.fltDateTo || ''}/>
                    </Styled.StyledDatePicker>
                    &nbsp;
                    <Styled.TextField
                      id="fltDays"
                      name="fltDays"
                      placeholder="Last"
                      size="sm"
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.fltDays || ''}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-12 col-md-4 col-lg-12">
                    <Styled.FieldLabel
                    >
                      Due Date
                    </Styled.FieldLabel>
                    <Styled.StyledDatePicker>
<DatePicker name="dueDateFrom" placeholder="From" 
                    size="md"
                    format="dd/MMM/yyyy" onChange={onDialogInputChange} weekNumber={true}  value={advancedSearchFields.dueDateFrom || ''}/>
                 </Styled.StyledDatePicker>
                   &nbsp;
                   <Styled.StyledDatePicker>
<DatePicker name="dueDateTo" placeholder="To" 
                    size="md"
                    format="dd/MMM/yyyy" onChange={onDialogInputChange} weekNumber={true}  value={advancedSearchFields.dueDateTo || ''}/>
                    </Styled.StyledDatePicker>
                    &nbsp;
                    <Styled.TextField
                      id="dueDays"
                      name="dueDays"
                      placeholder="Last"
                      size="sm"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.dueDays || ''}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-12 col-md-4 col-lg-12">
                    <Styled.FieldLabel
                    >
                      Follow Up Date
                    </Styled.FieldLabel>
                    <Styled.StyledDatePicker>
<DatePicker name="followUpDateFrom" placeholder="From" 
                    size="md"
                    format="dd/MMM/yyyy" onChange={onDialogInputChange} weekNumber={true} 
                    value={advancedSearchFields.followUpDateFrom || ''}
                    />
                 </Styled.StyledDatePicker>
                   &nbsp;
                   <Styled.StyledDatePicker>
<DatePicker name="followUpDateTo" placeholder="To" 
                   size="md"
                    format="dd/MMM/yyyy" onChange={onDialogInputChange} weekNumber={true}
                    value={advancedSearchFields.followUpDateTo || ''} />
                    &nbsp;
                    <Styled.TextField
                      id="followUpDays"
                      name="followUpDays"
                      placeholder="Last"
                      size="sm"
                     
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.followUpDays || ''}
                    />
                    </Styled.StyledDatePicker>
                     &nbsp;
                    <Styled.TextField
                      id="followUpNDays"
                      name="followUpNDays"
                      placeholder="Next"
                      size="sm"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.followUpNDays || ''}
                    />
                  </div>
                </div>
              </div>
            </TabStripTab>
            <TabStripTab title="Miscellaneous">
            <div className="smart-form">
                <div className="row">
                <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                      Group Assigned
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="groupAssigned"
                      name="groupAssigned"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.groupAssigned || ''}
                    />
                  </div>

                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                     
                    >
                     Person Assigned
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="personAssigned"
                      name="personAssigned"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.personAssigned || ''}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                      Escalate To
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="escalateTo"
                      name="escalateTo"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.escalateTo || ''}
                    />
                  </div>

                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                    Management Group
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="managementGroup"
                      name="managementGroup"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.managementGroup || ''}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                      Action Code
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="actionCode"
                      name="actionCode"
                      
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.actionCode || ''}
                    />
                  </div>

                  <div className="col col-sm-12 col-md-4 col-lg-6">
                    <Styled.FieldLabel
                    >
                    Priority
                    </Styled.FieldLabel>
                    <Styled.TextField
                      id="priority"
                      name="priority"
                     
                      onChange={onDialogInputChange}
                      value={advancedSearchFields.priority || ''}
                    />
                  </div>
                </div>
            </div>
            </TabStripTab>
          </StyledTab>
        </form>
        <DialogActionsBar>
          <button className="btn btn-warning" onClick={props.cancel}>
            Cancel
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-primary"
            onClick={() => props.applySearch(advancedSearchFields)}
          >
            Apply Search
          </button>
          &nbsp;&nbsp;
        </DialogActionsBar>
        <br />
      </fieldset>
    </Styled.StyledDialog>
  );
});
export default advancedSearchDialog;
