var Excel = (function () {

    var crefregex = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g;

    return {
        down: down,
    }

    /**
     * @param title {string} - 엑셀제목
     * @param dataJsonArray {Array.<Object>}- jsonArray 데이터
     * @param orderedColumnArray {Array.<{NAME:string, CODE:string}>} - 재정렬한 COLUMN CODE
     */
    function down(title, dataJsonArray, orderedColumnArray) {

        var columnCodeArray = [];
        var columnNameArray = [];
        orderedColumnArray.forEach(function (orderedColumn) {
            columnCodeArray.push(orderedColumn.CODE);
            columnNameArray.push(orderedColumn.NAME);
        });

        var wb = XLSX.utils.book_new();
        var arrJSON = JSON.parse(JSON.stringify(dataJsonArray));
        var dataJsonKeyLength = dataJsonArray.length > 0 && Object.keys(dataJsonArray[0]).length;
        var returnColumnCount = columnNameArray.length;

        //열순서 및 시트화
        var ws = XLSX.utils.json_to_sheet(arrJSON, {header: columnCodeArray});

        //엑셀파일정보
        wb.Props = {
            Title: title,
            Subject: "Excel",
            Author: "작성자이름",
            CreatedDate: new Date()
        };
        //엑셀 첫번째 시트네임
        wb.SheetNames.push(title);

        //열이름변경
        changeColName(ws, columnNameArray);

        //필요없는 열 삭제
        if (dataJsonKeyLength - returnColumnCount > 0) {
            delete_cols(ws, returnColumnCount + 1, dataJsonKeyLength - returnColumnCount);
        }

        //시트에 데이터를 연결
        wb.Sheets[title] = ws;

        //다운로드
        saveAs(new Blob([
            s2ab(XLSX.write(wb, {
                bookType: 'xlsx',
                type: 'binary'
            }))
        ], {
            type: "application/octet-stream"
        }), title + '.xlsx');

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
            var view = new Uint8Array(buf); //create uint8array as viewer
            for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
            return buf;
        }
    }

    //@유민호 : SHEETJS 열이름 바꾸는 함수 190222
    function changeColName(ws, arr) {
        var alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $.each(arr, function (j, x) {
            delete ws[alphaArr[j] + "1"].w;
            ws[alphaArr[j] + "1"].v = x;
        });
    }


    function clamp_range(range) {
        if (range.e.r >= (1 << 20)) range.e.r = (1 << 20) - 1;
        if (range.e.c >= (1 << 14)) range.e.c = (1 << 14) - 1;
        return range;
    }

    function delete_cols(ws, start_col, ncols) {

        if (!ws) throw new Error("operation expects a worksheet");
        if (!ncols) ncols = 1; //뒤로 30개 열을를 없앤다.
        if (!start_col) start_col = 0;

        /* extract original range */
        var range = XLSX.utils.decode_range(ws["!ref"]);
        var R = 0, C = 0;

        var formula_cb = function ($0, $1, $2, $3, $4, $5) {
            var _R = XLSX.utils.decode_row($5), _C = XLSX.utils.decode_col($3);
            if (_C >= start_col) {
                _C -= ncols;
                if (_C < start_col) return "#REF!";
            }
            return $1 + ($2 === "$" ? $2 + $3 : XLSX.utils.encode_col(_C)) + ($4 === "$" ? $4 + $5 : XLSX.utils.encode_row(_R));
        };

        var addr, naddr;
        for (C = start_col + ncols; C <= range.e.c; ++C) {
            for (R = range.s.r; R <= range.e.r; ++R) {
                addr = XLSX.utils.encode_cell({r: R, c: C});
                naddr = XLSX.utils.encode_cell({r: R, c: C - ncols});
                if (!ws[addr]) {
                    delete ws[naddr];
                    continue;
                }
                if (ws[addr].f) ws[addr].f = ws[addr].f.replace(crefregex, formula_cb);
                ws[naddr] = ws[addr];
            }
        }
        for (C = range.e.c; C > range.e.c - ncols; --C) {
            for (R = range.s.r; R <= range.e.r; ++R) {
                addr = XLSX.utils.encode_cell({r: R, c: C});
                delete ws[addr];
            }
        }
        for (C = 0; C < start_col; ++C) {
            for (R = range.s.r; R <= range.e.r; ++R) {
                addr = XLSX.utils.encode_cell({r: R, c: C});
                if (ws[addr] && ws[addr].f) ws[addr].f = ws[addr].f.replace(crefregex, formula_cb);
            }
        }

        /* write new range */
        range.e.c -= ncols;
        if (range.e.c < range.s.c) range.e.c = range.s.c;
        ws["!ref"] = XLSX.utils.encode_range(clamp_range(range));

        /* merge cells */
        if (ws["!merges"]) ws["!merges"].forEach(function (merge, idx) {
            var mergerange;
            switch (typeof merge) {
                case 'string':
                    mergerange = XLSX.utils.decode_range(merge);
                    break;
                case 'object':
                    mergerange = merge;
                    break;
                default:
                    throw new Error("Unexpected merge ref " + merge);
            }
            if (mergerange.s.c >= start_col) {
                mergerange.s.c = Math.max(mergerange.s.c - ncols, start_col);
                if (mergerange.e.c < start_col + ncols) {
                    delete ws["!merges"][idx];
                    return;
                }
                mergerange.e.c -= ncols;
                if (mergerange.e.c < mergerange.s.c) {
                    delete ws["!merges"][idx];
                    return;
                }
            } else if (mergerange.e.c >= start_col) mergerange.e.c = Math.max(mergerange.e.c - ncols, start_col);
            clamp_range(mergerange);
            ws["!merges"][idx] = mergerange;
        });
        if (ws["!merges"]) ws["!merges"] = ws["!merges"].filter(function (x) {
            return !!x;
        });

        /* cols */
        if (ws["!cols"]) ws["!cols"].splice(start_col, ncols);
    }

})()