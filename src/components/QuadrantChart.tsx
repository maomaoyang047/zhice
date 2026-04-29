import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const districtData = [
  { x: 18, y: 55, label: '福州区', color: '#f59e0b' },
  { x: 30, y: 78, label: '福建区', color: '#10b981' },
  { x: 10, y: 40, label: '无锡区', color: '#ef4444' },
  { x: 45, y: 88, label: '广州区', color: '#10b981' },
  { x: 42, y: 85, label: '重庆区', color: '#10b981' },
  { x: 38, y: 92, label: '黑吉区', color: '#10b981' },
  { x: 35, y: 95, label: '苏沪区', color: '#10b981' },
  { x: 50, y: 90, label: '南京区', color: '#10b981' },
  { x: 55, y: 94, label: '上海区', color: '#10b981' },
  { x: 65, y: 92, label: '贵州区', color: '#10b981' },
  { x: 72, y: 90, label: '辽南区', color: '#10b981' },
  { x: 68, y: 85, label: '佛山区', color: '#10b981' },
  { x: 60, y: 82, label: '江西区', color: '#10b981' },
  { x: 75, y: 88, label: '河南区', color: '#10b981' },
  { x: 70, y: 80, label: '陕西区', color: '#10b981' },
  { x: 78, y: 75, label: '湖南区', color: '#10b981' },
  { x: 80, y: 70, label: '山西区', color: '#10b981' },
  { x: 32, y: 35, label: '天津区', color: '#6366f1' },
  { x: 28, y: 25, label: '宁波区', color: '#6366f1' },
  { x: 25, y: 20, label: '杭州区', color: '#6366f1' },
  { x: 15, y: 30, label: '厦门区', color: '#ef4444' },
  { x: 12, y: 45, label: '漳州区', color: '#ef4444' },
  { x: 8, y: 38, label: '龙岩区', color: '#ef4444' },
  { x: 5, y: 32, label: '三明区', color: '#ef4444' },
];

const sortingCenterData = [
  { x: 25, y: 65, label: '华南分拨区', color: '#10b981' },
  { x: 40, y: 75, label: '华西分拨区', color: '#f59e0b' },
  { x: 15, y: 45, label: '华北分拨区', color: '#ef4444' },
  { x: 60, y: 85, label: '鄂枢分拨区', color: '#10b981' },
  { x: 50, y: 92, label: '华东分拨区', color: '#10b981' },
];

const functionalData = [
  { x: 30, y: 75, label: 'H线', color: '#10b981' },
  { x: 80, y: 85, label: 'M线', color: '#10b981' },
  { x: 20, y: 40, label: 'O线', color: '#ef4444' },
  { x: 60, y: 65, label: '审计', color: '#f59e0b' },
  { x: 50, y: 70, label: '企发办', color: '#10b981' },
];

const buData = [
  { x: 45, y: 60, label: '仓储', color: '#10b981' },
  { x: 70, y: 80, label: '产业园', color: '#f59e0b' },
  { x: 25, y: 35, label: '数科', color: '#ef4444' },
  { x: 85, y: 90, label: '大件', color: '#10b981' },
  { x: 35, y: 55, label: '小件', color: '#f59e0b' },
];

const bgData = [
  { x: 65, y: 75, label: '供应链事业群', color: '#10b981' },
];

interface QuadrantChartProps {
  viewMode?: 'district' | 'global';
  filter?: 'all' | 'groupC';
  orgType?: string;
}

export default function QuadrantChart({ viewMode = 'district', filter = 'all', orgType = '业务区' }: QuadrantChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    let data = districtData;
    let highlightLabel = '福建区';

    if (orgType === '分拨区') {
      data = sortingCenterData;
      highlightLabel = '华西分拨区';
    } else if (orgType === '职能条线') {
      data = functionalData;
      highlightLabel = 'M线';
    } else if (orgType === 'BU') {
      data = buData;
      highlightLabel = '仓储';
    } else if (orgType === 'BG') {
      data = bgData;
      highlightLabel = '供应链事业群';
    }

    // Filter points if Group C is selected: filter out 70% of points (keep 30%)
    // But always keep highlightLabel for context if it exists
    const filteredData = filter === 'groupC' && orgType === '业务区'
      ? data.filter((d, i) => d.label === highlightLabel || (i % 10 < 3)) 
      : data;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const x = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

    // Draw Quadrants
    // Top Left (Yellowish)
    svg.append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', (width - margin.left - margin.right) / 2)
      .attr('height', (height - margin.top - margin.bottom) / 2)
      .attr('fill', '#fff8e6');

    // Top Right (Greenish)
    svg.append('rect')
      .attr('x', margin.left + (width - margin.left - margin.right) / 2)
      .attr('y', margin.top)
      .attr('width', (width - margin.left - margin.right) / 2)
      .attr('height', (height - margin.top - margin.bottom) / 2)
      .attr('fill', '#e6f6ee');

    // Bottom Left (Reddish)
    svg.append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top + (height - margin.top - margin.bottom) / 2)
      .attr('width', (width - margin.left - margin.right) / 2)
      .attr('height', (height - margin.top - margin.bottom) / 2)
      .attr('fill', '#fdecec');

    // Bottom Right (Blueish)
    svg.append('rect')
      .attr('x', margin.left + (width - margin.left - margin.right) / 2)
      .attr('y', margin.top + (height - margin.top - margin.bottom) / 2)
      .attr('width', (width - margin.left - margin.right) / 2)
      .attr('height', (height - margin.top - margin.bottom) / 2)
      .attr('fill', '#eef2ff');

    // Axes labels
    svg.append('text')
      .attr('x', width / 2 + 20)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#64748b')
      .text('得分均值排序');

    // Vertical Axis Text (Stacked characters)
    const verticalText = '对比三个月历史趋势';
    const vTextX = 15;
    const vTextYStart = height / 2 - 80;
    verticalText.split('').forEach((char, i) => {
      svg.append('text')
        .attr('x', vTextX)
        .attr('y', vTextYStart + i * 14)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#64748b')
        .text(char);
    });

    // Sub labels for axes (arrows)
    svg.append('text')
        .attr('x', margin.left + 5)
        .attr('y', height - 30)
        .attr('font-size', '10px')
        .attr('fill', '#94a3b8')
        .text('排序低 → 排序高');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height + 60)
        .attr('y', margin.left - 10)
        .attr('font-size', '10px')
        .attr('fill', '#94a3b8')
        .text('排序高 ↑ 排序低'); // Based on the screenshot's arrow direction if possible, but standard is low to high.

    // Draw points
    svg.selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y))
      .attr('r', d => d.label === highlightLabel ? 7 : 5)
      .attr('fill', d => d.label === highlightLabel ? '#ef4444' : (d.y > 50 ? (d.x > 50 ? '#10b981' : '#f59e0b') : (d.x > 50 ? '#6366f1' : '#ef4444')))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')
      .style('cursor', 'pointer');

    // Add labels
    svg.selectAll('.label')
      .data(filteredData.filter(d => d.label === highlightLabel || d.x > 80 || d.y > 80 || d.x < 10))
      .enter()
      .append('text')
      .attr('x', d => x(d.x) + 8)
      .attr('y', d => y(d.y) - 8)
      .attr('font-size', '11px')
      .attr('fill', d => d.label === highlightLabel ? '#1e40af' : '#64748b')
      .attr('font-weight', d => d.label === highlightLabel ? 'bold' : 'normal')
      .text(d => d.label);

  }, [filter, orgType]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        ref={svgRef} 
        width="800" 
        height="400" 
        viewBox="0 0 800 400"
        className="max-sm:w-full"
      />
      
      {/* Direction indicators */}
      <div className="absolute bottom-10 left-10 text-[8px] text-gray-300 transform -rotate-90 origin-left translate-y-full">
        排序低 → 排序高
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[8px] text-gray-300">
        排序低 → 排序高
      </div>
    </div>
  );
}
