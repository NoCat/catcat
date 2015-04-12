/// <reference path="../include.js" />

MPAvtCutDialog = {
    //创建对话框,参数file为file对象{hash,width,height}
    New: function (file) { 
        var dialog = MPTitleDialog.New(MPTemplate.Dialog.AvtCutDialog(file), "裁剪头像");
        var origin = dialog.Content.find(".main");
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