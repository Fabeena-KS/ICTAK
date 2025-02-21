/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.71428571428571, "KoPercent": 0.2857142857142857};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.20238095238095238, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "events-855"], "isController": false}, {"data": [0.01, 500, 1500, "membershipregistration-908"], "isController": false}, {"data": [0.02, 500, 1500, "events-856"], "isController": false}, {"data": [0.13, 500, 1500, "launch-502"], "isController": false}, {"data": [0.09, 500, 1500, "membershipregistration-928"], "isController": false}, {"data": [0.06, 500, 1500, "membershipregistration-927"], "isController": false}, {"data": [0.5, 500, 1500, "membershipregistration-938"], "isController": false}, {"data": [0.0, 500, 1500, "corporatesearch-991"], "isController": false}, {"data": [0.07, 500, 1500, "events-863"], "isController": false}, {"data": [0.32, 500, 1500, "adminlogin-939"], "isController": false}, {"data": [0.04, 500, 1500, "membershipregistration-909"], "isController": false}, {"data": [0.23, 500, 1500, "adminlogin-951"], "isController": false}, {"data": [0.22, 500, 1500, "adminlogin-941"], "isController": false}, {"data": [0.32, 500, 1500, "adminlogin-952"], "isController": false}, {"data": [0.0, 500, 1500, "adminlogin-982"], "isController": false}, {"data": [0.63, 500, 1500, "adminlogin-983"], "isController": false}, {"data": [0.52, 500, 1500, "adminlogin-944"], "isController": false}, {"data": [0.0, 500, 1500, "adminlogin-942"], "isController": false}, {"data": [0.29, 500, 1500, "adminlogin-943"], "isController": false}, {"data": [0.52, 500, 1500, "adminlogin-980"], "isController": false}, {"data": [0.28, 500, 1500, "adminlogin-981"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1050, 3, 0.2857142857142857, 5440.778095238094, 80, 44801, 3518.0, 11641.6, 17849.35, 30376.640000000003, 10.693880045219835, 2169.4859442314155, 3.983022749320175], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["events-855", 50, 0, 0.0, 7320.940000000001, 2629, 12380, 6891.0, 11439.1, 12148.65, 12380.0, 1.308489479744583, 85.19748786376007, 0.4676827632680833], "isController": false}, {"data": ["membershipregistration-908", 50, 0, 0.0, 8021.520000000004, 927, 12492, 7306.5, 12075.0, 12419.949999999999, 12492.0, 1.0132122882386319, 74.12182199633217, 0.3413654682053984], "isController": false}, {"data": ["events-856", 50, 1, 2.0, 7162.44, 320, 21497, 6670.0, 12938.699999999995, 18565.64999999998, 21497.0, 1.5082046332046333, 64.55811018188948, 0.5427180109797297], "isController": false}, {"data": ["launch-502", 50, 0, 0.0, 5383.339999999998, 87, 10710, 4637.5, 10407.0, 10443.6, 10710.0, 2.8124648441894475, 19.08301341545731, 0.9969968148835641], "isController": false}, {"data": ["membershipregistration-928", 50, 0, 0.0, 4218.0, 471, 9405, 3383.5, 8638.3, 9152.699999999999, 9405.0, 1.3246787653993908, 96.90723729964235, 0.45147743078553454], "isController": false}, {"data": ["membershipregistration-927", 50, 0, 0.0, 6766.560000000002, 982, 15753, 7313.5, 10537.1, 11870.299999999997, 15753.0, 1.0961787209786684, 71.3736523852849, 0.37359997423980007], "isController": false}, {"data": ["membershipregistration-938", 50, 0, 0.0, 1069.3400000000001, 80, 4587, 739.5, 2612.399999999999, 3123.299999999998, 4587.0, 1.6352160120351897, 0.44233870638061284, 1.2791094000392451], "isController": false}, {"data": ["corporatesearch-991", 50, 1, 2.0, 21041.599999999995, 3542, 44801, 21403.5, 32710.8, 35143.45, 44801.0, 0.7248477819657871, 882.142511303095, 0.25112011633806897], "isController": false}, {"data": ["events-863", 50, 0, 0.0, 2773.3999999999996, 789, 5549, 2660.5, 4488.4, 5440.2, 5549.0, 1.2595410232511273, 0.536288951306144, 0.742932400433282], "isController": false}, {"data": ["adminlogin-939", 50, 0, 0.0, 3232.2999999999993, 431, 18618, 1269.0, 7639.9, 16331.8, 18618.0, 0.6197015517326855, 0.33466304502751476, 0.2862488612983987], "isController": false}, {"data": ["membershipregistration-909", 50, 1, 2.0, 5005.680000000002, 594, 21072, 4787.0, 8456.9, 9151.949999999999, 21072.0, 1.0297600659046442, 65.76271029631346, 0.3400018342601174], "isController": false}, {"data": ["adminlogin-951", 50, 0, 0.0, 3452.919999999999, 266, 8432, 2027.0, 6616.4, 7856.599999999996, 8432.0, 0.7411250277921885, 17.139240022604312, 0.22870655154524566], "isController": false}, {"data": ["adminlogin-941", 50, 0, 0.0, 5482.22, 396, 12376, 3674.0, 11641.6, 12003.1, 12376.0, 0.6191490415572837, 45.294017433689135, 0.19227480001485958], "isController": false}, {"data": ["adminlogin-952", 50, 0, 0.0, 3774.280000000002, 177, 11742, 2143.5, 10017.7, 10997.899999999996, 11742.0, 0.6401147085557732, 4.363281900116501, 0.23254167146752697], "isController": false}, {"data": ["adminlogin-982", 50, 0, 0.0, 8573.700000000003, 2360, 17848, 8028.0, 14768.3, 15044.899999999998, 17848.0, 1.016590761223162, 1194.952801597064, 0.340518194433149], "isController": false}, {"data": ["adminlogin-983", 50, 0, 0.0, 779.1199999999999, 97, 2725, 647.5, 1430.3, 1832.5999999999972, 2725.0, 1.0042580541495945, 18.91908410410139, 0.31088847965373184], "isController": false}, {"data": ["adminlogin-944", 50, 0, 0.0, 1044.2799999999995, 110, 5023, 800.0, 1735.2999999999997, 3543.1, 5023.0, 0.9148461228821312, 17.234664605975773, 0.28320920015003476], "isController": false}, {"data": ["adminlogin-942", 50, 0, 0.0, 14229.76, 3501, 31297, 10170.0, 28887.0, 30367.2, 31297.0, 0.7730245357987662, 908.6525964927877, 0.25893302322165707], "isController": false}, {"data": ["adminlogin-943", 50, 0, 0.0, 2334.5600000000004, 310, 6721, 2022.5, 4984.2, 6178.699999999997, 6721.0, 0.8139213100877407, 35.50652230754831, 0.2599143246080969], "isController": false}, {"data": ["adminlogin-980", 50, 0, 0.0, 1058.6800000000007, 131, 3326, 841.0, 2242.1, 2863.349999999997, 3326.0, 1.1932889429846543, 52.05606481647216, 0.3810600433163886], "isController": false}, {"data": ["adminlogin-981", 50, 0, 0.0, 1531.7, 276, 3469, 1498.5, 2821.2999999999997, 3176.449999999998, 3469.0, 1.0368926401360403, 75.85416461448332, 0.32200376910474693], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 64.227.132.109:80 [/64.227.132.109] failed: Connection timed out: connect", 3, 100.0, 0.2857142857142857], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1050, 3, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 64.227.132.109:80 [/64.227.132.109] failed: Connection timed out: connect", 3, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["events-856", 50, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 64.227.132.109:80 [/64.227.132.109] failed: Connection timed out: connect", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["corporatesearch-991", 50, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 64.227.132.109:80 [/64.227.132.109] failed: Connection timed out: connect", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["membershipregistration-909", 50, 1, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 64.227.132.109:80 [/64.227.132.109] failed: Connection timed out: connect", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
