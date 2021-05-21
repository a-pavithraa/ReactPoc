import React, { useState, useEffect, useCallback } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import CustomAutoSuggest from "../UI/AutoSuggest/CustomizedAutoSuggest";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import moment from "moment";
import Loader from "react-loader-spinner";
import { ToolbarItem, ToolbarSeparator } from "@progress/kendo-react-buttons";
import useLocalStorage, {
  useSessionStorage
} from "../../hooks/local-storage-hook";
import * as Styled from "../../styledJS/common/common.styled";

import Settings from "../UI/Settings/Settings";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-autoexceptions";
import queryString from "query-string";
import { BorderedDiv } from "./Styled";
import ARTable from "./ARTable";
import ARChart from "./ARChart";
import { PanelBarItem } from "@progress/kendo-react-layout";
import ClientDetailsGrid from './ClientDetailsGrid';
const arSearchForm = React.memo(props => {
  const [arForm, setArForm] = useSessionStorage("sessionArSearchForm", {});
  const [searchForm, setSearchForm] = useLocalStorage("arSearchForm", {});

  const [dropdownTypes, setDropdownStore] = useState({
    actionTypes: [],
    statuses: []
  });

  const dispatch = useDispatch();
  const arSummaryList = useSelector(state => state.arReducer.arSummary);
  const clientDetailsList = useSelector(state => state.arReducer.clientDetails);
  const loadingFlag = useSelector(state => state.arReducer.loading);

  const error = useSelector(state => state.arReducer.error);
  const onFetchClientDetails =  useCallback(
    (searchCriteria) => dispatch(actions.fetchClientDetailsAsync()),
    [dispatch]
  );
 
  const saveSettings = event => {
    if (event.item === "Save Criteria" && Object.keys(arForm).length > 0) {
      setSearchForm(arForm);
      alert("Criteria saved successfully!!");
    } else setSearchForm({});
  };

  const onFetchArSummary = useCallback(
    searchCriteria => dispatch(actions.fetchARSummaryAsync(searchCriteria)),
    [dispatch]
  );

 
  const populateDropdown = useCallback(() => {
    let actionTypesTemp = [];
    actionTypesTemp.push("High Margin Shipment");
    actionTypesTemp.push("Permanent Loss");
    actionTypesTemp.push("Manual");
    actionTypesTemp.push("Low Margin Shipment");
    actionTypesTemp.push("Shipment with Loss");
    actionTypesTemp.push("Missing Invoice");
    setDropdownStore({ ...dropdownTypes, actionTypes: actionTypesTemp });
  }, []);

  const inputChangedHandler = (obj, type) => {
    let val = obj.value;
    if (type === "date") {
      val = new Date(moment(new Date(val)).format("DD/MMM/YYYY"));
    }

    const updatedFormElement = { ...arForm, [obj.name]: val };

    setArForm(updatedFormElement);
  };

  const [moreSearch, setMoreSearch] = useState(false);

  const toggleMoreSearch = () => setMoreSearch(!moreSearch);
  const fetchExceptions = useCallback(() => {
    let allSearchFields = {};

    if (arForm && Object.keys(arForm).length > 0) {
      //  setSessionStoredForm({...autoExceptionForm});
      allSearchFields = { ...arForm };
    }

    if (Object.keys(allSearchFields).length === 0) {
      alert("Please enter Search Criteria!");
      return false;
    }
    console.log(allSearchFields);
    onFetchArSummary(allSearchFields);
  }, [arForm, onFetchArSummary]);

  useEffect(() => {
    var queryParams = queryString.parse(props.location.search);

    if (queryParams === undefined || !queryParams.backFlag) {
      if (Object.keys(searchForm).length > 0) {
        setArForm(searchForm);
        //onFetchExceptions(searchForm);
      }
    }
  }, [onFetchArSummary, props.location, searchForm, setArForm]);

  useEffect(() => {
    populateDropdown();
  }, [populateDropdown]);

  let grid = "";
 

  if (loadingFlag) {
    grid = (
      <div style={{ width: "100%", textAlign: "center" }}>
        <Loader type="Circles" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (error) {
    grid = <p>Exception thrown!!!</p>;
  }
  if (clientDetailsList) {
    //grid = <ClientDetailsGrid data={clientDetailsList}></ClientDetailsGrid>;
  }
  if (arSummaryList) {
    grid = (

      <Styled.CustomizedPane>
       
        <Styled.CustomizedPanelBar expandMode="multiple">
          <PanelBarItem title={"AR SUMMARY DETAILS"} expanded={true}>
          
            <div className="row" style={{ margin: "4px 3px" }}>
            
              <div className="col col-sm-12 col-md-4 col-lg-6">
               
                  <ARTable arSummaryList={arSummaryList} onFetchClientDetails={onFetchClientDetails}/>
                 
              
              </div>

              <div className="col col-sm-12 col-md-4 col-lg-6">
                <Styled.ARTable>
                  <ARChart />
                  
                  
                </Styled.ARTable>
              
              </div>
            </div>
           
          </PanelBarItem>
          
    
         
       
        <br/>
        {clientDetailsList?
         
          <ClientDetailsGrid data={clientDetailsList}></ClientDetailsGrid>:""}
      </Styled.CustomizedPanelBar>
      </Styled.CustomizedPane>
      
    );
  }

  return (
    <div>
      <Styled.MainDiv>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Styled.CustomizedToolbar>
              <Styled.PageTitle>ACCOUNTS RECEIVABLES</Styled.PageTitle>
              <Styled.HeaderLink>
                <ToolbarSeparator />

                <ToolbarItem>
                  <Settings mainPage="true" saveSettings={saveSettings} />
                </ToolbarItem>
              </Styled.HeaderLink>
            </Styled.CustomizedToolbar>
          </div>
        </div>
      </Styled.MainDiv>
      <Styled.TopPane>
        <Styled.MainDiv>
          <div className="row">
            <div className="col col-sm-12 col-md-4 col-lg">
              <Styled.FieldLabel>Client Name</Styled.FieldLabel>

              <CustomAutoSuggest
                value={arForm.clientName || ""}
                id="clientName"
                name="clientName"
                onChange={inputChangedHandler}
                type="ClientName"
              />
            </div>

            <div className="col col-sm-12 col-md-4 col-lg">
              <Styled.FieldLabel>Client Group</Styled.FieldLabel>
              <CustomAutoSuggest
                id="clientGroup"
                name="clientGroup"
                value={arForm.clientGroup || ""}
                size="lg"
                onChange={inputChangedHandler}
                type="ClientGroup"
              />
            </div>
            <div className="col col-sm-12 col-md-4 col-lg">
              <Styled.FieldLabel>Owning Station</Styled.FieldLabel>
              <CustomAutoSuggest
                id="owningStation"
                name="owningStation"
                value={arForm.owningStation || ""}
                size="lg"
                onChange={inputChangedHandler}
                type="ClientGroup"
              />
            </div>
            <div className="col col-sm-12 col-md-4 col-lg-2">
              <Styled.FieldLabel>Selling Station</Styled.FieldLabel>
              <CustomAutoSuggest
                id="sellingStation"
                name="clientGroup"
                value={arForm.sellingStation || ""}
                size="lg"
                onChange={inputChangedHandler}
                type="ClientGroup"
              />
            </div>

            <div className="col col-sm-12 col-md-4 col-lg-3">
              <Styled.FieldLabel>Ship Date</Styled.FieldLabel>
              <div style={{ whiteSpace: "no-wrap" }}>
                <Styled.StyledDatePicker>
                  <DatePicker
                    name="shipDateFrom"
                    value={arForm.shipDateFrom || ""}
                    size="md"
                    format="dd/MMM/yyyy"
                    onChange={event =>
                      inputChangedHandler(event.target, "date")
                    }
                  />
                  &nbsp;
                </Styled.StyledDatePicker>
                <Styled.StyledDatePicker>
                  <DatePicker
                    name="shipDateTo"
                    value={arForm.shipDateTo || ""}
                    size="md"
                    format="dd/MMM/yyyy"
                    onChange={event =>
                      inputChangedHandler(event.target, "date")
                    }
                  />
                </Styled.StyledDatePicker>
                &nbsp;
                <Styled.TextField
                  id="shipDays"
                  name="shipDays"
                  value={arForm.shipDays || ""}
                  size="sm"
                  onChange={event => inputChangedHandler(event.target, "")}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-sm-12 col-md-4 col-lg">
              <Styled.FieldLabel>AWB#</Styled.FieldLabel>

              <CustomAutoSuggest
                value={arForm.awbNo || ""}
                id="awbNo"
                name="awbNo"
                onChange={inputChangedHandler}
                type="ClientName"
              />
            </div>

            <div className="col col-sm-12 col-md-4 col-lg">
              <Styled.FieldLabel>Invoice#</Styled.FieldLabel>
              <CustomAutoSuggest
                id="invoiceNo"
                name="invoiceNo"
                value={arForm.invoiceNo || ""}
                size="lg"
                onChange={inputChangedHandler}
                type="ClientGroup"
              />
            </div>
            <div className="col col-sm-12 col-md-4 col-lg-2">
              <Styled.FieldLabel>Company Name</Styled.FieldLabel>
              <CustomAutoSuggest
                id="companyName"
                name="companyName"
                value={arForm.companyName || ""}
                size="lg"
                onChange={inputChangedHandler}
                type="ClientGroup"
              />
            </div>

            <div className="col col-sm-12 col-md-4 col-lg-3">
              <Styled.FieldLabel>Invoice Date</Styled.FieldLabel>
              <div style={{ whiteSpace: "no-wrap" }}>
                <Styled.StyledDatePicker>
                  <DatePicker
                    name="invoiceDateFrom"
                    value={arForm.invoiceDateFrom || ""}
                    size="md"
                    format="dd/MMM/yyyy"
                    onChange={event =>
                      inputChangedHandler(event.target, "date")
                    }
                  />
                  &nbsp;
                </Styled.StyledDatePicker>
                <Styled.StyledDatePicker>
                  <DatePicker
                    name="invoiceDateTo"
                    value={arForm.invoiceDateTo || ""}
                    size="md"
                    format="dd/MMM/yyyy"
                    onChange={event =>
                      inputChangedHandler(event.target, "date")
                    }
                  />
                </Styled.StyledDatePicker>
                &nbsp;
                <Styled.TextField
                  id="invoiceDays"
                  name="invoiceDays"
                  value={arForm.invoiceDays || ""}
                  size="sm"
                  onChange={event => inputChangedHandler(event.target, "")}
                />
              </div>
            </div>
            <div className="col col-sm-12 col-md-4 col-lg">
              &nbsp;
              <Styled.FieldValue
                light
                onClick={toggleMoreSearch}
                style={{ cursor: "pointer" }}
              >
                <u>{moreSearch ? "Less Search" : "More Search"}</u>
              </Styled.FieldValue>
            </div>
          </div>

          {moreSearch ? (
            <div className="row">
              <BorderedDiv>Advanced Search</BorderedDiv>
              <div className="col col-sm-12 col-md-4 col-lg">
                <Styled.FieldLabel>Client Name</Styled.FieldLabel>

                <CustomAutoSuggest
                  value={arForm.clientName || ""}
                  id="clientName"
                  name="clientName"
                  onChange={inputChangedHandler}
                  type="ClientName"
                />
              </div>

              <div className="col col-sm-12 col-md-4 col-lg">
                <Styled.FieldLabel>Client Group</Styled.FieldLabel>
                <CustomAutoSuggest
                  id="clientGroup"
                  name="clientGroup"
                  value={arForm.clientGroup || ""}
                  size="lg"
                  onChange={inputChangedHandler}
                  type="ClientGroup"
                />
              </div>
              <div className="col col-sm-12 col-md-4 col-lg">
                <Styled.FieldLabel>Owning Station</Styled.FieldLabel>
                <CustomAutoSuggest
                  id="owningStation"
                  name="owningStation"
                  value={arForm.owningStation || ""}
                  size="lg"
                  onChange={inputChangedHandler}
                  type="ClientGroup"
                />
              </div>
              <div className="col col-sm-12 col-md-4 col-lg">
                <Styled.FieldLabel>Selling Station</Styled.FieldLabel>
                <CustomAutoSuggest
                  id="sellingStation"
                  name="clientGroup"
                  value={arForm.sellingStation || ""}
                  size="lg"
                  onChange={inputChangedHandler}
                  type="ClientGroup"
                />
              </div>

              <div className="col col-sm-12 col-md-4 col-lg-3">
                <Styled.FieldLabel>Ship Date</Styled.FieldLabel>
                <div style={{ whiteSpace: "no-wrap" }}>
                  <Styled.StyledDatePicker>
                    <DatePicker
                      name="shipDateFrom"
                      value={arForm.shipDateFrom || ""}
                      size="md"
                      format="dd/MMM/yyyy"
                      onChange={event =>
                        inputChangedHandler(event.target, "date")
                      }
                    />
                    &nbsp;
                  </Styled.StyledDatePicker>
                  <Styled.StyledDatePicker>
                    <DatePicker
                      name="shipDateTo"
                      value={arForm.shipDateTo || ""}
                      size="md"
                      format="dd/MMM/yyyy"
                      onChange={event =>
                        inputChangedHandler(event.target, "date")
                      }
                    />
                  </Styled.StyledDatePicker>
                  &nbsp;
                  <Styled.TextField
                    id="shipDays"
                    name="shipDays"
                    value={arForm.shipDays || ""}
                    size="sm"
                    onChange={event => inputChangedHandler(event.target, "")}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Styled.MainDiv>

        <div className="row" style={{ marginBottom: "5px" }}>
          <div className="col col-12" style={{ textAlign: "center" }}>
            <button
              className="btn btn-primary"
              disabled={loadingFlag}
              onClick={() => fetchExceptions()}
            >
              Search
            </button>
            &nbsp;&nbsp;
           
            <input type="reset" className="btn btn-primary" value="Reset" />
          </div>
        </div>
      </Styled.TopPane>
      <br />
      {grid}
    </div>
  );
});

export default withErrorHandler(arSearchForm, axios);
