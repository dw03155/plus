var TagUtil = (function () {

    var hashtagDataRegexp = /\#\[([^\[\]\s]+)\]\(([^\[\]\s]+)\)/ig;
    var hashtagTagRegexp = /(<span class=\"tag hashtag-span\" contenteditable=\"false\">\#)([^\[\]\s]+)(<\/span>)/ig;
    var mentionDataRegexp = /\@\[([^\[\]]+)\]\(([^\[\]]+?)\)/ig;
    var mentionTagRegexp = /(<span class=\"tag mention-span\" user-id=\")([a-zA-Zㄱ-힣0-9_\-\/&amp;\@\.\&\^\s]+)(\" contenteditable=\"false\">)([a-zA-Zㄱ-힣0-9&amp;\"\'\!\@\$\%\^\&\*\(\)\_\+\-\=\|\{\}\[\]\\\/\.\&\^\ \,\~\:\?\☆\★\s\u0080-\uFFFF]+)(<\/span>)/ig;
    var mentionTagRegexp1 = /(<span class=\"tag mention-span\" contenteditable=\"false\" user-id=\")([a-zA-Zㄱ-힣0-9_\-\/&amp;\@\.\&\^\s]+)(\">)([a-zA-Zㄱ-힣0-9&amp;\"\'\!\@\$\%\^\&\*\(\)\_\+\-\=\|\{\}\[\]\\\/\.\&\^\ \,\~\:\?\☆\★\s\u0080-\uFFFF]+)(<\/span>)/ig;

    return {
        //mention
        mentionData2Tag: mentionData2Tag,
        mentionTag2Data: mentionTag2Data,
        extractMentionedUsers: extractMentionedUsers,

        //hash
        hashtagData2Tag: hashtagData2Tag,
        hashtagTag2Data: hashtagTag2Data,
        extractHashtags: extractHashtags,

        //style
        styleData2TagPlusTag2html: styleData2TagPlusTag2html,
        styleTag2Data: styleTag2Data,
        splitStyle: splitStyle,

        //newLine
        NewLine2Data: NewLine2Data,
        NewLine2Tag: NewLine2Tag,
        checkEmptyNewLine: checkEmptyNewLine,

        //short
        shortContent: shortContent,
        shortContentByNewLine: shortContentByNewLine,
        shortContentByLong: shortContentByLong,

        //remove
        removeSpecialTag: removeSpecialTag,
        removeAllTag: removeAllTag,
        removeNewLine: removeNewLine,
        removePrevNewLine: removePrevNewLine,

        //tools
        br2n: br2n,
        escapeHtml: escapeHtml,
        tag2html: tag2html,
        html2tag: html2tag,
        text2highlight: text2highlight,
        LinkData2Tag: LinkData2Tag,
        json2text: json2text,
        icon2tag: icon2tag,
        blank2SpaceTag: blank2SpaceTag,
        spaceTag2Tag: spaceTag2Tag,
        data2Html: data2Html,
    }

    function checkEmptyNewLine(contents) {
        var returnContents = tag2html(contents);
        returnContents = returnContents.replace(/&nbsp;/ig, "");
        if ($.trim(returnContents) === "") return ""
        return contents;
    }

    //Todo. '&' 라는 특수기호 하나를 검색하면 tag2html로 인해 &가 노출되는 이슈가 있어서 주석.
    function text2highlight(mode, baseText, searchText) {
        //baseText = TagUtil.tag2html(baseText);
        //searchText = TagUtil.tag2html(searchText);
        baseText = escapeHtml(Often.null2Void(baseText, ""));
        searchText = escapeHtml(Often.null2Void(searchText, ""));
        if (searchText === "" || (baseText.indexOf(searchText.toUpperCase()) === -1 && baseText.indexOf(searchText.toLowerCase()) === -1)) return baseText;
        if (searchText.indexOf(" ") > -1) {
            var searchTextArray = searchText.split(" ");
            for (var t = 0; t < searchTextArray.length; t++) {
                if ("" !== searchTextArray[t]) text2tag(searchTextArray[t]);
            }
        } else {
            text2tag(searchText);
        }
        return baseText;

        function text2tag(searchKeyword) {
            var isConverted = false;
            var regexException = /[|\\{}()[\]^$+*?.]/g;
            var highLightRegex = new RegExp(searchKeyword.replace(regexException, '\\$&'), 'g');
            baseText = baseText.replace(highLightRegex, getSearchTag().replace("{key}", tag2html(searchKeyword)));
            isConverted = true;

            if (!isConverted) baseText = getSearchTag().replace("{key}", tag2html(searchKeyword));
        }

        function getSearchTag() {
            if (mode === 'CHAT_SEARCH') return '<span class="search-highlight">{key}</span>';
            if (mode === 'SEARCH') return '<strong>{key}</strong>';
            if (mode === 'SEARCH2') return '<b>{key}</b>';
        }
    }

    //개행태그 <br> -> \n
    function br2n(data) {
        return data.replace(/(<br>)/ig, "\n");
    }

    function tag2html(str, value) {
        str = Often.null2Void(str) + "";
        return str.replace(/\<|\>/ig, function (v) {
            //Often.clog("tag2html", value); //Note. 태그 깨지는 곳 찾으려고 당분간 열어놓기
            return Often.null2Void({'<': '&lt;', '>': '&gt;'}[v]);
        });
    }

    function escapeHtml(text) {
        if (Often.null2Void(text, "") === "") return "";
        return text.replace(/[\"&<>]/g, function (a) { //&lt; check
            return Often.null2Void({'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}[a], "");
        });
    }

    function html2tag(str) {
        str = Often.null2Void(str);
        return str.replace(/(&lt;|&gt;|&amp;|&nbsp;|&#x2F;)/ig, function (v) {
            return {'&lt;': '<', '&gt;': '>', '&amp;': '&', '&nbsp;': ' ', '&#x2F;': '/'}[v];
        });
    }

    //#[]() -> <해시>
    function hashtagData2Tag(data) {
        return data.replace(hashtagDataRegexp, '<span class="tag hashtag-span" contenteditable="false">#$1</span>');
    }

    //<해시> -> #[]()
    function hashtagTag2Data(data) {
        return data.replace(hashtagTagRegexp, "#[$2]($2)"); // hashtag
    }

    //@[]() -> <멘션>
    function mentionData2Tag(data, isNoMention) {
        if (isNoMention) {
            return data.replace(mentionDataRegexp, '$1');
        } else {
            return data.replace(mentionDataRegexp, '<span class="tag mention-span" user-id="$2" contenteditable="false">$1</span>');
        }
    }

    //<멘션> -> @[]()
    function mentionTag2Data(data) {
        return data.replace(mentionTagRegexp, "@[$4]($2)").replace(mentionTagRegexp1, "@[$4]($2)"); // mention
    }

    //<멘션> remove
    function extractMentionedUsers(cntn) {
        var mentionUser = null;
        var mentionList = [];
        while (true) {
            mentionUser = mentionDataRegexp.exec(cntn);
            if (!mentionUser) {
                break;
            } else {
                mentionList.push(mentionUser[2]);
            }
        }
        return mentionList;
    }

    //<해시> remove
    function extractHashtags(cntn) {
        var hashtagWord = null;
        var hashtagList = [];
        while (true) {
            hashtagWord = hashtagDataRegexp.exec(cntn);
            if (!hashtagWord) {
                break;
            } else {
                hashtagList.push(hashtagWord[1]);
            }
        }
        return hashtagList;
    }

    //<스타일> -> <f_b>
    function styleTag2Data(data) {
        data = splitStyle(Often.null2Void(data));
        return data
            .replace(/(<b>|<b style="">|<strong>)/ig, "<f_b>")
            .replace(/(<\/b>|<\/strong>)/ig, "</f_b>")
            .replace(/(<u>|<u style="">)/ig, "<f_u>")
            .replace(/<\/u>/ig, "</f_u>")
            .replace(/(<i>|<i style="">|<em>)/ig, "<f_i>")
            .replace(/(<\/i>|<\/em>)/ig, "</f_i>")
            .replace(/(<strike>|<strike style="">)/ig, "<f_del>")
            .replace(/<\/strike>/ig, "</f_del>")
            .replace(/(<font face[^>]*>)/ig, "");
    }

    //<f_b> -> <스타일> // tag2tag => tag2html 위에 위치해야함
    function styleData2TagPlusTag2html(data) {

        var tmpStyleCharacter = {
            boldStart: "[[f_b]]",
            boldEnd: "[[/f_b]]",
            italicStart: "[[f_i]]",
            italicEnd: "[[/f_i]]",
            underlineStart: "[[f_u]]",
            underlineEnd: "[[/f_u]]",
            delStart: "[[f_del]]",
            delEnd: "[[/f_del]]",
        };

        var styleTag = {
            boldStart: "<b>",
            boldEnd: "</b>",
            italicStart: "<i>",
            italicEnd: "</i>",
            underlineStart: "<u>",
            underlineEnd: "</u>",
            delStart: "<strike>",
            delEnd: "</strike>",
        };

        if (navigator.userAgent.indexOf("Trident") > 0) {
            styleTag.boldStart = "<strong>";
            styleTag.boldEnd = "</strong>";
            styleTag.italicStart = "<em>";
            styleTag.italicEnd = "</em>";
        }

        var result = data.replace(/<f_b>/ig, tmpStyleCharacter.boldStart).replace(/<\/f_b>/ig, tmpStyleCharacter.boldEnd)
            .replace(/<f_u>/ig, tmpStyleCharacter.underlineStart).replace(/<\/f_u>/ig, tmpStyleCharacter.underlineEnd)
            .replace(/<f_i>/ig, tmpStyleCharacter.italicStart).replace(/<\/f_i>/ig, tmpStyleCharacter.italicEnd)
            .replace(/<f_del>/ig, tmpStyleCharacter.delStart).replace(/<\/f_del>/ig, tmpStyleCharacter.delEnd);

        result = tag2html(result); //NOTE. 스타일 태그 <> => [] => (시점) => <> 중간 시점에 HTML화 해야 정상적으로 표현됨

        return result.replace(/\[\[f_b\]\]/ig, styleTag.boldStart).replace(/\[\[\/f_b\]\]/ig, styleTag.boldEnd)
            .replace(/\[\[f_u\]\]/ig, styleTag.underlineStart).replace(/\[\[\/f_u\]\]/ig, styleTag.underlineEnd)
            .replace(/\[\[f_i\]\]/ig, styleTag.italicStart).replace(/\[\[\/f_i\]\]/ig, styleTag.italicEnd)
            .replace(/\[\[f_del\]\]/ig, styleTag.delStart).replace(/\[\[\/f_del\]\]/ig, styleTag.delEnd);
    }

    //스타일태그 <u style="font-weight: bold;"> -> <u><b>
    function splitStyle(data) {

        var returnText = data;

        var TagMix = {
            BOLD: {
                STYLE: 'font-weight: bold;',
                UNDERLINE: /(<u style="font-weight: bold;">)(.*?)(<\/u>)/ig,
                ITALIC: /(<i style="font-weight: bold;">)(.*?)(<\/i>)/ig,
                STRIKE: /(<strike style="font-weight: bold;">)(.*?)(<\/strike>)/ig,
            },
            UNDERLINE: {
                STYLE: 'text-decoration-line: underline;',
                BOLD: /(<b style="text-decoration-line: underline;">)(.*?)(<\/b>)/ig,
                ITALIC: /(<i style="text-decoration-line: underline;">)(.*?)(<\/i>)/ig,
                STRIKE: /(<strike style="text-decoration-line: underline;">)(.*?)(<\/strike>)/ig,
            },
            ITALIC: {
                STYLE: 'text-decoration-line: italic;',
                BOLD: /(<b style="font-style: italic;">)(.*?)(<\/b>)/ig,
                UNDERLINE: /(<u style="font-style: italic;">)(.*?)(<\/u>)/ig,
                STRIKE: /(<strike style="font-style: italic;">)(.*?)(<\/strike>)/ig,
            },
            STRIKE: {
                STYLE: 'text-decoration-line: line-through;',
                BOLD: /(<b style="text-decoration-line: line-through;">)(.*?)(<\/b>)/ig,
                UNDERLINE: /(<u style="text-decoration-line: line-through;">)(.*?)(<\/u>)/ig,
                ITALIC: /(<i style="text-decoration-line: line-through;">)(.*?)(<\/i>)/ig,
            },
        }


        if (data.indexOf(TagMix.BOLD.STYLE) > -1) {
            var styleText = ' style="' + TagMix.BOLD.STYLE + '"';
            returnText = tag2splitTag(returnText, TagMix.BOLD.UNDERLINE, '<u' + styleText + '>', '<u><b>', '</b></u>');
            returnText = tag2splitTag(returnText, TagMix.BOLD.ITALIC, '<i' + styleText + '>', '<i><b>', '</b></i>');
            returnText = tag2splitTag(returnText, TagMix.BOLD.STRIKE, '<strike' + styleText + '>', '<strike><b>', '</b></strike>');
        }

        if (data.indexOf(TagMix.UNDERLINE.STYLE) > -1) {
            var styleText = ' style="' + TagMix.UNDERLINE.STYLE + '"';
            returnText = tag2splitTag(returnText, TagMix.UNDERLINE.BOLD, '<b' + styleText + '>', '<b><u>', '</u></b>');
            returnText = tag2splitTag(returnText, TagMix.UNDERLINE.ITALIC, '<i' + styleText + '>', '<i><u>', '</u></i>');
            returnText = tag2splitTag(returnText, TagMix.UNDERLINE.STRIKE, '<strike' + styleText + '>', '<strike><u>', '</u></strike>');
        }

        if (data.indexOf(TagMix.ITALIC.STYLE) > -1) {
            var styleText = ' style="' + TagMix.ITALIC.STYLE + '"';
            returnText = tag2splitTag(returnText, TagMix.ITALIC.BOLD, '<b' + styleText + '>', '<b><i>', '</i></b>');
            returnText = tag2splitTag(returnText, TagMix.ITALIC.UNDERLINE, '<u' + styleText + '>', '<u><i>', '</i></u>');
            returnText = tag2splitTag(returnText, TagMix.ITALIC.STRIKE, '<strike' + styleText + '>', '<strike><i>', '</i></strike>');
        }

        if (data.indexOf(TagMix.STRIKE.STYLE) > -1) {
            var styleText = ' style="' + TagMix.STRIKE.STYLE + '"';
            returnText = tag2splitTag(returnText, TagMix.STRIKE.BOLD, '<b' + styleText + '>', '<b><strike>', '</strike></b>');
            returnText = tag2splitTag(returnText, TagMix.STRIKE.UNDERLINE, '<u' + styleText + '>', '<u><strike>', '</strike></u>');
            returnText = tag2splitTag(returnText, TagMix.STRIKE.ITALIC, '<i' + styleText + '>', '<i><strike>', '</strike></i>');
        }

        return returnText;

        function tag2splitTag(data, matchRex, matchRexFront, frontTag, backTag) {
            var dataArr1 = [];
            dataArr1 = data.split(matchRex);
            dataArr1.forEach(function (i, v) {
                if (dataArr1[v] === matchRexFront) {
                    dataArr1[v] = frontTag;
                    dataArr1[v + 2] = backTag;
                }
            });
            return dataArr1.join('');
        }
    }

    function removeNewLine(cntn) {
        return cntn.replace(/(\r\n\t|\n|\r\t|"\\n")/gm, " ");
    }

    //앞공백만 제거
    function removePrevNewLine(cntn) {
        return cntn.replace(/^\s*/, "");
    }

    function removeAllTag(cntn) {
        return cntn.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    }

    //태그 제거
    function removeSpecialTag(data) {
        var removeTagRegexp = /(<span style=\"background-color: )(.*?)(\">)([a-zA-Zㄱ-힣0-9\(\)\_\-\☆\★\○\●\◇\◆\□\■\△\▲\▽\▼\◁\◀\▷\▶\+@\.\=\~\^\s\[\]\#\%\!\$\&\*\<\>\?\/\'\"\:\;\,\{\\\}]+)(<\/span>)/ig; //191008 =,~ 추가 //191017 \☆\★\○\●\◇\◆\□\■\△\▲\▽\▼\◁\◀\▷\▶ 추가
        var removeTagRegexp2 = /(<span style=\"white-space:pre)(.*?)(\">)([a-zA-Zㄱ-힣0-9\(\)\_\-\☆\★\○\●\◇\◆\□\■\△\▲\▽\▼\◁\◀\▷\▶\+@\.\=\~\^\s\[\]\#\%\!\$\&\*\<\>\?\/\'\"\:\;\,\{\\\}]+)(<\/span>)/ig;    //19년 4월 이후로 발생 안함
        var removeTagRegexp3 = /(<font style="vertical-align: inherit;">)|(<\/font>)/ig;
        var removeTagRegexp4 = /(<\/span>)([a-zA-Zㄱ-힣0-9\(\)\_\-\☆\★\○\●\◇\◆\□\■\△\▲\▽\▼\◁\◀\▷\▶\+@\.\=\~\^\s\[\]\#\%\!\$\&\*\<\>\?\/\'\"\:\,\{\\\}]+)(<span style=\"background-color: )(initial|transparent)(;\">)/ig; //: -> &#58;
        var removeTagRegexp5 = /(<\/span>)(<span style=\"background-color: )(initial|transparent)(;\">)/ig;
        var removeTagRegexp6 = /(<div style=\"user-select: auto;\">)|(<div style=\\"user-select: auto;\\">)|(<br style=\\\"user-select: auto;\\\">)|(<br style=\"user-select: auto;\">|<p style=\"user-select: auto;\">|<p style=\\\"user-select: auto;\\\">)/ig;
        var removeTagRegexp7 = /(<sub><\/sub>)|(<sup><\/sup>)|(<sub><\\\/sub>)|(<sup><\\\/sup>)/ig;
        var removeTagRegexp8 = /(<a href=)(.*?\"\>)(.*?)(<\/a>)/ig;
        var removeTagRegexp9 = /(<div class="js-hidden-component hidden-component" contenteditable="false">)|(<div class="" contenteditable="">)|(<div class="edit-component" contenteditable="">)/ig;
        data = data
            .replace(removeTagRegexp, "$4")
            .replace(removeTagRegexp2, "$4")
            .replace(removeTagRegexp3, "")
            .replace(removeTagRegexp4, "$2").replace(removeTagRegexp5, "")
            .replace(removeTagRegexp4, "$2").replace(removeTagRegexp5, "") //두겹일경우가있음
            .replace(removeTagRegexp6, "")
            .replace(removeTagRegexp7, "")
            .replace(removeTagRegexp8, "$3")
            .replace(removeTagRegexp9, "");
        return data;
    }

    //<개행> -> \n
    function NewLine2Data(data) {
        if (data.trim() === "") return ""
        var result = data
            .replace(/((<br><\/p><p>)|(<br><\/div><div>)|(<br><\/p><div>)|(<br><\/div><p>))/ig, "\n")
            .replace(/((<\/p><p>)|(<\/div><p>)|(<\/p><div>)|(<\/div><div>)|<br>)/ig, "\n")
            .replace(/(<div><div>)/ig, "<div>");
        result = result.replace(/(\n<div>)/ig, "\n").replace(/(<\/div>\n)/ig, "\n");

        if (data.indexOf('<div>') === 0) {
            result = result.substring(5);
        } else if (data.indexOf('<p>') === 0) {
            result = result.substring(3);
        }
        result = result.replace(/((<p>)|(<div>))/ig, "\n").replace(/((<\/p>)|(<\/div>))/ig, "");
        return result;
    }

    //\n -> <개행>
    function NewLine2Tag(data) {

        var isWinOs = Often.getClientOSInfo().isWin;
        var result = "<div>" + data.replace((isWinOs ? /(\r\n|\n)/ig : /(\r|\n)/ig), "</div><div>") + "</div>";

        //마지막 div tag 스킵
        var resultLength = result.length;
        var divHtml = "<div></div>";
        var isLastDiv = divHtml === result.substring(resultLength - divHtml.length, resultLength);
        result = isLastDiv ? result.substring(0, resultLength - divHtml.length) : result;

        //div tag => br을 넣어줌
        result = result.replace(/(<div><\/div>)/ig, "<div></br></div>");

        //b태그 내부 개행 적용 안되는 부분 수정 //Question. 이렇게 태그가 남을수 있나?
        result = result.replace(/(<div><b><\/div>)/ig, "<div></br></div>");
        return result;
    }

    //\t -> &nbsp; x 4
    function data2Html(data) {
        return data.replace(/\t/ig, "&nbsp;&nbsp;&nbsp;&nbsp;");
    }

    //url-> <링크>
    function LinkData2Tag(data, isSpan) {
        //공백 html 태그 이슈
        if (data.indexOf("&nbsp;") === -1) return link2tag(data);
        var returnArray = [];
        data.split("&nbsp;").forEach(function (v) {
            returnArray.push(link2tag(v));
        })
        return returnArray.join("&nbsp;");

        function link2tag(data) {
            var urlTagRegexp = /(((?:(?:(?:https?|ftp|file):\/\/|www\\.|ftp\\.)[-a-zA-Z0-9+&@#/%?=~_|$!:,.;ㄱ-ㅎㅏ-ㅣㄱ-힣()\u2700-\u27BF\uE000-\uF8FF|\uD83C|\uDC00-\uDFFF|\uD83D|\uDC00-\uDFFF|\u2011-\u26FF|\uD83E|\uDD10-\uDDFF]*[-a-zA-Z0-9+&@#/%=~_|ㄱ-ㅎㅏ-ㅣㄱ-힣$?\u2700-\u27BF\uE000-\uF8FF|\uD83C|\uDC00-\uDFFF|\uD83D|\uDC00-\uDFFF|\u2011-\u26FF|\uD83E|\uDD10-\uDDFF]|((?:mailto:)?[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%-]+\\.[a-zA-Z]{2,4})\\b)|"(?:(?:https?|ftp|file):\/\/|www\\.|ftp\\.)[^\\"\\r\\n]+\\"?|\\'(?:(?:https?|ftp|file):\/\/|www\\.|ftp\\.)[^'\\r\\n]+'?|(http(s)?:\/\/.)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)\\b([-a-zA-Z0-9@:%_+.~#?&/=]*))|((www\.)[0-9a-zA-z_\-?=%/.&#;()ㄱ-ㅎㅏ-ㅣㄱ-힣?]*[-a-zA-Z0-9+&@#/%=~_|ㄱ-ㅎㅏ-ㅣㄱ-힣$?\u2700-\u27BF\uE000-\uF8FF|\uD83C|\uDC00-\uDFFF|\uD83D|\uDC00-\uDFFF|\u2011-\u26FF|\uD83E|\uDD10-\uDDFF]+))/ig;
            if (isSpan) return data.replace(urlTagRegexp, '<span class="js-hyper-button urllink blue">$&</span>');
            return data.replace(urlTagRegexp, '<a href="$&" target="_blank" class="js-hyper-button urllink blue">$&</a>');
        }
    }

    //개행별단축, 최대 2줄
    function shortContentByNewLine(contents, length) {
        var returnContents = "";
        var contentsArray = contents.split("\n");
        var maxLine = 2;
        var currentLine = 0;
        contentsArray.forEach(function (v) {
            var value = $.trim(v);
            if (value !== "" && currentLine < maxLine) {
                currentLine++;
                returnContents += shortContent(value, length) + (currentLine === 1 ? "\n" : "");
            }
        });
        return returnContents;
    }

    /**
     * 대상이 너무 길 경우 뒤에 ... 을 붙혀 return
     * @param {String} contents 잘라야 하는 대상
     * @param {Integer} length 잘라 내야하는 길이
     */
    function shortContent(contents, length) {
        if (contents.length <= length) return contents;
        return contents.substring(0, length) + "...";
    }

    //채팅롱텍스트
    function shortContentByLong(contents) {
        var contentsArray = contents.split("\n");
        if (contentsArray.length < 15) return contents;
        if (contents.length > 299) return contents.substring(0, 300)
        return contentsArray.slice(0, 15).join("\n");
    }

    //JSON텍스트
    function json2text(contents) {
        var returnContents = contents;

        if (contents.indexOf('{"COMPS":') === -1 && contents.indexOf('{"SYS_CODE":') === -1) return returnContents;
        var jsonText = jsonContents2text(contents, true);
        if ("" !== jsonText) return jsonText;

        try {
            returnContents = returnContents.replace('\n', ' ')
            var sysCode = JSON.parse(returnContents).SYS_CODE;
            //var cntn = jsonContents2text(JSON.parse(returnContents).CNTN, false);
            var imageIcon = "[ICON:IMAGE] (" + i18next.t('dictionary.image') + ")";
            var fileIcon = "[ICON:FILE] (" + i18next.t('dictionary.file') + ")";
            //Todo. 개행처리가 필요해보이는데 애매함
            returnContents = /*cntn + " " + */{
                S13: imageIcon,
                S14: fileIcon,
                S20: imageIcon + " " + fileIcon,
            }[sysCode]
        } catch (e) {
            //pass
        }
        return returnContents;
    }

    function jsonContents2text(contents, isCatchReturnEmpty) {
        try {
            var returnContents = "";
            var postJsonArray = JSON.parse(contents).COMPS;
            postJsonArray.forEach(function (v) {
                if (v.COMP_TYPE === "TEXT") {
                    returnContents += v.COMP_DETAIL.CONTENTS + "\n";
                }
            })
            return returnContents;
        } catch (e) {
            return isCatchReturnEmpty ? "" : contents;
        }
    }

    //아이콘태그
    function icon2tag(contents) {

        var returnContents = contents;

        var icon = {
            FILE: '<i class="all-setup-icon-type-1"></i>',
            IMAGE: '<i class="all-setup-icon-type-2"></i>',
        }

        returnContents = returnContents.replace(/\[ICON:IMAGE\]/ig, icon.IMAGE);
        returnContents = returnContents.replace(/\[ICON:FILE\]/ig, icon.FILE);

        return returnContents;
    }

    //post 임시 공백 추가 - 링크에 &nbsp;가 붙기 때문에 임시 치환을 해줌
    function blank2SpaceTag(contents) {
        return contents.replace(/ /gi, " &nbsp;");
    }

    //post 공백 추가
    function spaceTag2Tag(contents) {
        return contents.replace(/ &nbsp;/gi, "&nbsp;");
    }

})()
