import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit {
  private d3data = [];
  private svg;
  public label = [];
  private margin = 55;
  private width = 650;
  private height = 520;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }
  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.d3data.map((d) => d.Stars.toString()))
      .range(['#00ffff	', '#00bfff', '#0080ff', '#0040ff', '#0000ff']);
  }
  private drawChart(data): void {
    for (let i = 0; i < data.myBudget.length; i++) {
      this.label[i] = data.myBudget[i].title;
    }
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.budget));
    var color = d3.scaleOrdinal().domain(this.label).range(d3.schemeDark2);

    var arc = d3
      .arc()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(this.radius * 1)
      .outerRadius(this.radius * 0.9);
    var radius = this.radius;

    this.svg
      .selectAll('allSlices')
      .data(pie(data.myBudget))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) {
        return color(d.data.title);
      })
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allPolylines')
      .data(pie(data.myBudget))
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', function (d) {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:

    this.svg
      .selectAll('allLabels')
      .data(pie(data.myBudget))
      .enter()
      .append('text')
      .text(function (d) {
        return d.data.title;
      })
      .attr('transform', function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.dataService.getChartData().subscribe((data) => {
      this.drawChart(data);
    });
  }
}
