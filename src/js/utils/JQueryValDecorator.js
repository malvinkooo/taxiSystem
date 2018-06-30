class JQueryValDecorator {
    constructor() {
        $.fn.value = function() {            
            if(this.is('[data-class]')) {
                var parent = $(this.parent()[0]);
                var className = this.attr('data-class');
                var groupName = this.attr('data-group');
                var group = parent.find('[data-group="' + groupName + '"]');
                
                if (arguments.length === 0) {
                    // get values and constrcut object
                    var args = [];
                    group.each(function() {
                        var value = $(this).val();
                        args.push(value);
                    });
                    if(window[className]) {
                        var obj = new window[className](...args);
                        return obj;
                    }
                } else {
                    // set value mode
                    var targetValue = arguments[0];
                    group.each(function() {
                        var getter = $(this).attr('data-attr');
                        $(this).val(targetValue[getter]());                        
                    });
                    return this;
                }            
            } else {
                return this.val(...arguments);
            }            
        }
    }
}