var GoogleMap = function () {

    return {
        load: load,
        addSearchEvent: addSearchEvent,
        convertGoogleMapImage: convertGoogleMapImage,
        getGoogleMapLink: getGoogleMapLink,
        checkPlaceInput: checkPlaceInput
    }

    function load() {
        $("head").append('<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw&libraries=places" charset="UTF-8"></script>');
    }

    function addSearchEvent($placeInput, callback) {
        //엔터 예외처리 추가 필요

        if ($(".pac-logo").length > 0) $(".pac-logo").remove();
        if (!(typeof google !== "undefined" && google.maps && google.maps.places)) return;
        var searchBox = new google.maps.places.SearchBox($placeInput[0]);
        searchBox.addListener("places_changed", function () {
            $placeInput.val("");
            var places = searchBox.getPlaces();
            if (places.length === 0) return;

            var data = {
                TITLE: places[0].name,
                URL: places[0].url,
                PLACE: places[0].formatted_address,
                LOCATION: JSON.stringify(places[0].geometry.location).replace("{", "")
                    .replace("\"lat\":", "")
                    .replace("\"lng\":", "")
                    .replace("}", ""),
            }
            Often.toast("info", i18next.t('front.googleMap.warning'));
            $("#pac-container").empty();
            (typeof callback === "function") && callback(data);
        })
    }

    function convertGoogleMapImage(location, options) {
        var key = "AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw";
        var opt = {
            width: "646",
            height: "220",
            zoom: "14",
            markers: "color:blue",
        }
        opt = $.extend({}, opt, Often.null2Void(options, {}));
        return "https://maps.googleapis.com/maps/api/staticmap?center=" + location +
            "&zoom=" + opt.zoom +
            "&size=" + opt.width + "x" + opt.height +
            "&markers=" + opt.markers + "|" + location + "&key=" + key;
    }

    function getGoogleMapLink(location, place) {
        return "https://www.google.co.kr/maps/place/" + location + "?q=" + encodeURIComponent(place);
    }

    function checkPlaceInput($placeInput, $imageLayer, $image) {
        if (Often.null2Void($placeInput.val()) !== "") return;
        $imageLayer.fadeOut(100, function () {
            $image.attr("src", "");
        });
    }
}();