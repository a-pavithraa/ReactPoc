import React, { useState } from "react";
import { DialogActionsBar } from "@progress/kendo-react-dialogs";
import * as Styled from "../../styledJS/common/common.styled";

const commentsDialog = React.memo(props => {
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
              <div className="col col-sm-12 col-md-4 col-lg-12">
                <Styled.FieldLabelBigger>
                  Add Comments For UNIDS:
                </Styled.FieldLabelBigger>
                <Styled.FieldLabel>
                  {editableItem.aeUnid || ""}
                </Styled.FieldLabel>
              </div>

              <div className="col col-sm-12 col-md-4 col-lg-12">
                <Styled.FieldLabelBigger>Comments</Styled.FieldLabelBigger>
                <textarea
                  rows="5"
                  cols="50"
                  id="comment"
                  name="comment"
                  onChange={onDialogInputChange}
                  value={editableItem.comments || ""}
                />
              </div>
            </div>

            <hr />
          </form>
          <DialogActionsBar>
            <button
              className="btn btn-warning"
              onClick={() => props.cancel("Comments")}
            >
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

export default commentsDialog;
