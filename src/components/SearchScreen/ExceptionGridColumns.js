
const columns = [
    {
        title: 'AEUNID',
        field: 'aeUnid',
        show: true,
        filter: 'numeric',
        width: '100px'
    },
    {
        title: 'Action',
        field: 'actionType',
        show: true,
        filter: 'text',
        width: '150px'
    },
    {
        title: 'Action Code',
        field: 'actionCode',
        show: true,
        filter: 'text',
        width: '150px'
    },
    {
        title: 'Selling Station',
        field: 'sellingStation',
        show: true,
        filter: 'text',
        width: '150px'
    },
    {
        title: 'Owning Station',
        field: 'owningStation',
        show: true,
        filter: 'text',
        width: '150px'
    },
    {
        title: 'Client ID',
        field: 'customerId',
        show: true,
        filter: 'text',
        width: '150px',
        template:'clientIdLink'
    },
    {
        title: 'Client',
        field: 'customerName',
        show: true,
        filter: 'text',
        width: '150px',
        template:'clientNameLink'
    },
    {
        title: 'Group/ Assigned',
        field: 'responsibleGroup',
        show: true,
        filter: 'text',
        width: '150px'
    },
    {
        title: 'Person Assigned',
        field: 'responsiblePerson',
        show: true,
        filter: 'text',
        width: '150px'
    },
    {
        title: 'Client Group',
        field: 'customerGroup',
        show: true,
        filter: 'text',
        width: '150px'
    },
    {
        title: 'Management Group',
        field: 'managementGroup',
        show: true,
        filter: 'text',
        width: '150px'
    },
    { field: "esclationCount", title: "Esc Count", width: "150px", filter: 'text', show: true },
    { field: "escalateTo", title: "Escalate To", width: "150px", filter: 'text', show: true },
    { field: "transaction", title: "Transaction", width: "150px", filter: 'text', show: true, template:'transactionLink' },
    { field: "milestoneDesc", title: "Milestone Description", width: "150px", filter: 'text', show: true },
    { field: "shpNo", title: "AWB/BOL", width: "150px", filter: 'text', show: true ,  template:'milestoneLink'},
    { field: "jobNo", title: "Job", width: "150px", filter: 'text', show: true },
    { field: "priority", title: "Priority", width: "150px", filter: 'text', show: true },
    { field: "status", title: "Status", width: "150px", filter: 'text', show: true },
    { field: "followUpDate", title: "Follow-Up Date", width: "150px", filter: 'text', show: true },
    { field: "followUpDateTime", title: "Time", width: "150px", filter: 'text', show: true },
    { field: "comments", title: "Comments", width: "300px", filter: 'text', show: true },
    { field: "orginCity", title: "Origin City", width: "150px", filter: 'text', show: true },
    { field: "originCountry", ititle: "OriginCountry", width: "150px", filter: 'text', show: true },
    { field: "destCity", title: "Dest City", width: "150px", filter: 'text', show: true },
    { field: "destCountry", title: "Dest Country", width: "150px", filter: 'text', show: true },
    { field: "fltDate", title: "FLT Date", width: "150px", filter: 'text', show: true },
    { field: "jobDate", title: "Job Date", width: "150px", filter: 'text', show: true },
    { field: "dueDate", title: "Due Date", width: "150px", filter: 'text', show: true },
    { field: "estDate", title: "Est Date", width: "150px", filter: 'text', show: true },
    { field: "estTime" ,  title: "Est Time",width: "150px" ,  filter: 'text', show: true },
    { field: "actualRevenue", title: "Actual Revenue", width: "150px", filter: 'text', show: true },
    { field: "actualCost", title: "Actual Cost", width: "150px", filter: 'text', show: true },
    { field: "accruedcost", title: "Accruedcost", width: "150px", filter: 'text', show: true },
    { field: "netRevenue", title: "Net Revenue", width: "150px", filter: 'text', show: true },
    { field: "originCalc", title: "Origin Calc", width: "150px", filter: 'text', show: true },
    { field: "destCalc", title: "Dest Calc", width: "150px", filter: 'text', show: true },
    { field: "salesCalc", title: "Sales Calc", width: "150px", filter: 'text', show: true },
    { field: "opsUserID", title: "Kewill Ops User", width: "150px", filter: 'text', show: true },
    { field: "createBy", title: "Create By", width: "150px", filter: 'text', show: true },
    { field: "updateBy", title: "Update By", width: "150px", filter: 'text', show: true },
    { field: "consolNo", title: "Consol No", width: "150px", filter: 'text', show: true },
    { field: "carrierId", title: "Carrier Id", width: "150px", filter: 'text', show: true },
    { field: "carrierCode", title: "Carrier Code", width: "150px", filter: 'text', show: true },
    { field: "lossCategoryType", title: "Loss Category", width: "150px", filter: 'text', show: true }
];

export default columns;
