define(function(require, exports, module) {

    var Dropdown = require('./dropdown');
    var $ = require('jquery');
    var Templatable = require('templatable');

    var Choose = Dropdown.extend({

        Implements: Templatable,

        attrs: {
            prefix: 'ui-chosen',
            triggerType: 'click',
            triggerTemplate: '<a href="#"></a>',
            template: '<ul class="{{prefix}}" data-role="container">{{#each select}}<li data-role="item" class="{{../prefix}}-item" data-value="{{value}}" data-selected="{{selected}}">{{text}}</li>{{/each}}</ul>',
            disabled: false
        },

        events: {
            'click [data-role=item]': function(e) {
                var target = $(e.currentTarget);
                this.select(target);
            }
        },

        initAttrs: function(config) {
            Choose.superclass.initAttrs.call(this, config);

            // trigger 如果为 select 则根据 select 的结构生成
            // trigger 如果为其他 DOM，则由用户提供 model
            var select = this.get('trigger');
            if (select[0].tagName.toLowerCase() == 'select') {
                this.model = {
                    select: parseSelect(select[0])
                };
                // 替换 trigger
                var newTrigger = $(this.get('triggerTemplate'));
                this.set('trigger', newTrigger);
                select.after(newTrigger).hide();
            }

            this.model.prefix = this.get('prefix');
        },

        setup: function() {
            Choose.superclass.setup.call(this);
            var that = this;

            this.get('trigger')
                .html(this.$('[data-selected=true]').html())
                .on('click', function(e) {
                    e.preventDefault();
                    that.show();
                });

            $(document).on('click', function() {
                that.hide();
            });
        },

        select: function(selector) {
            if ($.isNumeric(selector)) { // 如果是索引
                selector = this.$('[data-role=item]').eq(selector);
            } else if (typeof selector === 'string') { // 如果是选择器
                selector = this.$(selector).eq(0);
            } else { // 如果是 DOM
                selector = $(selector);
            }

            this.currentItem.attr('data-selected', false)
                .removeClass(this.get('prefix') + '-selected');
            this.currentItem = selector;
            this.currentItem.attr('data-selected', true)
                .addClass(this.get('prefix') + '-selected');

            this.get('trigger').html(selector.html());
            this.trigger('change', [selector]);

            this.hide();
        },

        syncModel: function(model) {
            this.model = model;
            this.model.prefix = this.get('prefix');

            renderPartial('[data-role=container]');
        }

    });

    module.exports = Choose;

    // Helper
    // ------

    // 转换 select 对象为 object
    //
    // <select>
    //   <option value='value1'>text1</option>
    //   <option value='value2' selected>text2</option>
    // </select>
    //
    // ------->
    //
    // [
    //   {value: 'value1', text: 'text1',
    //      defaultSelected: false, selected: false}
    //   {value: 'value2', text: 'text2',
    //      defaultSelected: true, selected: true}
    // ]
    function parseSelect(select) {
        var i, result = [], options = select.options, l = options.length;
        for (i = 0; i < l; i++) {
            var j, o = {}, option = options[i];
            var fields = ['text', 'value', 'defaultSelected', 'selected'];
            for (j in fields) {
                var field = fields[j];
                o[field] = option[field];
            }
            if (o.defaultSelected) {
                o.selected = true;
            }
            result.push(o);
        }
        return result;
    }
});