import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrendPageRoutingModule } from './trend-routing.module';
import { TrendPage } from './trend.page';
import { TrendService } from 'src/app/service/Trend.service';
import { TrendServiceImpl } from 'src/app/service/impl/Trend.service.impl';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrendPageRoutingModule,
    NgxChartsModule,
    ChartsModule
  ],
  declarations: [TrendPage],
  providers:[
    { provide: TrendService, useClass: TrendServiceImpl },
  ]
})
export class TrendPageModule {}
