var ItemBookmark = (function () {

    return {
        isBookmarkButtonAndAction: isBookmarkButtonAndAction,
        removeAnimate: removeAnimate,
    }

    function isBookmarkButtonAndAction($eTarget) {

        var $bookmarkButton = $eTarget.findUp(".js-post-bookmark");
        if ($bookmarkButton.length === 0) return false;
        var isBookmarked = $bookmarkButton.hasClass("on");
        setMarkedPost(isBookmarked);
        return true;

        function setMarkedPost(isBookmarked) {
            var serviceId;
            if (isBookmarked) {
                serviceId = "COLABO2_BRING_D001";
            } else {
                serviceId = "COLABO2_BRING_C001";
            }

            var $detailItem = $bookmarkButton.findUp(".detail-item");
            var projectSrno = $detailItem.attr("data-project-srno");
            var postSrno = $detailItem.attr("data-post-srno");
            var settingData = {
                COLABO_SRNO: projectSrno,
                COLABO_COMMT_SRNO: postSrno,
            }
            Ajax.executeApi(serviceId, settingData, function () {
                if (isBookmarked) {
                    $bookmarkButton.removeClass("on");
                } else {
                    $bookmarkButton.addClass("on");
                }
                Often.toast("success", i18next.t(i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.apply)'})));
                if (!ViewChanger.isPage("schd")) UpdateElements.autoUpdateElem({
                    POST_SRNO: postSrno,
                    BOOKMARK_RELEASE: isBookmarked,
                });
            });

        }
    }

    function removeAnimate(postSrno) {
        var postCntBeforeClick = $("#allPostsLayer").find(".js-all-post-item").length;
        var $myPostContentUl = $("#myPostContentUl");
        var $bringPost = $myPostContentUl.find(".js-all-post-item[colabo_commt_srno=" + postSrno + "]");
        if ($bringPost.length > 0) {
            $bringPost.animate({opacity: 0.1, height: 0}, 150, "swing", function () {
                $(this).remove();
            });
            postCntBeforeClick === 1 && $myPostContentUl.append(AllPosts.getBookmarkNoDataHtml());
        }
    }

})()

