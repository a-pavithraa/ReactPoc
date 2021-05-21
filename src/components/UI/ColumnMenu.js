import React,{useState,useCallback} from 'react';
import {
    GridColumnMenuSort,
    GridColumnMenuFilter, GridColumnMenuItemGroup, GridColumnMenuItem, GridColumnMenuItemContent
} from '@progress/kendo-react-grid';

const columnMenu = React.memo(props=>{
    const [columns,setColumns]=useState(props.columns);
    const [columnsVisibility,setNewColumnsVisibility] =useState({...props.columnsVisibility});

    const[columnsExpanded,setColumnsExpanded]=useState(false);
    const[filterExpanded,setFiltersExpanded]=useState(false);
    
    const onToggleColumn = useCallback((id,field) => {
      
        setColumns(
           columns.map((column, idx) => {
               if(idx===id){
                setNewColumnsVisibility({...columnsVisibility,[field]:column.show?'hide':'show'});
               }
                return idx === id ? { ...column, show: !column.show } : column;
            }));
         
      console.log("columnsVisibility in column menu===>"+JSON.stringify(columnsVisibility));
    },[columns,columnsVisibility]);

   const onReset = (event) => {
        event.preventDefault();
        const allColumns = columns.map(col => {
            return {
                ...col,
                show: true
            };
        });

        setColumns(allColumns);
        setNewColumnsVisibility({});
        props.onColumnsSubmit(allColumns,{});
        if (props.onCloseMenu) {
            props.onCloseMenu();
        }

    }

   const onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
       props.onColumnsSubmit(columns,columnsVisibility);
        if (props.onCloseMenu) {
            props.onCloseMenu();
        }
    }

   const onMenuItemClick = () => {
        const value = !columnsExpanded;
        setColumnsExpanded(value);
        setFiltersExpanded(value ? false :filterExpanded)
        
    }

   const onFilterExpandChange = (value) => {
       setFiltersExpanded(value);
       setColumnsExpanded(value ? false : columnsExpanded)
      
    }

    const oneVisibleColumn = columns.filter(c => c.show).length === 1;
    return (
        
        <div>
            <GridColumnMenuSort {...props} />
            <GridColumnMenuFilter
                    {...props}
                    onExpandChange={onFilterExpandChange}
                    expanded={filterExpanded}
                />
                <GridColumnMenuItemGroup>
                    <GridColumnMenuItem
                        title={'Columns'}
                        iconClass={'k-i-columns'}
                        onClick={onMenuItemClick}
                    />
                    <GridColumnMenuItemContent show={columnsExpanded}>
                        <div className={'k-column-list-wrapper'}>
                            <form onSubmit={onSubmit} onReset={onReset}>
                                <div className={'k-column-list'}>
                                    {columns.map((column, idx) =>
                                        (
                                            <div key={idx} className={'k-column-list-item'}>
                                                <span>
                                                    <input
                                                        id={`column-visiblity-show-${idx}`}
                                                        className="k-checkbox"
                                                        type="checkbox"
                                                        readOnly={true}
                                                        disabled={column.show && oneVisibleColumn}
                                                        checked={column.show && columnsVisibility[column.field]!=='hide'}
                                                        onClick={() => { onToggleColumn(idx,column.field); }}
                                                    />
                                                    <label
                                                        htmlFor={`column-visiblity-show-${idx}`}
                                                        className="k-checkbox-label"
                                                        style={{ userSelect: 'none' }}
                                                    >
                                                        {column.title}
                                                    </label>
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className={'k-columnmenu-actions'}>
                                    <button type={'reset'} className={'k-button'}>Reset</button>
                                    <button className={'k-button k-primary'}>Save</button>
                                </div>
                            </form>
                        </div>
                    </GridColumnMenuItemContent>
                </GridColumnMenuItemGroup>
        </div>
    );
});

export default columnMenu;
