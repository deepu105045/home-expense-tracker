/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Cashflow } from 'src/app/common/cashflow';
import { TrendService } from 'src/app/service/Trend.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Utils } from '../common/utils';

@Component({
  selector: 'app-spending-chart',
  templateUrl: './spending-chart.component.html',
  styleUrls: ['./spending-chart.component.scss'],
})
export class SpendingChartComponent implements OnInit {
  familyId: any;
  showSpendingChart = false;

  public spendingChartData: ChartDataSets[] = [];
  public spendingChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(255,0,0)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line' as ChartType;;
  public lineChartPlugins = [];

  constructor(private activatedroute: ActivatedRoute, private trendService: TrendService) {
    this.familyId = this.activatedroute.snapshot.paramMap.get('id');
    let data=[];
    this.trendService.getCashflowTrends(this.familyId, Cashflow.SPENDING)
                     .pipe(take(1))
                     .subscribe(values =>{
                      const orderedDates = Utils.sortObject(values);
                      for(let item in orderedDates){
                        data.push(orderedDates[item]);
                        this.spendingChartLabels.push(item.slice(0,7));
                      }
                       this.spendingChartData.push({ data, label: Cashflow.SPENDING});
                       this.showSpendingChart = true;
                    });
   }

  ngOnInit() {}

}
