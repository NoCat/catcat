/// <reference path="../../include.js" />
MPTemplate.Widget.Notice = {};

MPTemplate.Widget.Notice.Activity=function(data,options)
{
    str = "";
    switch (data.type)
    {
        case "praise":
            str += "<div class=\"widget-notice\">";
            str += "</div>";
            break;
        case "resave":
            break;
        case "follow_user":
            break;
        case "follow_package":
            break;
    }
}