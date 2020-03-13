import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from '@angular/router';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-pelaburan',
  templateUrl: './pelaburan.component.html',
  styleUrls: ['./pelaburan.component.scss']
})
export class PelaburanComponent implements OnInit, OnDestroy {

  private chart: am4charts.XYChart;
  private chart1: am4charts.XYChart;
  private chart2: am4charts.XYChart;

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.zone.runOutsideAngular(
      () => {
        this.initChart()
        this.initChart1()
        this.initChart2()
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
        if (this.chart1) {
          console.log('Chart disposed')
          this.chart1.dispose()
        }
        if (this.chart2) {
          console.log('Chart disposed')
          this.chart2.dispose()
        }
      }
    )
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    for (var i = 0; i < 10; i++) {
      createSeries("value" + i, "Pelaburan #" + i);
    }

    // Create series
    function createSeries(s, name) {
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value" + s;
      series.dataFields.dateX = "date";
      series.name = name;

      let segment = series.segments.template;
      segment.interactionsEnabled = true;

      let hoverState = segment.states.create("hover");
      hoverState.properties.strokeWidth = 3;

      let dimmed = segment.states.create("dimmed");
      dimmed.properties.stroke = am4core.color("#dadada");

      segment.events.on("over", function (event) {
        processOver(event.target.parent.parent.parent);
      });

      segment.events.on("out", function (event) {
        processOut(event.target.parent.parent.parent);
      });

      let data = [];
      let value = Math.round(Math.random() * 100) + 100;
      for (var i = 1; i < 100; i++) {
        value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5);
        let dataItem = { date: new Date(2018, 0, i) };
        dataItem["value" + s] = value;
        data.push(dataItem);
      }

      series.data = data;
      return series;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.events.on("over", function (event) {
      processOver(event.target.dataItem.dataContext);
    })

    chart.legend.itemContainers.template.events.on("out", function (event) {
      processOut(event.target.dataItem.dataContext);
    })

    function processOver(hoveredSeries) {
      hoveredSeries.toFront();

      hoveredSeries.segments.each(function (segment) {
        segment.setState("hover");
      })

      chart.series.each(function (series: any) {
        if (series != hoveredSeries) {
          series.segments.each(function (segment) {
            segment.setState("dimmed");
          })
          series.bulletsContainer.setState("dimmed");
        }
      });
    }

    function processOut(hoveredSeries) {
      chart.series.each(function (series: any) {
        series.segments.each(function (segment) {
          segment.setState("default");
        })
        series.bulletsContainer.setState("default");
      });
    }
    this.chart = chart
  }

  initChart1() {
    let chart = am4core.create("chartdiv1", am4charts.XYChart);

    chart.data = [{ date: 1577743200000, open: 122, close: 104 },
    { date: 1577829600000, open: 121, close: 70 },
    { date: 1577916000000, open: 101, close: 55 },
    { date: 1578002400000, open: 103, close: 45 },
    { date: 1578088800000, open: 153, close: 85 },
    { date: 1578175200000, open: 150, close: 116 },
    { date: 1578261600000, open: 135, close: 153 },
    { date: 1578348000000, open: 98, close: 152 },
    { date: 1578434400000, open: 101, close: 192 },
    { date: 1578520800000, open: 110, close: 225 },
    { date: 1578607200000, open: 157, close: 233 },
    { date: 1578693600000, open: 128, close: 232 },
    { date: 1578780000000, open: 101, close: 235 },
    { date: 1578866400000, open: 109, close: 200 },
    { date: 1578952800000, open: 142, close: 214 },
    { date: 1579039200000, open: 123, close: 224 },
    { date: 1579125600000, open: 99, close: 176 },
    { date: 1579212000000, open: 100, close: 172 },
    { date: 1579298400000, open: 67, close: 138 },
    { date: 1579384800000, open: 81, close: 127 },
    { date: 1579471200000, open: 39, close: 137 },
    { date: 1579557600000, open: 73, close: 127 },
    { date: 1579644000000, open: 78, close: 154 },
    { date: 1579730400000, open: 116, close: 127 },
    { date: 1579816800000, open: 136, close: 78 },
    { date: 1579903200000, open: 139, close: 61 },
    { date: 1579989600000, open: 162, close: 13 },
    { date: 1580076000000, open: 201, close: 41 },
    { date: 1580162400000, open: 221, close: 72 },
    { date: 1580248800000, open: 257, close: 87 },
    { date: 1580335200000, open: 211, close: 114 },
    { date: 1580421600000, open: 233, close: 138 },
    { date: 1580508000000, open: 261, close: 141 },
    { date: 1580594400000, open: 279, close: 130 }
    ]

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    // only for the legend
    let iconSeries = chart.series.push(new am4charts.ColumnSeries())
    iconSeries.fill = am4core.color("#ec0800");
    iconSeries.strokeOpacity = 0;
    iconSeries.stroke = am4core.color("#ec0800");
    iconSeries.name = "Events";
    iconSeries.dataFields.dateX = "date";
    iconSeries.dataFields.valueY = "v";

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.openValueY = "open";
    series.dataFields.valueY = "close";
    // series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
    series.sequencedInterpolation = true;
    series.stroke = am4core.color("#1b7cb3");
    series.strokeWidth = 2;
    series.name = "District Metered Usage";
    series.stroke = chart.colors.getIndex(0);
    series.fill = series.stroke;
    series.fillOpacity = 0.8;

    let bullet = series.bullets.push(new am4charts.CircleBullet())
    bullet.fill = new am4core.InterfaceColorSet().getFor("background");
    bullet.fillOpacity = 1;
    bullet.strokeWidth = 2;
    bullet.circle.radius = 4;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "open";
    series2.sequencedInterpolation = true;
    series2.strokeWidth = 2;
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.label.fill = am4core.color("#000");
    series2.name = "SP Aggregate usage";
    series2.stroke = chart.colors.getIndex(7);
    series2.fill = series2.stroke;

    let bullet2 = series2.bullets.push(new am4charts.CircleBullet())
    bullet2.fill = bullet.fill;
    bullet2.fillOpacity = 1;
    bullet2.strokeWidth = 2;
    bullet2.circle.radius = 4;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    let negativeRange;

    // create ranges
    chart.events.on("datavalidated", function () {
      series.dataItems.each(function (s1DataItem) {
        let s1PreviousDataItem;
        let s2PreviousDataItem;

        let s2DataItem = series2.dataItems.getIndex(s1DataItem.index);

        if (s1DataItem.index > 0) {
          s1PreviousDataItem = series.dataItems.getIndex(s1DataItem.index - 1);
          s2PreviousDataItem = series2.dataItems.getIndex(s1DataItem.index - 1);
        }

        let startTime = am4core.time.round(new Date(s1DataItem.dateX.getTime()), dateAxis.baseInterval.timeUnit, dateAxis.baseInterval.count).getTime();

        // intersections
        if (s1PreviousDataItem && s2PreviousDataItem) {
          let x0 = am4core.time.round(new Date(s1PreviousDataItem.dateX.getTime()), dateAxis.baseInterval.timeUnit, dateAxis.baseInterval.count).getTime() + dateAxis.baseDuration / 2;
          let y01 = s1PreviousDataItem.valueY;
          let y02 = s2PreviousDataItem.valueY;

          let x1 = startTime + dateAxis.baseDuration / 2;
          let y11 = s1DataItem.valueY;
          let y12 = s2DataItem.valueY;

          let intersection = am4core.math.getLineIntersection({ x: x0, y: y01 }, { x: x1, y: y11 }, { x: x0, y: y02 }, { x: x1, y: y12 });

          startTime = Math.round(intersection.x);
        }

        // start range here
        if (s2DataItem.valueY > s1DataItem.valueY) {
          if (!negativeRange) {
            negativeRange = dateAxis.createSeriesRange(series);
            negativeRange.date = new Date(startTime);
            negativeRange.contents.fill = series2.fill;
            negativeRange.contents.fillOpacity = 0.8;
          }
        }
        else {
          // if negative range started
          if (negativeRange) {
            negativeRange.endDate = new Date(startTime);
          }
          negativeRange = undefined;
        }
        // end if last
        if (s1DataItem.index == series.dataItems.length - 1) {
          if (negativeRange) {
            negativeRange.endDate = new Date(s1DataItem.dateX.getTime() + dateAxis.baseDuration / 2);
            negativeRange = undefined;
          }
        }
      })
    })

    this.chart1 = chart
  }

  initChart2() {
    let chart = am4core.create("chartdiv2", am4charts.XYChart);

    // Add data
    chart.data = [{
      "date": "2012-07-27",
      "value": 13
    }, {
      "date": "2012-07-28",
      "value": 11
    }, {
      "date": "2012-07-29",
      "value": 15
    }, {
      "date": "2012-07-30",
      "value": 16
    }, {
      "date": "2012-07-31",
      "value": 18
    }, {
      "date": "2012-08-01",
      "value": 13
    }, {
      "date": "2012-08-02",
      "value": 22
    }, {
      "date": "2012-08-03",
      "value": 23
    }, {
      "date": "2012-08-04",
      "value": 20
    }, {
      "date": "2012-08-05",
      "value": 17
    }, {
      "date": "2012-08-06",
      "value": 16
    }, {
      "date": "2012-08-07",
      "value": 18
    }, {
      "date": "2012-08-08",
      "value": 21
    }, {
      "date": "2012-08-09",
      "value": 26
    }, {
      "date": "2012-08-10",
      "value": 24
    }, {
      "date": "2012-08-11",
      "value": 29
    }, {
      "date": "2012-08-12",
      "value": 32
    }, {
      "date": "2012-08-13",
      "value": 18
    }, {
      "date": "2012-08-14",
      "value": 24
    }, {
      "date": "2012-08-15",
      "value": 22
    }, {
      "date": "2012-08-16",
      "value": 18
    }, {
      "date": "2012-08-17",
      "value": 19
    }, {
      "date": "2012-08-18",
      "value": 14
    }, {
      "date": "2012-08-19",
      "value": 15
    }, {
      "date": "2012-08-20",
      "value": 12
    }, {
      "date": "2012-08-21",
      "value": 8
    }, {
      "date": "2012-08-22",
      "value": 9
    }, {
      "date": "2012-08-23",
      "value": 8
    }, {
      "date": "2012-08-24",
      "value": 7
    }, {
      "date": "2012-08-25",
      "value": 5
    }, {
      "date": "2012-08-26",
      "value": 11
    }, {
      "date": "2012-08-27",
      "value": 13
    }, {
      "date": "2012-08-28",
      "value": 18
    }, {
      "date": "2012-08-29",
      "value": 20
    }, {
      "date": "2012-08-30",
      "value": 29
    }, {
      "date": "2012-08-31",
      "value": 33
    }, {
      "date": "2012-09-01",
      "value": 42
    }, {
      "date": "2012-09-02",
      "value": 35
    }, {
      "date": "2012-09-03",
      "value": 31
    }, {
      "date": "2012-09-04",
      "value": 47
    }, {
      "date": "2012-09-05",
      "value": 52
    }, {
      "date": "2012-09-06",
      "value": 46
    }, {
      "date": "2012-09-07",
      "value": 41
    }, {
      "date": "2012-09-08",
      "value": 43
    }, {
      "date": "2012-09-09",
      "value": 40
    }, {
      "date": "2012-09-10",
      "value": 39
    }, {
      "date": "2012-09-11",
      "value": 34
    }, {
      "date": "2012-09-12",
      "value": 29
    }, {
      "date": "2012-09-13",
      "value": 34
    }, {
      "date": "2012-09-14",
      "value": 37
    }, {
      "date": "2012-09-15",
      "value": 42
    }, {
      "date": "2012-09-16",
      "value": 49
    }, {
      "date": "2012-09-17",
      "value": 46
    }, {
      "date": "2012-09-18",
      "value": 47
    }, {
      "date": "2012-09-19",
      "value": 55
    }, {
      "date": "2012-09-20",
      "value": 59
    }, {
      "date": "2012-09-21",
      "value": 58
    }, {
      "date": "2012-09-22",
      "value": 57
    }, {
      "date": "2012-09-23",
      "value": 61
    }, {
      "date": "2012-09-24",
      "value": 59
    }, {
      "date": "2012-09-25",
      "value": 67
    }, {
      "date": "2012-09-26",
      "value": 65
    }, {
      "date": "2012-09-27",
      "value": 61
    }, {
      "date": "2012-09-28",
      "value": 66
    }, {
      "date": "2012-09-29",
      "value": 69
    }, {
      "date": "2012-09-30",
      "value": 71
    }, {
      "date": "2012-10-01",
      "value": 67
    }, {
      "date": "2012-10-02",
      "value": 63
    }, {
      "date": "2012-10-03",
      "value": 46
    }, {
      "date": "2012-10-04",
      "value": 32
    }, {
      "date": "2012-10-05",
      "value": 21
    }, {
      "date": "2012-10-06",
      "value": 18
    }, {
      "date": "2012-10-07",
      "value": 21
    }, {
      "date": "2012-10-08",
      "value": 28
    }, {
      "date": "2012-10-09",
      "value": 27
    }, {
      "date": "2012-10-10",
      "value": 36
    }, {
      "date": "2012-10-11",
      "value": 33
    }, {
      "date": "2012-10-12",
      "value": 31
    }, {
      "date": "2012-10-13",
      "value": 30
    }, {
      "date": "2012-10-14",
      "value": 34
    }, {
      "date": "2012-10-15",
      "value": 38
    }, {
      "date": "2012-10-16",
      "value": 37
    }, {
      "date": "2012-10-17",
      "value": 44
    }, {
      "date": "2012-10-18",
      "value": 49
    }, {
      "date": "2012-10-19",
      "value": 53
    }, {
      "date": "2012-10-20",
      "value": 57
    }, {
      "date": "2012-10-21",
      "value": 60
    }, {
      "date": "2012-10-22",
      "value": 61
    }, {
      "date": "2012-10-23",
      "value": 69
    }, {
      "date": "2012-10-24",
      "value": 67
    }, {
      "date": "2012-10-25",
      "value": 72
    }, {
      "date": "2012-10-26",
      "value": 77
    }, {
      "date": "2012-10-27",
      "value": 75
    }, {
      "date": "2012-10-28",
      "value": 70
    }, {
      "date": "2012-10-29",
      "value": 72
    }, {
      "date": "2012-10-30",
      "value": 70
    }, {
      "date": "2012-10-31",
      "value": 72
    }, {
      "date": "2012-11-01",
      "value": 73
    }, {
      "date": "2012-11-02",
      "value": 67
    }, {
      "date": "2012-11-03",
      "value": 68
    }, {
      "date": "2012-11-04",
      "value": 65
    }, {
      "date": "2012-11-05",
      "value": 71
    }, {
      "date": "2012-11-06",
      "value": 75
    }, {
      "date": "2012-11-07",
      "value": 74
    }, {
      "date": "2012-11-08",
      "value": 71
    }, {
      "date": "2012-11-09",
      "value": 76
    }, {
      "date": "2012-11-10",
      "value": 77
    }, {
      "date": "2012-11-11",
      "value": 81
    }, {
      "date": "2012-11-12",
      "value": 83
    }, {
      "date": "2012-11-13",
      "value": 80
    }, {
      "date": "2012-11-14",
      "value": 81
    }, {
      "date": "2012-11-15",
      "value": 87
    }, {
      "date": "2012-11-16",
      "value": 82
    }, {
      "date": "2012-11-17",
      "value": 86
    }, {
      "date": "2012-11-18",
      "value": 80
    }, {
      "date": "2012-11-19",
      "value": 87
    }, {
      "date": "2012-11-20",
      "value": 83
    }, {
      "date": "2012-11-21",
      "value": 85
    }, {
      "date": "2012-11-22",
      "value": 84
    }, {
      "date": "2012-11-23",
      "value": 82
    }, {
      "date": "2012-11-24",
      "value": 73
    }, {
      "date": "2012-11-25",
      "value": 71
    }, {
      "date": "2012-11-26",
      "value": 75
    }, {
      "date": "2012-11-27",
      "value": 79
    }, {
      "date": "2012-11-28",
      "value": 70
    }, {
      "date": "2012-11-29",
      "value": 73
    }, {
      "date": "2012-11-30",
      "value": 61
    }, {
      "date": "2012-12-01",
      "value": 62
    }, {
      "date": "2012-12-02",
      "value": 66
    }, {
      "date": "2012-12-03",
      "value": 65
    }, {
      "date": "2012-12-04",
      "value": 73
    }, {
      "date": "2012-12-05",
      "value": 79
    }, {
      "date": "2012-12-06",
      "value": 78
    }, {
      "date": "2012-12-07",
      "value": 78
    }, {
      "date": "2012-12-08",
      "value": 78
    }, {
      "date": "2012-12-09",
      "value": 74
    }, {
      "date": "2012-12-10",
      "value": 73
    }, {
      "date": "2012-12-11",
      "value": 75
    }, {
      "date": "2012-12-12",
      "value": 70
    }, {
      "date": "2012-12-13",
      "value": 77
    }, {
      "date": "2012-12-14",
      "value": 67
    }, {
      "date": "2012-12-15",
      "value": 62
    }, {
      "date": "2012-12-16",
      "value": 64
    }, {
      "date": "2012-12-17",
      "value": 61
    }, {
      "date": "2012-12-18",
      "value": 59
    }, {
      "date": "2012-12-19",
      "value": 53
    }, {
      "date": "2012-12-20",
      "value": 54
    }, {
      "date": "2012-12-21",
      "value": 56
    }, {
      "date": "2012-12-22",
      "value": 59
    }, {
      "date": "2012-12-23",
      "value": 58
    }, {
      "date": "2012-12-24",
      "value": 55
    }, {
      "date": "2012-12-25",
      "value": 52
    }, {
      "date": "2012-12-26",
      "value": 54
    }, {
      "date": "2012-12-27",
      "value": 50
    }, {
      "date": "2012-12-28",
      "value": 50
    }, {
      "date": "2012-12-29",
      "value": 51
    }, {
      "date": "2012-12-30",
      "value": 52
    }, {
      "date": "2012-12-31",
      "value": 58
    }, {
      "date": "2013-01-01",
      "value": 60
    }, {
      "date": "2013-01-02",
      "value": 67
    }, {
      "date": "2013-01-03",
      "value": 64
    }, {
      "date": "2013-01-04",
      "value": 66
    }, {
      "date": "2013-01-05",
      "value": 60
    }, {
      "date": "2013-01-06",
      "value": 63
    }, {
      "date": "2013-01-07",
      "value": 61
    }, {
      "date": "2013-01-08",
      "value": 60
    }, {
      "date": "2013-01-09",
      "value": 65
    }, {
      "date": "2013-01-10",
      "value": 75
    }, {
      "date": "2013-01-11",
      "value": 77
    }, {
      "date": "2013-01-12",
      "value": 78
    }, {
      "date": "2013-01-13",
      "value": 70
    }, {
      "date": "2013-01-14",
      "value": 70
    }, {
      "date": "2013-01-15",
      "value": 73
    }, {
      "date": "2013-01-16",
      "value": 71
    }, {
      "date": "2013-01-17",
      "value": 74
    }, {
      "date": "2013-01-18",
      "value": 78
    }, {
      "date": "2013-01-19",
      "value": 85
    }, {
      "date": "2013-01-20",
      "value": 82
    }, {
      "date": "2013-01-21",
      "value": 83
    }, {
      "date": "2013-01-22",
      "value": 88
    }, {
      "date": "2013-01-23",
      "value": 85
    }, {
      "date": "2013-01-24",
      "value": 85
    }, {
      "date": "2013-01-25",
      "value": 80
    }, {
      "date": "2013-01-26",
      "value": 87
    }, {
      "date": "2013-01-27",
      "value": 84
    }, {
      "date": "2013-01-28",
      "value": 83
    }, {
      "date": "2013-01-29",
      "value": 84
    }, {
      "date": "2013-01-30",
      "value": 81
    }];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.strokeWidth = 3;
    series.fillOpacity = 0.5;

    // Add vertical scrollbar
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.marginLeft = 0;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";
    chart.cursor.lineX.disabled = true;

    this.chart2 = chart
  }

}
