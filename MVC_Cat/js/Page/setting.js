/// <reference path="../include.js" />

$(function () {
    var frame = MPWidget.Frame.New();
    frame.Body.append(MPTemplate.Page.Setting());
    $("body").append(frame);

    var body = frame.Body;

    switch (MPData.sub1) {
        case "password":
            {
                var oldPassword = body.find("#oldpassword");
                var newPassword1 = body.find("#newpassword1");
                var newPassword = body.find("#newpassword");
                body.find(".submit").click(function () {
                    if (oldPassword.val() == "" || newPassword1.val() == "" || newPassword.val() == "") {
                        MPMessageBox.New(MPMessageBox.Icons.Warn, "请将信息补充完整");
                        return;
                    }
                    if (newPassword1.val() != newPassword.val()) {
                        MPMessageBox.New(MPMessageBox.Icons.Warn, "两次输入的新密码不一致,请重新输入!");
                        return;
                    }
                    $.post(host + "/ajax/setting-password", { old_password: MPHtmlEncode(oldPassword.val()), new_password: MPHtmlEncode(newPassword1.val()) }, function (data) {
                        if (data.code==0) {
                            MPMessageBox.New(MPMessageBox.Icons.OK, "密码修改成功");
                        }
                        else {
                            MPMessageBox.New(MPMessageBox.Icons.Error, data.msg);
                        }
                    }, "json");
                });//确认修改密码
            }
            break;
        default:
            {
                var inputUsername = body.find("#username");
                var inputDescription = body.find("#description");
                var f


                body.find(".submit").click(function () {
                    if (inputUsername.val()=="") {
                        MPMessageBox.New(MPMessageBox.Icons.Warn, "请输入昵称");
                        return;
                    }
                    $.post(host + "/ajax/setting-basic", { name: MPHtmlEncode(inputUsername.val()), description: MPHtmlEncode(inputDescription.val()) }, function (data) {
                        if (data.code==0) {
                            MPMessageBox.New(MPMessageBox.Icons.OK, "用户信息修改成功");
                        }
                        else {
                            MPMessageBox.New(MPMessageBox.Icons.Error, data.msg);
                        }
                    }, "json");
                })
            }
    }

});

