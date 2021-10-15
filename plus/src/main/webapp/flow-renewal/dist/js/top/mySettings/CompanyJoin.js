var CompanyJoin = (function () {

    var $companyJoinLayer;

    return {
        openLayer: openLayer,
        closeLayer: closeLayer,
    }

    function openLayer() {
        $companyJoinLayer = $("#companyJoinLayer");
        $companyJoinLayer.find("#joinInput").val("");
        $companyJoinLayer.find("#joinInput").removeClass("error");
        $companyJoinLayer.find("#errMeg").css("display", "none");
        $("#allMainContent, #bottomToolList").css("display", "none");
        $companyJoinLayer.fadeIn(200);
        addEvent();
    }

    function closeLayer() {
        $("#allMainContent").css("display", "block");
        $companyJoinLayer.css("display", "none");
    }

    function addEvent() {
        $companyJoinLayer.off("click").on("click", clickCompanyJoinLayer)
            .off("keyup").on("keyup", keyUpCompanyJoinLayer);
    }

    function clickCompanyJoinLayer(e) {
        var $eTarget = $(e.target);

        if (closeBtnAndAction($eTarget)) return;
        if (companyJoinBtnAndAction($eTarget)) return;

        function closeBtnAndAction($eTarget) {
            var $closeBtn = $eTarget.findUp("#closeBtn");
            if ($closeBtn.length === 0) return false;
            closeLayer();
            return true;
        }

        function companyJoinBtnAndAction($eTarget) {
            var $companyJoinBtn = $eTarget.findUp("#companyJoinBtn");
            if ($companyJoinBtn.length === 0) return false;
            var subDomain = $companyJoinLayer.find("#joinInput").val();
            if (!checkValidJoinInput(subDomain)) {
                $companyJoinLayer.find("#joinInput").addClass("error");
                $companyJoinLayer.find("#errMeg").css("display", "block");
                return true;
            }
            CheckJoinPopup.openCheckJoinPopup(subDomain);
            return true;
        }
    }

    function keyUpCompanyJoinLayer(e) {
        var $eTarget = $(e.target);

        if (joinInputAndAction($eTarget)) return;

        function joinInputAndAction($eTarget) {
            var $joinInput = $eTarget.findUp("#joinInput");
            if ($joinInput.length === 0) return false;
            var subDomain = $joinInput.val();
            if (subDomain === "" || checkValidJoinInput(subDomain)) {
                $companyJoinLayer.find("#joinInput").removeClass("error");
                $companyJoinLayer.find("#errMeg").css("display", "none");
            } else {
                $companyJoinLayer.find("#joinInput").addClass("error");
                $companyJoinLayer.find("#errMeg").css("display", "block");
            }

            return true;
        }
    }

    function checkValidJoinInput(subDomain) {
        var regex = /^[A-Za-z0-9-]{3,50}$/;
        return regex.test(subDomain);
    }
})();