/* eslint-disable prefer-const */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Cashflow } from 'src/app/common/cashflow';
import { TrendService } from 'src/app/service/Trend.service';
import {  Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.page.html',
  styleUrls: ['./trend.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TrendPage implements OnInit {
  familyId: string;
  trends$: Observable<any>;
  incomeTrends$: Observable<any>;
  investmentTrends$: Observable<any>;

  investmentData: any[];
  incomeData: any[];
  show = false;

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];

  incomeChartData: ChartDataSets[] = [];
  incomeChartLabels: Label[] = [];

  investmentChartData: ChartDataSets[] = [];
  investmentChartLabels: Label[] = [];


  lineChartOptions = { responsive: true };
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line' as ChartType;
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    }
  ];

  constructor(private activatedroute: ActivatedRoute, private trendService: TrendService) {
    this.familyId = this.activatedroute.snapshot.paramMap.get('id');
    this.trends$ =this.trendService.getCashflowTrends(this.familyId, Cashflow.SPENDING);
     this.trends$.subscribe(data =>{
       this.investmentData = data;
       this.show = true
    });

    this.incomeTrends$ =this.trendService.getCashflowTrends(this.familyId, Cashflow.INCOME);
    this.incomeTrends$.subscribe(data =>{
      this.incomeData = data;
   });

   this.investmentTrends$ =this.trendService.getCashflowTrends(this.familyId, Cashflow.INVESTMENT);
   this.investmentTrends$.subscribe(data =>{
     this.investmentData = data;
  });
  }

  ngOnInit() {
  }

  showGraph(){
    this.show = true;
    this.populateSpendingChartData();
    this.populateIncomeChartData();
    this.populateInvestmentChartData();

  }

  populateSpendingChartData(){
    let graphData = [];
    let obj ={};
    this.lineChartLabels = [];
    this.lineChartData = [];
    for(let item of this.investmentData){
      this.lineChartLabels.push(item['name']);
      graphData.push(item['value']);
      obj = {
        data : graphData,
        label : Cashflow.SPENDING
      };
    }
    this.lineChartData.push(obj);
    console.log(this.lineChartData)
  }


  populateIncomeChartData(){
    let graphData = [];
    let obj ={};
    this.incomeChartLabels = [];
    this.incomeChartData = [];
    for(let item of this.incomeData){
      this.incomeChartLabels.push(item['name']);
      graphData.push(item['value']);
      obj = {
        data : graphData,
        label : Cashflow.INCOME
      };
    }
    this.incomeChartData.push(obj);
  }


  populateInvestmentChartData(){
    let graphData = [];
    let obj ={};
    this.investmentChartLabels = [];
    this.investmentChartData = [];
    for(let item of this.investmentData){
      this.investmentChartLabels.push(item['name']);
      graphData.push(item['value']);
      obj = {
        data : graphData,
        label : Cashflow.INVESTMENT
      };
    }
    this.investmentChartData.push(obj);
  }






}
