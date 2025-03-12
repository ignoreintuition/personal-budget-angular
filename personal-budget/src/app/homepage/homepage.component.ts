import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { Chart, type ChartConfiguration } from 'chart.js/auto';
import * as d3 from 'd3';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pb-homepage',
  imports: [ArticleComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  d3chart = async (res: any) => {
    const data = res?.map((d: any) => ({
      budget: d.budget,
      color: d.color,
      title: d.title,
    }));
    const width = 300,
      height = 450,
      margin = 40;

    const radius = Math.min(width, height) / 2 - margin;
    const svg = d3
      .select('#myD3Chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<any>().value((d: any) => Number(d.budget));
    const data_ready = pie(data);
    svg
      .selectAll('pieces')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', (d): any =>
        d3.arc()({
          innerRadius: 0,
          outerRadius: radius,
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        } as any),
      )
      .attr('fill', (d, i) => {
        return res[i].color;
      })
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    const labelLocation = d3.arc().innerRadius(100).outerRadius(radius);

    svg
      .selectAll('pieces')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d) => d.data.title)
      .attr(
        'transform',
        (d: any) => 'translate(' + labelLocation.centroid(d) + ')',
      )
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  };

  config: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Budget',
          hoverOffset: 4,
        },
      ],
    },
    options: {},
  };

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getData();
    this.dataService.data$.subscribe((res: any) => {
      this.config.data.labels = res?.map((d: any) => d.title);
      this.config.data.datasets[0].data = res?.map((d: any) => d.budget);
      this.config.data.datasets[0].backgroundColor = res?.map(
        (d: any): any => d.color,
      );
      const c = document.getElementById('myCanvas') as HTMLCanvasElement;
      const ctx = <CanvasRenderingContext2D>c.getContext('2d');
      new Chart(ctx, this.config);
      this.d3chart(res);
    });
  }
}
