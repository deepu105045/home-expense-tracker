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
  selector: 'app-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.scss'],
})
export class IncomeChartComponent implements OnInit {
  familyId: any;
  showIncomeChart = false;

  public incomeChartData: ChartDataSets[] = [];
  public incomeChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(0,255,0)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line' as ChartType;;
  public lineChartPlugins = [];
  constructor(private activatedroute: ActivatedRoute, private trendService: TrendService) {
    this.familyId = this.activatedroute.snapshot.paramMap.get('id');
    let data=[];
    this.trendService.getCashflowTrends(this.familyId, Cashflow.INCOME)
                     .pipe(take(1))
                     .subscribe(values =>{
                      const sorted = Utils.sortObject(values);
                      for(let item in sorted){
                        data.push(sorted[item]);
                        this.incomeChartLabels.push(item);
                        // this.incomeChartLabels.push(item.slice(3,10));
                      }
                       this.incomeChartData.push({ data, label: Cashflow.INCOME});
                       this.showIncomeChart = true;
                    });
   }


  ngOnInit() {}



}


