//var sharedObject.selectedelement = null;
var sharedObject = {
    selectedelement: null,
    colorMustChange: "background-color",
    elementOfColorPopOverId: "",
    lastControlDivId:''
}


var common = {
    _tempStartSize: null,
    generalClickHandler: function () {

        $('[data-action]').on("click",
            function () {

                var action = $(this).attr("data-action");
                var prop = $(this).attr("data-prop");
                var target = $(this).attr("data-terget");

                switch (action) {
                    case "close":
                        $("#" + target).css("display", "none");
                        break;

                }

            });
    },
    makeSelected: function (el) {
        //console.log(el);
        common.removeAllSelected();
        $(el).addClass("activeEleman");
        $(el).resizable({
            handles: 'ne, nw, se, sw, n, w, s, e',
            start: function (event, ui) {
                common._tempStartSize = $(el).css("width") + "**" + $(el).css("height") + "**" + $(el).css("left") + "**" + $(el).css("top");
            },
            stop: function (event, ui) {

                //  if( $(el).is("label"))
                if ($(el).hasClass("text"))
                    $(el).css("height", 'auto');

                history2.add("resized", $(el), common._tempStartSize, $(el).css("width") + "**" + $(el).css("height"));
                common._tempStartSize = null;
            }

        });


        sharedObject.selectedelement = el;
    },
    removeAllSelected: function () {
        $("*").removeClass("activeEleman");
        $(".imgCard").css("overflow", "hidden");
        $(".imgCard").children(0).css("opacity", 1);
        //$("#imageCtrlDiv").css("display", "none");

        common.deactiveAllResizable();
    },
    deactiveAllResizable: function () {
        try {
            $(".imgCard").resizable('destroy');
        } catch (e) {
        }
        try {
            $(".imgCard").children(0).draggable('destroy');
        } catch (e) {
        }
        try {
            $(".text").resizable('destroy');
        } catch (e) {
        }
        try {
            $().resizable('destroy');
        } catch (e) {
        }


        $(".ui-resizable-ne").remove();
        $(".ui-resizable-nw").remove();
        $(".ui-resizable-se").remove();
        $(".ui-resizable-sw").remove();
        $(".ui-resizable-n").remove();
        $(".ui-resizable-w").remove();
        $(".ui-resizable-e").remove();
        $(".ui-resizable-s").remove();
    },
    setActiveTab: function (tabId) {
        //$(".nav.nav-tabs > li ").removeClass('active');
        //$("a[data-target='#" + tabId + "']").parent().addClass('active');

        //$(".tab-content > div").removeClass('active').removeClass('in');
        //$("#" + tabId).addClass('active').addClass('in');

        $(`#selectedElmConfigDiv>div`).css('display','none');
        $(`#${tabId}`).css('display', '');
    },
    //colorSelectEvent: function () {
    //    $(document).on('click',
    //        ".color",
    //        function () {
    //            var bg = $(this).css("background-color");
    //            //var forColor=$(this).attr("data-font-color");

    //            if (sharedObject.selectedelement.hasClass('text') && sharedObject.colorMustChange == "background-color")
    //                bg = (bg.substring(0, bg.length - 1) + ",0.74)").replace("rgb", "rgba");

    //            history2.add(sharedObject.colorMustChange, $(sharedObject.selectedelement), $(sharedObject.selectedelement).css(sharedObject.colorMustChange), bg);
    //            $(sharedObject.selectedelement).css(sharedObject.colorMustChange, bg);

    //            //// $(sharedObject.selectedelement).css("color",forColor);
    //            if (sharedObject.selectedelement.attr('id') == 'mainPnl') {
    //                $('[data-terget="mainPnl"][data-action="changeBg"][data-prop="background-color"]').css('background-color', bg);

    //            } else {

    //                sharedObject.elementOfColorPopOverId.css("background-color", bg);
    //            }
    //        });
    //},
    showLoading: function () {
        $("#loadingPnl").css("display", "block");
    },
    hideLoading: function () {
        $("#loadingPnl").css("display", "none");
    },
    getMaxIdOfElements: function () {
        var min = null, max = 1;
        $("#imageCtrlDiv").each(function () {
            var id = parseInt(this.id, 10);
            if ((min === null) || (id < min)) {
                min = id;
            }
            if ((max === null) || (id > max)) {
                max = id;
            }
        });
        return max + 1; //  return {min:min, max:max};
    },
    sendToBack: function (elm) {
        var e = elm != undefined ? elm : sharedObject.selectedelement;

        var zIndex = $(e).css("z-index");
        zIndex--;
        $(e).css("z-index", zIndex);
    },
    bringFront: function (elm) {
        var e = elm != undefined ? elm : sharedObject.selectedelement;

        var zIndex = $(e).css("z-index");
        zIndex++;
        $(e).css("z-index", zIndex);
    },
    remove: function (elm) {
        var e = elm != undefined ? elm : sharedObject.selectedelement;
        history2.add("del", $(e));
        $(e).remove();
        common.removeAllSelected();
    },
    textAlign: function () {
        $("[data-prop='text-align'").click(function () {

            $(sharedObject.selectedelement).css("text-align", $(this).attr("data-value"));
        });
    },
    backgroundPosition: function () {
        //$("[data-prop='background-position-x']").on('change input',
        //    (function() {
        //        // $(sharedObject.selectedelement).removeClass("fitBg");


        //        $(sharedObject.selectedelement).css("background-position-x", $(this).val() + "%");
        //        $(sharedObject.selectedelement).children(0).css("margin-left", -$(this).val() + "%");
        //        $('[data-label="background-position-x"]').text($(this).val() + "%");
        //    }));
        //$("[data-prop='background-position-y']").on('change input',
        //    (function() {
        //        // $(sharedObject.selectedelement).removeClass("fitBg ");

        //        $(sharedObject.selectedelement).css("background-position-y", $(this).val() + "%");
        //        $(sharedObject.selectedelement).children(0).css("margin-top", -$(this).val() + "%");
        //        $('[data-label="background-position-y"]').text($(this).val() + "%");
        //    }));
    },
    fitBgOrNot: function () {
        $("[data-action='fitBg']").on('click',
            (function () {
                // var target =  $(this).attr('data-terget');

                $(sharedObject.selectedelement).addClass("fitBg ");
            }));

        $("[data-action='orginalBg']").on('click',
            (function () {
                //var target =  $(this).attr('data-terget');

                $(sharedObject.selectedelement).removeClass("fitBg ");
            }));
    },
    backgroundZoom: function () {

        $("[data-prop='background-size']").on('change', (function () {


                //card2.makeSelected($(sharedObject.selectedelement));

            }));


        $("[data-prop='background-size']").on('input', (function () {

                // common.removeAllSelected();
                try {
                    $(".imgCard").resizable('destroy');
                } catch (e) {
                }

                $(sharedObject.selectedelement).addClass("activeEleman");
                $(sharedObject.selectedelement).css("overflow", "visible");
                $(sharedObject.selectedelement).children(0).css("opacity", .5);
                //$(sharedObject.selectedelement).children(0).css("opacity", ".3");
                //var e= $(sharedObject.selectedelement).css("background-size");

                // e =parseFloat( e.replace("%", ""));
                var naturalWidth = $(sharedObject.selectedelement).attr("data-naturalWidth");
                var naturalHeight = $(sharedObject.selectedelement).attr("data-naturalHeight");
                var width = $(sharedObject.selectedelement).css("width").replace("px", "");
                var height = $(sharedObject.selectedelement).css("height").replace("px", "");

                var e = (naturalWidth / width);
                // $("[data-prop='background-size']").attr("min", e);
                e = parseFloat($(this).val());

                e = parseInt(e);
                if (e < 20) e += 20;

                $(sharedObject.selectedelement).css("background-size", e + "%");
                $(sharedObject.selectedelement).children(0).css("width", e + "%");
                $('[data-label="background-size"]').text("% " + e + " زوم :");

                $(sharedObject.selectedelement).attr("data-zoom", e);
            }));

    },
    borderWidth:function() {
        $("[data-prop='border-width']").on('change', (function () {
            //card2.makeSelected($(sharedObject.selectedelement));
        }));


        $("[data-prop='border-width']").on('input', (function () {
            //var width = $(sharedObject.selectedelement).css("border-width").replace("px", "");
            var e = parseInt($(this).val());
            $(sharedObject.selectedelement).css("border-width", e + "px");
            $(sharedObject.selectedelement).css("border-style",  "solid");
            $('[data-label="border-width"]').text( e + "px");
        }));
    },
    borderRadius: function() {
        $("[data-prop='border-width']").on('change', (function () {
            //card2.makeSelected($(sharedObject.selectedelement));
        }));


        $("[data-prop='border-radius']").on('input', (function () {
            var e = parseInt($(this).val());
            $(sharedObject.selectedelement).css("border-radius", e + "px");
            $('[data-label="border-radius"]').text(e + "px");
        }));
    },
    GetAngle: function (elm) {
        var el = $(elm); // document.getElementById(elm);
        //var st = window.getComputedStyle(el, null);
        //var cur = st.getPropertyValue("-webkit-transform") ||
        //         st.getPropertyValue("-moz-transform") ||
        //         st.getPropertyValue("-ms-transform") ||
        //         st.getPropertyValue("-o-transform") ||
        //         st.getPropertyValue("transform") ||
        //         "0";
        var cur = el.css("-webkit-transform") ||
            el.css("-moz-transform") ||
            el.css("-ms-transform") ||
            el.css("-o-transform") ||
            el.css("transform") ||
            "(0,0,0,0)";

        if (cur == "none") return 0;

        var values = cur.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);

        // arc sin, convert from radians to degrees, round
        // DO NOT USE: see update below
        var sin = b / scale;
        var angle = Math.round(Math.asin(sin) * (180 / Math.PI));
        return angle;
    }


}

var text = {
    _tempStartLocation: null,
    makeSelected: function (elm) {
        common.makeSelected(elm);
        $("#fontColorBtn").val(helper.RGBToHex( elm.css("color")));
        $("#bgColorBtn").val(helper.RGBToHex(elm.css("background-color")));
        $("#fontSizeBtn").val(elm.css("font-size"));

        common.setActiveTab('textCtrlDiv');
    },
    makeNewText: function () {
        var div = document.createElement("div"); // Create with DOM
        var txt3 = document.createElement("label"); // Create with DOM

        $(div).attr('id', common.getMaxIdOfElements());

        txt3.innerHTML = "double click on me to change text.";
        div.appendChild(txt3);
        $("#mainPnl").append(div); // Append the new elements
        
        text.init($(div));
        text.makeSelected($(div));
        history2.add("add", $(div));

        $("#labelTextInput").val('Enter text');
        $("#labelTextModal").modal("show");

    },
    init: function (txt) {

        txt.addClass('text').addClass('draggable').addClass("contextMenu")
            .draggable({
                containment: "#mainPnl",
                start: function () {
                    text.makeSelected($(this));
                    txt._tempStartLocation = $(this).css("left") + "**" + $(this).css("top");
                },
                stop: function () {

                    history2.add("dragged", $(this), txt._tempStartLocation, $(this).css("left") + "**" + $(this).css("top"));
                    txt._tempStartLocation = null;
                }
            });

        $(document).on("dblclick", ".text",
            function () {
                var txt = $(this).text();
            
                $("#labelTextInput").val(txt);
                $("#labelTextModal").modal("show");

                text.makeSelected($(this));

                var angle = common.GetAngle(sharedObject.selectedelement);
                $("#textRotator").data("roundSlider").setValue(angle);
            });

        $(document).on("click", ".text",
            function () {

                text.makeSelected($(this));
            });

        $("#labelTextChangeBtn").click(function () {

            var text = $("#labelTextInput").val();
            $(sharedObject.selectedelement).children(0).text(text);
            $("#labelTextModal").modal("hide");

        });


    },
    initSetting: function () {


        $("#fontSizeBtn").change(function () { sharedObject.selectedelement.css("font-size", $(this).val()) });
        //$(document).on('click',
        //    "[ data-font-size]",
        //    function () {
        //        var bg = $(this).attr("data-font-size");
        //        //alert(bg);
        //        $(sharedObject.selectedelement).css("font-size", bg + "px");
        //        sharedObject.elementOfColorPopOverId.text(bg + "px");
        //    });


        text.contextMenu();
    },
    contextMenu: function () {
        $.contextMenu({
            selector: '.text',
            items: {
                "sendToBack": { name: "Go Back", icon: "" },
                "bringFront": { name: "Bring Front", icon: "" },
                "sep2": "---------",
                "delete": { name: "Delete", icon: "delete" },
            },
            callback: function (key, options) {
                var m = "clicked: " + key;
                //  window.console && console.log(m) || alert(m);
                if (key === "sendToBack") {

                    var zIndex = $(this).css("z-index");
                    zIndex--;
                    $(this).css("z-index", zIndex);
                } else if (key === "bringFront") {

                    var zIndex = $(this).css("z-index");
                    zIndex++;
                    $(this).css("z-index", zIndex);
                } else if (key === "delete") {

                    history2.add("del", $(this), card2);
                    $(this).remove();

                }

            }
        });
    }


}

var card2 = {
    makeSelected: function (elm) {
        common.makeSelected(elm);
        common.setActiveTab("imageCtrlDiv");
        //$(elm).css("overflow",'visible');
        ////$(elm).children(0).css("opacity", ".3");

        const naturalWidth = parseFloat($(elm).children(0).css("width").replace("px", "")); //  $(elm).attr("data-naturalWidth");
        const naturalHeight = parseFloat($(elm).children(0).css("height").replace("px", "")); //  $(elm).attr("data-naturalHeight");
        const width = parseFloat($(elm).css("width").replace("px", ""));
        const height = parseFloat($(elm).css("height").replace("px", ""));
        const max = naturalWidth > width ? (naturalWidth / width) * 100 : 0;
        const max2 = naturalHeight > height ? ((naturalHeight / height) * 100) : 0;
        const borderRadius = parseFloat($(elm).css("border-radius").replace("px", "")) || 0;
        const borderWidth = parseFloat($(elm).css("border-width").replace("px", ""));

        var zoom = parseFloat($(elm).attr("data-zoom")) || 100;
        $('[data-prop="background-size"]').val(zoom);
        $('[data-label="background-size"]').text( zoom + "% "  );

        $("[data-prop='background-position-x']").attr("max", Math.max(0, max - 100));
        $("[data-prop='background-position-y']").attr("max", Math.max(0, max2));

        $('[data-prop="border-radius"]').val(borderRadius);
        $('[data-label="border-radius"]').text(`${borderRadius}px`);

        $('[data-prop="border-width"]').val(borderWidth);
        $('[data-label="border-width"]').text(`${borderWidth}px`);

        var s1 = parseFloat($(elm).children(0).css("margin-left").replace("%", ""));
        var s2 = parseFloat($(elm).children(0).css("margin-top").replace("%", ""));
        $("[data-prop='background-position-x']").val(s1);
        $("[data-prop='background-position-y']").val(s2);
        $('[data-label="background-position-x"]').text(s1);
        $('[data-label="background-position-y"]').text(s2);

        ////$("[data-prop='background-position-x']").attr("min",-naturalWidth-(s1/100*width));
        ////$("[data-prop='background-position-y']").attr("min", -naturalHeight-(s2/100*height));
    },
    makeNewCard: function (img) {


        let naturalWidth = img.context.naturalWidth;
        let naturalHeight = img.context.naturalHeight;
        let bg = img.context.src;

        let div = document.createElement("div");
        let imgCard = document.createElement("div");
        $(imgCard).attr("data-naturalWidth", naturalWidth);
        $(imgCard).attr("data-naturalHeight", naturalHeight);

        let imgReal = document.createElement("img");
        $(imgReal)
            .css('width', "100%") //naturalWidth
            //.css('height',"100%;")
            // .css("opacity",".3")
            //.css("margin","-50% -50%")
            .attr("src", bg);

        let id = common.getMaxIdOfElements();
        $(imgCard).attr('id', id);

        if (bg != undefined) {
            // $( txt3).css("background-image", "url('" + bg + "')");

        }

        $(imgCard).append(imgReal);
        $(div).append(imgCard);
        $("#mainPnl").append(div);
        card2.init($(div));
        history2.add("add", $(div));

        card2.makeSelected($(imgCard));
    },
    _tempStartLocation: null,
    init: function (card) {

        card.children(0).addClass('imgCard').addClass('fitBg'); //.css("width", "250px");
        card
            .addClass('draggable')
            .addClass("contextMenu")
            //
            //.css("left","5px")
            //.css("top","5px")
            .css("position", "absolute")
            //.resizable({handles: 'n, e, s, w, ne, se, sw, nw'})
            .draggable({
                /*containment: "#mainPnl"*/
                start: function () {
                    card2.makeSelected($(this).children(0));
                    card2._tempStartLocation = $(this).css("left") + "**" + $(this).css("top");
                },
                stop: function () {

                    history2.add("dragged", $(this), card2._tempStartLocation, $(this).css("left") + "**" + $(this).css("top"));
                    card2._tempStartLocation = null;
                }
            });
        //.droppable({
        //    drop: function (event, ui) {

        //        var elm=$(ui.draggable).hasClass("imgCard");
        //        if(!elm){
        //            //var src=ui.draggable.context.src;
        //            //$( this).css("background-image", "url(" + src + ")");
        //        }

        //    }});
        $(document).on("dblclick",
            ".imgCard",
            function (e) {

                common.deactiveAllResizable();
                $(this).addClass("activeEleman");
                $(this).css("overflow", "visible");
                $(this).children(0).css("opacity", .5);

                $(this).children(0).draggable({
                    drag: function () {
                        //if($(this).css("left"))
                        let left = $(this).css("left").replace("px", "");
                        let top = $(this).css("top").replace("px", "");
                        $('[data-prop="background-position-x"]').val(parseFloat(left));
                        $('[data-prop="background-position-y"]').val(parseFloat(top));

                        $('[data-label="background-position-x"]').text(left + "%");
                        $('[data-label="background-position-y"]').text(top + "%");
                    }
                });

                sharedObject.selectedelement = $(this); //.children(0);
            });

        $(document).on("click", ".imgCard",
            function (e) {

                try { $(this).children(0).draggable('destroy'); } catch (e) {}

                $(this).css("overflow", "hidden");
                // $(this).resizable();
                card2.makeSelected($(this));

                const top = parseInt($(this).parent().css("top").replace("px", "")) -5;
                const left = parseInt($(this).parent().css("left").replace("px", "")) + 173;
                $("#imageCtrlDiv").css("top", top + "px").css("left", left + "px");//.css("display", "block");
                const angle = common.GetAngle(sharedObject.selectedelement);
                 $("#imgRotator").roundSlider({ value: angle });
                //$("#imgRotator").data("roundSlider").setValue(angle);

            });

        card2.contextMenu();
    },

    contextMenu: function () {
        $.contextMenu({
            selector: '.imgCard',
            items: {
                "fitBg": { name: "Strech Picture to frame", icon: "" },
                "orginalBg": { name: "Picture to Original Size", icon: "" },
                "sep2": "---------",
                "sendToBack": { name: "Go back", icon: "" },
                "bringFront": { name: "Bring To Front", icon: "" },
                "sep2": "---------",
                "delete": { name: "Delete", icon: "delete" },
                //"quit": {name: "<input type='radio' />", icon: function(){
                //    return 'context-menu-icon context-menu-icon-quit';
                //}}
            },
            callback: function (key, options) {
                var m = "clicked: " + key;
                //  window.console && console.log(m) || alert(m);
                if (key === "sendToBack") {

                    common.sendToBack($(this));
                } else if (key === "bringFront") {

                    common.bringFront($(this));
                } else if (key === "delete") {

                    history2.add("del", $(this).parent());
                    $(this).parent().remove();
                    common.removeAllSelected();
                } else if (key === "fitBg") {
                    $(this).addClass("fitBg");
                } else if (key === "orginalBg") {
                    $(this).removeClass("fitBg");
                }
            }
        });

        $('.contextMenu').on('click',
            function (e) {
                //console.log('clicked', this);
            });
    }

}

var mainPnl = {
    makeSelected: function () {
        // common.removeAllSelected();
        common.makeSelected($("#mainPnl"));
        // common.setActiveTab('menu1');
    },
    initEvent: function () {

        $("#mainPnl").draggable({ containment: "#drawingPnl",
            start: function () {
                //mainPnl.makeSelected();
            }
        });

        $("#mainPnl").droppable({
            drop: function (event, ui) {

                if ($(ui.draggable.context).hasClass("imgCard")) {
                } else if ($(ui.draggable.context).parent().hasClass("imgCard")) {
                } else if (ui.draggable.context.parentNode.id === $(this).attr("id")) {

                } else {
                    //var bg = ui.draggable.context.src;
                    var img = $(ui.draggable.context);


                    card2.makeNewCard(img);
                }
            }
        });

        $("#mainPnl").click(function (e) {
            common.removeAllSelected();
            //if ($(e.target).parent().hasClass("imgCard"))
            //    mainPnl.makeSelected();

            if (e.target !== this)
                return;

 common.setActiveTab("menu1");
            //mainPnl.makeSelected();
        });

        $("#mainPnl").dblclick(function (e) {
            if (e.target !== this)
                return;

            mainPnl.makeSelected();
           
         /*   $("#selectedElmConfigDiv").html($('#menu1').html());*/
        });

        $('[data-terget="mainPnl"]').on("input change",
            function () {

                var action = $(this).attr("data-action");
                var prop = $(this).attr("data-prop");
                var target = $(this).attr("data-terget");
                switch (action) {
                    case "resize":
                        $("#" + target).css(prop, $(this).val());
                        break;


                }

            });

        $('[data-action="changeBg"]').popover({
            html: true,
            trigger: 'focus',
            content: function () {

                var action = $(this).attr("data-action");
                var prop = $(this).attr("data-prop");
                var target = $(this).attr("data-terget");

                sharedObject.selectedelement = $("#" + target);
                sharedObject.colorMustChange = "background-color";


                // var bg=$("#"+target).css("background-color");
                return "<div  style='width:255px;height:345px;overflow-y: scroll;' >" + $('.colors-page').html() + "<div/>";
            }


        });


    },
    currZoom: 1,
    ZoomIn: function () {

        mainPnl.currZoom += .05;
        $("#mainPnl").css("zoom", mainPnl.currZoom);
        $("#mainPnl").css("-moz-transform", "scale(" + mainPnl.currZoom + ")");

    },
    ZoomOut: function () {
        mainPnl.currZoom -= .05;
        $("#mainPnl").css("zoom", mainPnl.currZoom);
        $("#mainPnl").css("-moz-transform", "scale(" + mainPnl.currZoom + ")");
    }

}

var history2 = {
    _items: [],
    _undoItems: [],
    add: function (actionOrPropChanged, elment, fromValue, toValue) {

        history2._items.push(
            {
                actionOrPropChanged: actionOrPropChanged,
                element: elment,
                fromValue: fromValue,
                toValue: toValue
            });

        $('[data-action="undo"]').removeAttr('disabled');
    },
    undo: function () {
        if (history2._items.length == 0) return;
        var last = history2._items[history2._items.length - 1];

        history2._undoItems.push(last);

        switch (last.actionOrPropChanged) {
            case "add":
                last.element.remove();

                break;
            case "del":

                $("#mainPnl").append($(last.element));
                if ($(last.element).hasClass('imgCard'))
                    card2.init($(last.element));
                if ($(last.element).hasClass('text'))
                    text.init($(last.element));

                break;
            case "dragged":

                var start = last.fromValue.split("**");
                var left = parseFloat(start[0]);
                var top = parseFloat(start[1]);
                $(last.element).css("left", left);
                $(last.element).css("top", top);

                break;
            case "resized":
                var start1 = last.fromValue.split("**");
                var width = parseFloat(start1[0]);
                var height = parseFloat(start1[1]);
                var left1 = parseFloat(start1[2]);
                var top1 = parseFloat(start1[3]);
                $(last.element).css("width", width);
                $(last.element).css("height", height);
                $(last.element).css("left", left1);
                $(last.element).css("top", top1);
                break;
            case "background-color":
            case "background-image":
            case "color":

                $(last.element).css(last.actionOrPropChanged, last.fromValue);

                break;
        }
        history2._items.splice(history2._items.length - 1, 1);
        $('[data-action="redo"]').removeAttr('disabled');
        if (history2._items.length == 0) $('[data-action="undo"]').attr('disabled', 'disabled');
    },
    redo: function () {
        if (history2._undoItems.length == 0) return;
        var last = history2._undoItems[history2._undoItems.length - 1];

        history2._items.push(last)
        switch (last.actionOrPropChanged) {
            case "add":

                $("#mainPnl").append($(last.element));
                if ($(last.element).hasClass('imgCard'))
                    card2.init($(last.element));
                if ($(last.element).hasClass('text'))
                    text.init($(last.element));

                break;
            case "del":
                last.element.remove();
                break;
            case "dragged":
                var start = last.toValue.split("**");
                var left = parseFloat(start[0]);
                var top = parseFloat(start[1]);
                $(last.element).css("left", left);
                $(last.element).css("top", top);
                break;
            case "resized":
                var start1 = last.toValue.split("**");
                var width = parseFloat(start1[0]);
                var height = parseFloat(start1[1]);
                $(last.element).css("width", width);
                $(last.element).css("height", height);
                break;
            case "background-color":
            case "background-image":
            case "color":
                $(last.element).css(last.actionOrPropChanged, last.toValue);

                break;

        }
        history2._undoItems.splice(history2._undoItems.length - 1, 1);
        $('[data-action="undo"]').removeAttr('disabled');
        if (history2._undoItems.length == 0) $('[data-action="redo"]').attr('disabled', 'disabled');
    }
}

var helper = {

    RGBToHex(rgb) {
        // Choose correct separator
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        // Turn "rgb(r,g,b)" into [r,g,b]
        rgb = rgb.substr(4).split(")")[0].split(sep);

        let r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    },

    RGBToHex2(r, g, b) {

        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    }

    ,convertToCanvas(btnExporttoimage) {
        common.removeAllSelected();
        html2canvas($("#mainPnl")[0],
            {
                onrendered: function (canvas) {
                    //$("#mainPnl").css('overflow','visible');//.parentNode.style.overflow = 'hidden';
                    //// var dataUrl = canvas.toDataURL();
                    ////  window.open(dataUrl, "toDataURL() image", "width=800, height=800");
                    //////Canvas2Image.saveAsPNG(canvas);

                    $(".txt").css('text-align', 'left');
                    canvas.toBlob(function (blob) {
                        saveAs(blob, "Untitled.png");
                    });
                }

            });
        //.then(function (canvas) {


        //    //var base64 = canvas.toDataURL();


        //    //var a = document.createElement('a');

        //    //a.download = "Untitled.png";
        //    //a.href =base64;
        //    //a.dataset.downloadurl = ['image/png', a.download, a.href].join(':');
        //    //a.click();

        //    ////$(".txt").css('direction','ltr');
        //    //// $("#mainPnl").css('overflow','auto');

        //});
    }


}

//-------------------------------------------------------------------




$(function () {

    $(".uploadedImgs").draggable({ helper: 'clone', revert: 'invalid' /*,revert: true,*/ });
    $(document).on('click',
        ".uploadedImgs",
        function () {

            var newBg = $(this).attr("src");

            history2.add("background-image", sharedObject.selectedelement, $(sharedObject.selectedelement).css("background-image"), "url('" + newBg + "')");

            $(sharedObject.selectedelement).css("background-image", "url('" + newBg + "')");

            //// $("#imageCtrlDiv").css("display", "none");
            //// $("#" + sharedObject.selectedelement).resizable('disable').draggable('disable');

        });
    //$('.uploadedImgs').popover({
    //    html: true,
    //    content: function () {
    //        var bg = $(this).attr("src");
    //        return "<img src='" + bg + "' style='width:450px;' />";
    //    }
    //});
    $(".uploadedImgs").dblclick(function (e) {
        card2.makeNewCard($(this));
        $('#imgSelectModal').modal('hide');
    });

    text.init($(".text"));
    text.initSetting();
    card2.init($(".imgCard").parent());
    mainPnl.initEvent();
    //common.colorSelectEvent();
    common.textAlign();
    common.backgroundPosition();
    common.fitBgOrNot();
    common.backgroundZoom();
    common.borderWidth();
    common.borderRadius();

    $("#changeProjectNameAndSave").click(function () { api.saveToServer(); });

    $("#textRotator").roundSlider({
        radius: 20,
        width: 5,
        handleSize: "12,5",
        sliderType: "min-range",
        value: 0,
        min: -180,
        max: 180,
        valueChange: function (e) {
            let angle = $("#textRotator").data("roundSlider").getValue();
            $(sharedObject.selectedelement).css("-ms-transform", "rotate(" + angle + "deg)");
            $(sharedObject.selectedelement).css("-webkit-transform", "rotate(" + angle + "deg)");
            $(sharedObject.selectedelement).css("transform", "rotate(" + angle + "deg)");

        }
    });

    $("#imgRotator").roundSlider({
        radius: 20,
        width: 5,
        handleSize: "12,5",
        sliderType: "min-range",
        value: 0,
        min: -180,
        max: 180,
        valueChange: function (e) {
            let angle = $("#imgRotator").data("roundSlider").getValue();
            $(sharedObject.selectedelement).css("-ms-transform", "rotate(" + angle + "deg)");
            $(sharedObject.selectedelement).css("-webkit-transform", "rotate(" + angle + "deg)");
            $(sharedObject.selectedelement).css("transform", "rotate(" + angle + "deg)");

        }
    });

    common.hideLoading();

    ////$('#drag').draggable();
    ////$('#resize').resizable({ handles: 'ne, nw, se, sw, n, w, s, e' });

    $('[data-terget=mainPnl-bgColor]').val(helper.RGBToHex($('#mainPnl').css('background-color')));



});