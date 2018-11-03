(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(43)},41:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(10),i=n.n(r),o=n(11),s=n(12),u=n(13),c=n(15),m=n(14),d=n(16),f=n(2),p=n.n(f),h="/api/persons",v=function(){return p.a.get(h)},w=function(e){return p.a.post(h,e)},E=function(e,t){return p.a.put("".concat(h,"/").concat(e),t)},b=function(e){return p.a.delete("".concat(h,"/").concat(e))},N=(n(41),function(e){var t=e.deleteHandler,n=e.id;return l.a.createElement("button",{onClick:t(n)},"Poista")}),k=function(e){return l.a.createElement("p",null,e.name," : ",e.number," ",l.a.createElement(N,{id:e.id,deleteHandler:e.deleteHandler}))},H=function(e){var t=e.persons,n=e.deleteHandler;return l.a.createElement("div",null,t.map(function(e){return l.a.createElement(k,{name:e.name,number:e.number,key:e.name,id:e.id,deleteHandler:n})}))},g=function(e){var t=e.handler,n=e.state,a=e.name;return l.a.createElement("div",null,a,": ",l.a.createElement("input",{value:n,onChange:t}))},S=function(e){var t=e.submitHandler,n=e.fieldHandler,a=e.state;return l.a.createElement("form",{onSubmit:t},l.a.createElement("div",null,l.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),l.a.createElement(g,{name:"nimi",state:a.newName,handler:n("newName")})),l.a.createElement("div",null,l.a.createElement(g,{name:"numero",state:a.newNumber,handler:n("newNumber")})),l.a.createElement("div",null,l.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},y=function(e){var t=e.message,n=e.type;return null===t?null:l.a.createElement("div",{className:n},t)};var j=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(m.a)(t).call(this,e))).addPerson=function(e){e.preventDefault();var t,a,l=(t=n.state.persons,a=n.state.newName,t.map(function(e){return e.name}).includes(a)),r={name:n.state.newName,number:n.state.newNumber};n.handleAdd(l,r)},n.handleChange=function(e){return function(t){return n.setState(Object(o.a)({},e,t.target.value))}},n.state={persons:[],newName:"",newNumber:"",newFilter:"",error:null,info:null},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;v().then(function(t){console.log("promise fulfilled",t.data[0]),e.setState({persons:t.data})})}},{key:"handleAdd",value:function(e,t){var n=this;if(console.log("add alkaa",e,t),e){var a=this.state.persons[this.state.persons.findIndex(function(e){return e.name===n.state.newName})].id;window.confirm("Henkil\xf6 ".concat(this.state.newName," on jo luettelossa. Tallennetaanko uusi numero?"))?E(a,t).then(function(e){n.setState({info:"Henkil\xf6n ".concat(n.state.newName," tiedot p\xe4ivitettiin palvelimelle"),persons:n.state.persons.map(function(t){return t.id!==e.data.id?t:e.data}),newName:"",newNumber:""}),setTimeout(function(){n.setState({info:null})},5e3)}).catch(function(e){n.setState({error:"Henkil\xf6 ".concat(n.state.newName," on poistettu palvelimelta, lis\xe4t\xe4\xe4n se nyt uudelleen"),persons:n.state.persons.filter(function(e){return e.id!==a}),newName:"",newNumber:""}),setTimeout(function(){n.setState({error:null})},5e3),n.handleAdd(!1,t)}):(this.setState({info:"Henkil\xf6n ".concat(this.state.newName," tietoja ei p\xe4ivitetty"),newName:"",newNumber:""}),setTimeout(function(){n.setState({info:null})},5e3))}else w(t).then(function(e){n.setState({persons:n.state.persons.concat(e.data),info:"Henkil\xf6n ".concat(n.state.newName," tiedot lis\xe4ttiin palvelimelle"),newName:"",newNumber:""}),setTimeout(function(){n.setState({info:null})},5e3)}).catch(function(e){console.log("virhekoodi",e),console.log("tiedot",t),n.setState({error:"Virhe, henkil\xf6\xe4 ".concat(n.state.newName," ei lis\xe4tty palvelimelle")}),setTimeout(function(){n.setState({error:null})},5e3)})}},{key:"handleDelete",value:function(e){var t=this;return function(){var n=t.state.persons.find(function(t){return t.id===e});console.log("poistettava id",e),console.log("person",n.name),window.confirm("Haluatko poistaa ".concat(n.name," luettelosta?"))&&b(e).then(function(a){t.setState({info:"Henkil\xf6 ".concat(n.name," poistettiin palvelimelta"),persons:t.state.persons.filter(function(t){return t.id!==e})}),setTimeout(function(){t.setState({info:null})},5e3)}).catch(function(a){console.log("on jo poistettu henkil\xf6!!!"),t.setState({error:"Henkil\xf6 ".concat(n.name," on jo poistettu palvelimelta"),persons:t.state.persons.filter(function(t){return t.id!==e})}),setTimeout(function(){t.setState({error:null})},5e3)})}}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h2",null,"Puhelinluettelo"),l.a.createElement("div",null,l.a.createElement(y,{message:this.state.error,type:"error"}),l.a.createElement(y,{message:this.state.info,type:"info"})),l.a.createElement("div",null,l.a.createElement(g,{name:"rajaa valintoja",state:this.state.newFilter,handler:this.handleChange("newFilter")})),l.a.createElement(S,{fieldHandler:this.handleChange,submitHandler:this.addPerson,state:this.state}),l.a.createElement("h2",null,"Numerot"),l.a.createElement(H,{persons:(e=this.state.persons,t=this.state.newFilter,e.filter(function(e){return e.name.includes(t)})),deleteHandler:this.handleDelete.bind(this)}));var e,t}}]),t}(l.a.Component);i.a.render(l.a.createElement(j,null),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.9b656f5b.chunk.js.map