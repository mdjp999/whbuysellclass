$(function () {
    //下单速度测试
    clickAndAlertResult("orderSpeedTestBtn", "../m4/orderSpeed");

});

function clickAndAlertResult(id,url) {
    $("#"+id).click(function () {
        $.getJSON(url, function (r) {
            alert(r);
        });
    });
}