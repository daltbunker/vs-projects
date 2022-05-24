import React, { useEffect } from "react";
import * as d3 from "d3";
import { PieArcDatum } from "d3";

interface IPieChart {
  height: number;
  width: number;
  title: string;
  padding: number;
}

interface IPieChartData {
  file: string;
  changes: number;
}

type Props = {
  data: Array<IPieChartData>;
  display: IPieChart;
};

export default function PieChart({ data, display }: Props) {
  const { height, width, title, padding } = display;
  const svgRef = React.useRef(null);

  useEffect(() => {
    const svgChart = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    const radius = Math.min(width, height) / 3;
    const g = svgChart
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 1.8 + ")");
    const color = generateColors(data.length);

    const pie = d3.pie();

    const path = d3.arc<PieArcDatum<any>>().innerRadius(0).outerRadius(radius);

    const div = d3
      .select(".chart-container")
      .append("div")
      .attr("class", "tooltip green-side")
      .style("position", "absolute")
      .style("opacity", 0);

    const arcs = g
      .selectAll("arc")
      .data(pie(data.map((d) => d.changes)))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("id", (d, i) => data[i].file.replace(".", "-")) // . in home.tsx splits id into class
      .on("mouseover", (event, d) => {
        const dataIndex = getDataIndex(event.path[1].id);
        div
          .text(`${data[dataIndex].file}: ${d.value}`)
          .style("opacity", 1)
          .style("top", event.pageY - 20 + "px")
          .style("left", event.pageX + "px")
          .style("color", "white")
          .style("border", "1px solid white")
          .style("background-color", color[dataIndex]);
      })
      .on("mouseleave", () => {
        div.style("opacity", 0);
      });

    arcs
      .append("path")
      .attr("fill", function (d, i) {
        return color[i];
      })
      .attr("d", path);

    svgChart
      .append("text")
      .attr("x", width / 2)
      .attr("y", padding)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .style("font-size", "16px")
      .text(title);

    if (data.length === 0) {
      svgChart
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .style("font-size", "16px")
        .text("NO DATA");
    }

    function getDataIndex(fileName: string): number {
      let index = -1;
      data.forEach((item, i) => {
        if (item.file === fileName.replace("-", ".")) {
          index = i;
        }
      });
      return index;
    }
  }, [data, height, padding, width, title]);

  function generateColors(size: number): string[] {
    const colors = [];
    const hexChars = "0123456789ABCDEF".split("");
    for (let i = 0; i < size; i++) {
      let color = "";
      for (let j = 0; j < 4; j++) {
        color += hexChars[Math.floor(Math.random() * 16)];
      }
      colors.push("#00" + color);
    }
    return colors;
  }

  return (
    <div className="chart-container">
      <svg ref={svgRef} />
    </div>
  );
}
