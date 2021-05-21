import React from "react";
import {
  Chart,
  ChartLegend,
  ChartTooltip,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartArea
} from "@progress/kendo-react-charts";
import "hammerjs";
const arChart = React.memo(props => {
  const categories = [
    "Cur Balance",
    "0 to 7",
    "8 to 30",
    "31 to 60",
    "61 to 90",
    "Above 90",
    "Unapplied"
  ];
  const series = [
    2398994.0,
    942125.0,
    1315508.0,
    1012263.0,
    141034.0,
    14324.0,
    -8589.0
  ];
  const valueAxisLabels = {
    padding: 3,
    font: "bold 13px Arial, sans-serif"
  };

  return (
    <div className="table table-responsive">
    <Chart pannable={{ lock: "y" }} zoomable={{ mousewheel: { lock: "y" } }}>
      <ChartArea background="#d9f3e3" />
      <ChartLegend position="custom" offsetX={80} offsetY={25} />
      <ChartTooltip shared={true} />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          categories={categories}
          labels={{ rotation: "auto" }}
        />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem labels={valueAxisLabels} />
      </ChartValueAxis>
      <ChartSeries>
        <ChartSeriesItem data={series} name="Delivery per schedule" />
      </ChartSeries>
    </Chart>
    </div>
  );
});

export default arChart;
