import {Component} from '@angular/core';
import {StatisticService} from '../../../services/statistic.service';
import {NgClass, NgForOf} from '@angular/common';
import {BarChartComponent} from '../../partials/bar-chart/bar-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BarChartComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  statistic!: any;

  constructor(private statisticService: StatisticService) {
  }

  getAggregatedStatistic() {
    this.statisticService.getAggregatedStatistics().subscribe(st => {
      this.statistic = st;
    });
  }

  getSeparatedStatistic() {
    this.statisticService.getSeparatedStatistics().subscribe(st => {
      this.statistic = st;
    });
  }

  getFileStatistic(fileName: string) {
    this.statisticService.getFileStatistic(fileName).subscribe(st => {
      this.statistic = st;
    });
  }
}
