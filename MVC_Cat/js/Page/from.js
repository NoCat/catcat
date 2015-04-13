/// <reference path="../include.js" />

$(function ()
{
    var frame = MPTemplate.Widget.Frame.New();
    var waterfall = $("<div class=\"waterfall\"></div>");
    frame.Body.append(waterfall);

    var wf = MPWaterFall.New($(window), waterfall, 4, 236, 6, 6, 6, 6);
});