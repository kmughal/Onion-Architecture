
/*.e.g 

SetDate1("txt", "dt", "left", { "background-color": "yellow", "border": "solid 1px red" }, false, { "font-family": 

"Calibri", "font-size": "small", "color": "black" });

RowHover : JSON OBJECT ADDED so you can add your own css for hovering effect for each cell....

*/
function DatePicker(ParentControl, ControlName, RowHover, ShowAtBottom, LanguageKey) {

    LanguageKey = typeof LanguageKey == "undefined" ? 1 : LanguageKey;

    var cn = "#" + ControlName, pn = "#" + ParentControl;
    var html = "";
    var that = this;
    var cnCSS = "", cnCSSJson = { "position": "absolute", "background": "#F9F9F9", "border": "solid 1px gray", "padding": "8px", "box-sizing": " border-box", "height": "215px", "width": "210px", "z-index": "2", "font-family": "Segoe UI, arial", "font-size": "small" };
    var defaultsetting = { displaytodaydate: false, mainstylesheet: "", align: "right" };
    var prefix = ParentControl + "_" + ControlName;

    var OnChangeCallBack = null;

    var todaydate = { mm: 0, yy: 0, dd: 0, totaldays: 0, wd: 0 };
    var currdate = { mm: 0, yy: 0, dd: 0, totaldays: 0, wd: 0 };
    var predate = { mm: 0, yy: 0, dd: 0, totaldays: 0, wd: 0 };
    var navmode = 1;
    var hovereffect = { over: {}, out: {} };
    var CalenderHolder = "";


    var nav_to = prefix + "nav_to", next = prefix + "next", prev = prefix + "prev";
    var selectcsjson = {};
    var coming_from_sel = false;
    hovereffect.over = { "background": "aliceblue", "border": "1px solid  skyblue " };
    hovereffect.out = { "background": "white", "border": "1px solid  #ccc" };
    var yyctn = "#" + prefix + "cal_yy", ddctn = "#" + prefix + "cal_dd", sharedvar = false;

    // Adding translation for Calender Control according to the languageKey https://github.com/jquery/jquery-ui/tree/master/ui/i18n
    var phrases = {};

    phrases[1] =
        {
            languageKey: 1,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            daysShort: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            dateFormat: 'dd-mm-yyyy'
        };
    phrases[2] =
        {
            languageKey: 2, // Simplified Chinese
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            days: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            daysShort: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            dateFormat: 'yy-mm-dd'
        };
    phrases[3] =
        {
            languageKey: 3, // Traditional Chinese
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            days: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            daysShort: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            dateFormat: 'yy/mm/dd'
        };
    phrases[4] =
        {
            languageKey: 4, // Portuguese
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
            daysShort: ['Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá', 'Do'],
            dateFormat: 'dd/mm/yy'
        };
    phrases[5] =
        {
            languageKey: 5, // German
            months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
            daysShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
            dateFormat: 'dd.mm.yy'
        };
    phrases[6] =
        {
            languageKey: 6, // Spanish
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            days: ['Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado', 'Domingo'],
            daysShort: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S&aacute;', 'Do'],
            dateFormat: 'dd/mm/yy'
        };
    phrases[7] =
        {
            languageKey: 7, // Dutch
            months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
            monthsShort: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
            days: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'],
            daysShort: ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'],
            dateFormat: 'dd/mm/yy'
        };
    phrases[8] =
        {
            languageKey: 8, // French
            months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            daysShort: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
            dateFormat: 'dd/mm/yy'
        };
    phrases[9] =
        {
            languageKey: 9, // Korean
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            days: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
            daysShort: ['월', '화', '수', '목', '금', '토', '일'],
            dateFormat: 'yy. m. d.'
        };

    var selectedPhrases = phrases[LanguageKey] || phrases[1];

    if (typeof RowHover != "undefined")
        if ("over" in RowHover)
            hovereffect.over = RowHover.over;

    if (typeof RowHover != "undefined")
        if ("out" in RowHover)
            hovereffect.out = RowHover.out;

    $(pn).off("keydown.dateclick");
    $(pn).on("keydown.dateclick", function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 9) {
            remove();
        }
    });
    /*
             
    1 -->>> you are in calender mode
    2 --->> you are in month mode
    3 --->> you are in year mode

    */


    this.init = function () {
        html = "<div id='" + ControlName + "' class='ctrlcalender' style='height:100%'>"
                + "<div id='" + prefix + "cal_yy' style='height:25px'>Year</div>"
                + "<div id='" + prefix + "cal_dd' >dd</div>"
                + "</div>";
        remove();

        if ($.trim(CalenderHolder).length == 0)
            $("body").append(html);
        else
            $(CalenderHolder).append(html);


        mapevent();
        currdate = settodaydate(new Date()); /// set default
        hide();
        $(cn).css(cnCSSJson);
        // draw(1);
        return that;
    }


    var cancelBubble = function (e) {
        var evt = e ? e : window.event;
        if (evt.stopPropagation) evt.stopPropagation();
        if (evt.cancelBubble != null) evt.cancelBubble = true;
    }

    var mapevent = function () {

        $(pn).click(function (e) {
            //  $("body").find(".ctrlcalender").remove();//// Testing
            cancelBubble(e);
            coming_from_sel = false;
            show();
        });

        $(cn).mouseover(function (e) {

        }).click(function (e) {
            cancelBubble(e);
        });
        $(document).click(function (e) {
            hide();
        }).keyup(function (e) {
            var key = e.keyCode;
            if (key == 27) {

                var len = $.trim($(pn).val()).length;
                if (len == 0) { /// no selection has been made so start it from again.
                    currdate = settodaydate(new Date()); /// set default
                }

                hide();
            }

        });
    }


    var resize = function () {

        var hh = $(pn).height(), ww = $(pn).width(), left = 0;
        var left = $(pn).offset().left, top = $(pn).offset().top;

        if (defaultsetting.align == "right")
            left = left + ww - $(cn).width();

        if (parseInt($(window).height()) < ($(cn).height() + top))
            showatbottom(top);
        else
            showattop(top);

        if (ShowAtBottom) {
            that.showAtBottom();
        }

        $(cn).css("left", left);
        $(ddctn).height(parseInt($(cn).height()) - 20);
        ww = $(cn).width();
        $(ddctn).width(ww);
        $(yyctn).width(ww);

    }

    var showattop = function (top) {
        $(cn).css("top", top + 25);
    }

    this.showAtBottom = function () {
        var top = $(pn).offset().top, height = $(pn).height(), left = $(pn).offset().left + 20;
        var total = top + height + 8;
        $(cn).css("top", total);
        $(cn).css("left", left);
    };

    var showatbottom = function (top) {
        $(cn).css("top", top - 2 - $(cn).height());
    }

    var show = function () {
        $(".ctrlcalender").css("display", "none");
        setcss({ "display": "block" });
        navmode = 1;
        draw();
        resize();
    }

    var hide = function () {
        setcss({ "display": "none" });

    }

    var setcss = function (style) {
        $(cn).css(style);
    }

    var setcssclass = function (classname) {
        $(cn).addClass(classname);
    }

    var remove = function () {
        $("body").find(cn).remove();

    }

    var draw = function (mode) {
        if (mode == undefined)
            mode = navmode;
        switch (mode) {
            case 1: drawdefaultview(); break;
            case 2: drawmonthview(); break;
            case 3: drawyearview(); break;
        }
    }

    var drawmonthview = function () {

        var m = "";
        html = "<tr style='width:33%'>";

        //for (var i = 1; i <= 12; i++) {
        //    switch (i) {
        //        case 1: m = "Jan"; break;
        //        case 2: m = "Feb"; break;
        //        case 3: m = "Mar"; break;
        //        case 4: m = "Apr"; break;
        //        case 5: m = "May"; break;
        //        case 6: m = "Jun"; break;
        //        case 7: m = "Jul"; break;
        //        case 8: m = "Aug"; break;
        //        case 9: m = "Sep"; break;
        //        case 10: m = "Oct"; break;
        //        case 11: m = "Nov"; break;
        //        case 12: m = "Dec"; break;
        //    }
        // }

        // 29.02.2016 Change
        if (typeof _self.setDate != "undefined" && Object.prototype.toString.call(_self.setDate) === "[object Function]") {
            currdate = datesep(_self.setDate());
        }


        for (var i = 1; i <= 12; i++) {
            // m = selectedPhrases.monthsShort[i];

            html += "<td style='text-align:center;padding:18px 10px;box-sizing:border-box;' "
                   + (((currdate.mm + 1) == i) ? "class='select'" : "")
                   + " data='" + (i - 1) + "'>" + selectedPhrases.monthsShort[i - 1] + "</td>";
            if (i % 4 == 0)
                html += "</tr><tr>";
        }


        html = "<table style='width:100%;margin-top:15px;background:#fff;border-collapse:collapse;'>"
                + html + "</tr></table>";

        addDD(html);
        $("#" + nav_to).html(currdate.yy);
        if (String(selectcsjson).length != 0)
            $(".select").css(selectcsjson);

        resize();
    }

    var drawyearview = function () {
        // 29.02.2016 Change
        if (typeof _self.setDate != "undefined" && Object.prototype.toString.call(_self.setDate) === "[object Function]") {
            currdate = datesep(_self.setDate());
        }


        var strtext = "", yy = parseInt(currdate.yy) - 6;

        html = "";
        strtext = yy + " - " + (yy + 11);

        for (var i = yy, j = 1; i < (yy + 12) ; i++, j++) {

            html += "<td style='text-align:center;padding:18px 10px;box-sizing:border-box;' "
                    + (((currdate.yy) == i) ? "class='select'" : "")
                    + " data='" + i + "'>" + i + "</td>";

            if (j % 4 == 0) {
                html += "</tr><tr>"; j = 0;
            }
        }

        html = "<table style='width:100%;margin-top:15px;background:#fff;border-collapse:collapse;'>"
                     + html
                     + "</tr></table>";

        addDD(html);

        $("#" + nav_to).html(strtext);
        if (String(selectcsjson).length != 0)
            $(".select").css(selectcsjson);
        resize();
    }

    var movenext = function () {

        switch (navmode) {
            case 1: /// you are in calender mode
                currdate.mm = parseInt(currdate.mm) + 1;

                if (currdate.mm >= 12) {
                    currdate.mm = 0;
                    currdate.yy = Number(currdate.yy) + 1;
                }
                break;
            case 2: /// you are in month mode 
                currdate.mm = parseInt(currdate.mm) + 1;
                if (currdate.mm >= 12) {
                    currdate.mm = 0;
                    currdate.yy = parseInt(currdate.yy) + 1;
                }
                break;
            case 3: /// you are in year mode
                currdate.yy = parseInt(currdate.yy) + 6;
                break;
        }
        coming_from_sel = true;
        draw();
        showfromleft($(ddctn));
    }

    var moveprev = function () {

        switch (navmode) {
            case 1: /// you are in calender mode
                currdate.mm = parseInt(currdate.mm) - 1;

                if (currdate.mm < 0) {
                    currdate.mm = 11;
                    currdate.yy = parseInt(currdate.yy) - 1;
                }
                break;

            case 2: /// you are in month mode 
                currdate.mm = parseInt(currdate.mm) - 1;

                if (currdate.mm < 0) {
                    currdate.mm = 11;
                    currdate.yy = parseInt(currdate.yy) - 6;
                }

                break;
            case 3: /// you are in year mode
                currdate.yy = parseInt(currdate.yy) - 1;
                break;
        }
        coming_from_sel = true;
        draw();

        showfromright($(ddctn));
    }

    var showfromleft = function (ctr) {
        /*$(ctr).hide();
        $(ctr).show('slide', { direction: 'left' }, 1000);*/
    }

    var showfromright = function (ctr) {
        /* $(ctr).hide();
        $(ctr).show('slide', { direction: 'right' }, 1000);*/
    }

    var settodaydate = function (dt) {

        var temp = { mm: 0, dd: 0, yy: 0, wd: 0 };

        temp.mm = dt.getMonth();
        temp.dd = dt.getDate();
        temp.yy = dt.getFullYear();
        temp.totaldays = totaldays(temp.mm);
        temp.wd = getweekday(temp.mm, temp.yy);

        return temp;
    }

    var datesep = function (datestring) {
        var d = new Date();
        var arr = new Array();
        var temp = { mm: 0, dd: 0, yy: 0, wd: 0 };

        /// if you want to support different formats then you really need to compute this        
        // Belgium reported error so I have decided to use Regex to split
        arr = String(datestring).split(/-|\//g);
        var _m = parseInt(arr[1], 10) - 1;
        if (_m < 0)
            _m = 0;

        d.setMonth(_m, parseInt(arr[0], 10));
        d.setYear(parseInt(arr[2]));

        var xxx = parseInt(arr[1]) - 1;

        d = new Date(arr[2], xxx, arr[0]);
        d.setMonth(xxx);

        //d.setFullYear(Number(arr[2]), (Number(arr[1]) - 1), Number(arr[0]));

        temp.mm = (_m);
        temp.dd = Number(d.getDate());
        temp.yy = Number(d.getFullYear());
        todaydate = temp;
        temp.totaldays = totaldays(temp.mm);
        temp.wd = getweekday(temp.mm, temp.yy);

        return temp;

    }

    var getweekday = function (mm, yy) {
        var t = new Date(yy, mm, 1);
        t.setMonth(mm);
        t.setYear(yy);
        t.setDate(1);
        return t.getDay();
    }

    var totaldaysforprevmonth = function (mm) {
        mm--;
        if (mm < 0)
            mm = 11;
        return totaldays(mm);
    }

    var istodaydate = function () {
        var t = new Date(), t1 = new Date();

        t1.setMonth(currdate.mm);
        t1.setFullYear(currdate.yy);
        t1.setDate(currdate.dd);


        if (parseInt(t.getMonth()) == parseInt(t1.getMonth()) && parseInt(t.getFullYear()) == parseInt(t1.getFullYear()))
            $(ddctn).find("table tr td[data='" + t.getDate() + "']")
	        .not(".no")
	        .css({ "background": "#fff", "border": "dotted 1px #ccc" }).addClass("highlight");

        $(ddctn).find("table tr td[data='" + currdate.dd + "']")
	    .not(".no")
	    .css(selectcsjson).addClass("highlight");

    }

    var setdatetextnotempty = function (value) {

        if (String(value).length > 0) {
            var arr = String(value).split('-');
            var dt = new Date(arr[2], arr[1], arr[0]);
            currdate = settodaydate(dt);
        }

    }

    var isvaliddate = function (date) {

        var dd = new Date(date);
        var f = true;

        if (dd.toString() == "NaN" || dd.toString() == "Invalid Date")
            f = false;

        return f;

    }

    this.setDate = undefined;
    var _self = this;

    var drawdefaultview = function () {

        var ret = setdate();

        //String($(pn).val()).length  > 0 ? String($(pn).val())  :  setdate();
        //setdatetextnotempty($(pn).val());

        // 29.02.2016 Change
        if (typeof _self.setDate != "undefined" && Object.prototype.toString.call(_self.setDate) === "[object Function]") {
            currdate = datesep(_self.setDate());
        }
        else if (String($(pn).val()).length > 0 && coming_from_sel == false)
            currdate = datesep($(pn).val());
        else
            currdate = datesep(ret);

        /// if not valid then assign today's date
        //        if (!(isvaliddate(currdate)))
        //            currdate = settodaydate(new Date());

        // 07.Nov.2012
        if (isNaN(currdate.dd) || isNaN(currdate.yy) || isNaN(currdate.mm))
            currdate = settodaydate(new Date());

        var ptd = totaldaysforprevmonth(currdate.mm);

        html = "<div>"
                     + "<table style='width:100%;'>"
                     + "<tr>"
                     + "<td style='width:20px;padding:5px;box-sizing:border-box;'><span id='" + prev + "'><svg height='10' width='10'><polygon points='10 0,0 5,10 10,10 0' style='fill:#333;' />◄</svg></span></td>"
                     + "<td style='width:99%;text-align:center;padding:5px;box-sizing:border-box;'><span style='font-size:1em;font-family:Segoe UI, arial !important;font-weight:600;' id='" + nav_to + "'>" + monthyear(currdate.mm, currdate.yy) + "</span></td>"
                     + "<td style='width:20px;padding:5px;box-sizing:border-box;'><span id='" + next + "'><svg height='10' width='10'><polygon points='0 0,10 5,0 10,0 0' style='fill:#333;' />►</svg></span></td>"
                     + "</table>"
                     + "</div>";

        addYY(html);

        html = "";
        html = "<table style='width:100%;border-collapse:collapse;margin-top:5px;'><tr>"
                     + "<tr style='width:100%;font-weight:600'>"
                     + "<th style='width:15%;font-family:Segoe UI, arial !important;padding:5px;'>" + selectedPhrases.daysShort[0] + "</td>"
                     + "<th style='width:15%;font-family:Segoe UI, arial !important;padding:5px;'>" + selectedPhrases.daysShort[1] + "</td>"
                     + "<th style='width:15%;font-family:Segoe UI, arial !important;padding:5px;'>" + selectedPhrases.daysShort[2] + "</td>"
                     + "<th style='width:15%;font-family:Segoe UI, arial !important;padding:5px;'>" + selectedPhrases.daysShort[3] + "</td>"
                     + "<th style='width:15%;font-family:Segoe UI, arial !important;padding:5px;'>" + selectedPhrases.daysShort[4] + "</td>"
                     + "<th style='width:15%;font-family:Segoe UI, arial !important;padding:5px;'>" + selectedPhrases.daysShort[5] + "</td>"
                     + "<th style='width:15%;font-family:Segoe UI, arial !important;padding:5px;'>" + selectedPhrases.daysShort[6] + "</td>"
                     + "</tr>"
                     + "<tbody style='background:#fff;'><tr>";


        var totalcount = currdate.totaldays + currdate.wd;
        ptd -= currdate.wd - 1;

        var i = (currdate.wd == 0 ? 1 : 1), j = 0;
        while (i < totalcount) {

            if (j == 7) {
                html += "</tr><tr>";
                j = 0;
            }

            if (i < currdate.wd) {
                ptd++;
                html += "<td style='padding:5px;box-sizing:border-box;text-align:center;color:gray' data='" + (ptd) + "' class='no' yy='" + currdate.yy + "' mode=1>" + (ptd) + "</td>";

            }
            else if (i >= currdate.wd) {
                html += "<td style='padding:5px;box-sizing:border-box;text-align:center;font-weight:600;' data='" + (i - currdate.wd + 1) + "'>" + (i - currdate.wd + 1) + "</td>";
            }
            i++;
            j++;
        } /// while end

        i = 0;
        while ((++j) <= 7) {
            i++;
            html += "<td style='text-align:center;padding:5px;box-sizing:border-box;color:gray' data='" + (i) + "' class='no'  yy='" + currdate.yy + "' mode=2>" + (i) + "</td>";
        }

        html += "</tr></tbody></table>";
        addDD(html);
        navevent();
        istodaydate();
    }

    var navevent = function () {
        $("#" + nav_to).click(function () {

            switch (navmode) {
                case 1: navmode = 2; break;
                case 2: navmode = 3; break;
                case 3: navmode = 1; break;
            }
            draw(navmode);
        });

        $("#" + next).click(movenext);
        $("#" + prev).click(moveprev);

    }

    var monthyear = function (mm, yy) {
        var rvalue = "";

        rvalue = selectedPhrases.months[parseInt(mm)]

        //switch (parseInt(mm)) {
        //    case 0: rvalue = "January - "; break;
        //    case 1: rvalue = "February - "; break;
        //    case 2: rvalue = "March - "; break;
        //    case 3: rvalue = "April - "; break;
        //    case 4: rvalue = "May - "; break;
        //    case 5: rvalue = "June - "; break;
        //    case 6: rvalue = "July - "; break;
        //    case 7: rvalue = "August - "; break;
        //    case 8: rvalue = "September - "; break;
        //    case 9: rvalue = "October - "; break;
        //    case 10: rvalue = "November - "; break;
        //    case 11: rvalue = "December - "; break;
        //} /// End of switch

        rvalue += " - " + yy;
        return rvalue;
    }


    var addYY = function (dhtml) {
        $(yyctn).html("");
        $(yyctn).html(dhtml);
    }

    var addDD = function (dhtml) {
        $(ddctn).html("");
        $(ddctn).html(dhtml);


        $(ddctn).find("table tr td")
               // .not(".no")
                .css({ "border": "solid 1px #ccc", "cursor": "pointer" })
                .click(performselection)
                .mouseover(mouseon)
                .mouseout(mouseoff);

        $(ddctn).find("table tr td[class='no']")
	            .css({ "cursor": "pointer" })
	            .click(specialnav);

        $("#" + nav_to + ",#" + next + ",#" + prev).css("cursor", "pointer");
    }

    var specialnav = function () {
        var obj = this;
        navmode = 1;
        currdate.dd = parseInt($(this).attr("data"));
        switch (parseInt($(obj).attr("mode"))) {
            case 1: moveprev(); break;
            case 2: movenext(); break;
        }

    }

    var performselection = function () {

        coming_from_sel = true;

        switch (navmode) {
            case 1: /// means you are in calender view...
                currdate.dd = getvalue(this);
                if (currdate.dd != NaN || currdate.dd != undefined) {
                    currdate.dd = parseInt(currdate.dd);
                    setdate(true);
                    hide();
                }
                break;

            case 2: /// means you are in month view ...
                currdate.mm = getvalue(this);
                navmode = 1;
                draw(navmode);
                break;

            case 3: /// means you are in year view ...
                currdate.yy = getvalue(this);
                navmode = 1;
                draw(navmode);
                break;
        }


    }

    var setdate = function (assign) {

        var ret = "";

        if (isNaN(currdate.dd) || isNaN(currdate.yy) || isNaN(currdate.mm)) {
            currdate = settodaydate(new Date());

        }

        if (currdate.dd != 0 && currdate.yy != 0) {
            var mm = parseInt(currdate.mm) + 1;
            ret += (String(currdate.dd).length == 1) ? "0" + currdate.dd : currdate.dd;
            ret += "-";
            ret += (String(mm).length == 1) ? "0" + mm : mm;
            ret += "-";
            ret += currdate.yy;

            if ((defaultsetting.displaytodaydate) || (assign)) {
                $(pn).val(ret);


                if (typeof OnChangeCallBack == "function") {

                    if (OnChangeCallBack != null)
                        OnChangeCallBack();
                }

            }
        }

        return ret;
    }

    var getvalue = function (item) {
        return parseInt($(item).attr("data"));
    }

    var mouseon = function (e) {

        if (!($(this).hasClass("highlight"))) {

            $(this).css("cursor", "pointer");
            if (!($(this).hasClass("select")))
                $(this).css(hovereffect.over);
        }
    }

    var mouseoff = function (e) {
        if (!($(this).hasClass("highlight"))) {
            if (!($(this).hasClass("select")))
                $(this).css(hovereffect.out);
        }
    }


    var addbody = function (dhtml) {
        $(cn).html("");
        $(cn).html(dhtml);
    }

    var totaldays = function (mm) {
        var r = 0;
        mm = parseInt(mm) + 1;

        switch (mm) {
            case 1: case 3: case 5: case 7:
            case 8: case 10: case 12:
                r = 31; break;

            case 4: case 6: case 9: case 11:
                r = 30; break;

            case 2:
                //r = (new Date(todaydate.yy, 2 - 1, 29).getDate() == 29) ? 29 : 28;
                r = (new Date(todaydate.yy, 1, 29).getMonth() == 1 ? 29 : 28);
                break;
        }

        return r;

    }


    this.setzindex = function (zindex) {
        $(cn).css("z-index", zindex);
        return that;
    }

    this.selectioncssjson = function (JsonObject) {
        selectcsjson = JsonObject; return that;
    }

    this.setalign = function (alignment) {
        defaultsetting.align = alignment;
        return that;
    }

    this.showtodaydate = function (Decide) {
        defaultsetting.displaytodaydate = Decide;

        if (Decide) {
            /// if true than set the date as today.
            setdate(new Date());
        }
        return that;
    }


    this.setCallBackForOnChangeEvent = function (CallBack) {
        OnChangeCallBack = CallBack;
        return that;
    }

    this.setstyle = function (JsonObject) {
        if ($("body").find(cn).length == 0) {
            alert(" --- Control has not been init yet please call init() method first ----"); return;
        }

        that.cnCSSJson = JsonObject;
        setcss(that.cnCSSJson);
        return that;
    }


    this.DateDiff = function (Date1, Date2) {

        /// -1 First value is less then second
        // 0 both values are same
        // 1 first value is greater then second

        var d1 = new Date();
        var d2 = new Date();

        var tempobj = String(Date1).split('-');

        if ($.trim(tempobj).length == 0) {
            alert("First Date is empty-Function fail"); return;
        }
        else if (tempobj.length != 3) {
            alert("First Date might contains non date values.-Function fail"); return;
        }

        d1.setFullYear(Number(tempobj[2])); d1.setMonth(Number(tempobj[1])); d1.setDate(Number(tempobj[0]));


        tempobj = String(Date2).split('-');

        if ($.trim(tempobj).length == 0) {
            alert("Second Date is empty-Function fail"); return;
        }
        else if (tempobj.length != 3) {
            alert("First Date might contains non date values.-Function fail"); return;
        }

        d2.setFullYear(Number(tempobj[2])); d2.setMonth(Number(tempobj[1])); d2.setDate(Number(tempobj[0]));


        if (parseInt(d2.getFullYear()) > parseInt(d1.getFullYear()))
            return -1;
        else if (parseInt(d2.getFullYear()) < parseInt(d1.getFullYear()))
            return 1;
        else if (parseInt(d2.getMonth()) > parseInt(d1.getMonth()))
            return -1;
        else if (parseInt(d2.getMonth()) < parseInt(d1.getMonth()))
            return 1;
        else if (parseInt(d2.getDate()) > parseInt(d1.getDate()))
            return -1;
        else if (parseInt(d2.getDate()) < parseInt(d1.getDate()))
            return 1;
        else
            return 0;

    }


    this.SetContainer = function (Container) {

        if (typeof Container != "undefined")
            CalenderHolder = Container; //// Should be with # or .

        return that;
    }
}


function SetDate1(ControlName, CalenderName, Direction, SelectionStyle, ShowTodayDate, OverAllStyle, ZIndex, RowHover, CalenderHolder, ShowAtBottom, LanguageKey) {

    if (Direction == undefined || Direction.length == 0)
        Direction = "left";
    if (SelectionStyle == undefined || SelectionStyle.length == 0)
        SelectionStyle = { "background": "#0C2D83", "border": "1px solid #0C2D83", "color": "#fff" };
    if (ShowTodayDate == undefined || ShowTodayDate.toString().length == 0)
        ShowTodayDate = true;
    if (OverAllStyle == undefined || OverAllStyle.toString().length == 0)
        OverAllStyle = { "font-family": "Calibri", "font-size": "small", "color": "black" };
    if (ZIndex == undefined || ZIndex.toString().length == 0)
        ZIndex = 2;
    if (typeof ShowAtBottom == "undefined")
        ShowAtBottom = false;

    if (!LanguageKey) { // Get the languagekey from local storage

        if (window && window.localStorage) {

            var userInfo = window.localStorage.getItem("USER_INFO");

            userInfo = userInfo ? eval('(' + userInfo + ')') : null;

            if (userInfo && userInfo.languagekey) {
                LanguageKey = userInfo.languagekey;
            }
        }
        else { // set the default language
            LanguageKey = 1; // English
        }
    }

    var T = new DatePicker(ControlName, CalenderName, RowHover, ShowAtBottom, parseInt(LanguageKey))
                        .setalign(Direction)
                        .selectioncssjson(SelectionStyle)
                        .SetContainer(CalenderHolder)
                        .init()
                        .setzindex(ZIndex)
                        .setstyle(OverAllStyle)
                        .showtodaydate(ShowTodayDate);

    return T;

}


/*

onChangeEvent
==============

Method1 : 
------------
var tt = SetDate1("mydate", "holderformydate", undefined, undefined, true)

            tt.setCallBackForOnChangeEvent(function(){            
                alert("do something");
            });


Method2 :
----------
You can use onBlur event on the calender control.


var oldvalue = "";

            $("#mydate").blur(function () {

                if (oldvalue == "")
                    oldvalue = $(this).val();
                else
                    if (oldvalue != $(this).val())
                        alert("Values are different");                               

            });

*/
