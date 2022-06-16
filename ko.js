import mb from "mithril";
const ko=require('knockout')
require('./ko.vaild')
export default function m(){
	var attrs={};
	if(arguments.length===2&&typeof arguments[1] === "function"){
		attrs['text']=arguments[1]
		delete arguments[1]
	}
	if(arguments.length===3&&typeof arguments[2] === "function"){
		attrs['text']=arguments[2]
		delete arguments[2]
	}
	var vnode = mb.apply(this, arguments)
	
	Object.keys(vnode.attrs).map(a=>{
		if(['visible','text','html','class','style','attr','click','event','submit','enable','disable','value','textInput','hasFocus','checked','options','selectedOptions','optionsText','optionsValue','uniqueName'].indexOf(a)>-1){
			attrs[a]=vnode.attrs[a]
			delete vnode.attrs[a]
		}
	})
	
	
	var oldCreate=vnode.attrs.oncreate
	vnode.attrs.oncreate=function(vn){
		vn.dom&&ko.applyBindingsToNode(vn.dom,attrs,{})
		oldCreate&&oldCreate()
	}
	//console.log(vnode)
	return vnode
}
m.prop=function(value){
	return (value instanceof Array)?ko.observableArray(value):ko.observable(value)
}
m.ko=ko;
m.validation=ko.validation
m.validatedObservable=ko.validatedObservable
Object.keys(mb).map(a=>{
	m[a]=mb[a]
})

