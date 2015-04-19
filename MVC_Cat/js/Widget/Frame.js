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
        var user_nav = content.find(".user-nav");
        var user_nav_menu = user_nav.find(".hide-menu");
        var l = content.find("#logout");//登出
        MPMenu(user_nav, user_nav_menu);

        var notice_nav = content.find(".notice-nav");
        var notice_nav_menu = notice_nav.find(".hide-menu");
        MPPopUpMenu(notice_nav, notice_nav_menu, function ()
        {
            MPMenu(user_nav, user_nav_menu);
            $(".notice-nav .content").clear();
        },//callback
        function ()
        {
            user_nav.unbind();
            GetMessage(20);
            $("#activity").click(GetActivity(20));
        });

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
    }

    //返回顶端按钮
    var toTopButton = content.find(".float-tools .top");

    $(document).scroll(function ()
    {
        if ($(document).scrollTop() < 200)
            toTopButton.fadeOut();
        else
            toTopButton.fadeIn().css("display", "block");
    })

    toTopButton.click(function ()
    {
        $("html,body").animate({ scrollTop: 0 }, 200);
    })

    $.post(host + "/ajax/get-notice-count", {}, function (data)
    {
        if (data.code == 0)
        {
            var total = data.activity_count + data.message_count;
            if (total == 0)
                $(".notice-nav .count").hide();
            else
                $(".notice-nav .count").text(total);
        }
    }, "json");

    function GetMessage(max)
    {
        $.post(host + "/ajax/get-message", { max: max }, function (data)
        {
            if (data.code == 0)
            {
                var container = content.find(".notice-nav .content");
                for (var n = data.datas.length, i = 0; i < n; i++)
                {
                    container.append(MPTemplate.Widget.Notice.Message(data.datas[i]));
                }
            }
        }, "json");
    }

    function GetActivity(max)
    {
        $.post(host + "/ajax/get-activity", { max: max }, function (data)
        {
            if (data.code == 0)
            {
                var container = content.find(".notice-nav .content");
                for (var n = data.datas.length, i = 0; i < n; i++)
                {
                    container.append(MPTemplate.Widget.Notice.Activity(data.datas[i]));
                }
            }
        }, "json");
    }
    


    /////
    ////这里的是测试代码,实际使用时去掉
    //$.post("/ajax/get-activity", { max: 0 }, function (data)
    //{
    //    var container = content.find(".notice-nav .content");
    //    for(var n=data.datas.length,i=0;i<n;i++)
    //    {
    //        container.append(MPTemplate.Widget.Notice.Activity(data.datas[i]));
    //    }
    //},"json");
    /////

    return content;
};