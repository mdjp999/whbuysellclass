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
            }
        )
        ;
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

        });
    });
    //保存配置
    $("#saveConfForm").submit(function () {
        var source = "http://" + $("#cccccsourceIp").val() + ":8080/ldc/conf/saveOne";
        var p = '';

        $(".nr input").each(function (i, item) {
            p += $(item).attr("id").replace("ccccc", "") + '=' + $(item).val() + ',';
        });
        var k = new Object();
        if ($("#saveConfForm input[name='username']").val().length < 2) {
            k.username = $("#cccccsourceUsername").val();
        } else {
            k.username = $("#saveConfForm input[name='username']").val();
        }

        k.code = $("#saveConfForm input[name='code']").val();
        k.content = p;
        $.post(source, k, function (r) {
            alert(r);
        }, "json");
        return false;
    });
    //获取所有配置
    $("#getConfForm").submit(function () {
        var source = "http://" + $("#cccccsourceIp").val() + ":8080/ldc/conf/getByUsername";
        var u = '';
        if ($("#getConfForm input[name='username']").val().length < 2) {
            u = $("#cccccsourceUsername").val();
        } else {
            u = $("#getConfForm input[name='username']").val();
        }
        $.getJSON(source + "?username=" + u, function (r) {
            allMyConf = r;
            $("#openConfForm select").text('');
            $(allMyConf).each(function (i, item) {
                var s = '<option value="' + item.id + '">' + item.code + '</option>';
                $("#openConfForm select").append(s);
            })
        });
        return false;
    });
    //查看配置，在当前页面展现，不一样的标红
    $("#openConfForm").submit(function () {
        var confId = $("#openConfForm select").val();
        if (confId == null)
            return false;
        //
        var conf;
        $(allMyConf).each(function (i, item) {
            if (item.id == confId) {
                conf = item;
            }
        });
        //删除原来的标红等
        $("tr").removeClass("danger");
        $(".oldValue").remove();

        $(conf.content.split(",")).each(function (i, item) {
            if (item.indexOf("=") > 0) {
                var n = item.split("=")[0];
                var v = item.split("=")[1];
                if ($("#ccccc" + n).val() != v) {
                    $("#ccccc" + n).parent().parent().addClass("danger");
                    var tmp = $("#ccccc" + n).parent().parent().find("td:eq(1)");
                    tmp.html(tmp.text() + '<h4 class="oldValue">' + v + '</h4>');
                }
            }
        });
        return false;
    });
};


//得到的配置
var allMyConf;