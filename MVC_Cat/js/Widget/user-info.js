/// <reference path="../include.js" />

MPWidget.UserInfo = {};
MPWidget.UserInfo.New = function ()
{
    var content = $(MPTemplate.Page.User(MPData.page_user));
    content.waterfall = MPWaterFall.New($(window), content.find(".waterfall"), 4, 236, 6, 6, 6, 6);
    return content;
    
}