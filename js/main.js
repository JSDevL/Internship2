$( document ).ready( function(){
    
    var form = $("#mainForm");
    var formSelect = form.children("select");
    var selectOptions = formSelect.children("option");
    
    // Create our JS form
    form.append('<div id="dd" class="wrapper-dropdown '+selectOptions[0].className+'" tabindex="1"><span>'+$(selectOptions[0]).attr("value")+'</span><ul class="dropdown"></ul>');
    
    // For every item in the NoJS form create a duplicate in the JS form
    selectOptions.each( function(){
        var option = $(this);
        if( option[0].index != 0 )
            form.find("ul").append("<li class="+option[0].className+">"+option.attr("value")+"</li>");
    });
    
    // Custom JS DD 
    function DropDown(el) {
        this.dd = el;
        this.placeholder = this.dd.children('span');
        this.opts = this.dd.find('ul.dropdown > li');
        this.val = '';
        this.index = -1;
        this.initEvents();
    };
    
    DropDown.prototype = {
        initEvents : function() {
            var obj = this;

            obj.dd.on('click', function(event){
                $(this).toggleClass('active');
                return false;
            });

            obj.opts.on('click',function(){
                var opt = $(this);
                obj.val = opt.text();
                obj.index = opt.index();
                //obj.placeholder.text(obj.val);
                
                // attach JS form clicks to NoJS form
                selectOptions.each( function(){
                    var option = $(this);
                    option.removeAttr("selected");
                    if( option.attr("value") == obj.val )
                        option.attr("selected","selected");
                });
                
                // submit form
                form[0].submit();
            });
        }
    };
    
    var finalDD = new DropDown( $('#dd') );
    $('select').hide();
    
});