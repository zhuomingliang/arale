define("#widget/0.8.0/template-widget",["./widget","handlebars","$"],function(a,b,c){var d=a("./widget"),e=a("handlebars"),f=a("$"),g=d.extend({helpers:null,parseElementFromTemplate:function(){var a=this.helpers;if(a)for(var b in a)e.registerHelper(b,a[b]);var c=e.compile(this.options.template)(this.model);if(a)for(b in a)delete e.helpers[b];this.element=f(c)}});c.exports=g});