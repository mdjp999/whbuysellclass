$(document).ready(function () {
    load();

});
function load() {
    $.getJSON("../f/allConf", function (r) {
        var dataTable = $("#tt");
        var showGroup = "no";
        $.each(r, function (i, item) {
            if (showGroup != item.showGroup) {
                var g = '<tr class="info"><td colspan="4" class="text-center"><strong><h3>' + item.showGroup + '</h3></strong></td></tr>';
                showGroup = item.showGroup;
                dataTable.append(g);
            }
            var s = '<tr>';
            s += '<td>' + item.name + '</td>';
            s += '<td>' + item.info + '</td>';
            s += '<td class="nr">' + ' <input type="text"  class="form-control" id="ccccc' + item.name + '" value="' + item.v + '">' + '</td>';
            s += '<td>' + '<input ccc="' + item.name + '" class="btn btn-default cccbutton" type="button" value="修改">' + '</td>';
            s += '</tr>';
            dataTable.append(s);
        });
        //event
        $(".cccbutton").click(function () {
            var name = $(this).attr("ccc");
            var newVal = ($("#ccccc" + name).val());
            $.getJSON("../f/changeConf?name=" + name + "&val=" + newVal, function (result) {
                if (result == "ok") {
                    //window.location.reload();
                    alert("修改成功");
                } else {
                    alert(result);
                }
            });

        })
        //保存配置
        $("#saveConf")
    });
};