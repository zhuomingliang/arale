define("#widget/0.9.3/templatable",["handlebars","$"],function(a,b,c){var d=a("handlebars"),e=a("$"),f={templateHelpers:null,parseElementFromTemplate:function(){var a=this.templateHelpers;if(a)for(var b in a)d.registerHelper(b,a[b]);var c=d.compile(this.get("template"))(this.model);if(a)for(b in a)delete d.helpers[b];this.element=e(c)}};c.exports=f});