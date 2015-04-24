<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/mp_spider.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
    <%
        var image = ViewBag.Image as JSON.ImageDetail;
    %>
    <a href="<%=ResolveUrl("~/user/"+image.user.id) %>"><%=image.user.name %></a>
    <a href="<%=ResolveUrl("~/package/"+image.package.id) %>"><%=image.package.title %></a>
    <img src="<%=Tools.ImageServerHost+"/"+image.file.hash+"_fw658.jpg" %>" alt="<%=image.description %>" />
    <div><%=image.description %></div>
    <%
        foreach (JSON.Comment item in image.comments)
        {
    %>
    <%=Html.Partial("comment",item) %>
    <%
        }
    %>
    <%
        if (ViewBag.PrevID != 0)
        { 
    %>
    <a href="/image/<%=ViewBag.PrevID %>">上一张</a>
    <%
        }
        if (ViewBag.NextID != 0)
        {
    %>
    <a href="/image/<%=ViewBag. NextID %>">下一张</a>
    <%
        }
    %>
</asp:Content>
