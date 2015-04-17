/// <reference path="../include.js" />

MPWidget.Frame.New = function ()
{
    var content = $(MPTemplate.Widget.Frame());

    var search = content.find(".header .search");
    content.Body = content.find(".body");

    var s = MPWidget.Search.New();
    search.append(MPWidget.Search.New());

    if (MPData.user.id == 0)
    {
        var login = content.find("#login");
        var signup = content.find("#signup");

        login.click(function ()
        {
            var dialog = MPLoginDialog.New();
            dialog.onSuccess = function ()
            {
                location.reload();
            }
        });
        signup.click(function ()
        {
            MPSignUpDialog.New();
        })
    }
    else
    {
        var p = content.find(".user-nav");
        var m = p.find(".hide-menu");
        var l = content.find("#logout");//登出
        MPMenu(p, m);

        l.click(function ()
        {
            if ($.cookie("login") == null)
            {
                MPMessageBox.New(MPMessageBox.Icons.Error, "请先登录");
                return;
            }
            $.post(host + "/ajax/logout", {}, function (data)
            {
                if (data.code == 0)
                {
                    $.cookie("login", null);
                    location.href = host;
                }
            }, "json");
        });

        var add = content.find(".add-nav");
        add.click(function ()
        {
            MPObject.Image.CreateImage();
        });

        //返回顶端按钮
    }
    var toTopButton = content.find(".float-tools .top");

    $(document).scroll(function ()
    {
        if ($(document).scrollTop() <200)
            toTopButton.fadeOut();
        else
            toTopButton.fadeIn().css("display","block");
    })

    toTopButton.click(function ()
    {
        $("html,body").animate({ scrollTop: 0 }, 200);
    })
    return content;
};