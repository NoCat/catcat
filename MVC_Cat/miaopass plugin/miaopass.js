﻿//在这里开始写就可以了,chrome插件其实也就是一个js程序

//服务器地址
var host = "http://localhost:4644/";
//准备收集的图片的url
var source = "";
//当前页面的url
var from = location.href;
//初始化的description,默认为当前页面的标题
var description = document.title;
var TimerId;

//strVar为button的html+css设置,反正就是button的外观啦
var strVar = '<div class=\"mp_pick_btn\"" title=\"收集这张图片到喵帕斯\">收集</div>';
//使用strVar来初始化button
var button = $(strVar);
button.click(button_click);
$("body").append(button);

//鼠标进入后显示按钮,按钮位置设置到图片左上?
$(document).on("mouseenter", "img", img_mouseenter)
    //鼠标离开后按钮隐藏
.on("mouseleave", "img", img_mouseleave);

function img_mouseenter() {
    var t = $(this);
    if (t.height() >= 250 && t.width() >= 250) {
        button.show();
        source = t.attr("src");
        description=document.title;
        button.offset({ top: t.offset().top+5, left: t.offset().left+5 });
        button.on("mouseleave", function () {
            var point={};
            point.X=event.clientX;
            point.Y=event.clientY;
            if (!MPCheckInEle(t,point)) {
                button.hide();
            }
        });
        from = location.href;
        checkLive(t);
    }
    //设置好source 和from的值
}

function img_mouseleave() {
    var t = $(this);
    var point = {};
    point.X = event.clientX;
    point.Y = event.clientY;
    if (!MPCheckInEle(t, point)) {
        button.hide();
        clearTimeout(TimerId);
    }
    //按钮消失
}

function button_click() {
    //鼠标点击
    var url = host + "pick?from=" + encodeURIComponent(from) + "&source=" + encodeURIComponent(source) + "&description=" + encodeURIComponent(description);
    window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=yes, width=700, height=400");
}

function checkLive(node) {
    setTimeout(TimerId = function myfunction() {
        if (node.is(":hidden")) {
            button.hide();
        }
        else {
            checkLive(node);
        }
    },100);//每0.1秒钟监测一次鼠标位置
}

function MPCheckInEle(node, point) {
    var w = $(window);
    var mouseX = point.X;
    var mouseY = point.Y;
    var left = node.offset().left;
    var top = node.offset().top;
    var width = node.width();
    var height = node.height();
    if (mouseX > left-w.scrollLeft() && mouseX < left + width-w.scrollLeft() && mouseY > top - w.scrollTop() && mouseY < top + height - w.scrollTop()) {
        return true;
    }
    else {
        return false;
    }
}