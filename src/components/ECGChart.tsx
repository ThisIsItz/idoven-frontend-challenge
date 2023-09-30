import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ECGChart({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 40,
  marginLeft = 40,
}) {
  console.log("d3", data);
  const svgRef = useRef();

  useEffect(() => {
    // Remove the first data point
    const trimmedData = data.slice(1000);

    const svg = d3.select(svgRef.current);

    // Extract the time and value values and parse them as numbers
    const timeValues = trimmedData.map((d) => parseFloat(d.time));
    const valueValues = trimmedData.map((d) => parseFloat(d.value));

    const x = d3
      .scaleLinear()
      .domain(d3.extent(timeValues))
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(valueValues))
      .range([height - marginBottom, marginTop]);

    // Create x-axis and y-axis generators
    const xAxis = d3.axisBottom(x).tickSize(-height + marginTop + marginBottom);
    const yAxis = d3.axisLeft(y).tickSize(-width + marginLeft + marginRight);

    // Append the background grid for x-axis and y-axis to the SVG
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(yAxis);

    const line = d3
      .line()
      .x((d) => x(parseFloat(d.time)))
      .y((d) => y(parseFloat(d.value)));

    // Append the line chart
    svg
      .append("path")
      .datum(trimmedData)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", "1.5")
      .attr("d", line);

    // Remove the circles at value changes
    svg.selectAll(".point").remove();
  }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g fill="none" stroke="#ccc" strokeWidth="0.5">
        {/* Add grid lines */}
        <path className="grid" d={`M${marginLeft},${marginTop}L${marginLeft},${height - marginBottom}`} />
        <path className="grid" d={`M${marginLeft},${height - marginBottom}L${width - marginRight},${height - marginBottom}`} />
      </g>
    </svg>
  );
}
