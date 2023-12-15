import {Component} from '@angular/core';
import {StatisticService} from '../../../services/statistic.service';
import {NgClass, NgForOf} from '@angular/common';
import {BarChartComponent} from '../../partials/bar-chart/bar-chart.component';
import {Errors} from '../../../shared/interfaces/errors';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BarChartComponent,
    NgForOf,
    NgClass,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  statistic!: Errors[];
  files!: string[];

  constructor(private statisticService: StatisticService) {
    statisticService.getFiles().subscribe(files => {
      this.files = files;
    });
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
