$(function () {
    //下单速度测试
    clickAndAlertResult("orderSpeedTestBtn", "../m4/orderSpeed");
    //平掉所有
    clickAndAlertResult("closeAllOrderBtn", "../m4/closeAllOrder");
    //测试反向对冲平单
    clickAndAlertResult("orderCloseByTestBtn", "../m4/ifSupportOrderCloseBy");

    //取所有没有平的单子
    showAllUnCompletedOrder();

    //反向对冲平
    $("#closeOrderByBtn").click(function () {
        var id1 = 0;
        var id2 = 0;
        $("#allTreadOrder input").each(function (i, item) {
            if (item.checked) {
                var id = $(item).parent().parent().find("td:eq(1)").text();
                if (id1 == 0) {
                    id1 = id;
                } else {
                    id2 = id;
                }
            }
        });
        //
        $.getJSON("../m4/orderCloseBy?id1="+id1+"&id2="+id2, function (r) {
            alert(r);
        });
    });

});
//取所有没有平的单子
function showAllUnCompletedOrder() {
    $("#allTradeOrderBtn").click(function () {
        $.getJSON("../m4/getAllUncompletedOrder", function (r) {
            $("#allTreadOrder").html('');
            $(r).each(function (i, item) {
                var s = '<tr>' +
                    '<td><input type="checkbox"></td>' +
                    '<td>' + item.ticket + '</td>' +
                    '<td>' + item.symbol + '</td>' +
                    '<td>' + item.lots + '</td>' +
                    '<td>' + item.tp + '</td>' +
                    '<td>' + item.sl + '</td>' +
                    '<td>' + item.profit + '</td>' +
                    '<td>' + item.comment + '</td>' +
                    '</tr>';
                $("#allTreadOrder").append(s);
            });
        });
    });
}

//
function clickAndAlertResult(id, url) {
    $("#" + id).click(function () {
        $.getJSON(url, function (r) {
            alert(r);
        });
    });
}