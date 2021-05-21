import React, { useState, useEffect, useCallback, useMemo } from "react";

import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../UI/Dropdown";
import CustomAutoSuggest from "../UI/AutoSuggest/CustomizedAutoSuggest";
import { DatePicker } from "@progress/kendo-react-dateinputs";

import ExceptionsGrid from "./ExceptionsGrid";

import moment from "moment";
import AdvancedSearchDialog from "./AdvancedSearch";
import Chips from "../UI/Chips/Chips";
import Loader from "react-loader-spinner";

import { ToolbarItem, ToolbarSeparator } from "@progress/kendo-react-buttons";
import useLocalStorage, {
  useSessionStorage
} from "../../hooks/local-storage-hook";
import * as Styled from "../../styledJS/common/common.styled";
import { GridDiv } from "../../styledJS/common/grid.styled";

import Settings from "../UI/Settings/Settings";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-autoexceptions";
import queryString from "query-string";
const searchForm = React.memo(props => {
  const autoExceptionForm = useSelector(
    state => state.masterExceptions.autoExceptionsSearchForm
  );
  //replace with api call for fetching instead of local storage
  const [searchForm, setSearchForm] = useLocalStorage("searchForm", {});
  //const[sessionStoredForm,setSessionStoredForm]=useSessionStorage('sessionSearchForm', {});
  //const[sessionStoredAdvancedForm,setSessionStoredAdvancedForm]=useSessionStorage('sessionAdvancedForm', {});

  const [advancedForm, setAdvancedSearchForm] = useSessionStorage(
    "sessionAdvancedForm",
    {}
  );
  const [dropdownTypes, setDropdownStore] = useState({
    actionTypes: [],
    statuses: []
  });

  const dispatch = useDispatch();
  const exceptionList = useSelector(state => state.masterExceptions.exceptions);

  const loadingFlag = useSelector(state => state.masterExceptions.loading);
  const [advancedSearchFlag, setAdvancedSearchFlag] = useState(false);
  const [advancedSearchApplied, setAdvancedSearchApplied] = useState(false);

  const error = useSelector(state => state.masterExceptions.error);

  const saveSettings = event => {
    if (
      event.item === "Save Criteria" &&
      Object.keys(autoExceptionForm).length > 0
    ) {
      setSearchForm(autoExceptionForm);
      alert("Criteria saved successfully!!");
    } else setSearchForm({});
  };

  const onFetchExceptions = useCallback(
    searchCriteria => dispatch(actions.fetchExceptionsAsync(searchCriteria)),
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

    const updatedFormElement = { ...autoExceptionForm, [obj.name]: val };
    dispatch(actions.setAutoExceptionsSearchForm(updatedFormElement));
  };

  const fetchExceptions = useCallback(() => {
    let allSearchFields = {};

    if (autoExceptionForm && Object.keys(autoExceptionForm).length > 0) {
      //  setSessionStoredForm({...autoExceptionForm});
      allSearchFields = { ...autoExceptionForm, ...advancedForm };
    } else if (advancedForm) {
      // setSessionStoredAdvancedForm({...advancedForm});
      allSearchFields = { ...advancedForm };
    }
    if (Object.keys(allSearchFields).length === 0) {
      alert("Please enter Search Criteria!");
      return false;
    }
    console.log(allSearchFields);
    onFetchExceptions(allSearchFields);
  }, [autoExceptionForm, advancedForm, onFetchExceptions]);

  const showAdvancedSearch = () => {
    setAdvancedSearchFlag(true);
  };
  const closeAdvancedSearch = () => {
    setAdvancedSearchFlag(false);
  };

  const resetAttributeForAdvSearch = useCallback(
    attribute => {
      let updatedAdvancedForm = { ...advancedForm };
      delete updatedAdvancedForm[attribute];
      console.log(Object.keys(updatedAdvancedForm).length);
      if (Object.keys(updatedAdvancedForm).length === 0)
        setAdvancedSearchApplied(false);
      setAdvancedSearchForm(updatedAdvancedForm);
    },
    [advancedForm, setAdvancedSearchForm]
  );

  const applyAdvancedSearch = updatedAdvancedFields => {
    //console.log("updatedAdvancedFields"+JSON.stringify(updatedAdvancedFields));
    setAdvancedSearchForm(updatedAdvancedFields);
    setAdvancedSearchFlag(false);
    setAdvancedSearchApplied(true);
    // fetchExceptions();
  };

  useEffect(() => {
    var queryParams = queryString.parse(props.location.search);

    if (queryParams === undefined || !queryParams.backFlag) {
      if (Object.keys(searchForm).length > 0) {
        // setAutoForm(searchForm);
        dispatch(actions.setAutoExceptionsSearchForm(searchForm));
        //onFetchExceptions(searchForm);
      } else {
        dispatch(actions.setAutoExceptionsSearchForm({}));
      }
    }
  }, [onFetchExceptions, props.location, searchForm, dispatch]);

  useEffect(() => {
    populateDropdown();
  }, [populateDropdown]);

  let grid = "";
  let chips = "";

  if (loadingFlag) {
    grid = (
      <div style={{ width: "100%", textAlign: "center" }}>
        <Loader type="Circles" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
  /* if(additionalDetails){
      detailsGrid=<ExceptionDetails rowData={additionalDetails}/>
    }*/

  if (error) {
    grid = <p>Exception thrown!!!</p>;
  } else if (exceptionList && !loadingFlag) {
    grid = (
      <ExceptionsGrid
        {...props}
        reloadExceptions={fetchExceptions}
        dropdownTypes={dropdownTypes}
        exceptionList={exceptionList.map(dataItem =>
          Object.assign({ selected: false }, dataItem)
        )}
      ></ExceptionsGrid>
    );
  }

  chips = useMemo(() => {
    if (advancedSearchApplied) {
      console.log("advancedForm==>" + JSON.stringify(advancedForm));
      return (
        <div>
          <span
            style={{
              display: "block",
              color: "white",
              fontWeight: "bold",
              marginLeft: "5px",
              paddingLeft: "10px",
              borderBottom: "1px solid white"
            }}
          >
            Advanced Search Fields{" "}
          </span>
          <Chips
            data={advancedForm}
            resetValForAttribute={attribute =>
              resetAttributeForAdvSearch(attribute)
            }
          />
        </div>
      );
    }
  }, [advancedSearchApplied, advancedForm, resetAttributeForAdvSearch]);

  return (
    <div>
      <Styled.MainDiv>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Styled.CustomizedToolbar>
              <Styled.PageTitle>AUTO EXCEPTIONS</Styled.PageTitle>
              <Styled.HeaderLink>
                <ToolbarSeparator />
                <ToolbarItem>
                  <a
                    href="#"
                    title="Search"
                    onClick={showAdvancedSearch}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    {" "}
                    <i className="fa fa-search"></i>&nbsp;Advanced Search
                  </a>
                </ToolbarItem>
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
                value={autoExceptionForm.clientName || ""}
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
                value={autoExceptionForm.clientGroup || ""}
                size="lg"
                onChange={inputChangedHandler}
                type="ClientGroup"
              />
            </div>

            <div className="col col-sm-12 col-md-4 col-lg-2">
              <Styled.FieldLabel>Action Type</Styled.FieldLabel>
              <Dropdown
                data={dropdownTypes.actionTypes}
                name="actionType"
                id="actionType"
                value={autoExceptionForm.clientName || ""}
                onChangeHandler={event =>
                  inputChangedHandler(event.target, "string")
                }
              />
            </div>

            <div className="col col-sm-12 col-md-4 col-lg-3">
              <Styled.FieldLabel>Job Date</Styled.FieldLabel>
              <div style={{ whiteSpace: "no-wrap" }}>
                <Styled.StyledDatePicker>
                  <DatePicker
                    name="jobDateFrom"
                    value={autoExceptionForm.jobDateFrom || ""}
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
                    name="jobDateTo"
                    value={autoExceptionForm.jobDateTo || ""}
                    size="md"
                    format="dd/MMM/yyyy"
                    onChange={event =>
                      inputChangedHandler(event.target, "date")
                    }
                  />
                </Styled.StyledDatePicker>
                &nbsp;
                <Styled.TextField
                  id="jobDays"
                  name="jobDays"
                  value={autoExceptionForm.jobDays || ""}
                  size="sm"
                  onChange={event => inputChangedHandler(event.target, "")}
                />
              </div>
            </div>
            <div className="col col-sm-12 col-md-4 col-lg">
              <Styled.FieldLabel>AWB</Styled.FieldLabel>
              <CustomAutoSuggest
                id="shpNo"
                name="shpNo"
                value={autoExceptionForm.shpNo || ""}
                size="lg"
                onChange={inputChangedHandler}
                type="Awb"
              />
            </div>
          </div>
        </Styled.MainDiv>
        {chips}

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
      <GridDiv>{grid}</GridDiv>

      {advancedSearchFlag && (
        <AdvancedSearchDialog
          dropdownTypes={dropdownTypes}
          advancedSearchFields={advancedForm}
          applySearch={applyAdvancedSearch}
          cancel={closeAdvancedSearch}
        />
      )}
    </div>
  );
});

export default withErrorHandler(searchForm, axios);
