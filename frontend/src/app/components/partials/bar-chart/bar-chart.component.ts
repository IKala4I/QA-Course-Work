import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {Errors} from '../../../shared/interfaces/errors';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {
  @ViewChild('myChart', {static: true}) myChart!: ElementRef<HTMLCanvasElement>;

  @Input() errObject!: Errors;

  constructor() {
    Chart.register(...registerables);
  }


  ngOnInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const labels = Object.keys(this.errObject).filter(key => key !== 'label');
    const data = labels.map(key => this.errObject[key]);

    new Chart(this.myChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: this.errObject.label as string,
          data: data as number[],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        animation: {
          duration: 1000,
          easing: 'linear'
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          },
          y: {
            ticks: {
              font: {
                size: 18,
                weight: 'bold'
              }
            },
            beginAtZero: true
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          }
        }
      }
    });
  }
}
