$(document).ready(function () {
    reload();
    setInterval(reload, 3000);
    checkInfo();
    setInterval(checkInfo, 30000);
    getTickets();
    setInterval(getTickets, 10000);
});
function reload() {
    $.getJSON("../my/sc", function (result) {
        $("#tt tr:gt(0)").remove();
        var dataTable = $("#tt");
        $.each(result, function (i, item) {
            var s = '';
            if (item.buyProfit > 0.5 || item.sellProfit > 0.5) {
                s += '<tr class="danger">';
            } else {
                s = '<tr>';
            }
            s += '<td>' + i + '</td>';
            s += '<td>' + item.sourceAsk + '</td>';
            s += '<td>' + item.mt4Ask + '</td>';
            s += '<td>' + item.sourceBid + '</td>';
            s += '<td>' + item.mt4Bid + '</td>';
            s += '<td>' + item.askChange.toFixed(1) + '</td>';
            s += '<td>' + item.bidChange.toFixed(1) + '</td>';
            s += '<td>' + item.buyProfit.toFixed(1) + '</td>';
            s += '<td>' + item.sellProfit.toFixed(1) + '</td>';
            s += '<td>' + item.changeTime + '</td>';
            s += '</tr>';
            dataTable.append(s);
        });
    });
};
function checkInfo() {
    $.getJSON("../my/getLCT", function (result) {
        //时间
        $("#sourceD").html(result.initTime);
        //session
        var t='';
        //if (result.session) {
        //    t = 'session alive';
        //} else {
        //    t = 'session stop';
        //}
        //次数
        t += " 拟合次数:" + result.calCount;
        $("#session").text(t);
    });
}
/*
 日志提取
 */
function getTickets() {
    $.getJSON("../my/getTickets", function (ts) {
        $("#tickets tr:gt(0)").remove();
        $.each(ts, function (i, item) {
            var s = '<tr>';
            s += '<td>' + item.tradeTime + '</td>';
            s += '<td>' + item.mt4Id + '</td>';
            s += '<td>' + item.symbol + '</td>';
            s += '<td>' + item.op + '</td>';
            s += '<td>' + item.bestPrice + '</td>';
            s += '<td>' + item.currentPrice + '</td>';
            s += '<td>' + item.bestProfit.toFixed(1) + '</td>';
            s += '<td>' + item.sourceSpace + '</td>';
            s += '<td>' + item.mt4Space + '</td>';
            s += '<td><button onclick="getLogs(\''+item.xh+'\')">详细</button></button></td>';
            s += '</tr>';
            $("#tickets").append(s);
        });
    });
}
function getLogs(xh) {
    $.getJSON("../my/getJustLogs?id="+xh, function (result) {
         var s='';
        if(result.length==0) {
            s = "没有记录";
        }else{
            $.each(result, function (i, item) {
                s += item.content + "\n";
            });
        }
        alert(s);
    });
}

//更新gold to cny
//var s = '<tr>';
//s += '<td>' + '</td>';
//s += '<td>' + '人民币黄金' + '</td>';
//s += '<td>' + Math.round(b1 * a1 / 31.1035 * 1000) / 1000 + '</td>';
//s += '<td>' + Math.round(b2 * a2 / 31.1035 * 1000) / 1000 + '</td>';
//s += '<td>' + '</td>';
//s += '</tr>';