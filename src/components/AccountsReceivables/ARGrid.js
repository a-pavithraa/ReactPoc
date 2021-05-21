import React from "react";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { GridStyles } from "../../styledJS/common/grid.styled";
import styled from "styled-components";

const arGrid = React.memo(props => {
  const StyledGrid = styled(Grid)`
    ${GridStyles}
  `;
  return (
    <StyledGrid data={props.arSummaryList}>
      <Column field="dueType" title="Due Type" width="150px" />
      <Column field="totalDue" width="200px" title="Amount" />
      <Column field="invoiceCount" width="200px" title="#Invoices" />
    </StyledGrid>
  );
});

export default arGrid;
