(function() {
    
    $ = grp.jQuery;

    function next(elem) {
        // Credit to John Resig for this function
        // taken from Pro JavaScript techniques
        do {
            elem = elem.nextSibling;
        } while (elem && elem.nodeType != 1);
        return elem;
    }

    function prev(elem) {
        // Credit to John Resig for this function
        // taken from Pro JavaScript techniques
        do {
            elem = elem.previousSibling;
        } while (elem && elem.nodeType != 1);
        return elem;
    }

    function init_widget(widget) {
        var mode = $(widget).attr("data-mode");
        var theme = $(widget).attr("data-theme");
        var wordwrap = $(widget).attr("data-wordwrap");
        var printmargin = $(widget).attr("data-showprintmargin");
        var textarea = $(widget).closest('.ace-overlay').find('textarea');

        console.log("mode: "+mode+" theme: "+theme+" wordwrap: "+wordwrap+" printmargin: "+printmargin+" textarea: "+textarea)

        var editor = ace.edit(widget);
        editor.setTheme("ace/theme/"+theme);
        editor.getSession().setMode("ace/mode/"+mode);
        editor.getSession().setUseWrapMode(true);
        editor.setOptions({
            readOnly: false,
            highlightActiveLine: false,
            highlightGutterLine: false
        })

        $(widget).closest('.ace-overlay').data('editor', editor)
    }

    function init() {
        $(".django-ace-widget").each(function(index, value){
            init_widget(value);
        })
    }

    function addListeners(){
        $(".ace-overlay .edit").bind("click", function(event){
            event.preventDefault();

            var value = $(this).closest('.ace-overlay').find('textarea').val();
            $(this).closest('.ace-overlay').data('editor').setValue(value, -1);

            $('.ace-overlay').find('.overlay-container').removeClass('open');
            $(this).closest('.ace-overlay').find('.overlay-container').addClass('open');
        })
        $(".ace-overlay .cancel").bind("click", function(event){
            event.preventDefault();
            $('.ace-overlay').find('.overlay-container').removeClass('open');
        })
        $(".ace-overlay .cancel, .ace-overlay .backdrop").bind("click", function(event){
            event.preventDefault();
            $('.ace-overlay').find('.overlay-container').removeClass('open');
        })
        $(".ace-overlay .save").bind("click", function(event){
            event.preventDefault();
            $('.ace-overlay').find('.overlay-container').removeClass('open');

            var value = $(this).closest('.ace-overlay').data('editor').getValue();
            $(this).closest('.ace-overlay').find('textarea').val(value);
            $(this).closest('.ace-overlay').find('textarea').html(value);
            $(this).closest('.ace-overlay').find('pre').text(value);
        })
    }

    $( document ).ready(function() {
        addListeners();
        init();
    });



    
})();
