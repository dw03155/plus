var CompanyWaitJoinLayer = (function () {

    var $companyWaitJoinLayer;

    return {
        openWaitLayer: openWaitLayer,
    }

    function openWaitLayer(drawData) {
        $companyWaitJoinLayer = $("#companyWaitJoinLayer");
        $("#companyJoinMain").css("display", "none");
        $companyWaitJoinLayer.find("#waitCompanyName").text(drawData.COMPANY_NAME);
        $companyWaitJoinLayer.find("#waitCompanyUrl").text(drawData.COMPANY_URL);
        $companyWaitJoinLayer.css("display", "block");
    }
})();