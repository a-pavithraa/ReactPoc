import React,{useState} from 'react';
import {
    TreeList, orderBy, filterBy, mapTree, extendDataItem} from '@progress/kendo-react-treelist';
import styled from 'styled-components';

import {GridStyles} from './Styled';

const StyledGrid = styled(TreeList)`

${GridStyles}
`;
const columns = [
    { field: 'id', title: 'Client', width: 250,  expandable: true },
    { field: 'balance', title: 'USD Balance', width: 200,},
    { field: 'localBalance', title: 'Local Balance', width: 200 },
    { field: 'billingBalance', title: 'Billing Balance', width: 200 },
    { field: 'billingCurrency', title: 'Billing Currency', width: 200 },
    { field: 'creditLimit', title: 'Credit Limit', width: 200 },
    { field: 'pastDueBalance', title: 'Past Due Balance', width: 200 }
];
const subItemsField = 'clientDetailsList';
const expandField = 'expanded';

const clientDetailsGrid = React.memo((props)=>{
    const [expanded,setExpanded]=useState([]);
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

    const addExpandField = (dataTree) => {
      
        return mapTree(dataTree, subItemsField, (item) =>
            extendDataItem(item, subItemsField, {
                [expandField]: expanded!=null && expanded.length>0?expanded.includes(item.id):false
            })
        );
    }

   const processData = () => {
        console.log('process data called');
        let filteredData = filterBy(data, dataState.filter, subItemsField)
        let sortedData = orderBy(filteredData, dataState.sort, subItemsField)
        return addExpandField(sortedData);
    }
    return (
        <StyledGrid
            style={{ maxHeight: '510px', overflow: 'auto' }}
            expandField={expandField}
            subItemsField={subItemsField}
            onExpandChange={onExpandChange}
            sortable={{ mode: 'multiple' }}
            {...dataState}
            data={processData()}
            onDataStateChange={handleDataStateChange}
            columns={columns}
        />
    );

});

export default clientDetailsGrid;