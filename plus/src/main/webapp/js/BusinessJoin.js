var BusinessJoin = (function () {

    return {
        openTeamStep: openTeamStep,
    }

    function openTeamStep() {
        var $userStep = $("#userStep");
        var $teamStep = $("#teamStep");

        $userStep.fadeOut(0);
        $teamStep.fadeIn(200);
        $teamStep.find("input").off("keyup").on("keyup", CommonJoin.keyupJoinInput);
        $teamStep.find("#joinTeamSector").on("change", CommonJoin.changeTeamSector);
        $teamStep.find("#domain").text("." + location.host);

        $("#movePrevStepButton").off("click").on("click", movePrevStepPage);
        $("#moveNextStepButton").off("click").on("click", CommonJoin.moveFinalStepButton);
        //Testing.fillTeamStepValue();

        function movePrevStepPage() {
            $userStep.fadeIn(200);
            $teamStep.fadeOut(0);
        }
    }
})();