/// <reference path="../include.js" />

MPObject.User = {};

MPObject.User.Avt = function (user) {
    if (user.default_head == true)
        return imageHost + "/avt/0";
    else
        return imageHost + "/avt/" + user.id;
}

MPObject.User.BigAvt = function (user) {
    if (user.default_head == true)
        return imageHost + "/avt/0_big";
    else
        return imageHost + "/avt/" + user.id + "_big";
}

MPObject.User.Home = function (user) {
    return "/user/" + user.id;
}

MPObject.User.ID = function (user) {
    return user.id;
}

MPObject.User.Name = function (user) {
    return user.name;
}

//关注用户
MPObject.User.Follow = function (userid,callback) {
    if (!MPCheckLogin()) {
        return;
    }
    $.post(host + "/ajax/follow-user", { user_id: userid }, function (data) {
        if (data.code==0) {
            if (callback) {
                callback();
            }
        }
    }, "json");
}

//取消关注用户
MPObject.User.UnFollow = function (userid, callback) {
    if (!MPCheckLogin()) {
        return;
    }
    $.post(host + "/ajax/unfollow-user", { user_id: userid }, function (data) {
        if (data.code == 0) {
            if (callback) {
                callback();
            }
        }
    }, "json");
}

//用户所关注的人
MPObject.User.Following = function (user) {
    return "/user/" + user.id + "/following"
}

//用户的粉丝
MPObject.User.Follower = function (user) {
    return "/user/" + user.id + "/follower"
}