import React, { useState } from "react";
import { DialogActionsBar } from "@progress/kendo-react-dialogs";

import * as Styled from "../../styledJS/common/common.styled";

import Dropdown from "../UI/Dropdown";

const editDialog = React.memo(props => {
  const [editableItem, setEditedItem] = useState(props.dataItem);
  // const actionTypesTemp=['Missing Invoice','Missing Milestone'];

  const handleSubmit = event => {
    event.preventDefault();
  };

  const onDialogInputChange = event => {
    let target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.props ? target.props.name : target.name;

    const edited = { ...editableItem, [name]: value };

    setEditedItem(edited);
  };

  return (
    <Styled.StyledDialog onClose={props.cancel}>
      <Styled.MainDiv>
        <fieldset>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col col-sm-12 col-md-4 col-lg-6">
                <Styled.FieldLabel>AE_UNID</Styled.FieldLabel>
                <Styled.TextField
                  id="aeUnid"
                  name="aeUnid"
                  onChange={onDialogInputChange}
                  value={editableItem.aeUnid || ""}
                />
              </div>

              <div className="col col-sm-12 col-md-4 col-lg-6">
                <Styled.FieldLabel>Action Type</Styled.FieldLabel>
                <Dropdown
                  data={props.dropdownTypes.actionTypes}
                  id="actionType"
                  name="actionType"
                  onChangeHandler={onDialogInputChange}
                  value={editableItem.actionType || ""}
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-12 col-md-4 col-lg-6">
                <Styled.FieldLabel>Priority</Styled.FieldLabel>
                <Styled.TextField
                  id="priority"
                  name="priority"
                  onChange={onDialogInputChange}
                  value={editableItem.priority || ""}
                />
              </div>

              <div className="col col-sm-12 col-md-4 col-lg-6">
                <Styled.FieldLabel>Selling Station</Styled.FieldLabel>
                <Styled.TextField
                  id="sellingStation"
                  name="sellingStation"
                  onChange={onDialogInputChange}
                  value={editableItem.sellingStation || ""}
                />
              </div>
            </div>

            <hr />
          </form>
          <DialogActionsBar>
            <button className="btn btn-warning" onClick={props.cancel}>
              Cancel
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-primary"
              onClick={() => props.save(editableItem)}
            >
              Save
            </button>
            &nbsp;&nbsp;
          </DialogActionsBar>
          <br />
        </fieldset>
      </Styled.MainDiv>
    </Styled.StyledDialog>
  );
});

export default editDialog;
