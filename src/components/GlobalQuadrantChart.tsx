import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function GlobalQuadrantChart({ selectedGroup = '全部', selectedRegion = '业务区整体' }: { selectedGroup?: string, selectedRegion?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const businessDistricts = [
      { id: '速运浙北区', x: 75, y: 80, color: '#4ade80' },
      { id: '速运广佛区', x: 82, y: 72, color: '#4ade80' },
      { id: '速运苏中区', x: 25, y: 70, color: '#facc15' },
      { id: '速运河南区', x: 22, y: 65, color: '#facc15' },
      { id: '速运内蒙古区', x: 28, y: 35, color: '#f87171' },
      { id: '速运上海区', x: 45, y: 75, color: '#4ade80' },
      { id: '速运福建区', x: 92, y: 85, color: '#4ade80' },
    ];

    const sortingCenters = [
      { id: '华东分拨区', x: 80, y: 60, color: '#facc15' },
      { id: '华南分拨区', x: 48, y: 68, color: '#4ade80' },
      { id: '鄂枢分拨区', x: 42, y: 38, color: '#f87171' },
      { id: '华北分拨区', x: 15, y: 30, color: '#f87171' },
      { id: '华西分拨区', x: 65, y: 92, color: '#4ade80' },
    ];

    let rawData = businessDistricts;
    if (selectedRegion === '分拨区整体') {
      rawData = sortingCenters;
    }

    // Simple deterministic filter based on group letter to demonstrate 50% filtering
    const data = selectedGroup === '全部' 
      ? rawData 
      : rawData.filter((_, i) => {
          // For groups A, C, E, take evens. For groups B, D, take odds.
          const isOddGroup = ['A组', 'C组', 'E组'].includes(selectedGroup);
          return isOddGroup ? i % 2 === 0 : i % 2 !== 0;
        });

    const xScale = d3.scaleLinear().domain([0, 100]).range([0, chartWidth]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([chartHeight, 0]);

    // Draw quadrant backgrounds
    g.append("rect").attr("x", 0).attr("y", 0).attr("width", xScale(50)).attr("height", yScale(50)).attr("fill", "#fffce8").attr("opacity", 0.6); // Top Left (Yellow)
    g.append("rect").attr("x", xScale(50)).attr("y", 0).attr("width", xScale(50)).attr("height", yScale(50)).attr("fill", "#e7f9ed").attr("opacity", 0.6); // Top Right (Green)
    g.append("rect").attr("x", 0).attr("y", yScale(50)).attr("width", xScale(50)).attr("height", yScale(50)).attr("fill", "#fff1f1").attr("opacity", 0.6); // Bottom Left (Red)
    g.append("rect").attr("x", xScale(50)).attr("y", yScale(50)).attr("width", xScale(50)).attr("height", yScale(50)).attr("fill", "#f5f3ff").attr("opacity", 0.6); // Bottom Right (Blue/Purple)

    // Axes
    g.append("line").attr("x1", xScale(50)).attr("y1", 0).attr("x2", xScale(50)).attr("y2", chartHeight).attr("stroke", "#e5e7eb").attr("stroke-width", 1).attr("stroke-dasharray", "4");
    g.append("line").attr("x1", 0).attr("y1", yScale(50)).attr("x2", chartWidth).attr("y2", yScale(50)).attr("stroke", "#e5e7eb").attr("stroke-width", 1).attr("stroke-dasharray", "4");

    // Axis Labels
    svg.append("text").attr("x", width / 2).attr("y", height - 5).attr("text-anchor", "middle").attr("font-size", "10px").attr("fill", "#9ca3af").attr("font-weight", "bold").text("得分均值排序");
    svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", 15).attr("text-anchor", "middle").attr("font-size", "10px").attr("fill", "#9ca3af").attr("font-weight", "bold").text("对比三个月历史趋势");

    // Arrows on axis labels
    svg.append("text").attr("x", width / 2 + 80).attr("y", height - 5).attr("font-size", "10px").attr("fill", "#d1d5db").text("排序低 → 排序高");
    svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2 + 80).attr("y", 15).attr("font-size", "10px").attr("fill", "#d1d5db").text("排序低 → 排序高");

    // Points
    const points = g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .attr("fill", d => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .style("transition", "all 0.2s");

    points.on("mouseover", function(event, d) {
      d3.select(this).attr("r", 7).attr("stroke-width", 2).attr("stroke", "#3b82f6");
    }).on("mouseout", function() {
      d3.select(this).attr("r", 5).attr("stroke-width", 1).attr("stroke", "white");
    });

    // Labels for specific points
    const labels = g.selectAll(".dot-label")
      .data(data)
      .enter().append("text")
      .attr("x", d => xScale(d.x))
      .attr("y", d => yScale(d.y) - 8)
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("fill", "#4b5563")
      .text(d => d.id);

  }, [selectedGroup, selectedRegion]);

  return (
    <svg ref={svgRef} width="100%" height="420" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid meet"></svg>
  );
}
