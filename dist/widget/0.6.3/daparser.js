define("#widget/0.6.3/daparser",[],function(a,b){function d(a){var b=[];for(var c=0,d=a.length;c<d;c++)b[c]=a[c];return b}function g(a){if(a.dataset)return a.dataset;var b=a.attributes,c={};for(var d in b)if(b.hasOwnProperty(d)){var g=b[d].name;e.test(g)&&(g=g.substring(5).replace(f,function(a,b){return b.toUpperCase()}),c[g]=b[d].value)}return c}function j(){return"daparser-"+i++}var c=b;c.parse=function(a){var b=d(a.getElementsByTagName("*"));b.unshift(a);var c={};for(var e=0,f=b.length;e<f;e++){var i=b[e],k=g(i),l=i.getAttribute(h),m=!0;for(var n in k){m&&(l||(l=j(),i.setAttribute(h,l),i.className+=" "+l),m=!1);var o=k[n],p=c[n]||(c[n]={});p[o]||(p[o]=""),p[o]+=(p[o]?",":"")+"."+l}}return c};var e=/^data-/i,f=/-[\w\d_]/,h="data-daparser-cid",i=0});