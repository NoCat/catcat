﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class MPUser
{
    public int ID { get; set; }

    string _name = "";
    public string Name
    {
        get
        {
            return _name;
        }
        set
        {
            if (_name.Equals(value, StringComparison.OrdinalIgnoreCase))
                return;
            try
            {
                SetAttribute("Name", value);
                _name = value;
            }
            catch (MySql.Data.MySqlClient.MySqlException)
            {
                throw new MiaopassUsernameConflictException();
            }
        }
    }

    string _password = "";
    public string Password
    {
        get
        {
            return _password;
        }
        set
        {
            if (_password == value)
                return;

            SetAttribute("Password", value);
            _password = value;
        }
    }
    public UserAuthorities Authority { get; set; }
    public string Email { get; set; }

    bool _defaultHead = false;
    public bool DefaultHead
    {
        get
        {
            return _defaultHead;
        }
        set
        {
            if (_defaultHead == value)
                return;

            SetAttribute("DefaultHead", value);
            _defaultHead = value;
        }
    }

    string _description = "";
    public string Description
    {
        get
        {
            return _description;
        }
        set
        {
            if (_description.Equals(value, StringComparison.OrdinalIgnoreCase))
                return;

            SetAttribute("Description", value);
            _description = value;
        }
    }

    long _sinaUserID = 0;
    public long SinaUserID
    {
        get
        {
            return _sinaUserID;
        }
        set
        {
            SetAttribute("SinaUserID", value);
            _sinaUserID = value;
        }
    }

    string _sinaUrl = "";
    public string SinaUrl
    {
        get
        {
            return _sinaUrl;
        }
        set
        {
            SetAttribute("SinaUrl", value);
            _sinaUrl = value;
        }
    }

    DateTime _lastGetActivityTime = new DateTime();
    public DateTime LastGetActivityTime
    {
        get
        {
            return _lastGetActivityTime;
        }
        set
        {
            SetAttribute("lastgetactivitytime", value);
            _lastGetActivityTime = value;
        }
    }

    DateTime _lastGetMessageTime = new DateTime();
    public DateTime LastGetMessageTime
    {
        get
        {
            return _lastGetMessageTime;
        }
        set
        {
            SetAttribute("lastgetmessagetime", value);
            _lastGetMessageTime = value;
        }
    }

    public MPUser(int id)
    {
        if (id == 0)
        {
            id = 0;
        }
        else
        {
            Initialize("id=?", id);
        }
    }

    public MPUser(string str, MPUserConstructTypes type = MPUserConstructTypes.Email)
    {
        switch (type)
        {
            case MPUserConstructTypes.Email:
                Initialize("email=?", str);
                break;
            case MPUserConstructTypes.Name:
                Initialize("name=?", str);
                break;
        }


    }

    void Initialize(string condition, params object[] objs)
    {
        var res = DB.SExecuteReader("select name,password,authority,email,defaulthead,description,sinauserid,sinaurl,id,lastgetactivitytime,lastgetmessagetime from user where " + condition, objs);

        if (res.Count == 0)
            throw new MiaopassUserNotExistException();

        var row = res[0];
        _name = (string)row[0];
        _password = (string)row[1];
        Authority = (UserAuthorities)Convert.ToByte(row[2]);
        Email = (string)row[3];
        _defaultHead = Convert.ToBoolean(row[4]);
        _description = (string)row[5];
        _sinaUserID = Convert.ToInt64(row[6]);
        _sinaUrl = (string)row[7];
        ID = Convert.ToInt32(row[8]);
        _lastGetActivityTime = Convert.ToDateTime(row[9]);
        _lastGetMessageTime = Convert.ToDateTime(row[10]);
    }

    void SetAttribute(string attributeName, object value)
    {
        string sql = string.Format("update user set {0}=? where id={1}", attributeName, ID);
        DB.SExecuteNonQuery(sql, value);
    }

    public static int Create(string name, string password, string email)
    {
        if (name.Length > 10)
            throw new MiaopassException("昵称长度不能超过10个字符");
        if (IsNameExist(name))
            throw new MiaopassUsernameConflictException();
        if (IsEmailExist(email))
            throw new MiaopassEmailConflictException();
        try
        {
            var id= DB.SInsert("insert into user (name,password,email,description,sinauserid,sinaurl,lastgetactivitytime,lastgetmessagetime) values (?,?,?,'',0,'',now(),now())", name, Tools.SHA256Hash(password), email);
            //BaiduUrlPusher.PushUser(id);
            return id;
        }
        catch (MySql.Data.MySqlClient.MySqlException)
        {
            throw new MiaopassCreateUserFailedException();
        }
    }

    public static bool IsNameExist(string name)
    {
        if (DB.SExecuteScalar("select ID from user where Name=?", name) == null)
            return false;
        else
            return true;
    }

    public static bool IsEmailExist(string email)
    {
        if (DB.SExecuteScalar("select ID from user where Email=?", email) == null)
            return false;
        else
            return true;
    }

    public static void CheckPassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
            throw new MiaopassException("密码不能为空");
    }
}

public enum UserAuthorities
{
    /// <summary>
    /// 管理员
    /// </summary>
    Administrator = 0,
    /// <summary>
    /// 一般用户
    /// </summary>
    Normal = 1
}

public enum MPUserConstructTypes
{
    Email,
    Name
}