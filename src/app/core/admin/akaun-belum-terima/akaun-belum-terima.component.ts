import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from '@angular/router';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-akaun-belum-terima',
  templateUrl: './akaun-belum-terima.component.html',
  styleUrls: ['./akaun-belum-terima.component.scss']
})
export class AkaunBelumTerimaComponent implements OnInit, OnDestroy {

  private chart: am4charts.PieChart;

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.zone.runOutsideAngular(
      () => {
        this.initChart()
      }
    )
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart) {
          console.log('Chart disposed')
          this.chart.dispose()
        }
      }
    )
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    // Add data
    chart.data = [{
      "country": "Tunai",
      "litres": 501.9
    }, {
      "country": "Cek",
      "litres": 301.9
    }, {
      "country": "Money Order",
      "litres": 201.1
    }, {
      "country": "Debit/Kredit",
      "litres": 165.8
    }, {
      "country": "Arahan Pembayaran",
      "litres": 139.9
    }, {
      "country": "EFT",
      "litres": 128.3
    }];

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    this.chart = chart

  }

}
