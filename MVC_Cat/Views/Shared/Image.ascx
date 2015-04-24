<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<JSON.ImageDetail>" %>

<div>
    <a href="<%=ResolveUrl("~/image/"+Model.id) %>">
        <img src="<%=Tools.ImageServerHost+"/"+Model.file.hash+"_fw236.jpg" %>" />
    </a>
    <div><%=Model.description %></div>
    <a href="<%=ResolveUrl("~/user/"+Model.user.id) %>"><%=Model.user.name %></a>
    收集到
    <a href="<%=ResolveUrl("~/package/"+Model.package.id) %>"><%=Model.package.title %></a>
</div>
