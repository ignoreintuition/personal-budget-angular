import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { Chart, type ChartConfiguration } from 'chart.js/auto';
@Component({
  selector: 'pb-homepage',
  imports: [ArticleComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  colors = [
    '#ea5545',
    '#f46a9b',
    '#ef9b20',
    '#edbf33',
    '#ede15b',
    '#bdcf32',
    '#87bc45',
    '#27aeef',
    '#b33dc6',
  ];
  config: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Budget',
          backgroundColor: this.colors,
          hoverOffset: 4,
        },
      ],
    },
    options: {},
  };
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    console.log('test');
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      this.config.data.labels = res?.myBudget.map((d: any) => d.title);
      this.config.data.datasets[0].data = res?.myBudget.map(
        (d: any) => d.budget,
      );
      const c = document.getElementById('myCanvas') as HTMLCanvasElement;

      const ctx = <CanvasRenderingContext2D>c.getContext('2d');
      new Chart(ctx, this.config);
    });
  }
}
