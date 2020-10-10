import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private dataService: DataService) {}

  createChart(data) {
    var label = [];
    var dataChart = [];
    for (let i = 0; i < data.myBudget.length; i++) {
      label[i] = data.myBudget[i].title;
      dataChart[i] = data.myBudget[i].budget;
    }
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: dataChart,
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#a05d56',
              '#d0743c',
              '#ff8c00',
            ],
          },
        ],
        labels: label,
      },
    });
  }

  ngOnInit(): void {
    this.dataService.getChartData().subscribe((data: any) => {
      this.createChart(data);
    });
  }
}
