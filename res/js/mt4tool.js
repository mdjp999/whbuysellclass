$(function () {
    //下单速度测试
    clickAndAlertResult("orderSpeedTestBtn", "../m4/orderSpeed");
    //平掉所有
    clickAndAlertResult("closeAllOrderBtn", "../m4/closeAllOrder");
    //测试反向对冲平单
    clickAndAlertResult("orderCloseByTestBtn", "../m4/ifSupportOrderCloseBy");

});

function clickAndAlertResult(id, url) {
    $("#" + id).click(function () {
        $.getJSON(url, function (r) {
            alert(r);
        });
    });
}