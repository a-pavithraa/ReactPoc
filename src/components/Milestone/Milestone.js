import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "../../hooks/useRouter";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import { PanelBarItem } from "@progress/kendo-react-layout";
import MilestoneTableDetails from "./MilestoneTable";
import InvoiceTable from "../Invoice/InvoiceTable";
import InvoiceDrilldown from "../Invoice/InvoiceDrilldown";
import CommentsTable from "../Comments/CommentsTable";
import CommentsDrilldown from "../Comments/CommentsDrilldown";
import { ToolbarItem, ToolbarSeparator } from "@progress/kendo-react-buttons";
import Settings from "../UI/Settings/Settings";
import * as Styled from "../../styledJS/common/common.styled";
import * as LocalStyled from "./Styled";
const milestone = React.memo(props => {
  const { history } = useRouter();

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
              
        history.replace(
          history.location.pathname + "?backFlag=true" /* the new state */
        );
      }
    };
  }, [history]);

  const shipmentDetails = useSelector(
    state => state.drilldownDetails.shipmentInformation
  );
  const loadingFlag = useSelector(state => state.drilldownDetails.loading);
  const commentsDetails = useSelector(state => state.drilldownDetails.comments);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [commentDrilldown, setCommentDrilldown] = useState(null);
  const dispatch = useDispatch();
  const onFetchShipmentInfo = useCallback(
    jobNo => dispatch(actions.fetchShipmentsAsync(jobNo)),
    [dispatch]
  );

  const jobNo = props.match.params.jobNo;
  const aeunid = props.match.params.aeUnid;
  useEffect(() => {
    onFetchShipmentInfo(jobNo);
  }, [onFetchShipmentInfo, jobNo]);

  const displayInvoiceDrilldown = invoiceNo => {
    setSelectedInvoice(invoiceNo);
  };

  let shipment = "";
  if (loadingFlag) {
    shipment = <LocalStyled.StyledLoader type="Circles" color="#00BFFF" />;
  }
  if (shipmentDetails && !loadingFlag) {
    shipment = (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Styled.CustomizedToolbar>
              <Styled.PageTitle>SHIPMENT DETAILS</Styled.PageTitle>
              <Styled.HeaderLink>
                <ToolbarSeparator />
                <ToolbarItem>
                  <Settings />
                </ToolbarItem>
              </Styled.HeaderLink>
            </Styled.CustomizedToolbar>
          </div>
        </div>

        <Styled.TopPane>
          <div className="row">
            <div className="col col-sm-12 col-md-6 col-lg-2">
              <Styled.FieldHeading light>CLIENT NAME</Styled.FieldHeading>
              <Styled.FieldValue light>
                {shipmentDetails.customerName}
              </Styled.FieldValue>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-2">
              <Styled.FieldHeading light>AWB#</Styled.FieldHeading>
              <Styled.FieldValue light>
                {shipmentDetails.shpNo}
              </Styled.FieldValue>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-2">
              <Styled.FieldHeading light>ORIGIN</Styled.FieldHeading>
              <Styled.FieldValue light>
                {shipmentDetails.originCity}
              </Styled.FieldValue>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-2">
              <Styled.FieldHeading light>DESTINATION</Styled.FieldHeading>
              <Styled.FieldValue light>
                {shipmentDetails.destinationCity}
              </Styled.FieldValue>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-2">
              <Styled.FieldHeading light>SHIPPER DATE</Styled.FieldHeading>
              <Styled.FieldValue light>
                {shipmentDetails.jobDate}
              </Styled.FieldValue>
            </div>
            <div className="col col-sm-12 col-md-6 col-lg-2">
              <Styled.FieldHeading light>DUE DATE</Styled.FieldHeading>
              <Styled.FieldValue light>
                {shipmentDetails.promiseDeliveryDate}
              </Styled.FieldValue>
            </div>
          </div>
        </Styled.TopPane>
        <div className="row" style={{ margin: "4px 3px" }}>
          <div className={`col col-sm-12 col-md-6 col-lg-3`}>
            <LocalStyled.CardLayout>
              <Styled.FieldHeadingSmall>Shipper</Styled.FieldHeadingSmall>

              <Styled.BlockedSpan>
                {shipmentDetails.shipperName}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.shipperAddress1}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.shipperAddress2}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.shipperAddress3}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.shipperAddress4}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.shipperCity}
              </Styled.BlockedSpan>
              <Styled.FieldHeadingSmall>Service Type</Styled.FieldHeadingSmall>
              {shipmentDetails.serviceType}
            </LocalStyled.CardLayout>
          </div>
          <div className={`col col-sm-12 col-md-6 col-lg-3 `}>
            <LocalStyled.CardLayout>
              <Styled.FieldHeadingSmall>Consignee</Styled.FieldHeadingSmall>
              <Styled.BlockedSpan>
                {shipmentDetails.consigneeName}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.consigneeAddress1}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.consigneeAddress2}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.consigneeAddress3}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.consigneeAddress4}
              </Styled.BlockedSpan>
              <Styled.BlockedSpan>
                {shipmentDetails.consigneeCity}
              </Styled.BlockedSpan>
              <Styled.FieldHeadingSmall>Service Level</Styled.FieldHeadingSmall>
              {shipmentDetails.serviceLevel}
            </LocalStyled.CardLayout>
          </div>
          <div className={`col col-sm-12 col-md-6 col-lg-3  `}>
            <LocalStyled.CardLayout>
              <Styled.FieldHeadingSmall>Business Type</Styled.FieldHeadingSmall>
              <Styled.BlockedSpan>
                {shipmentDetails.businessType}
              </Styled.BlockedSpan>

              <Styled.FieldHeadingSmall>Weight</Styled.FieldHeadingSmall>
              <Styled.BlockedSpan>
                {shipmentDetails.totalGrossWeight}
              </Styled.BlockedSpan>

              <Styled.FieldHeadingSmall>
                Chargeable Weight
              </Styled.FieldHeadingSmall>
              <Styled.BlockedSpan>
                {shipmentDetails.totalChargeableWeight}
              </Styled.BlockedSpan>
              <Styled.FieldHeadingSmall>Total Pieces</Styled.FieldHeadingSmall>
              <Styled.BlockedSpan>
                {shipmentDetails.totalPieces}
              </Styled.BlockedSpan>
            </LocalStyled.CardLayout>
          </div>
          <div className={`col col-sm-12 col-md-6 col-lg-3 `}>
            <LocalStyled.CardLayout>
              <Styled.FieldHeadingSmall>Booking#</Styled.FieldHeadingSmall>
              <Styled.BlockedSpan>
                {shipmentDetails.bookingNumber}&nbsp;
              </Styled.BlockedSpan>
              <Styled.FieldHeadingSmall>REFERENCES</Styled.FieldHeadingSmall>
              {shipmentDetails.referenceNumbers.map(reference => {
                return (
                  <Styled.BlockedSpan key={reference}>
                    {reference}
                  </Styled.BlockedSpan>
                );
              })}
            </LocalStyled.CardLayout>
          </div>
        </div>
        <Styled.CustomizedPane>
          <Styled.CustomizedPanelBar expandMode="multiple">
            <PanelBarItem title={"Milestone Details"} expanded={true}>
              <MilestoneTableDetails
                milestonesList={shipmentDetails.shipmentMilestones}
              />
            </PanelBarItem>
            <PanelBarItem title={"Invoices"} expanded={true}>
              <InvoiceTable
                invoiceList={shipmentDetails.invoices}
                drilldownHandler={displayInvoiceDrilldown}
              />
            </PanelBarItem>
            <PanelBarItem title={"Comments"} expanded={true}>
              <CommentsTable
                aeunid={aeunid}
                showDrilldown={() => setCommentDrilldown(true)}
              />
            </PanelBarItem>
          </Styled.CustomizedPanelBar>
        </Styled.CustomizedPane>
        <br />
      </div>
    );
  }

  return (
    <div>
      {shipment}
      {selectedInvoice && (
        <InvoiceDrilldown
          invoiceNo={selectedInvoice}
          close={() => setSelectedInvoice(null)}
        />
      )}
      {commentDrilldown && (
        <CommentsDrilldown
          commentsDetails={commentsDetails}
          close={() => setCommentDrilldown(false)}
        />
      )}
    </div>
  );
});

export default milestone;
