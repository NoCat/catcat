/// <reference path="../include.js" />

MPAvtCutDialog = {
    New: function (hash) {
        var strVar = "";
        strVar += "<div class=\"dialog-mask\">";
        strVar += "    <div class=\"dialog-box\">";
        strVar += "        <div class=\"dialog-title\">";
        strVar += "            <span class=\"text\"><\/span>";
        strVar += "            <div class=\"dialog-close\">";
        strVar += "            <\/div>";
        strVar += "        <\/div>";
        strVar += "        <div class=\"dialog-content\" style=\"width:760px\">";
        strVar += "        <div class=\"origin-container\"  >";
        strVar += "            <img id=\"origin\"  src=\"{0}\"/>".Format(imageHost + "/" + hash);
        strVar += "        <\/div>";
        strVar += "        <div class=\"preview-pane\">";
        strVar += "            <div class=\"preview-container\">";
        strVar += "                 <img id=\"preview\"  src=\"{0}\"/>".Format(imageHost + "/" + hash);
        strVar += "            <\/div>";
        strVar += "        <\/div>";
        strVar += "        <\/div>";
        strVar += "        <div class=\"dialog-btns\">";
        strVar += "            <div class=\"ok\">确认<\/div>";
        strVar += "            <div class=\"cancel\">取消<\/div>";
        strVar += "        <\/div>";
        strVar += "    <\/div>";
        strVar += "<\/div>";
 
        var dialog = MPTitleDialog.New(strVar, "裁剪头像");
        var origin = dialog.Content.find("#origin");
        var preview = dialog.Content.find("#preview");
        dialog.offset_x = null;
        dialog.offset_y = null;
        dialog.size = null;
        //预览图处理函数

        var jcrop_api,
        boundx,
        boundy,

        // Grab some information about the preview pane
        $preview = $('.preview-pane'),
        $pcnt = $('.preview-pane .preview-container'),
        $pimg = $('.preview-pane .preview-container img'),

        xsize = $pcnt.width(),
        ysize = $pcnt.height();

        //console.log('init',[xsize,ysize]);
        origin.Jcrop({
            onChange: updatePreview,
            onSelect: updatePreview,
            aspectRatio: 1
        }, function () {
            // Use the API to get the real image size
            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            // Store the API in the jcrop_api variable
            jcrop_api = this;

            // Move the preview into the jcrop container for css positioning
            $preview.appendTo(jcrop_api.ui.holder);
        });

        function updatePreview(c) {
            if (parseInt(c.w) > 0) {
                var rx = xsize / c.w;
                var ry = ysize / c.h;

                $pimg.css({
                    width: Math.round(rx * boundx) + 'px',
                    height: Math.round(ry * boundy) + 'px',
                    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                    marginTop: '-' + Math.round(ry * c.y) + 'px'
                });
            }
        };

        return dialog;
    }
}