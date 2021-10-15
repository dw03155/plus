var SlideNotice = (function () {

    return {
        drawRenewalSlideNotice: drawRenewalSlideNotice,
    }

    function drawRenewalSlideNotice() {

        return;
        if (Often.getCookie("RENEWAL_SLIDE_NOTICE_HIDE_YN") === "Y") return;
        if (!Often.isFunc("FLOW_S_MOVE_ON_OLD")) return;

        var $renewalSlideNotice = $("#renewalSlideNotice");
        var $slideMask = $renewalSlideNotice.find(".slide-banner-body>.slide-banner-cont-mask");
        var slideNum = 1;

        $renewalSlideNotice.on("click", clickSlideNotice).fadeIn(200);

        function clickSlideNotice(e) {
            var $eTarget = $(e.target);
            var $slideNotice = $(this);
            var $goRenewal = $eTarget.closest(".js-go-renewal");
            var $goUrl = $eTarget.closest(".js-go-url");
            var $close = $eTarget.closest(".js-close");
            var $popup = $eTarget.closest(".slide-banner");

            if ($goRenewal.length > 0) return goRenewal($slideNotice);
            if ($goUrl.length > 0) return window.open($goUrl.attr("url"), "_parents");
            if ($close.length > 0 || $popup.length === 0) return closeSlideNotice($slideNotice);

            if ($eTarget.closest(".slide-banner-next-btn").length > 0) {
                slideNum++;
                if (slideNum === $renewalSlideNotice.find(".slide-banner-cont").length - 1) {
                    setTimeout(function () {
                        $slideMask.css("transition", "none");
                        slideNum = 1;
                        slideEvt(slideNum);
                    }, 300)
                }
                transitionFunc();
                slideEvt(slideNum);
                return;
            }

            if ($eTarget.closest(".slide-banner-prev-btn").length > 0) {
                slideNum--;
                if (slideNum === 0) {
                    setTimeout(function () {
                        $slideMask.css("transition", "none");
                        slideNum = 3;
                        slideEvt(slideNum);
                    }, 500)
                }
                transitionFunc();
                slideEvt(slideNum);
                return;
            }

            if ($eTarget.closest(".slide-banner-navi-wrap").length > 0 && $eTarget.is("span")) {
                transitionFunc();
                var naviNum = $eTarget.index();
                slideNum = naviNum;
                slideEvt(naviNum + 1);
                slideNum++;
            }
        }

        function closeSlideNotice($slideNotice){
            var isHideChecked = $slideNotice.find("#bannerHideChk").prop("checked");
            if (isHideChecked) Often.setCookie("RENEWAL_SLIDE_NOTICE_HIDE_YN", "Y");
            $slideNotice.fadeOut(200);
        }

        function goRenewal($slideNotice){
            closeSlideNotice($slideNotice);
        }

        function transitionFunc() {
            $slideMask.css("transition", "all, 0.3s");
        }

        function slideEvt(i) {
            slideMove(i);
            naviColor(i - 1);
            txtChange(i);
        }

        function slideMove(i) {
            $slideMask.css("margin-left", -(i * $renewalSlideNotice.find(".slide-banner-cont").width()));
        }

        function naviColor(i) {
            var $slideNavi = $renewalSlideNotice.find(".slide-banner-navi-wrap>span")
            if(i == 0 || i == 3){
                $(".slide-banner-navi-wrap").addClass("color-dot");
            }else{
                $(".slide-banner-navi-wrap").removeClass("color-dot");
            }
            $slideNavi.css({"background": "none", "opacity": 0.5})
            $slideNavi.eq(i).css({"background": "#fff", "opacity": 1});
        }

        function txtChange(i) {
            $renewalSlideNotice.find(".slide-banner-header>span").html([
                "플로우 6주년 <i class='icons-close-3'></i> 소문내기 캠페인",
                "무엇이 달라졌는지 궁금하다면?",
                "새로워진 플로우 사용법이 궁금하다면?!"
            ][i - 1]);
        }
    }

})();
