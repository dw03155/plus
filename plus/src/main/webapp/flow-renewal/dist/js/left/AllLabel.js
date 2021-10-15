var AllLabel = (function () {

    return {
        drawLeftLabelList: drawLeftLabelList,
        drawProjectLabelList: drawProjectLabelList,
        clickAllLabelLeftButton: clickAllLabelLeftButton,
        clearLayer: clearLayer,
    }

    function drawLeftLabelList() {
        var $allLabelUl = $("#allLabelUl");
        var $allLabelLeftButton = $("#allLabelLeftButton");
        getLabelData($allLabelUl, function ($ul, dat) {
            $ul.append(getLabelItems("LEFT-LABEL", dat.COLABO_FLD_REC))
            $ul.find("li").length === 0
                ? $allLabelLeftButton.find('.ico-arrow').addClass('d-none')
                : $allLabelLeftButton.find('.ico-arrow').removeClass('d-none')
            if ($ul.is(":visible")) return;
            $allLabelLeftButton.find(".label-tab").removeClass("on");
        })

        $allLabelUl.off('click').on('click', clickAllLabelArea);
        sortableArea($allLabelUl);
    }

    function drawProjectLabelList($labelUl) {
        var isMain = ViewChanger.isPage("main") || ViewChanger.isPage("label");
        var mode = isMain ? "allProjLabel" : "detailProjLabel";
        getLabelData($labelUl, function ($ul, dat) {
            $ul.append(getLabelItems(mode, dat.COLABO_FLD_REC));
            addLabelClickEvent($ul);
        })
    }

    function getLabelData($ul, callback) {
        $ul.empty();
        Ajax.executeApi(RestApi.GET.COLABO2_FLD_L102, {}, function (dat) {
            if (!dat.COLABO_FLD_REC || dat.COLABO_FLD_REC.length === 0) return;
            (typeof callback === "function") && callback($ul, dat);
        })
    }

    function getLabelItems(mode, labelArray) {

        var returnHtml = "";
        var baseHtml = $("#labelSelectItem").html();
        var isLabel, contentCheckType;

        if (mode === "allProjLabel") {
            var labelList = getLabelList(true)
            $.each(labelArray, function (i, label) {
                if ($.trim(label.COLABO_FLD_NM) === "") return;
                isLabel = Often.null2Void(label.COLABO_FLD_KIND) === "3";
                var matchedLabelCnt = getMatchedLabelCnt(labelList, label.COLABO_FLD_SRNO);
                var selectProjectList = $("#projectHomeLayer").find(".flow-content-chk-1").findUp(".project-item");
                var isNoMatch = matchedLabelCnt === 0; // x 체크
                var isMatch = matchedLabelCnt === selectProjectList.length; // v 체크 // - 체크 나중에 수정 필요
                contentCheckType = "flow-content-check-type-" + (isNoMatch ? 1 : isMatch ? 2 : 3);
                isLabel && (returnHtml += getOneLabelItemHtml(baseHtml, label, contentCheckType))
            });
            return returnHtml;
        }

        if (mode === "detailProjLabel") {
            var labelList = getLabelList(false)
            $.each(labelArray, function (i, label) {
                if ($.trim(label.COLABO_FLD_NM) === "") return;
                isLabel = Often.null2Void(label.COLABO_FLD_KIND) === "3";
                var isIncludeLabel = labelList.includes(label.COLABO_FLD_SRNO);
                contentCheckType = "flow-content-check-type-" + (isIncludeLabel ? 2 : 1)
                isLabel && (returnHtml += getOneLabelItemHtml(baseHtml, label, contentCheckType))
            });
            return returnHtml;
        }

        if (mode === "LEFT-LABEL") {
            var baseHtml = $("#labelItem").html();
            var selectLabelSrno = Often.null2Void($("#allLabelLeftButton").attr("data-select-label-srno"));
            $.each(labelArray, function (i, label) {
                if ($.trim(label.COLABO_FLD_NM) === "") return;
                isLabel = Often.null2Void(label.COLABO_FLD_KIND) === "3";
                isLabel && (returnHtml += getOneLabelItemHtml(baseHtml, label, "left"))
            });
            return returnHtml;
        }

        function getMatchedLabelCnt(labelList, fldSrno) {
            var matchedLabelCnt = 0;
            labelList.forEach(function (v) {
                if (v === fldSrno) matchedLabelCnt += 1;
            });
            return matchedLabelCnt;
        }

        function getLabelList(isAll) {
            var labelList = [];
            if (isAll) {
                var selectProjectList = $("#projectHomeLayer").find(".flow-content-chk-1").findUp(".project-item");
                $.each(selectProjectList, function (i, label) {
                    var includeLabels = $(label).attr("label-srnos");
                    if (includeLabels.length !== 0) {
                        labelList = labelList.concat(includeLabels.split(','));
                    }
                })
                return labelList
            }

            var includedLabels = LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "LABEL_SRNOS");
            if (includedLabels === "") {
                //라벨이 한곳도 설정되어있지 않음
            } else {
                labelList = Often.null2Void(includedLabels).split(",");
            }
            return labelList
        }

        function getOneLabelItemHtml(labelItemHtml, label, contentType) {
            if (contentType === "left") {
                return ListHelper.replaceJson(labelItemHtml, {
                    'label-number': label.COLABO_FLD_SRNO,
                    'label-name': label.COLABO_FLD_NM,
                    'active': (selectLabelSrno === label.COLABO_FLD_SRNO ? "flow-active" : "")
                });
            }
            return ListHelper.replaceJson(labelItemHtml, {
                ICO_CODE: label.ICO_CODE,
                COLABO_FLD_KIND: label.COLABO_FLD_KIND,
                COLABO_FLD_NM: label.COLABO_FLD_NM,
                COLABO_FLD_SRNO: label.COLABO_FLD_SRNO,
                FLOW_CONTENT_CHECK: contentType,
            })
        }
    }

    function addLabelClickEvent($labelUl) {
        $labelUl.off('click').on('click', function (e) {
            var $eTarget = $(e.target);
            var $labelItem = $eTarget.findUp(".label-item");
            if ($labelItem.length === 0) return;
            var $checkLabel = $labelItem.find(".js-check-label");
            if ($checkLabel.hasClass("flow-content-check-type-3")) {
                $checkLabel.removeClass("flow-content-check-type-3").addClass("flow-content-check-type-1");
                return;
            }
            $checkLabel.toggleClass("flow-content-check-type-1").toggleClass("flow-content-check-type-2");
        })
    }

    function clickAllLabelArea(e) {
        var $eTarget = $(e.target);
        var $leftScroll = $eTarget.findUp("#leftScroll");
        var isThreeDot = $eTarget.hasClass("flow-dash-three");
        var isTargetSettingPopup = $eTarget.findUp(".setting-popup").length > 0;
        var $labelItem = $eTarget.findUp(".label-item");
        if (isTargetSettingPopup) return false;

        if (isThreeDot) {
            var isOnSettingPopup = $leftScroll.next(".js-label-setting-layer").is(":visible");
            var $labelSettingLayer = $leftScroll.next(".js-label-setting-layer");
            var isSameLabelTarget = $labelSettingLayer.attr("label_srno") === $labelItem.attr("label-srno");
            isOnSettingPopup = isOnSettingPopup && isSameLabelTarget;
            if (isOnSettingPopup) {
                $labelSettingLayer.attr({label_srno: "", label_text: ""}).css({display: "none"});
                return;
            }
            $labelSettingLayer.attr({
                label_srno: $labelItem.attr("label-srno"),
                label_text: $labelItem.find(".js-label-name").text(),
            })
            $labelSettingLayer.css({
                display: 'block',
                transform: 'translate(' + e.pageX + 'px, ' + e.pageY + 'px)',
                top: (-58 - Number($("#topBanner").css("height").replace("px", ""))) + "px",
                left: '10px',
            })
            $labelSettingLayer.off('click').on('click', clickLabelSetting);
            return;
        }

        if ($labelItem.length === 0) return;
        ViewChanger.loadPageJson({
            code: "label",
            first: $labelItem.attr('label-srno'),
            second: $labelItem.find(".js-label-name").text(),
        })
    }

    function clickAllLabelLeftButton(e) {
        var $eTarget = $(e.target);
        var $leftMenuItem = $eTarget.findUp(".left-menu-item");
        var $labelButton = $eTarget.findUp(".js-label-add");
        var isPlusButton = $labelButton.hasClass("js-label-add");

        if (isPlusButton) {
            PopupDraw.drawInputConfirm({
                await : true,
                contents: {
                    title: i18next.t('front.common.createProjectFolder'),
                    holder: i18next.t('front.alert.enterWord', {val: Interpolation.addName('front.common.projectFolder')}),
                    empty: i18next.t('front.alert.enterWord', {val: Interpolation.addName('front.common.projectFolder')}),
                    over: i18next.t('front.alert.inputLimit', {
                        subject: Interpolation.addName('front.common.projectFolder'),
                        length: 50
                    }),
                },
                callback: {
                    submit: submitLabelPlus,
                    keyup: keyupLabelInput,
                }
            })
            return;

            function submitLabelPlus($popupObj) {
                var $labelInput = $popupObj.find(".popup-input");
                var inputVal = $.trim($labelInput.val());
                if (isValidationLabelNameAndAction($labelInput)) return;
                cudProjectLabel("C", inputVal, "", PopupDraw.closePopup);
            }
        }

        $leftMenuItem.toggleClass("active");
        var isTabOn = $leftMenuItem.hasClass("active");
        LocalUtil.setLocalValue("ONLY_LEFT_FOLD_SETTING", "LABEL", isTabOn ? "Y" : "N");
        var $allLabelUl = $("#allLabelUl");
        isTabOn && $allLabelUl.find("li").length === 0 ? drawLeftLabelList() : $allLabelUl.slideToggle();
    }

    function sortableArea($labelArea) {
        $labelArea.sortable({
            axis: "y",
            opacity: 0.6,
            update: function () {
                Ajax.executeApi(RestApi.PUT.colabo_fld_u003, {FLD_REC: getLeftLabelList()}, function () {
                    Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}))
                })
            }
        });
    }

    function getLeftLabelList() {
        var $labelList = $("#allLabelUl").children(".label-item");
        var returnList = [];
        $.each($labelList, function (i, v) {
            returnList.push({
                COLABO_FLD_SRNO: $(v).attr("label-srno"),
                OTPT_SQNC: ++i
            })
        })
        return returnList;
    }

    function clearLayer() {
        var $settingPopup = $(".js-label-setting-layer")
        if ($settingPopup.is(":visible")) $settingPopup.css('display', 'none')
    }

    function clickLabelSetting(e) {
        var $eTarget = $(e.target);
        var isEdit = ($eTarget.hasClass("label-edit") || $eTarget.parents(".label-edit").length > 0);
        var $labelSettingLayer = $("#leftScroll").next(".js-label-setting-layer");
        var labelSrno = Often.null2Void($labelSettingLayer.attr("label_srno"));
        var labelName = Often.null2Void($labelSettingLayer.attr("label_text"));
        clearLayer();
        if (isEdit) {
            PopupDraw.drawInputConfirm({
                contents: {
                    title: i18next.t('front.common.editProjcetFolder'),
                    holder: i18next.t('front.allLabel.addLabelPlaceHolder'),
                    value: labelName,
                    empty: i18next.t('front.alert.enterWord', {val: Interpolation.addName('front.common.projectFolder')}),
                    over: i18next.t('front.alert.inputLimit', {
                        subject: Interpolation.addName('front.common.projectFolder'),
                        length: 50
                    }),
                },
                callback: {
                    submit: submitLabelSetting,
                    keyup: keyupLabelInput,
                }
            })
        } else {
            PopupDraw.drawConfirm({
                mini: true,
                contents: {main: i18next.t('front.alert.removeLabel')},
                callback: {submit: submitLabelSetting}
            })
        }

        function submitLabelSetting($popupObj) {
            var $labelInput = $popupObj.find(".popup-input");
            var inputVal = (isEdit ? $.trim($labelInput.val()) : "");
            if (!isEdit) return cudProjectLabel("D", inputVal, labelSrno, PopupDraw.closePopup);
            if (isValidationLabelNameAndAction($labelInput)) return;
            cudProjectLabel("U", inputVal, labelSrno, PopupDraw.closePopup);
        }
    }

    function isValidationLabelNameAndAction($labelInput) {
        var checkJson = Validation.checkInput($labelInput)
        if (Object.keys(checkJson).length === 0) return false;
        Often.toast("error", checkJson.errorMessage);
        checkJson.errorObj.focus();
        return true;
    }

    function keyupLabelInput(e) {
        Validation.checkInput($(e.target), true)
    }

    function cudProjectLabel(mode, inputVal, labelSrno, callback) {
        var $allLabelLeftButton = $('#allLabelLeftButton');
        var isCreate = "C" === mode;
        var isDelete = "D" === mode;
        var apiKey = isCreate ? RestApi.POST.COLABO2_FLD_C101 :
            isDelete ? RestApi.DELETE.COLABO2_FLD_D101 :
                RestApi.PUT.COLABO2_FLD_U101;
        Ajax.executeApi(apiKey, {
            COLABO_FLD_SRNO: (isCreate ? "" : labelSrno),
            COLABO_FLD_NM: (isDelete ? "" : inputVal),
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }, function (dat) {
            var $leftLabelItem = $("#label-" + labelSrno);
            if (isCreate) {
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.register)'}));
                $("#allLabelUl").prepend(getLabelItems("LEFT-LABEL", [{
                    COLABO_FLD_KIND: "3",
                    COLABO_FLD_NM: inputVal,
                    COLABO_FLD_SRNO: dat.COLABO_FLD_SRNO,
                }]));
                $allLabelLeftButton.find('.ico-arrow').removeClass('d-none');
            } else if (isDelete) {
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.delete)'}));
                $leftLabelItem.remove();
                $("#allLabelUl").find('li').length === 0 && $allLabelLeftButton.find('.ico-arrow').addClass('d-none');
                
                var pageArray = ViewChanger.getCurrentPageId().split("/");
                var isCurrentLabel = (pageArray[0] === "label" && pageArray[1] === labelSrno);
                isCurrentLabel && ViewChanger.loadPageJson({code: "main"});
            } else {
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.edit)'}));
                refreshLabel($leftLabelItem, inputVal);
            }
            (typeof callback === "function") && callback()

        })
    }

    function refreshLabel($leftLabelItem, inputVal) {
        $leftLabelItem.find(".js-label-name").text(inputVal).attr("mouseover-text", inputVal);
        if (ViewChanger.isPage("label")) {
            var $mainTopDiv = $("#mainTop").find("div");
            $mainTopDiv.empty();
            $mainTopDiv.append('<i class="title-icon label"></i>')
            $mainTopDiv.append(i18next.t('front.common.projectFolder') + ' - [' + inputVal + ']')
        } else {
            //pass
        }
    }

})()