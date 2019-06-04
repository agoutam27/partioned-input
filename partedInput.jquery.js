(function ($) {

    $.fn.partionedInput = function (options) {

        // Establish our default settings
        var settings = $.extend({
            type: 'text',
            size: 4,
            styleClass: 'parted-input',
            styleIdPrefix: 'input-part-',
            regex: null,
        }, options);
        
        var defaultTextRegex = /[0-9]|[a-z]|[A-Z]/; 
        var defaultNumberRegex = /[0-9]/;
        var jqueryElem = null;

        var regex = settings.regex || (settings.type.toUpperCase() === "TEXT" ?
                defaultTextRegex : defaultNumberRegex);

        $.fn.keydownFun = function (event) {
            
            if (!event || !event.key) {
                return false;
            }
            event.preventDefault();
            
            var isFirst = jqueryElem[0] === this[0];
            var isLast = jqueryElem[settings.size - 1] === this[0];

            switch (event.key.toUpperCase()) {
                case "BACKSPACE":
                case "DELETE":
                    $(this).val("");
                    !isFirst && $(this)[0].previousElementSibling.focus();
                    break;
                case "TAB":
                    isLast ? $(this).blur() : $(this)[0].nextElementSibling.focus();
                    break;
                default:
                    // In case of keys like Control, Alt, F1 and etc regex will pass in case of text input.
                    // Using length of the input to determine if it is a character or other keys
                    event.key.length === 1 && regex.test(event.key) && ($(this).val(event.key) &&
                        isLast && $(this).blur() || $(this)[0].nextElementSibling.focus());
                    break;
            }
            return false;
        }

        // This function will only work in those browser in which onpaste event is supported
        $.fn.pasteFun = function (event) {
            event.preventDefault();
            if(!event || !event.clipboardData) {
                return false;
            }
            var text = event.clipboardData.getData("text") || "";
            jqueryElem.each(function(num, el) {
                $(el).val(text[num]);
            });
            return false;
        }

        var htmlStr = "<input type='" + settings.type + "' class='" +
            settings.styleClass + "' id='" + settings.styleIdPrefix +
            "%' onkeyup='$(this).keydownFun(event)' onpaste='$(this).pasteFun(event)' />";
            
        var str = "";
        for (var i = 0; i < settings.size; i++)
            str += htmlStr.replace("%", i);                
        $(this).replaceWith(jqueryElem = $(str));

        jqueryElem.value = function (val) {
            val = typeof val === "string" || Array.isArray(val) ? val : typeof val === "number" ? "" + val : [];
            var str = "";
            jqueryElem.each(function (num, elem) {
                val[num] && $(elem).val(val[num]);
                str += $(elem).val();
            });
            return str;
        };
        return jqueryElem;
    }

}(jQuery));