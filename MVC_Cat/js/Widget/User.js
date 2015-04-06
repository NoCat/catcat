/// <reference path="../include.js" />


MPWidget.User = {};
MPWidget.User.New = function (userDetail)
{
    var content = $(MPTemplate.Widget.User(userDetail));
    return content;
}

MPWidget.User.Bind = function ()
{
    $(document).on("click", ".widget-user .follow", follow_click)
    //关注用户
    .on("hover", ".widget-user .unfollow", unfollow_hover)
    //鼠标悬停在取消关注按钮上
    .on("click", "widget-user .unfollow", unfollow_click);
    //点击取消关注;

    function follow_click()
    {
        var id = $(this).attr("data-id");
        //获取用户ID
        $.post(host + "/ajax/follow-user", { user_id: id }, function (data)
        {
            if (data.code == 0)
            {
                $(this).removeClass("follow");
                $(this).addClass("unfollow");
                $(this).text("已关注");
            };
        }, "json");
    }

    function unfollow_hover()
    {
        $(this).text("取消关注");
    }

    function unfollow_click()
    {
        var dialog = MPMessageBox.New(MPMessageBox.Icons.Warn, "确认要取消关注吗?");
        dialog.onOK(function ()
        {
            var id = $(this).attr("data-id");
            $.post(host + "/ajax/unfollow-user", { user_id: id }, function (data)
            {
                if (data.code == 0)
                {
                    $(this).removeClass("unfollow");
                    $(this).addClass("follow");
                    $(this).text("关注");
                }
            }, "json");
        })
    }
}