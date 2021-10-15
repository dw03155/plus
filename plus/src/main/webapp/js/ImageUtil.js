var ImageUtil = (function () {

    return {
        getThumbImgFile: getThumbImgFile,

        removeDomain: removeDomain,

        isImageExtension: isImageExtension,
        isImageType: isImageType,
        isImageSize: isImageSize,
        getFileNameByClipboard: getFileNameByClipboard,
    }

    function getFileNameByClipboard() {
        var now = new Date();
        var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : '' + now.getMonth() + 1;
        var day = now.getDate() < 10 ? '0' + now.getDate() : '' + now.getDate();
        var hours = now.getHours() + '' + now.getMinutes() + '' + now.getSeconds() + '' + now.getMilliseconds();
        return 'flow_' + now.getFullYear() + '-' + month + '-' + day + '_' + hours + '.png';
    }

    function replaceImgUrl(imgPath) {

        var origin = Often.getLocOrigin();
        var BASE_DOWN_URL = "/FLOW_DOWNLOAD_R001.act";
        var BASE_IMG_URL = "/flowImg";

        var baseImgUrlIdx = imgPath.indexOf(BASE_IMG_URL);
        if (baseImgUrlIdx > -1) return origin + imgPath.substr(baseImgUrlIdx);

        var baseDownUrlIdx = imgPath.indexOf(BASE_DOWN_URL);
        if (baseDownUrlIdx > -1) {
            var returnImgPath = origin + imgPath.substr(baseDownUrlIdx);
            returnImgPath = returnImgPath.replace(BASE_DOWN_URL + "?RAND_KEY=", BASE_IMG_URL + "/");
            var pathAndIdx = returnImgPath.indexOf("&");
            return pathAndIdx > -1 ? returnImgPath.substr(0, pathAndIdx) + ".png" : returnImgPath;
        }

        return imgPath;
    }

    function removeDomain(type, imgUrl) {
        //Note. defaultImage 빈값으로 두면 제대로된 값이 나오지 않음
        var defaultImage = "";
        if (type === "POST") {
            defaultImage = "https://i.pinimg.com/236x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg";
        } else if (type === "PROFILE") {
            defaultImage = "/flow-renewal/assets/images/profile-default.png";
        } else if (type === "ALLFILE") {
            defaultImage = "https://i.pinimg.com/236x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg";
        } else if (type === "MESSAGE") {
            defaultImage = "https://i.pinimg.com/236x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg";
        } else if (type === "IMAGE-VIEWER") {
            defaultImage = "/flow-renewal/assets/images/404-sprite-1.png";
        }
        if ("" === Often.null2Void(imgUrl)) return defaultImage;

        return replaceImgUrl(imgUrl)
    }

    function isImageType(fileData) {
        //NOTE. 썸네일 존재하고, 이미지확장자이며, 20MB 이하일때만 이미지타입!
        return (Often.null2Void(fileData.THUM_IMG_PATH, "") !== "" &&
            isImageExtension(FileUtil.getFileName(fileData)) &&
            isImageSize(fileData.FILE_SIZE)
        )
    }

    function isImageSize(fileSize) {
        if (Number(fileSize) < 20971520) return true; //20MB
        return false;
    }

    function isImageExtension(fileName) {
        var regex = "\.(bmp|gif|jpg|jpeg|png)$";
        if ((new RegExp(regex, "i")).test(fileName)) return true;
        return false;
    }

    function getThumbImgFile(image, file, standardJson) {
        if (!image) return file;
        var isStandardJson = "" !== Often.null2Void(standardJson);
        var baseSize = isStandardJson ? Often.null2Void(standardJson["BASE_SIZE"], 1024000) : 1024000;
        var compSize = isStandardJson ? Often.null2Void(standardJson["COMP_SIZE"], 102400) : 102400;
        var maxSize = isStandardJson ? Often.null2Void(standardJson["MAX_SIZE"], 800) : 800;
        var width = image.width;
        var height = image.height;
        var size = file.size;
        var name = file.name;

        if (Often.null2Void(size) === "" || Often.null2Void(size, 0) <= baseSize) {
            return file;
        }

        var ratio = Math.ceil(Math.sqrt((Often.null2Void(size, 0) / compSize), 2));

        if ((image.width / ratio) < maxSize && (image.height / ratio) < maxSize) {
            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                } else {
                    //done
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                } else {
                    //done
                }
            }
        } else {
            width = image.width / ratio;
            height = image.height / ratio;
        }

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);

        return dataURItoBlob(canvas.toDataURL("image/" + getExtForDataUrl(getExtension(name))));

        function dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
        }

        function getExtForDataUrl(name) {
            if (name === "bmp" || name === "jpg" || name === "jpeg") return "jpeg";
            return "png";
        }

        function getExtension(name) {
            if (name.indexOf(".bmp") > -1) return "bmp";
            if (name.indexOf(".gif") > -1) return "gif";
            if (name.indexOf(".jpg") > -1) return "jpg";
            if (name.indexOf(".jpeg") > -1) return "jpeg";
            if (name.indexOf(".png") > -1) return "png";
            if (name.indexOf(".tiff") > -1) return "tiff";
            if (name.indexOf(".ico") > -1) return "ico";
            return "png";
        }
    }

})();