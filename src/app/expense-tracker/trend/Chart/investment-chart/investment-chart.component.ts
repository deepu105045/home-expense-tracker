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
  selector: 'app-investment-chart',
  templateUrl: './investment-chart.component.html',
  styleUrls: ['./investment-chart.component.scss'],
})
export class InvestmentChartComponent implements OnInit {
  familyId: any;
  showInvestmentChart = false;

  public investmentChartData: ChartDataSets[] = [];
  public investmentChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(0,0,255)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line' as ChartType;;
  public lineChartPlugins = [];

  constructor(private activatedroute: ActivatedRoute, private trendService: TrendService) {
    this.familyId = this.activatedroute.snapshot.paramMap.get('id');
    let data=[];
    this.trendService.getCashflowTrends(this.familyId, Cashflow.INVESTMENT)
                     .pipe(take(1))
                     .subscribe(values =>{
                      const sorted = Utils.sortObject(values);
                      for(let item in sorted){
                        data.push(sorted[item]);
                        this.investmentChartLabels.push(item.slice(3,10));
                      }
                       this.investmentChartData.push({ data, label: Cashflow.INVESTMENT});
                       this.showInvestmentChart = true;
                    });
   }

  ngOnInit() {}

}
