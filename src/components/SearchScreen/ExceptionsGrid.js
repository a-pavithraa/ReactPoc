import React, { useState,useRef } from 'react';
import { process } from '@progress/kendo-data-query';
import Columns from './ExceptionGridColumns';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import ColumnMenu from '../UI/ColumnMenu';
import useLocalStorage from '../../hooks/local-storage-hook';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import EditDialog from './EditException';
import CommentsDialog from './AddComments';
import styled from 'styled-components';

import {GridStyles} from '../../styledJS/common/grid.styled';
function useForceUpdate() {
  const [value, setValue] = useState(true); //boolean state
  return () => setValue(!value); // toggle the state to force render
}

const StyledGrid = styled(Grid)`
${GridStyles}
`;
const exceptionsGrid = React.memo(props => {
  let lastSelectedIndex = 0;
  const _export = useRef(null);
  const _grid = useRef(null);
  
  //create your forceUpdate hook

  const forceUpdate = useForceUpdate();



  const [columnsVisibility, setColumnsVisibility] = useLocalStorage('exceptionGridColumns', {});
  const[editableRow,setEditableRow]=useState(null);
  const[commentsDialog,showCommentsDialog]=useState(null);


  const [columns, setColumns] = useState([...Columns]);
  const onColumnsSubmit = (columnsState, newColumnVisibility) => {
    setColumns(columnsState);
    setColumnsVisibility(newColumnVisibility);
  };
  const selectionChange = (event) => {
    event.dataItem.selected = !event.dataItem.selected;
    forceUpdate();
  };
  const editItem= () => {
    let selectedItems = dataList.data.filter(dataItem => dataItem.selected);
    if(selectedItems.length===0){
      alert('Please select a record to edit');
      return false;
    }
    if(selectedItems.length>1)
    {
      alert('Mutliple items cannot be edited at once');
      return false;

    }
  
     setEditableRow(selectedItems[0]);

    
  };

  const addMultipleComments= () => {
    let selectedItems = dataList.data.filter(dataItem => dataItem.selected);
    if(selectedItems.length===0){
      alert('Please select a record to edit');
      return false;
    }   

    
  
     showCommentsDialog({aeUnid:selectedItems.map(item=>item.aeUnid).join(',')});

    
  };
  const saveComments = (updatedItem) => {
    showCommentsDialog(updatedItem);
    console.log(updatedItem);
    props.reloadExceptions();
    showCommentsDialog(null);
}
  const saveException = (updatedItem) => {
    setEditableRow(updatedItem);
    console.log(updatedItem);
    props.reloadExceptions();
    setEditableRow(null);
}

const cancel = (flag) => {
  if(flag==='Comments')
  showCommentsDialog(null);
else
  setEditableRow(null);
}

  const rowClick = (event) => {
    let last = lastSelectedIndex;
    const current = dataList.data.findIndex(dataItem => dataItem === event.dataItem);

    if (!event.nativeEvent.shiftKey) {
      lastSelectedIndex = last = current;
    }

    if (!event.nativeEvent.ctrlKey) {
      dataList.data.forEach(item => item.selected = false);
    }
    const select = !event.dataItem.selected;
    for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
      dataList.data.selected = select;
    }
    forceUpdate();
  }

  const headerSelectionChange = (event) => {
    const checked = event.syntheticEvent.target.checked;
    dataList.data.forEach(item => item.selected = checked);
    forceUpdate();
  }
  const milestoneLink = (rowData)=>{
    props.history.push("/milestone/"+rowData.jobNo+"/"+rowData.aeUnid);
  }

  const transactionLink = (rowData)=>{
    props.history.push("/transaction/"+rowData.aeUnid);
  }

  function showDetails(rowData,templateType) {

    if(templateType==='milestoneLink')
    milestoneLink(rowData);
    else if(templateType==='transactionLink')
    transactionLink(rowData);

  };

  const [gridState, setGridState] = useState({
    skip: 0,
    take: 20,
    sort: [
      { field: "aeUnid", dir: "asc" }
    ]
  });
  const dataList =     process([...props.exceptionList], gridState);
  const exporter = () => {
    console.log(_grid.current.columns);
    _export.current.save(props.exceptionList,_grid.current.columns.slice(1));
  }


  const grid = <ExcelExport
    data={props.exceptionList}
    ref={_export}
  ><StyledGrid
    data={dataList}
    pageable={true}
    ref={_grid}

    pageSize={20}
    sortable={true}
    {...gridState}
    onDataStateChange={(event) => setGridState(event.data)}
    style={{ height: "400px" }}
    selectedField="selected"
    onSelectionChange={selectionChange}
    onHeaderSelectionChange={headerSelectionChange}
    onRowClick={rowClick}


  >
      <GridColumn
        field="selected"
        width="50px"
        headerSelectionValue={
          props.exceptionList.findIndex(dataItem => dataItem.selected === false) === -1
        } />
      <GridToolbar>
        <button
          title="Export Excel"
          className="btn btn-primary"
          onClick={exporter}
        >
          <i className="fa fa-table"></i>&nbsp;
          Export to Excel
                    </button>
        <button
          title="Edit"
          className="btn btn-primary"
          onClick={editItem}

        >
         <i className="fa fa-edit"></i>&nbsp;  Edit
                    </button>
                    <button
          title="Add Comments"
          className="btn btn-primary"
          onClick={addMultipleComments}

        >
         <i className="fa fa-comment-o"></i>&nbsp;  Add Comments
                    </button>
      </GridToolbar>
      {
        columns.map((column, idx) =>
          column.show && (columnsVisibility[column.field] == null || columnsVisibility[column.field] === 'show') && (<GridColumn
            key={idx}
            field= {column.field}
            title={column.title}
            filter={column.filter}
            width={column.width}
            cell={(props) =>
              column.template ?
                <td>
                  <span style={{ cursor: "pointer" }} onClick={() => showDetails(props.dataItem,column.template)}>
                    <u> {props.dataItem[column.field]}</u>
                  </span>
                </td>
                : <td> {props.dataItem[column.field]}</td>
            }
           
            columnMenu={
              props =>
                <ColumnMenu
                  {...props}
                  columns={columns}
                  columnsVisibility={columnsVisibility}
                  onColumnsSubmit={onColumnsSubmit}
                />
            }

          />)
        )
      }
    </StyledGrid>
    {editableRow && <EditDialog  dropdownTypes={props.dropdownTypes} dataItem={editableRow} save={saveException} cancel={cancel}/>}
    {commentsDialog && <CommentsDialog   dataItem={commentsDialog} save={saveComments} cancel={cancel}/>}
    </ExcelExport>


  return grid;


});

export default exceptionsGrid;