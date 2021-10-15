var TagConvert = (function () {

    return {
        //CASE1.
        html2DbStringByPost: html2DbStringByPost,
        html2DbStringByRemark: html2DbStringByRemark,
        html2DbStringByChat: html2DbStringByChat,
        //CASE2.
        db2HtmlStringByPost: db2HtmlStringByPost,
        db2HtmlStringByRemark: db2HtmlStringByRemark,
        db2HtmlStringByChat: db2HtmlStringByChat,
        //CASE3.
        db2OneString: db2OneString,
        db2TwoStringByChatting: db2TwoStringByChatting,
        db2TwoStringByAlarm: db2TwoStringByAlarm,
        //CASE4.
        html2HtmlStringByRemark: html2HtmlStringByRemark,
        html2HtmlStringByCopy: html2HtmlStringByCopy,
    };

    /*
    * 핵심은 디비에는 전용 태그로 최대한 변경해서 들어감
    * => 태그 본연의 형태로 들어가있을 수 있기에 꺼낼때 tag2html 시켜줘야함.
    * 개행은 \n 로 / 멘션,해시,스타일태그는 전용태그([])로 / url => 뷰에 뿌릴때 변경함
    * 단, 직접 쓴 태그나 복붙으로 생기는 특수태그는 제거해줘야함
    * */

    //CASE 1. 뷰,에딧 HTML => DB
    //※주의 : 넣을때는 link 만들지않음

    //Note. 태그 테스트용 로그 (지우지말기)
    function tlog(a, b, c, d, e, f, g) {
        var isOk = false;
        isOk && console.log("TagConvert", a, b, c, d, e, f, g);
    }

    //포스트
    function html2DbStringByPost(htmlString) {
        var dbString = Often.null2Void(htmlString);
        if ($.trim(htmlString) === "") return htmlString;
        dbString = TagUtil.html2tag(dbString); //&xxx; => <태그>
        dbString = TagUtil.removeSpecialTag(dbString); //특수태그 삭제
        dbString = TagUtil.mentionTag2Data(dbString); //<멘션> => @[]()
        dbString = TagUtil.hashtagTag2Data(dbString); //<해시> => #[]()
        dbString = TagUtil.styleTag2Data(dbString); //<스타일> => <f_d>
        dbString = TagUtil.NewLine2Data(dbString); //<개행> => \n
        //dbString = TagUtil.tag2html(dbString); //<태그> => &xxx;
        tlog("TagConvert html2DbStringByPost", htmlString, dbString);
        return dbString;
    }

    //댓글
    function html2DbStringByRemark(htmlString) {
        var dbString = Often.null2Void(htmlString);
        if ($.trim(htmlString) === "") return htmlString;
        dbString = TagUtil.html2tag(dbString); //&xxx; => <태그>
        dbString = TagUtil.removeSpecialTag(dbString); //특수태그 삭제
        dbString = TagUtil.mentionTag2Data(dbString); //<멘션> => @[]()
        dbString = TagUtil.NewLine2Data(dbString); //<개행> => \n
        //dbString = TagUtil.tag2html(dbString); //<태그> => &xxx;
        tlog("TagConvert html2DbStringByRemark", htmlString, dbString);
        return dbString;
    }

    //채팅
    function html2DbStringByChat(htmlString) {
        var dbString = Often.null2Void(htmlString);
        if ($.trim(htmlString) === "") return htmlString;
        dbString = TagUtil.removePrevNewLine(dbString); //앞 공백 제거
        dbString = TagUtil.html2tag(dbString); //&xxx; => <태그>
        dbString = TagUtil.removeSpecialTag(dbString); //특수태그 삭제
        dbString = TagUtil.NewLine2Data(dbString); //<개행> => \n
        //dbString = TagUtil.tag2html(dbString); //<태그> => &xxx;
        tlog("TagConvert html2DbStringByChat", htmlString, dbString);
        return dbString;
    }

    //CASE 2. DB => HTML
    //스타일=>해시=>멘션=>링크

    //포스트 (DB => 뷰 HTML, DB => 에딧 HTML)
    function db2HtmlStringByPost(dbString, isNoMention) {
        var htmlString = Often.null2Void(dbString);
        if ($.trim(htmlString) === "") return htmlString;
        htmlString = TagUtil.html2tag(htmlString); //&xxx; => <태그> (※주의. DB엔 태그가 없기에 바꿔서 특수태그를 삭제)
        htmlString = TagUtil.blank2SpaceTag(htmlString); //\s => <임시 공백>
        htmlString = TagUtil.removeSpecialTag(htmlString); //특수태그 삭제
        htmlString = TagUtil.styleData2TagPlusTag2html(htmlString); //<f_d> => <스타일> (※주의. tag2Html 선행)
        htmlString = TagUtil.hashtagData2Tag(htmlString); //#[]() => <해시>
        htmlString = TagUtil.mentionData2Tag(htmlString, isNoMention); //@[]() => <멘션>
        htmlString = TagUtil.LinkData2Tag(htmlString); //url => <링크>
        htmlString = TagUtil.spaceTag2Tag(htmlString); //임시 공백 => <공백>
        htmlString = TagUtil.NewLine2Tag(htmlString); //\n => <개행>
        tlog("TagConvert db2HtmlStringByPost", dbString, htmlString);
        return htmlString;
    }

    //댓글
    function db2HtmlStringByRemark(dbString) {
        var htmlString = Often.null2Void($.trim(dbString));
        if ($.trim(htmlString) === "") return htmlString;
        htmlString = TagUtil.html2tag(htmlString); //&xxx; => <태그> (※주의. DB엔 태그가 없기에 바꿔서 특수태그를 삭제)
        htmlString = TagUtil.removeSpecialTag(htmlString); //특수태그 삭제
        htmlString = TagUtil.tag2html(htmlString); //<태그> => &xxx; 
        htmlString = TagUtil.mentionData2Tag(htmlString); //@[]() => <멘션>
        htmlString = TagUtil.LinkData2Tag(htmlString); //url => <링크>
        htmlString = TagUtil.NewLine2Tag(htmlString); //\n => <개행>
        tlog("db2HtmlStringByRemark", dbString, htmlString);
        return htmlString;
    }

    //채팅
    function db2HtmlStringByChat(dbString) {
        var htmlString = Often.null2Void(dbString);
        if ($.trim(htmlString) === "") return htmlString;
        htmlString = TagUtil.tag2html(htmlString); //<태그> => &xxx;
        htmlString = TagUtil.LinkData2Tag(htmlString); //url => <링크>
        htmlString = TagUtil.NewLine2Tag(htmlString); //\n => <개행>
        tlog("db2HtmlStringByChat", dbString, htmlString);
        return htmlString;
    }

    //CASE 3. DB => 한두줄 TEXT

    //포스트
    function db2OneString(dbString, isSearch) {
        var htmlString = Often.null2Void(dbString);
        if ($.trim(htmlString) === "") return htmlString;
        htmlString = TagUtil.json2text(htmlString); //{COMP:''} => text
        htmlString = TagUtil.html2tag(htmlString); //&xxx; => <태그> (※주의. DB엔 태그가 없기에 바꿔서 특수태그를 삭제)
        htmlString = TagUtil.styleData2TagPlusTag2html(htmlString); //<f_d> => <스타일>
        if (isSearch) {
            htmlString = TagUtil.hashtagData2Tag(htmlString); //#[]() => <해시>
            htmlString = TagUtil.mentionData2Tag(htmlString); //@[]() => <멘션>
            htmlString = TagUtil.removeAllTag(htmlString); //<모든태그> => 제거
            htmlString = TagUtil.shortContent(htmlString, 200); //말줄임
        } else {
            htmlString = TagUtil.removeAllTag(htmlString); //<모든태그> => 제거
            htmlString = TagUtil.shortContent(htmlString, 200); //말줄임
            htmlString = TagUtil.hashtagData2Tag(htmlString); //#[]() => <해시>
            htmlString = TagUtil.mentionData2Tag(htmlString); //@[]() => <멘션>
            //htmlString = TagUtil.LinkData2Tag(htmlString, true); //url => <링크>
        }
        htmlString = TagUtil.icon2tag(htmlString); //[ICON:] => <아이콘>
        tlog("db2OneString", dbString, htmlString);
        return htmlString;
    }

    //채팅방목록 최근메시지 최대 2줄 만들기
    function db2TwoStringByChatting(dbString) {
        var htmlString = Often.null2Void(dbString);
        if ($.trim(htmlString) === "") return htmlString;
        htmlString = TagUtil.br2n(htmlString); //<BR> => \n
        htmlString = TagUtil.removeAllTag(htmlString); //<모든태그> => 제거
        htmlString = TagUtil.shortContentByNewLine(htmlString, 50); //개행마다 말줄임
        tlog("db2TwoStringByChatting", dbString, htmlString);
        return htmlString;
    }

    //알림목록 최근메시지 최대 2줄 만들기
    function db2TwoStringByAlarm(dbString) {
        var htmlString = Often.null2Void(dbString);
        if ($.trim(htmlString) === "") return htmlString;
        htmlString = TagUtil.checkEmptyNewLine(htmlString); //\n\n = ""
        htmlString = TagUtil.br2n(htmlString); //<BR> => \n
        htmlString = TagUtil.shortContentByNewLine(htmlString, 100); //개행마다 말줄임
        tlog("db2TwoStringByAlarm", dbString, htmlString);
        return htmlString;
    }

    //CASE 4. 뷰 => 에딧

    //댓글 (뷰 HTML => 에딧 HTML)
    function html2HtmlStringByRemark(htmlString) {
        var htmlStr = Often.null2Void(htmlString);
        if ($.trim(htmlString) === "") return htmlString;
        htmlStr = TagUtil.removeSpecialTag(htmlStr); //특수태그 삭제
        tlog("html2HtmlStringByRemark", htmlString, htmlStr);
        return htmlStr;
    }

    //복사
    function html2HtmlStringByCopy(htmlString) {
        var htmlStr = Often.null2Void(htmlString);
        if ($.trim(htmlString) === "") return htmlString;
        htmlStr = TagUtil.html2tag(htmlStr);
        htmlStr = TagUtil.removeSpecialTag(htmlStr); //특수태그 삭제
        htmlStr = TagUtil.tag2html(htmlStr);
        htmlStr = TagUtil.NewLine2Tag(htmlStr); //\n => <개행>
        htmlStr = TagUtil.blank2SpaceTag(htmlStr);
        htmlStr = TagUtil.spaceTag2Tag(htmlStr);
        htmlStr = TagUtil.data2Html(htmlStr); //\t => &nbsp;&nbsp;&nbsp;&nbsp;
        tlog("html2HtmlStringByRemark", htmlString, htmlStr);
        return htmlStr;
    }

})();