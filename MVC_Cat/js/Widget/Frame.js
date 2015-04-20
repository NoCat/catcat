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
            $(".widget-notice").remove();
            $("#activity").removeClass("on");
            $("#message").removeClass("on");
        },//callback
        function ()
        {
            user_nav.unbind();
            if (!($("#activity").hasClass("on") || $("#message").hasClass("on")))
            {
                $("#message").addClass("on");
                GetMessage(0);
                IsBottom("#message");
            }

            $("#activity").click(function (e)
            {
                e.stopPropagation();
                $("notice-nav .content").unbind();
                if ($(this).hasClass("on"))
                    return;
                $("#message").removeClass("on");
                $(this).addClass("on");
                $(".widget-notice").remove();
                GetActivity(0);
                IsBottom("#activity");
            });

            $("#message").click(function (e)
            {
                e.stopPropagation();
                $("notice-nav .content").unbind();//用于消去上一个滚动绑定事件
                if ($(this).hasClass("on"))
                    return;
                $("#activity").removeClass("on");
                $(this).addClass("on");
                $(".widget-notice").remove();
                GetMessage(0);
                IsBottom("#message");
            })
        });

        function update(target)
        {
            $("notice-nav .content").unbind();
            if (target == "#message")
            {
                GetMessage($(target).attr("data-max"));
                alert($(".widget-notice").length);
            }
            else
            {
                GetActivity($(target).attr("data-max"));
                alert($(".widget-notice").length);
            }
            IsBottom(target);
        }

        function IsBottom(target)
        {
            var b = $(target);
            var a= $(target).attr("data-max");
            if ($(target).attr("data-max")==1)
            {
                $("notice-nav .content").unbind();
                return;
            }
            $(".notice-nav .content").scroll(function ()
            {
                var scrollMax = $(this)[0].scrollHeight;
                var scrollTop = $(this)[0].scrollTop;　 //滚动到的当前位置
                var divHight = $(this).height();
                if (divHight + scrollTop >= scrollMax)
                    update(target);
            })
        }

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
        if (max==1)
        {
            return;
        }
        $.post(host + "/ajax/get-message", { max: max }, function (data)
        {
            if (data.code == 0)
            {
                var container = content.find(".notice-nav .content ");
                for (var n = data.datas.length, i = 0; i < n; i++)
                {
                    container.append(MPTemplate.Widget.Notice.Message(data.datas[i]));
                    $("#message").attr("data-max", data.data_max);
                }
            }
        }, "json");
    }

    function GetActivity(max)
    {
        if (max==1)
        {
            return;
        }
        $.post(host + "/ajax/get-activity", { max: max }, function (data)
        {
            if (data.code == 0)
            {
                var container = content.find(".notice-nav .content ");
                for (var n = data.datas.length, i = 0; i < n; i++)
                {
                    container.append(MPTemplate.Widget.Notice.Activity(data.datas[i]));
                    $("#activity").attr("data-max", data.data_max);
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