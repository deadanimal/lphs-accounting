import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from '@angular/router';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-e-claim',
  templateUrl: './e-claim.component.html',
  styleUrls: ['./e-claim.component.scss']
})
export class EClaimComponent implements OnInit {

  gaugeThickness = "8"
  gaugeTypeProjek = "arch";
  gaugeValueProjek = 283;
  gaugeLabelProjek = "Pengguna";
  gaugeCapProjek = "round";

  gaugeTypePendahuluan = "arch";
  gaugeValuePendahuluan = 526;
  gaugeLabelPendahuluan = "Tuntutan";
  gaugeCapPendahuluan = "round"

  gaugeTypePelaburan = "arch";
  gaugeValuePelaburan = 139;
  gaugeLabelPelaburan = "Pendahuluan";
  gaugeCapPelaburan = "round"

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
    let chart = am4core.create("chartdiv", am4charts.XYChart3D);

    // Add data
    chart.data = [{
      "country": "Jan",
      "year2017": 3.5,
      "year2018": 4.2
    }, {
      "country": "Feb",
      "year2017": 1.7,
      "year2018": 3.1
    }, {
      "country": "Mac",
      "year2017": 2.8,
      "year2018": 2.9
    }, {
      "country": "Apr",
      "year2017": 2.6,
      "year2018": 2.3
    }, {
      "country": "Mei",
      "year2017": 1.4,
      "year2018": 2.1
    }, {
      "country": "Jun",
      "year2017": 2.6,
      "year2018": 4.9
    }, {
      "country": "Jul",
      "year2017": 6.4,
      "year2018": 7.2
    }, {
      "country": "Ogs",
      "year2017": 8,
      "year2018": 7.1
    }, {
      "country": "Sep",
      "year2017": 9.9,
      "year2018": 10.1
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "GDP growth rate";
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      return text + "%";
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "year2017";
    series.dataFields.categoryX = "country";
    series.name = "Year 2017";
    series.clustered = false;
    // series.columns.template.tooltipText = "GDP grow in {category} (2017): [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.9;

    let series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = "year2018";
    series2.dataFields.categoryX = "country";
    series2.name = "Year 2018";
    series2.clustered = false;
    // series2.columns.template.tooltipText = "GDP grow in {category} (2017): [bold]{valueY}[/]";
  }

}
