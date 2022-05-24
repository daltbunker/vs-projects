import React, { useEffect } from "react";
import * as d3 from "d3";

interface IBarChart {
  height: number;
  width: number;
  title: string;
  padding: number;
}

interface IBarChartData {
  priority: string;
  count: number;
}

type Props = {
  data: Array<IBarChartData>;
  display: IBarChart;
};

export default function BarChart({ data, display }: Props) {
  const { height, width, title, padding } = display;
  const svgRef = React.useRef(null);

  useEffect(() => {
    const svgGraph = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    let countSum = 0;
    for (let i = 0; i < data.length; i++) {
      countSum += data[i].count;
    }
    if (countSum > 0){
      const xScale = d3.scaleLinear().domain([0, 4]).range([padding, width]);

      const priorities = ["low", "medium", "high"];
      const maxY = Math.max(...data.map((d) => d.count));

      const yScale = d3
        .scaleLinear()
        .domain([0, maxY + maxY * 0.5])
        .range([height - padding, padding]);

      const div = d3
        .select(".graph-container")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("opacity", 0);

      svgGraph
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(priorities.indexOf(d.priority) + 1) - 13)
        .attr("y", (d) => yScale(d.count))
        .attr("width", 26)
        .attr("height", (d) => height - yScale(d.count) - padding)
        .attr("fill", "#00cf3b")
        .attr("class", "bar")
        .on("mouseover", (event, d) => {
          div
            .text("total: " + d.count)
            .style("opacity", 1)
            .style("top", event.pageY - 20 + "px")
            .style("left", event.pageX + "px");
        })
        .on("mouseleave", () => {
          div.style("opacity", 0);
        });

      svgGraph
        .append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .style("font-size", "12px")
        .text("priority");

      const xAxis = d3
        .axisBottom(xScale)
        .ticks(3)
        .tickFormat((d, i) => priorities[i - 1]);

      const yAxis = d3.axisLeft(yScale);

      svgGraph
        .append("g")
        .attr("transform", `translate(${0}, ${height - padding})`)
        .call(xAxis);

      svgGraph
        .append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .call(yAxis);
    } else if (data.length === 3 && countSum === 0) {
      svgGraph
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .style("font-size", "16px")
        .text("NO DATA");
    }

    svgGraph
      .append("text")
      .attr("x", width / 2)
      .attr("y", padding)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .style("font-size", "16px")
      .text(title);
  }, [data, height, padding, title, width]);

  return (
    <div className="graph-container">
      <svg ref={svgRef} />
    </div>
  );
}
