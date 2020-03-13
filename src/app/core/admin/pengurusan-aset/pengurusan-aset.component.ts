import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import { Router } from '@angular/router';
am4core.useTheme(am4themes_animated);
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;

@Component({
  selector: 'app-pengurusan-aset',
  templateUrl: './pengurusan-aset.component.html',
  styleUrls: ['./pengurusan-aset.component.scss']
})
export class PengurusanAsetComponent implements OnInit, OnDestroy {

  private chart: am4charts.XYChart
  private chart1: am4charts.RadarChart
  private chart2: am4charts.XYChart
  private chart3: am4plugins_timeline.CurveChart

  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  constructor(
    private zone: NgZone,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.zone.runOutsideAngular(
      () => {
        this.initChart()
        this.initChart1()
        this.initChart2()
        this.initChart3()
      }
    )
    let currentSingleFile = undefined;
    // single dropzone file - accepts only images
    new Dropzone(document.getElementById("dropzone-single"), {
      url: "/",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-single"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-single")[0]
        .innerHTML,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function() {
        this.on("addedfile", function(file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
        });
      }
    });
    document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
    // this variable is to delete the previous image from the dropzone state
    // it is just to make the HTML DOM a bit better, and keep it light
    let currentMultipleFile = undefined;
    // multiple dropzone file - accepts any type of file
    new Dropzone(document.getElementById("dropzone-multiple"), {
      url: "https://",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-multiple"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0]
        .innerHTML,
      maxFiles: null,
      acceptedFiles: null,
      init: function() {
        this.on("addedfile", function(file) {
          if (currentMultipleFile) {
          }
          currentMultipleFile = file;
        });
      }
    });
    document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart) {
          this.chart.dispose()
        }
        if (this.chart1) {
          this.chart1.dispose()
        }
        if (this.chart2) {
          this.chart2.dispose()
        }
        if (this.chart3) {
          this.chart3.dispose()
        }
      }
    )
  }

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  initChart() {
    let chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'category'
      series.name = name

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.dy = 30;
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')

      return series;
    }

    chart.data = [
      {
        category: 'SS2',
        first: 40,
        second: 55,
        third: 60
      },
      {
        category: 'SS4',
        first: 30,
        second: 78,
        third: 69
      },
      {
        category: 'SS6',
        first: 27,
        second: 40,
        third: 45
      },
      {
        category: 'SS8',
        first: 50,
        second: 33,
        third: 22
      }
    ]


    createSeries('first', 'Aset 1');
    createSeries('second', 'Aset 2');
    createSeries('third', 'Aset 3');

    function arrangeColumns() {

      let series = chart.series.getIndex(0);

      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            }
            else {
              series.dummyData = chart.series.indexOf(series);
            }
          })
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          })
        }
      }
    }

    this.chart = chart
  }

  initChart1() {
    let chart = am4core.create("chartdiv1", am4charts.RadarChart);

    // Add data
    chart.data = [{
      "category": "Aset 1",
      "value": 80,
      "full": 100
    }, {
      "category": "Aset 2",
      "value": 35,
      "full": 100
    }, {
      "category": "Aset 3",
      "value": 92,
      "full": 100
    }, {
      "category": "Aset 4",
      "value": 68,
      "full": 100
    }];

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
      return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;

    // Create series
    let series1 = chart.series.push(new am4charts.RadarColumnSeries() as any);
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    let series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();

    this.chart1 = chart
  }

  initChart2() {
    let chart = am4core.create("chartdiv2", am4charts.XYChart);

    // Add data
    chart.data = [
      { date: new Date(2019, 5, 12), value1: 50, value2: 48, previousDate: new Date(2019, 5, 5) },
      { date: new Date(2019, 5, 13), value1: 53, value2: 51, previousDate: new Date(2019, 5, 6) },
      { date: new Date(2019, 5, 14), value1: 56, value2: 58, previousDate: new Date(2019, 5, 7) },
      { date: new Date(2019, 5, 15), value1: 52, value2: 53, previousDate: new Date(2019, 5, 8) },
      { date: new Date(2019, 5, 16), value1: 48, value2: 44, previousDate: new Date(2019, 5, 9) },
      { date: new Date(2019, 5, 17), value1: 47, value2: 42, previousDate: new Date(2019, 5, 10) },
      { date: new Date(2019, 5, 18), value1: 59, value2: 55, previousDate: new Date(2019, 5, 11) }
    ]

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value1";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
    series.tooltip.pointerOrientation = "vertical";

    // Create series
    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.dateX = "date";
    series2.strokeWidth = 2;
    series2.strokeDasharray = "3,4";
    series2.stroke = series.stroke;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    this.chart2 = chart
  }

  initChart3() {
    let chart = am4core.create("chartdiv3", am4plugins_timeline.CurveChart);
    chart.curveContainer.padding(50, 20, 50, 20);

    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    let interfaceColors = new am4core.InterfaceColorSet();

    let colorSet = new am4core.ColorSet();
    colorSet.step = 3;

    chart.data = [{ date: new Date(2019, 0, 1), value: 0, color: colorSet.next(), disabled: false, label: "1" },
    { date: new Date(2019, 0, 2), value: 0 },
    { date: new Date(2019, 0, 3), value: 0 },
    { date: new Date(2019, 0, 4), value: 0 },
    { date: new Date(2019, 0, 5), value: 0 },
    { date: new Date(2019, 0, 6), value: 0, color: colorSet.next(), disabled: false, label: "2" },
    { date: new Date(2019, 0, 7), value: 0 },
    { date: new Date(2019, 0, 8), value: 0 },
    { date: new Date(2019, 0, 9), value: 0 },
    { date: new Date(2019, 0, 10), value: 0 },
    { date: new Date(2019, 0, 11), value: 0 },
    { date: new Date(2019, 0, 12), value: 0, color: colorSet.next(), disabled: false, label: "3" },
    { date: new Date(2019, 0, 13), value: 0 },
    { date: new Date(2019, 0, 14), value: 0 },
    { date: new Date(2019, 0, 15), value: 0 },
    { date: new Date(2019, 0, 16), value: 0 },
    { date: new Date(2019, 0, 17), value: 0 },
    { date: new Date(2019, 0, 18), value: 0, color: colorSet.next(), disabled: false, label: "4" },
    { date: new Date(2019, 0, 19), value: 0 },
    { date: new Date(2019, 0, 20), value: 0 },
    { date: new Date(2019, 0, 21), value: 0 },
    { date: new Date(2019, 0, 22), value: 0 },
    { date: new Date(2019, 0, 23), value: 0, color: colorSet.next(), disabled: false, label: "5" },
    { date: new Date(2019, 0, 24), value: 0 },
    { date: new Date(2019, 0, 25), value: 0 },
    { date: new Date(2019, 0, 26), value: 0 },
    { date: new Date(2019, 0, 27), value: 0 },
    { date: new Date(2019, 0, 28), value: 0 },
    { date: new Date(2019, 0, 29), value: 0, color: colorSet.next(), disabled: false, label: "6" },
    { date: new Date(2019, 0, 30), value: 0 },
    { date: new Date(2019, 0, 31), value: 0 }
    ];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.fontSize = 10;
    chart.tooltipContainer.fontSize = 10;
    chart.bulletsContainer.zIndex = 200;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.innerRadius = -15;
    valueAxis.renderer.radius = 15;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis() as any);
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };
    dateAxis.renderer.step = 5;
    dateAxis.renderer.points = [{ x: -417.4834289550781, y: -10.923015594482422 }, { x: -412.4834289550781, y: -10.923015594482422 }, { x: -407.4834289550781, y: -10.923015594482422 }, { x: -402.4834289550781, y: -10.923015594482422 }, { x: -397.4834289550781, y: -10.923015594482422 }, { x: -392.4834289550781, y: -10.923015594482422 }, { x: -387.4834289550781, y: -10.923015594482422 }, { x: -382.4834289550781, y: -10.923015594482422 }, { x: -377.4834289550781, y: -10.923015594482422 }, { x: -372.4834289550781, y: -10.923015594482422 }, { x: -367.4834289550781, y: -10.923015594482422 }, { x: -362.4834289550781, y: -10.923015594482422 }, { x: -357.4834289550781, y: -10.923015594482422 }, { x: -352.4834289550781, y: -10.923015594482422 }, { x: -347.4834289550781, y: -10.923015594482422 }, { x: -342.4834289550781, y: -10.923015594482422 }, { x: -337.4834289550781, y: -10.923015594482422 }, { x: -332.4834289550781, y: -10.923015594482422 }, { x: -327.4950256347656, y: -11.18120288848877 }, { x: -322.6242370605469, y: -12.281744003295898 }, { x: -318.0163879394531, y: -14.20695686340332 }, { x: -313.7946472167969, y: -16.875335693359375 }, { x: -310.0535583496094, y: -20.184856414794922 }, { x: -306.8625183105469, y: -24.028013229370117 }, { x: -304.2716979980469, y: -28.299266815185547 }, { x: -302.31744384765625, y: -32.89698791503906 }, { x: -301.02313232421875, y: -37.722415924072266 }, { x: -300.3988952636719, y: -42.679439544677734 }, { x: -300.3358154296875, y: -47.67822265625 }, { x: -300.3358154296875, y: -52.67822265625 }, { x: -300.3358154296875, y: -57.67822265625 }, { x: -300.3358154296875, y: -62.67822265625 }, { x: -300.3358154296875, y: -67.67822265625 }, { x: -300.3358154296875, y: -72.67822265625 }, { x: -300.3358154296875, y: -77.67822265625 }, { x: -300.3269958496094, y: -82.67815399169922 }, { x: -299.84722900390625, y: -87.65047454833984 }, { x: -298.63006591796875, y: -92.4950942993164 }, { x: -296.68548583984375, y: -97.0959701538086 }, { x: -294.0417785644531, y: -101.33356475830078 }, { x: -290.74444580078125, y: -105.0844955444336 }, { x: -286.8580627441406, y: -108.22007751464844 }, { x: -282.47491455078125, y: -110.61119842529297 }, { x: -277.722900390625, y: -112.14154815673828 }, { x: -272.7660217285156, y: -112.73446655273438 }, { x: -267.7870178222656, y: -112.37076568603516 }, { x: -262.96978759765625, y: -111.06034851074219 }, { x: -258.485107421875, y: -108.86592864990234 }, { x: -254.47003173828125, y: -105.89718627929688 }, { x: -251.02467346191406, y: -102.28192138671875 }, { x: -248.21957397460938, y: -98.14952850341797 }, { x: -246.1041717529297, y: -93.62472534179688 }, { x: -244.71084594726562, y: -88.827880859375 }, { x: -244.0543975830078, y: -83.87583923339844 }, { x: -243.99761962890625, y: -78.87692260742188 }, { x: -243.99761962890625, y: -73.87692260742188 }, { x: -243.99761962890625, y: -68.87692260742188 }, { x: -243.99761962890625, y: -63.876922607421875 }, { x: -243.99761962890625, y: -58.876922607421875 }, { x: -243.99761962890625, y: -53.876922607421875 }, { x: -243.99761962890625, y: -48.876922607421875 }, { x: -243.99761962890625, y: -43.876922607421875 }, { x: -243.99761962890625, y: -38.876922607421875 }, { x: -243.99761962890625, y: -33.876922607421875 }, { x: -243.99761962890625, y: -28.876922607421875 }, { x: -243.99761962890625, y: -23.876922607421875 }, { x: -243.99761962890625, y: -18.876922607421875 }, { x: -243.99761962890625, y: -13.876922607421875 }, { x: -243.99761962890625, y: -8.876922607421875 }, { x: -243.99761962890625, y: -3.876922607421875 }, { x: -243.99761962890625, y: 1.123077392578125 }, { x: -243.99761962890625, y: 6.123077392578125 }, { x: -243.98655700683594, y: 11.122993469238281 }, { x: -243.59844970703125, y: 16.105270385742188 }, { x: -242.65057373046875, y: 21.011802673339844 }, { x: -241.14419555664062, y: 25.776521682739258 }, { x: -239.09010314941406, y: 30.331876754760742 }, { x: -236.5057830810547, y: 34.608619689941406 }, { x: -233.41647338867188, y: 38.53592300415039 }, { x: -229.855224609375, y: 42.04053497314453 }, { x: -225.86524963378906, y: 45.04758071899414 }, { x: -221.50289916992188, y: 47.482627868652344 }, { x: -216.84068298339844, y: 49.2772216796875 }, { x: -211.9678497314453, y: 50.37752151489258 }, { x: -206.98663330078125, y: 50.7551383972168 }, { x: -202.00328063964844, y: 50.40679931640625 }, { x: -197.1240692138672, y: 49.33515167236328 }, { x: -192.45150756835938, y: 47.567745208740234 }, { x: -188.07559204101562, y: 45.15721130371094 }, { x: -184.0694580078125, y: 42.1717414855957 }, { x: -180.4899444580078, y: 38.68574905395508 }, { x: -177.3810577392578, y: 34.77395248413086 }, { x: -174.77589416503906, y: 30.509902954101562 }, { x: -172.69992065429688, y: 25.964475631713867 }, { x: -171.17140197753906, y: 21.206836700439453 }, { x: -170.2007598876953, y: 16.304752349853516 }, { x: -169.79034423828125, y: 11.324256896972656 }, { x: -169.7743377685547, y: 6.3243865966796875 }, { x: -169.7743377685547, y: 1.3243865966796875 }, { x: -169.7743377685547, y: -3.6756134033203125 }, { x: -169.7743377685547, y: -8.675613403320312 }, { x: -169.7743377685547, y: -13.675613403320312 }, { x: -169.7743377685547, y: -18.675613403320312 }, { x: -169.7743377685547, y: -23.675613403320312 }, { x: -169.7743377685547, y: -28.675613403320312 }, { x: -169.7743377685547, y: -33.67561340332031 }, { x: -169.7743377685547, y: -38.67561340332031 }, { x: -169.7743377685547, y: -43.67561340332031 }, { x: -169.7743377685547, y: -48.67561340332031 }, { x: -169.7743377685547, y: -53.67561340332031 }, { x: -169.7743377685547, y: -58.67561340332031 }, { x: -169.7743377685547, y: -63.67561340332031 }, { x: -169.7743377685547, y: -68.67561340332031 }, { x: -169.7743377685547, y: -73.67561340332031 }, { x: -169.7743377685547, y: -78.67561340332031 }, { x: -169.7743377685547, y: -83.67561340332031 }, { x: -169.7743377685547, y: -88.67561340332031 }, { x: -169.7743377685547, y: -93.67561340332031 }, { x: -169.7743377685547, y: -98.67561340332031 }, { x: -169.7743377685547, y: -103.67561340332031 }, { x: -169.7743377685547, y: -108.67561340332031 }, { x: -169.7743377685547, y: -113.67561340332031 }, { x: -169.7743377685547, y: -118.67561340332031 }, { x: -169.7743377685547, y: -123.67561340332031 }, { x: -169.7743377685547, y: -128.6756134033203 }, { x: -169.7743377685547, y: -133.6756134033203 }, { x: -169.7743377685547, y: -138.6756134033203 }, { x: -169.7743377685547, y: -143.6756134033203 }, { x: -169.7743377685547, y: -148.6756134033203 }, { x: -169.7743377685547, y: -153.6756134033203 }, { x: -169.7743377685547, y: -158.6756134033203 }, { x: -169.76597595214844, y: -163.67556762695312 }, { x: -169.4783477783203, y: -168.6658477783203 }, { x: -168.7764434814453, y: -173.61480712890625 }, { x: -167.65907287597656, y: -178.48681640625 }, { x: -166.12872314453125, y: -183.24517822265625 }, { x: -164.19125366210938, y: -187.85279846191406 }, { x: -161.85557556152344, y: -192.2718048095703 }, { x: -159.13348388671875, y: -196.4638671875 }, { x: -156.03990173339844, y: -200.3895721435547 }, { x: -152.59300231933594, y: -204.0089569091797 }, { x: -148.81480407714844, y: -207.28085327148438 }, { x: -144.73226928710938, y: -210.1638641357422 }, { x: -140.37818908691406, y: -212.61737060546875 }, { x: -135.79212951660156, y: -214.6033935546875 }, { x: -131.0205535888672, y: -216.08920288085938 }, { x: -126.1163558959961, y: -217.050537109375 }, { x: -121.13687896728516, y: -217.47470092773438 }, { x: -116.14054107666016, y: -217.3608856201172 }, { x: -111.18573760986328, y: -216.70848083496094 }, { x: -106.3309555053711, y: -215.52272033691406 }, { x: -101.63175964355469, y: -213.82164001464844 }, { x: -97.138671875, y: -211.63323974609375 }, { x: -92.89518737792969, y: -208.99290466308594 }, { x: -88.93794250488281, y: -205.9401092529297 }, { x: -85.29711151123047, y: -202.51597595214844 }, { x: -81.99738311767578, y: -198.7619171142578 }, { x: -79.05916595458984, y: -194.71847534179688 }, { x: -76.49918365478516, y: -190.42552185058594 }, { x: -74.33081817626953, y: -185.92201232910156 }, { x: -72.56472778320312, y: -181.24598693847656 }, { x: -71.2088394165039, y: -176.43499755859375 }, { x: -70.26750946044922, y: -171.5259552001953 }, { x: -69.7413101196289, y: -166.55517578125 }, { x: -69.6175537109375, y: -161.55787658691406 }, { x: -69.6175537109375, y: -156.55787658691406 }, { x: -69.6175537109375, y: -151.55787658691406 }, { x: -69.6175537109375, y: -146.55787658691406 }, { x: -69.6175537109375, y: -141.55787658691406 }, { x: -69.6175537109375, y: -136.55787658691406 }, { x: -69.6175537109375, y: -131.55787658691406 }, { x: -69.6175537109375, y: -126.55787658691406 }, { x: -69.6175537109375, y: -121.55787658691406 }, { x: -69.6175537109375, y: -116.55787658691406 }, { x: -69.6175537109375, y: -111.55787658691406 }, { x: -69.6175537109375, y: -106.55787658691406 }, { x: -69.6175537109375, y: -101.55787658691406 }, { x: -69.6175537109375, y: -96.55787658691406 }, { x: -69.61756134033203, y: -91.55787658691406 }, { x: -69.61756134033203, y: -86.55787658691406 }, { x: -69.61756134033203, y: -81.55787658691406 }, { x: -69.61756134033203, y: -76.55787658691406 }, { x: -69.61756134033203, y: -71.55787658691406 }, { x: -69.61756134033203, y: -66.55787658691406 }, { x: -69.61756134033203, y: -61.55787658691406 }, { x: -69.61756134033203, y: -56.55787658691406 }, { x: -69.61756134033203, y: -51.55787658691406 }, { x: -69.61756134033203, y: -46.55787658691406 }, { x: -69.61756134033203, y: -41.55787658691406 }, { x: -69.61756134033203, y: -36.55787658691406 }, { x: -69.61756134033203, y: -31.557876586914062 }, { x: -69.61756134033203, y: -26.557876586914062 }, { x: -69.61756134033203, y: -21.557876586914062 }, { x: -69.61756134033203, y: -16.557876586914062 }, { x: -69.61756134033203, y: -11.557876586914062 }, { x: -69.61756134033203, y: -6.5578765869140625 }, { x: -69.61756134033203, y: -1.5578765869140625 }, { x: -69.61756134033203, y: 3.4421234130859375 }, { x: -69.61756134033203, y: 8.442123413085938 }, { x: -69.61756134033203, y: 13.442123413085938 }, { x: -69.61756134033203, y: 18.442123413085938 }, { x: -69.61756134033203, y: 23.442123413085938 }, { x: -69.61756134033203, y: 28.442123413085938 }, { x: -69.61756134033203, y: 33.44212341308594 }, { x: -69.61756134033203, y: 38.44212341308594 }, { x: -69.61756134033203, y: 43.44212341308594 }, { x: -69.61756134033203, y: 48.44212341308594 }, { x: -69.61756134033203, y: 53.44212341308594 }, { x: -69.61756134033203, y: 58.44212341308594 }, { x: -69.61756134033203, y: 63.44212341308594 }, { x: -69.61756134033203, y: 68.44212341308594 }, { x: -69.61756134033203, y: 73.44212341308594 }, { x: -69.61756134033203, y: 78.44212341308594 }, { x: -69.61756896972656, y: 83.44212341308594 }, { x: -69.61756896972656, y: 88.44212341308594 }, { x: -69.61756896972656, y: 93.44212341308594 }, { x: -69.61756896972656, y: 98.44212341308594 }, { x: -69.61756896972656, y: 103.44212341308594 }, { x: -69.61756896972656, y: 108.44212341308594 }, { x: -69.61756896972656, y: 113.44212341308594 }, { x: -69.61756896972656, y: 118.44212341308594 }, { x: -69.61756896972656, y: 123.44212341308594 }, { x: -69.61756896972656, y: 128.44212341308594 }, { x: -69.61756896972656, y: 133.44212341308594 }, { x: -69.61756896972656, y: 138.44212341308594 }, { x: -69.61756896972656, y: 143.44212341308594 }, { x: -69.61756896972656, y: 148.44212341308594 }, { x: -69.61756896972656, y: 153.44212341308594 }, { x: -69.61756896972656, y: 158.44212341308594 }, { x: -69.61756896972656, y: 163.44212341308594 }, { x: -69.6015853881836, y: 168.4420623779297 }, { x: -69.36360168457031, y: 173.4356689453125 }, { x: -68.83807373046875, y: 178.4073028564453 }, { x: -68.02362823486328, y: 183.33969116210938 }, { x: -66.91996002197266, y: 188.21571350097656 }, { x: -65.52843475341797, y: 193.0174102783203 }, { x: -63.85124969482422, y: 197.7268829345703 }, { x: -61.89183807373047, y: 202.32611083984375 }, { x: -59.65471267700195, y: 206.79672241210938 }, { x: -57.14509201049805, y: 211.12033081054688 }, { x: -54.36948013305664, y: 215.2781982421875 }, { x: -51.335166931152344, y: 219.2512664794922 }, { x: -48.05073547363281, y: 223.02001953125 }, { x: -44.525901794433594, y: 226.56475830078125 }, { x: -40.771671295166016, y: 229.8657684326172 }, { x: -36.80098342895508, y: 232.90286254882812 }, { x: -32.62838363647461, y: 235.6559295654297 }, { x: -28.270912170410156, y: 238.10574340820312 }, { x: -23.747535705566406, y: 240.23365783691406 }, { x: -19.079940795898438, y: 242.02301025390625 }, { x: -14.291909217834473, y: 243.4592742919922 }, { x: -9.409342765808105, y: 244.53109741210938 }, { x: -4.459836006164551, y: 245.23095703125 }, { x: 0.5284808874130249, y: 245.55584716796875 }, { x: 5.5269646644592285, y: 245.50665283203125 }, { x: 10.507811546325684, y: 245.08306884765625 }, { x: 15.442481994628906, y: 244.2847442626953 }, { x: 20.302715301513672, y: 243.1161346435547 }, { x: 25.061508178710938, y: 241.58570861816406 }, { x: 29.693445205688477, y: 239.7056427001953 }, { x: 34.175148010253906, y: 237.4913330078125 }, { x: 38.48564147949219, y: 234.95985412597656 }, { x: 42.60664749145508, y: 232.13009643554688 }, { x: 46.521663665771484, y: 229.0216064453125 }, { x: 50.21662139892578, y: 225.65451049804688 }, { x: 53.679298400878906, y: 222.04873657226562 }, { x: 56.898712158203125, y: 218.22439575195312 }, { x: 59.86568832397461, y: 214.20086669921875 }, { x: 62.57196044921875, y: 209.99755859375 }, { x: 65.01041412353516, y: 205.6334228515625 }, { x: 67.175048828125, y: 201.1270751953125 }, { x: 69.06047821044922, y: 196.49710083007812 }, { x: 70.66278076171875, y: 191.7615509033203 }, { x: 71.9787826538086, y: 186.9385528564453 }, { x: 73.00624084472656, y: 182.04605102539062 }, { x: 73.7446517944336, y: 177.10157775878906 }, { x: 74.19428253173828, y: 172.12257385253906 }, { x: 74.35696411132812, y: 167.1259002685547 }, { x: 74.35778045654297, y: 162.1258544921875 }, { x: 74.35778045654297, y: 157.1258544921875 }, { x: 74.35778045654297, y: 152.1258544921875 }, { x: 74.35778045654297, y: 147.1258544921875 }, { x: 74.35778045654297, y: 142.1258544921875 }, { x: 74.35778045654297, y: 137.1258544921875 }, { x: 74.35778045654297, y: 132.1258544921875 }, { x: 74.35778045654297, y: 127.12584686279297 }, { x: 74.35778045654297, y: 122.12584686279297 }, { x: 74.35778045654297, y: 117.12584686279297 }, { x: 74.35778045654297, y: 112.12584686279297 }, { x: 74.35778045654297, y: 107.12584686279297 }, { x: 74.35778045654297, y: 102.12584686279297 }, { x: 74.35778045654297, y: 97.12584686279297 }, { x: 74.35778045654297, y: 92.12584686279297 }, { x: 74.35778045654297, y: 87.12584686279297 }, { x: 74.35778045654297, y: 82.12584686279297 }, { x: 74.35778045654297, y: 77.12584686279297 }, { x: 74.35778045654297, y: 72.12584686279297 }, { x: 74.35778045654297, y: 67.12584686279297 }, { x: 74.35778045654297, y: 62.12584686279297 }, { x: 74.35778045654297, y: 57.12584686279297 }, { x: 74.35778045654297, y: 52.12584686279297 }, { x: 74.35778045654297, y: 47.12584686279297 }, { x: 74.35778045654297, y: 42.12584686279297 }, { x: 74.35778045654297, y: 37.12584686279297 }, { x: 74.35778045654297, y: 32.12584686279297 }, { x: 74.35778045654297, y: 27.12584686279297 }, { x: 74.35778045654297, y: 22.12584686279297 }, { x: 74.35778045654297, y: 17.12584686279297 }, { x: 74.35778045654297, y: 12.125846862792969 }, { x: 74.35778045654297, y: 7.125846862792969 }, { x: 74.35778045654297, y: 2.1258468627929688 }, { x: 74.35777282714844, y: -2.8741531372070312 }, { x: 74.35777282714844, y: -7.874153137207031 }, { x: 74.35777282714844, y: -12.874153137207031 }, { x: 74.35777282714844, y: -17.87415313720703 }, { x: 74.35777282714844, y: -22.87415313720703 }, { x: 74.35777282714844, y: -27.87415313720703 }, { x: 74.35777282714844, y: -32.87415313720703 }, { x: 74.35777282714844, y: -37.87415313720703 }, { x: 74.35777282714844, y: -42.87415313720703 }, { x: 74.35777282714844, y: -47.87415313720703 }, { x: 74.35777282714844, y: -52.87415313720703 }, { x: 74.35777282714844, y: -57.87415313720703 }, { x: 74.35777282714844, y: -62.87415313720703 }, { x: 74.35777282714844, y: -67.87415313720703 }, { x: 74.35777282714844, y: -72.87415313720703 }, { x: 74.35777282714844, y: -77.87415313720703 }, { x: 74.35777282714844, y: -82.87415313720703 }, { x: 74.35777282714844, y: -87.87415313720703 }, { x: 74.50332641601562, y: -92.87067413330078 }, { x: 75.07424926757812, y: -97.83638763427734 }, { x: 76.08013153076172, y: -102.7325439453125 }, { x: 77.51921081542969, y: -107.51914978027344 }, { x: 79.38603973388672, y: -112.15572357177734 }, { x: 81.67122650146484, y: -116.6009292602539 }, { x: 84.36224365234375, y: -120.8127670288086 }, { x: 87.44304656982422, y: -124.74835968017578 }, { x: 90.89397430419922, y: -128.36375427246094 }, { x: 94.69074249267578, y: -131.61380004882812 }, { x: 98.80345916748047, y: -134.45327758789062 }, { x: 103.19535064697266, y: -136.83779907226562 }, { x: 107.82209014892578, y: -138.72654724121094 }, { x: 112.63123321533203, y: -140.08522033691406 }, { x: 117.5632553100586, y: -140.8902130126953 }, { x: 122.55474853515625, y: -141.1316680908203 }, { x: 127.54168701171875, y: -140.81039428710938 }, { x: 132.46011352539062, y: -139.9259796142578 }, { x: 137.24685668945312, y: -138.49044799804688 }, { x: 141.84329223632812, y: -136.52911376953125 }, { x: 146.19825744628906, y: -134.07742309570312 }, { x: 150.26820373535156, y: -131.17703247070312 }, { x: 154.01754760742188, y: -127.87248992919922 }, { x: 157.41749572753906, y: -124.20916748046875 }, { x: 160.44406127929688, y: -120.23162841796875 }, { x: 163.07847595214844, y: -115.98419952392578 }, { x: 165.30511474609375, y: -111.50936889648438 }, { x: 167.1117401123047, y: -106.84902954101562 }, { x: 168.4897003173828, y: -102.04442596435547 }, { x: 169.43394470214844, y: -97.1361083984375 }, { x: 169.94345092773438, y: -92.16376495361328 }, { x: 170.04324340820312, y: -87.16584777832031 }, { x: 170.04324340820312, y: -82.16584777832031 }, { x: 170.04324340820312, y: -77.16584777832031 }, { x: 170.04324340820312, y: -72.16584777832031 }, { x: 170.04324340820312, y: -67.16584777832031 }, { x: 170.04324340820312, y: -62.16584777832031 }, { x: 170.04324340820312, y: -57.16584777832031 }, { x: 170.04324340820312, y: -52.16584777832031 }, { x: 170.04324340820312, y: -47.16584777832031 }, { x: 170.04324340820312, y: -42.16584777832031 }, { x: 170.04324340820312, y: -37.16584777832031 }, { x: 170.04324340820312, y: -32.16584777832031 }, { x: 170.04324340820312, y: -27.165847778320312 }, { x: 170.04324340820312, y: -22.165847778320312 }, { x: 170.04324340820312, y: -17.165847778320312 }, { x: 170.04324340820312, y: -12.165847778320312 }, { x: 170.04324340820312, y: -7.1658477783203125 }, { x: 170.04324340820312, y: -2.1658477783203125 }, { x: 170.04324340820312, y: 2.8341522216796875 }, { x: 170.04324340820312, y: 7.8341522216796875 }, { x: 170.04324340820312, y: 12.834152221679688 }, { x: 170.04324340820312, y: 17.834152221679688 }, { x: 170.04324340820312, y: 22.834152221679688 }, { x: 170.04324340820312, y: 27.834152221679688 }, { x: 170.04324340820312, y: 32.83415222167969 }, { x: 170.04324340820312, y: 37.83415222167969 }, { x: 170.04324340820312, y: 42.83415222167969 }, { x: 170.04324340820312, y: 47.83415222167969 }, { x: 170.04324340820312, y: 52.83415222167969 }, { x: 170.1525115966797, y: 57.83161926269531 }, { x: 170.77532958984375, y: 62.790042877197266 }, { x: 171.9515838623047, y: 67.6469497680664 }, { x: 173.67649841308594, y: 72.3370361328125 }, { x: 175.9366455078125, y: 76.79366302490234 }, { x: 178.71221923828125, y: 80.94889068603516 }, { x: 181.9757537841797, y: 84.73263549804688 }, { x: 185.6917266845703, y: 88.07272338867188 }, { x: 189.8141632080078, y: 90.89555358886719 }, { x: 194.2825927734375, y: 93.12992858886719 }, { x: 199.02098083496094, y: 94.71227264404297 }, { x: 203.9376220703125, y: 95.59717559814453 }, { x: 208.93055725097656, y: 95.76509094238281 }, { x: 213.89581298828125, y: 95.21554565429688 }, { x: 218.73004150390625, y: 93.95567321777344 }, { x: 223.3354034423828, y: 92.01966857910156 }, { x: 227.62841796875, y: 89.46398162841797 }, { x: 231.54127502441406, y: 86.35702514648438 }, { x: 235.02178955078125, y: 82.77204895019531 }, { x: 238.02980041503906, y: 78.781982421875 }, { x: 240.5343780517578, y: 74.45804595947266 }, { x: 242.5120086669922, y: 69.8688735961914 }, { x: 243.94642639160156, y: 65.08204650878906 }, { x: 244.82875061035156, y: 60.16316223144531 }, { x: 245.15798950195312, y: 55.176483154296875 }, { x: 245.16082763671875, y: 50.17647171020508 }, { x: 245.16082763671875, y: 45.17647171020508 }, { x: 245.16082763671875, y: 40.17647171020508 }, { x: 245.16082763671875, y: 35.17647171020508 }, { x: 245.16082763671875, y: 30.176471710205078 }, { x: 245.16082763671875, y: 25.176471710205078 }, { x: 245.16082763671875, y: 20.176471710205078 }, { x: 245.16082763671875, y: 15.176471710205078 }, { x: 245.16082763671875, y: 10.176471710205078 }, { x: 245.16082763671875, y: 5.176471710205078 }, { x: 245.16082763671875, y: 0.17647171020507812 }, { x: 245.16082763671875, y: -4.823528289794922 }, { x: 245.16082763671875, y: -9.823528289794922 }, { x: 245.16082763671875, y: -14.823528289794922 }, { x: 245.16082763671875, y: -19.823528289794922 }, { x: 245.16082763671875, y: -24.823528289794922 }, { x: 245.16082763671875, y: -29.823528289794922 }, { x: 245.16082763671875, y: -34.82352828979492 }, { x: 245.16082763671875, y: -39.82352828979492 }, { x: 245.16082763671875, y: -44.82352828979492 }, { x: 245.16082763671875, y: -49.82352828979492 }, { x: 245.17091369628906, y: -54.823482513427734 }, { x: 245.66558837890625, y: -59.79412841796875 }, { x: 246.90951538085938, y: -64.63170623779297 }, { x: 248.8917694091797, y: -69.21640014648438 }, { x: 251.58175659179688, y: -73.42443084716797 }, { x: 254.9319305419922, y: -77.12803649902344 }, { x: 258.8729248046875, y: -80.19418334960938 }, { x: 263.3063049316406, y: -82.48992919921875 }, { x: 268.0954895019531, y: -83.89874267578125 }, { x: 273.0670166015625, y: -84.3490982055664 }, { x: 278.0316162109375, y: -83.82708740234375 }, { x: 282.80023193359375, y: -82.34967041015625 }, { x: 287.2014465332031, y: -79.99280548095703 }, { x: 291.1019592285156, y: -76.87492370605469 }, { x: 294.4053649902344, y: -73.1297607421875 }, { x: 297.044677734375, y: -68.88947296142578 }, { x: 298.9732666015625, y: -64.28205108642578 }, { x: 300.1620178222656, y: -59.43071746826172 }, { x: 300.6015625, y: -54.454795837402344 }, { x: 300.604736328125, y: -49.454994201660156 }, { x: 300.604736328125, y: -44.454994201660156 }, { x: 300.604736328125, y: -39.454994201660156 }, { x: 300.62103271484375, y: -34.455101013183594 }, { x: 301.25750732421875, y: -29.50330352783203 }, { x: 302.8203125, y: -24.761978149414062 }, { x: 305.27960205078125, y: -20.41815757751465 }, { x: 308.57073974609375, y: -16.666460037231445 }, { x: 312.5902404785156, y: -13.709973335266113 }, { x: 317.1771240234375, y: -11.750056266784668 }, { x: 322.098876953125, y: -10.94089126586914 }, { x: 327.0986328125, y: -10.923019409179688 }, { x: 332.0986328125, y: -10.923019409179688 }, { x: 337.0986328125, y: -10.923019409179688 }, { x: 342.0986328125, y: -10.923019409179688 }, { x: 347.0986328125, y: -10.923019409179688 }, { x: 352.0986328125, y: -10.923019409179688 }, { x: 357.0986328125, y: -10.923019409179688 }, { x: 362.0986328125, y: -10.923019409179688 }, { x: 367.0986328125, y: -10.923019409179688 }, { x: 372.0986328125, y: -10.923019409179688 }, { x: 377.0986328125, y: -10.923019409179688 }, { x: 382.0986328125, y: -10.923019409179688 }, { x: 387.0986328125, y: -10.923019409179688 }, { x: 392.0986328125, y: -10.923019409179688 }, { x: 397.0986328125, y: -10.923019409179688 }];
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.line.strokeDasharray = "2,2";
    dateAxis.renderer.line.strokeWidth = 1;
    dateAxis.renderer.line.stroke = interfaceColors.getFor("background");
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.zIndex = 100;

    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    dateAxis.tooltip.label.paddingTop = 7;
    dateAxis.startLocation = -0.5;


    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.disabled = true;

    let series1 = chart.series.push(new am4plugins_timeline.CurveStepLineSeries());
    series1.strokeWidth = 11;
    series1.dataFields.dateX = "date";
    series1.dataFields.valueY = "value";
    series1.propertyFields.stroke = "color";

    let bullet = new am4charts.CircleBullet();
    series1.bullets.push(bullet);
    bullet.circle.radius = 13;
    bullet.circle.strokeOpacity = 1;
    bullet.circle.stroke = interfaceColors.getFor("background");
    bullet.circle.strokeWidth = 3;
    bullet.disabled = true;
    bullet.propertyFields.disabled = "disabled";
    bullet.propertyFields.fill = "color";
    bullet.locationX = 1;

    let label = bullet.createChild(am4core.Label);
    label.fill = interfaceColors.getFor("background");
    label.propertyFields.text = "label";
    label.strokeOpacity = 0;
    label.zIndex = 10;
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 14;
    label.fontWeight = "600";
    label.dy = 1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center"
    chart.scrollbarX.width = am4core.percent(70);

    chart.events.once("inited", function () {
      zoomIn();
    })

    function zoomIn() {
      let animation = dateAxis.animate([{ property: "start", to: 0.5 }, { property: "end", to: 1 }], 10000, am4core.ease.sinInOut);
      animation.events.on("animationended", zoomOut)
    }

    function zoomOut() {
      let animation = dateAxis.animate([{ property: "start", to: 0 }, { property: "end", to: 0.5 }], 10000, am4core.ease.sinInOut);
      animation.events.on("animationended", zoomIn)
    }

    this.chart3 = chart
  }

}
