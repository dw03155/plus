var KeyCheck = (function () {

    return {
        isKey: isKey,
        isArrowVertical: isArrowVertical,
        isAvailable: isAvailable,
        isStyleCommand: isStyleCommand,
        isSelectAllCommand: isSelectAllCommand,
    }

    function isStyleCommand(e) {
        var KEY = e.key.toUpperCase();
        return ((e.ctrlKey || isKey(e, "CTRL") || (e.metaKey || isKey("META"))) &&
            (KEY === 'B' || KEY === 'I' || KEY === 'U' || KEY === 'S'));
    }

    function isKey(e, code) {
        var isIe = Often.isBrowser("ie");

        if (code === "BACK") return isCode(8, "Backspace", "Backspace");
        if (code === "TAB") return isCode(9, "Tab", "Tab")
        if (code === "ENTER") return isCode(13, "Enter", "Enter");
        if (code === "SHIFT") return isCode(16, "Shift", "Shift");
        if (code === "CTRL") return isCode(17, "Control", "Control");
        if (code === "META") return isCode(91, "Meta", "Meta");
        if (code === "ALT") return isCode(18, "Alt", "Alt");
        if (code === "ESC") return isCode(27, "Esc", "Escape");
        if (code === "SPACE_BAR") return isCode(32, "Spacebar", " ");
        if (code === "LEFT") return isCode(37, "Left", "ArrowLeft");
        if (code === "UP") return isCode(38, "Up", "ArrowUp");
        if (code === "RIGHT") return isCode(39, "Right", "ArrowRight");
        if (code === "DOWN") return isCode(40, "Down", "ArrowDown");
        if (code === "DELETE") return isCode(46, "Del", "Delete");
        if (code === "F") return isCode(70, "F", "F");
        if (code === "PLUS") return isCode(107, "Add", "+");
        if (code === "MINUS") return isCode(109, "Subtract", "-");
        if (code === "RELOAD_WINDOW") return isCode(116, "F5", "F5");
        if (code === "RELOAD_MAC") return isCode(82, "R", "R");
        if (code === "KOREAN_INPUTTING") return isCode(229, "Process", "Process");

        function isCode(number, ieKey, Key) {
            if (Number(e.keyCode) === number) return (Number(e.keyCode) === number);
            else if (isIe) return e.key === ieKey;
            else return e.key === Key;
        }
    }

    function isAvailable(e) {
        //문자, 숫자, Backspace, Del, Space, Enter 만 이벤트 허용
        return (!((e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 96 && e.keyCode <= 105) ||
            (isKey(e, "BACK") || isKey(e, "DELETE") ||
                isKey(e, "SPACE_BAR") || isKey(e, "ENTER") || isKey(e, "KOREAN_INPUTTING"))));
    }

    //방향키 위아래 여부
    function isArrowVertical(e) {
        return (e.keyCode === 38 || e.keyCode === 40);
    }

    function isSelectAllCommand(e) {
        var KEY = e.key.toUpperCase();
        return ((e.ctrlKey || KeyCheck.isKey(e, "CTRL") ||
            (e.metaKey || KeyCheck.isKey("META"))) &&
            KEY === 'A');
    }

})();