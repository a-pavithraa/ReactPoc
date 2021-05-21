import React,{useState} from 'react';
import {
    TreeList,TreeListCell,orderBy, filterBy, mapTree, extendDataItem,TreeListSelectionCell, TreeListHeaderSelectionCell} from '@progress/kendo-react-treelist';
import styled from 'styled-components';

import { Toolbar } from '@progress/kendo-react-buttons'
import * as Styled from '../../styledJS/common/common.styled'
import {GridStyles} from '../../styledJS/common/grid.styled';
import SendStatementDialog from './SendStatement';


const linkedColumnCell = (props) =>{
    const { dataItem, field } = props;
   // let expandIconCls = props.expanded?'k-icon k-i-collapse':'k-icon k-i-expand';
    let emptySpans =  props.level.slice(1).map(function (_x, i) { return <span className="k-icon k-i-none" key={i}/>});
        const cellData = dataItem[field];
        return (
            dataItem.level===0?
            <td style={props.style} className={props.className} colSpan={props.colSpan}>
                {emptySpans}
                  <span style={{ cursor: "pointer" }} >
                    <u> {cellData}</u>
                  </span>
                </td>: <TreeListCell {...props}/>
               /* : <td style={props.style} className={props.className} colSpan={props.colSpan} >
                    {emptySpans}
                     <span className={expandIconCls} key= "expand-collapse" onClick={(event) => props.onExpandChange(event, dataItem)}></span>{cellData}</td>*/
        );
}

 

const StyledGrid = styled(TreeList)`
${GridStyles}
`;

const subItemsField = 'clientDetailsList';
const expandField = 'expanded';
const selectField = 'selected';

const clientDetailsGrid = React.memo((props)=>{
   
    const [expanded,setExpanded]=useState([]);
    const [selected,setSelected]=useState([]);
    const [statementItems,setStatementItems] =useState([]);
    const[sendStatementDialog,setSendStatementDialog]=useState(null);
    let data = props.data;

    const [dataState,setDataState]=useState({
        sort: [
            { field: 'id', dir: 'asc' }
        ],
        filter: []
    });

    const onExpandChange = (e) => {
        setExpanded(
            e.value ?
            expanded.filter(id => id !== e.dataItem.id) :
                [ ...expanded, e.dataItem.id ]
        );
    }

   const handleDataStateChange = (event) => {
    setDataState(event.data);
    }  

   
    const onSelectionChange = (event) => {
        changeSelection(event.dataItem);
    }

    const changeSelection = (dataItem) => {
       // console.log('change selection==>'+JSON.stringify(dataItem));
        const selectedItems = (dataItem.selected && selected && selected.length>0 && dataItem.level===2 )?
           selected.filter(x => x !== dataItem.id) :
            [ ...selected, dataItem.id ];
        
       setSelected( selectedItems );
    }

   const onRowClick = (event) => {
      if(event.dataItem.level===2)
        changeSelection(event.dataItem);
    }
    const sendStatement = (updatedItems) => {
        
        console.log('updatedItems==>'+updatedItems);
        setSendStatementDialog(null);
    }
    
    const cancel = (flag) => {
    
        setSendStatementDialog(null);
    }

   const onHeaderSelectionChange = (event) => {
        const checked = event.syntheticEvent.target.checked;
        const selected = [];
        if (checked) {
            mapTree(data, subItemsField, (item) => {
                if(item.level===2)
                selected.push(item.id);
                if(!expanded.includes(item.id))
                expanded.push(item.id);
                return item;
            });
        }

        setSelected(selected );
    }

  const  headerSelectionValue = () => {
        let allSelected = true;
        const selectedItems = selected;
        mapTree(data, subItemsField, (item) => {
            allSelected = allSelected && selectedItems && selectedItems.length>0 && (item.level!==2 || selectedItems.includes(item.id));
            return item;
        });
       
        return allSelected;
    }

    const addExpandField = (dataTree) => {
      
        return mapTree(dataTree, subItemsField, (item) =>
            extendDataItem(item, subItemsField, {
                [expandField]: expanded!=null && expanded.length>0?expanded.includes(item.id):false,
                [selectField]: selected!=null && item.level===2?selected.includes(item.id):false
            })
        );
    }

    const setItemsForSendStmt = ()=>{
        if(selected.length===0){
            alert('Please select a record');
            return false;
         }
        const statementItemsTemp=selected.map(it=>  {
             const obj={id:it,email:"",message:""} ;return obj;});
             setStatementItems(statementItemsTemp);
             console.log(statementItems);
        setSendStatementDialog(true);

    }

   const processData = () => {
      
        let filteredData = filterBy(data, dataState.filter, subItemsField)
        let sortedData = orderBy(filteredData, dataState.sort, subItemsField)
        return addExpandField(sortedData);
    }
    const columns = [
        {
            field: 'selected',
            width: '2%',
            headerSelectionValue: headerSelectionValue(),
            cell: (props)=>props.dataItem.level===2?<TreeListSelectionCell {...props}/>:<TreeListCell />,
            headerCell: TreeListHeaderSelectionCell
        },
        { field: 'id', title: 'Client', width: 250,  expandable: true,cell:linkedColumnCell},
        { field: 'balance', title: 'USD Balance', width: 200},
        { field: 'localBalance', title: 'Local Balance', width: 200 },
        { field: 'billingBalance', title: 'Billing Balance', width: 200 },
        { field: 'billingCurrency', title: 'Billing Currency', width: 200 },
        { field: 'creditLimit', title: 'Credit Limit', width: 200 },
        { field: 'pastDueBalance', title: 'Past Due Balance', width: 200 }
    ];
    return (
        <div><Toolbar>
      
       <b>CLIENT DETAILS</b>
                <Styled.HeaderLink>  <button
          title="Add Comments"
          className="btn btn-primary"
          onClick={setItemsForSendStmt}
         

        >
        &nbsp;  Send Statement
                    </button>
                    </Styled.HeaderLink>  
      </Toolbar>
        <StyledGrid
            style={{ maxHeight: '350px', overflow: 'auto' }}
           
            selectedField={selectField}
            onSelectionChange={onSelectionChange}
            onHeaderSelectionChange={onHeaderSelectionChange}
            onRowClick={onRowClick}
            expandField={expandField}
            subItemsField={subItemsField}
            onExpandChange={onExpandChange}
            sortable={{ mode: 'multiple' }}
            {...dataState}
            data={processData()}
            onDataStateChange={handleDataStateChange}
            columns={columns}/>
              
              { sendStatementDialog && <SendStatementDialog   selectedItems={statementItems} save={sendStatement} cancel={cancel}/>}
           
            </div>
           
            
    );

});

export default clientDetailsGrid;