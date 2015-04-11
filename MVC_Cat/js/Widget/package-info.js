/// <reference path="../include.js" />

MPWidget.PackageInfo = {};
MPWidget.PackageInfo.New = function (packageDetail)
{
    var content = $(MPTemplate.Page.Package(packageDetail));
    content.waterfall = MPWaterFall.New($(window), content.find(".waterfall"), 4, 236, 6, 6, 6, 6);
    return content;
}

MPWidget.PackageInfo.Bind = function ()
{
    $(document).on("click", ".widget-packageinfo .package-edit", edit_click)

    .on("click", ".widget-packageinfo .unfollow", unfollow_click);

    function edit_click()
    {
        //提取id
        var id = $(this).attr("data-id");
        MPCreatePackageDialog.New(true, id, "这是标题", "description");
    }

    function follow_click()
    {
        var t = $(this);
        var id = t.attr("data-id");
        MPObject.Package.Follow(id, function ()
        {
            t.removeClass("follow");
            t.addClass("unfollow");
            MPMessageBox.New(MPMessageBox.Icons.OK, "关注成功!");
        })
    }//关注操作

    function unfollow_click()
    {
        var t = $(this);
        var box = MPMessageBox.New(MPMessageBox.Icons.Warn, "确认要取消关注?");
        box.onOK = function myfunction()
        {
            var id = t.attr("data-id");
            MPObject.Package.UnFollow(id, function ()
            {
                t.removeClass("unfollow");
                t.addClass("follow");
            })
        }
    }//取消关注
}