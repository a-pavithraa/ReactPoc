import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import styled from 'styled-components';
import * as Styled from '../../styledJS/common/common.styled';
import * as actions from "../../store/actions/index";

const invoiceDrilldown = React.memo(props => {
  const invoiceNo = props.invoiceNo;
  const dispatch = useDispatch();
  const invoiceDrilldownInfo = useSelector(
    state => state.drilldownDetails.invoiceDrilldownInfo
  );
  const onFetchInvoiceDrilldown = useCallback(() => {
    dispatch(actions.fetchInvoiceDrilldownAsync(invoiceNo));
  }, [dispatch, invoiceNo]);
  useEffect(() => {
    onFetchInvoiceDrilldown();
  }, [onFetchInvoiceDrilldown]);

  const FieldHeading = styled.span`
  color: #050b24;
  margin-top: 5px;
  margin-bottom: 2px;
  font-weight: bolder;
  display: block;
  font-size: 12px;
  `

  let invoice = "";
  console.log(invoiceNo);

  if (invoiceDrilldownInfo) {
    invoice = (
      <Dialog onClose={props.close}>
         <div >
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Styled.PageTitle>
                INVOICE DETAILS - {invoiceNo}
                </Styled.PageTitle>
            </div>
          </div>

          <div className="row">
            <div className="col col-sm-12 col-md-6 col-lg-4">
             <FieldHeading >Client Name-Number</FieldHeading>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.customerName}-{" "}
                {invoiceDrilldownInfo.customerNumber}
                </Styled.BlockedSpan>
              <FieldHeading >Address</FieldHeading>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.custAddr1}
                </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.custAddr2}
                </Styled.BlockedSpan>
              <FieldHeading >Invoice Amount</FieldHeading>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.totalInvoiceAmount}
                </Styled.BlockedSpan>
              <FieldHeading >Invoice Date</FieldHeading>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.invoiceDateFrom}
                </Styled.BlockedSpan>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-4">
               <FieldHeading >Consignee</FieldHeading>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.consigneeName}
                </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.consigneeCity}
                </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.consigneeCountry}
                </Styled.BlockedSpan>
               <FieldHeading >Shipper</FieldHeading>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.shipperName}
                </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.shipperCity}
                </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.shipperCountry}
                </Styled.BlockedSpan>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-4">
               <FieldHeading >Pieces</FieldHeading>
               <Styled.BlockedSpan>
              {invoiceDrilldownInfo.pieces}</Styled.BlockedSpan>
               <FieldHeading >Weight</FieldHeading>
               <Styled.BlockedSpan>{invoiceDrilldownInfo.weight}</Styled.BlockedSpan>
               <FieldHeading >Charge Weight</FieldHeading>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.chargeWeight}&nbsp;
                </Styled.BlockedSpan>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-3">
               <FieldHeading >Service Level</FieldHeading>
              <Styled.BlockedSpan>
                {invoiceDrilldownInfo.serviceLevel}
              </Styled.BlockedSpan>
            </div>
          </div>
        </div>
      <div className="table table-responsive">
        <Styled.ResponsiveTable>
            <thead>
              <tr >
                <th >Description</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Qty UOM</th>
                <th>Currency</th>
                <th>Total</th>
                <th>Tax</th>
                <th >Remarks</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDrilldownInfo.lineItems &&
                invoiceDrilldownInfo.lineItems.map(lineItem => {
                  return (
                    <tr>
                      <td >
                        {lineItem.chargeDescription}
                      </td>
                      <td>{lineItem.rate}</td>
                      <td>{lineItem.quantity}</td>
                      <td>{lineItem.quantityUOM}</td>
                      <td>{lineItem.currency}</td>
                      <td>{lineItem.total}</td>
                      <td>{lineItem.tax}</td>
                      <td >
                        {lineItem.remarks}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            </Styled.ResponsiveTable>
            </div>
        <DialogActionsBar >
          <button className="btn btn-warning" onClick={props.close}>
            Close
          </button>
          &nbsp;&nbsp;
        
        </DialogActionsBar>
      
      </Dialog>
    );
  }

  return <div className="table table-responsive">{invoice}</div>;
});

export default invoiceDrilldown;
