import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface HRFiveDimensionChartProps {
  data: {
    axis: string;
    value: number;
    label?: string;
  }[];
  avgData?: {
    axis: string;
    value: number;
  }[];
}

export default function HRFiveDimensionChart({ data, avgData }: HRFiveDimensionChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 360;
    const height = 320;
    const margin = 50;
    const radius = Math.min(width, height) / 2 - margin;
    
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const angleSlice = (Math.PI * 2) / data.length;

    // Scale
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 5]);

    // Draw background grid (circles)
    const levels = 5;
    for (let i = 0; i < levels; i++) {
      const r = (radius / levels) * (i + 1);
      g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "#f3f4f6")
        .attr("stroke-dasharray", "4");
    }

    // Draw axes lines
    const axis = g.selectAll(".axis")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(5) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(5) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("stroke", "#f3f4f6")
      .attr("stroke-width", "1px");

    // Draw axis labels
    axis.append("text")
      .attr("class", "legend")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => rScale(5.4) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(5.4) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", "#6b7280")
      .text(d => d.axis);

    // Draw values
    axis.append("text")
      .attr("class", "value")
      .attr("text-anchor", "middle")
      .attr("dy", "1.6em")
      .attr("x", (d, i) => rScale(5.4) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(5.4) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("font-size", "12px")
      .attr("font-weight", "black")
      .attr("fill", "#111827")
      .text(d => `${d.value}分`);

    const radarLine = d3.lineRadial<any>()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    // Draw average data (the comparison line)
    if (avgData) {
      g.append("path")
        .datum(avgData)
        .attr("d", radarLine)
        .attr("fill", "none")
        .attr("stroke", "#9ca3af")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4,4")
        .attr("opacity", 0.7);

      // Add legend for average if desired (skipping for brevity but could add)
    }

    // The user radar area
    g.append("path")
      .datum(data)
      .attr("d", radarLine)
      .attr("fill", "rgba(59, 130, 246, 0.15)")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3);

    // Add dots for user data
    g.selectAll(".radar-dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "radar-dot")
      .attr("r", 4.5)
      .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("fill", "#3b82f6")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Add simple Legend
    const legend = g.append("g")
      .attr("transform", `translate(${-radius}, ${radius + 30})`);

    legend.append("line")
      .attr("x1", 0).attr("y1", 0).attr("x2", 15).attr("y2", 0)
      .attr("stroke", "#3b82f6").attr("stroke-width", 3);
    legend.append("text").attr("x", 20).attr("y", 4).text("本期分值").attr("font-size", "10px").attr("fill", "#6b7280");

    if (avgData) {
      legend.append("line")
        .attr("x1", 70).attr("y1", 0).attr("x2", 85).attr("y2", 0)
        .attr("stroke", "#9ca3af").attr("stroke-width", 1.5).attr("stroke-dasharray", "3,3");
      legend.append("text").attr("x", 90).attr("y", 4).text("全网均值").attr("font-size", "10px").attr("fill", "#6b7280");
    }

  }, [data, avgData]);

  return (
    <svg ref={svgRef} width="360" height="320" className="mx-auto overflow-visible"></svg>
  );
}
