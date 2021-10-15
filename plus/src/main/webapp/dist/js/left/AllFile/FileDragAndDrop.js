var FileDragAndDrop = (function () {

    //Note. 파일을 폴더에 드래그앤드랍으로 이동하는 기능

    return {
        addFileDragAndDrop: addFileDragAndDrop,
    }

    function addFileDragAndDrop($fileLayerUl, isProjectFiles) {
        var $fileItemArea = $fileLayerUl.findUp("#fileItemArea");

        $fileLayerUl.off("mousedown").on("mousedown", function (e) {
            if (e.button === 2) {
                rightClick(e);
                return;
            }

            if (isProjectFiles) drawDragBox(e);
        })
        $fileLayerUl.off("mousemove").on("mousemove", moveDragBox);
        $fileLayerUl.off("mouseup").on("mouseup", isAllFileAndAction);
        $fileItemArea.off("mouseleave").on("mouseleave", leaveDragBox);
    }

    function drawDragBox(e) {
        var $eTarget = $(e.target);
        var viewTypeClass = LocalUtil.getFileSetting();
        var $fileObject = $eTarget.findUp(".js-file-" + viewTypeClass);
        var $moveTarget = (viewTypeClass === "board") ? $fileObject : $eTarget.findUp(".all-file-name");
        var isCheckedFile = $fileObject.hasClass("on");
        if (!isCheckedFile || $moveTarget.length === 0) return;
        e.stopPropagation();

        var $dragBox = $('<div class="js-drag-box"><span class="js-drag-box-count"></span></div>')
            .css(getMousePosition(e));
        var $dragBoxCount = $dragBox.find(".js-drag-box-count");
        $dragBoxCount.text(getChechedFileCount($eTarget))
        checkDragBoxCount(e, $dragBoxCount);
        $("body").prepend($dragBox);
    }

    function moveDragBox(e) {
        var $dragBox = $(".js-drag-box");
        if ($dragBox.length === 0) return;
        e.stopPropagation();
        $dragBox.css(getMousePosition(e))
        checkDragBoxCount(e, $dragBox.find(".js-drag-box-count"));
    }

    function getMousePosition(e) {
        var isMousedown = e.type === "mousedown";
        return {
            "display": (isMousedown ? "none" : "block"),
            "top": e.clientY + 5,
            "left": e.clientX + 5,
        }
    }

    function checkDragBoxCount(e, $dragBoxCount) {
        var $eTarget = $(e.target);
        var viewTypeClass = LocalUtil.getFileSetting();
        var $fileLi = $eTarget.findUp(".js-file-" + viewTypeClass);
        var isFolder = $fileLi.hasClass("js-folder");
        var isSelected = $fileLi.hasClass("ui-selected");
        if (isFolder && !isSelected) $dragBoxCount.addClass("on");
        else $dragBoxCount.removeClass("on");
    }

    function leaveDragBox(e) {
        var $dragBox = $(".js-drag-box");
        if($(event)[0].relatedTarget === null || $($(event)[0].relatedTarget).hasClass("allFileLayer") || $($(event)[0].relatedTarget).hasClass("js-file-filter-area") || $($(event)[0].relatedTarget).is("#fileLayerProjectMenu")  || $($(event)[0].relatedTarget).is("#allFileFilterItems") || $($(event)[0].relatedTarget).findUp("#leftScroll").is("#leftScroll")){
            $dragBox.remove();
        }

    }

    function isAllFileAndAction(e) {
        var $eTarget = $(e.target);
        var $dragBox = $(".js-drag-box");
        if ($dragBox.length === 0) return;

        e.stopPropagation();
        var isMove = $dragBox.is(":visible");
        $dragBox.remove();

        var $fileLayerUl = $eTarget.findUp(".allFileLayer");
        var $folder = $eTarget.findUp(".js-folder");
        if ($folder.length > 0 && isMove) {
            MoveFilePopup.moveFile("DRAG", $fileLayerUl, $folder)
        }
    }

    function getChechedFileCount($eTarget) {
        var $fileLayer = $eTarget.findUp(".allFileLayer");
        var checkedFiles = $fileLayer.find(".js-file-" + LocalUtil.getFileSetting() + ".on");
        return (checkedFiles.length > 0 ? checkedFiles.length : "");
    }

    function rightClick(e) {
        var $eTarget = $(e.target);
        var $fileLi = $eTarget.findUp(".js-file-" + LocalUtil.getFileSetting());
        if ($fileLi.length === 0) return;
        e.stopPropagation();
        FileMenu.openFileMenu($fileLi, e);
    }

})();
