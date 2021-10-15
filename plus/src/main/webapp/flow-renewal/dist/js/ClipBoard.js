var ClipBoard = (function () {

    return {
        getClipboardData: getClipboardData,
        copyTextData : copyTextData,
    }

    function getClipboardData(e) {
        if (e.clipboardData && e.clipboardData.getData) return e.clipboardData
        if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.items) return e.originalEvent.dataTransfer;
        if (window.clipboardData && window.clipboardData.getData) return window.clipboardData;
        return e.originalEvent.clipboardData;
    }

    //Note. Copy 태그를 다 뗴도 좋지만, Paste는 태그를 떼서는 안 된다.
    function copyTextData(areaHtml){
        areaHtml = TagUtil.removeAllTag(TagUtil.NewLine2Data(areaHtml));
        if (areaHtml === "") return;
        var $tempCopy = $('<textarea style="position: absolute; top: -9999em;">' + areaHtml + '</textarea>');
        $('body').append($tempCopy);
        $tempCopy.select();
        try {
            document.execCommand('copy');
            Often.toast("success", i18next.t('front.alert.copiedToClipboard'));
            $tempCopy.remove();
        } catch (err) {
            Often.toast("error", i18next.t('front.alert.supportDevice'));
            $tempCopy.remove();
        }
    }

})();
