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
        editor.getSession().setUseWrapMode(wordwrap);
        editor.setShowPrintMargin(printmargin);
        editor.setOptions({
            readOnly: false,
            highlightActiveLine: false,
            highlightGutterLine: false
        })

        $(widget).closest('.ace-overlay').data('editor', editor);

        //initialize code container display...
        var value = $(widget).closest('.ace-overlay').find('textarea').val();
        console.log("value? "+value)
        renderAsCode($(widget).closest('.ace-overlay').find('.code-container'), value);
    }

    function init() {
        $(".django-ace-widget").each(function(index, value){
            init_widget(value);
        })
    }
    function escape_tags(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
    }
    function renderAsCode(container, text){
        
        
        var enumerated_text = '';
        enumerated_source_list = text.split(/\r?\n/);//text.match(/[^\r\n]+/g);
        console.log("found "+enumerated_source_list.length+" lines")
        var counter = 1
        for(var k=0; k<enumerated_source_list.length; k++){
            var line = enumerated_source_list[k];
            var new_line = "<div class='line'><span class='counter'>"+counter+"</span><span class='code'>"+escape_tags(line)+"</span></div>";
            enumerated_text += (new_line);
            counter += 1;
        }
        $(container).html(enumerated_text);
    }
    function addListeners(){
        $(".ace-overlay .edit").bind("click", function(event){
            event.preventDefault();
            console.log("SET VALUE....")
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
            renderAsCode($(this).closest('.ace-overlay').find('.code-container'), value);
        });

        $(document).bind("keydown", function(event) {
            var is_escape_key = event.keyCode == 27;
            if (is_escape_key){                
                var open_overlays = $('.ace-overlay').find('.overlay-container.open')
                $(open_overlays).each(function(index, value){
                    var save_button = $(value).closest('.ace-overlay').find(".save");
                    $(save_button).trigger("click");
                });
            };
        });
    }

    $( document ).ready(function() {
        addListeners();
        init();
    });



    
})();