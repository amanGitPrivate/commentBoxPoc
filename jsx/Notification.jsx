/** @jsx React.DOM */


var CommentSet = React.createClass({
addCommentToList:function(dataSent,editedObject,comment){

var self = this;
	dataSent.map(function(dataAll,index){

		if(editedObject === dataAll){
			console.log('found',dataAll,editedObject);
			var tempObject =   { 
									userName:"Aman",
									comment:comment,
									commentTime:new Date(),
									Likes:0,
									DisLikes:0,
									childComments:[]	
								  }
			dataAll["childComments"].push(tempObject);
			console.log('dataComm',dataAll["childComments"]);
			self.setState({});
		}	
		else if(Object.keys(dataAll["childComments"]).length > 0){
			self.addCommentToList(dataAll["childComments"],editedObject,comment);
		}
						
	});
	
},

callBoxAdder:function(innerCommentObj,event){
if(event.keyCode === 13){
	console.log('innerCommentObj',innerCommentObj);

	if(event.target.value.length > 0){
		this.addCommentToList(this.props.data,innerCommentObj,event.target.value)
		event.target.classList.add('displayNone');
	}
	

}

},

callIncrementorOrDec:function(innerCommentObj,decider,event){
	this.addOrReuduceTheValue(this.props.data,innerCommentObj,decider);
},

addOrReuduceTheValue:function(dataSent,editedObject,decider){
var self = this;
	dataSent.map(function(dataAll,index){

		if(editedObject === dataAll){
			if(decider === "increase"){
				dataAll["Likes"] = dataAll["Likes"]+1;
			}
			else{
				dataAll["DisLikes"] = dataAll["DisLikes"]+1;
			}
			self.setState({});
		}	
		else if(Object.keys(dataAll["childComments"]).length > 0){
			self.addOrReuduceTheValue(dataAll["childComments"],editedObject,decider);
		}
						
	});
	
},

makeReply:function(event){
	if(event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.contains('displayNone')){
	  event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.remove('displayNone');
	}
	else{
		event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.add('displayNone');
	}
},

returnTime:function(commentTime){

var date = new Date();
var date2 = new Date(commentTime);
// get total seconds between the times
var delta = Math.abs(date - date2) / 1000;

// calculate (and subtract) whole days
var days = Math.floor(delta / 86400);
delta -= days * 86400;

// calculate (and subtract) whole hours
var hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

// calculate (and subtract) whole minutes
var minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

// what's left is seconds
var seconds = delta % 60;

if(days>0){
return (days+" Days ago");

}
else if(hours>0){
return (hours+" hours ago");

}
else if(minutes>0){
return (minutes+" minutes ago");

}
else{
	if(seconds < 1)
	return ("few seconds ago");
	else{
		return (Math.round(seconds)+" seconds ago");
	}
}

},

innerCommentMaker : function(commentSet){

var self = this;
var innerCommentSet = commentSet.map(function(innerComment,index){

console.log('innerComment',innerComment);
var innerObj = innerComment,
    time = self.returnTime(innerComment["commentTime"]);

return(
<ul className = "ulClassMarginClass">
	<img className = "imageSection" src={"./images/"+innerComment["userName"]+".png"}></img>
	<li><div  className = "userName">{innerComment["userName"]}</div><div className = "timeStamp"> - {time}</div></li>
	<li className = "message">{innerComment["comment"]}</li>
	<li className = "replyShareButton">
		<div className = "inlineClass">
			{innerComment["Likes"]}
			<span className = "upCarrot" onClick = {self.callIncrementorOrDec.bind(this,innerObj,"increase")}></span>
		</div>
		 <span className = "separator">|</span>
		<div className = "inlineClass">
		 {innerComment["DisLikes"]}
		 <span className = "downCarrot" onClick = {self.callIncrementorOrDec.bind(this,innerObj,"decrease")}></span>
		</div> 
		 <div className = "commentButtons">
		 	<span className = "midDot"></span>
		 	<span  onClick = {self.makeReply}>Reply</span>
		 </div>
		 <div className = "commentButtons">
		 	<span className = "midDot"></span>Share
		 </div>
	 </li>
	 <span className = "rightArrow"></span>
	 <input type = "text"  className = "displayNone commentBox" onKeyUp = {self.callBoxAdder.bind(this,innerObj)}></input>

	{Object.keys(innerComment["childComments"]).length > 0 ? self.innerCommentMaker(innerComment["childComments"]) : null}
</ul>
)
});
	
	return innerCommentSet;

},

makeCommentBox:function(commentJSON){
	
	var comment,
		self = this;
		var textComment;
			textComment = self.innerCommentMaker(commentJSON);
		return textComment;

	return (<div className = "commentWrapper">{comment}</div>);

},


render: function() {

var commentSet = this.makeCommentBox(this.props.data);

return(
<div className = "editorTextField">
	{commentSet}
</div>
 );

 }


});

var tab = React.createClass({


 getInitialState: function(){
        return {
            data: this.props.data
        };
    },  

callBoxAdderForFirstElement:function(event){
	if(event.keyCode === 13){
		var enteredComment = document.querySelector('.mainCommentEditor').value;
			if(enteredComment.trim().length > 0){
						var firstElement =  { 
							userName:"Aman",
							commentTime:new Date(),
							comment:enteredComment,
							Likes:0,
							DisLikes:0,
							childComments:[]	
						  }
					this.state.data.unshift(firstElement);
					document.querySelector('.mainCommentEditor').value = ""
					this.setState({});	
			}
	
	}
				  
},

render: function() {

return(
<div className = "editorTextField">
<img className = "imageSection" src={"./images/baseComment.png"}></img>
<input placeholder = "Join the discussion..." type = "text" className = "mainCommentEditor" onKeyUp = {this.callBoxAdderForFirstElement}></input>
<div className = "textDivTemp"></div>
<CommentSet data = {this.state.data}/>
</div>
 );

 }
});
    

var commentJSON = [{
	userName:"DeveloperMain",
	commentTime:"Tue May 03 2016 12:55:06 GMT+0530 (IST)",
	comment:"Hi I am completing an assignment",
	Likes:1,
	DisLikes:3,
	childComments:[{
		userName:"Akash",
		commentTime:"Tue May 03 2016 12:59:06 GMT+0530 (IST)",
		comment:"Your assignment looks good what can we do here",
		Likes:1,
		DisLikes:3,
		position:"0^1",
		childComments:[{
			userName:"Akshi",
			commentTime:"Tue May 03 2016 13:00:14 GMT+0530 (IST)",
			comment:"We can reply to comment on multilevel",
			Likes:1,
			DisLikes:3,
			childComments:[]
	}]
	},{
		userName:"Brian",
		commentTime:"Tue May 03 2016 13:10:14 GMT+0530 (IST)",
		comment:"Can we increase Likes and Dislikes also",
		Likes:1,
		DisLikes:3,
		childComments:[]
	}]
},
  { 
	userName:"Megan",
	commentTime:"Tue May 03 2016 13:20:14 GMT+0530 (IST)",
	comment:"Yes we can. Try and tell me how you like it",
	Likes:1,
	DisLikes:3,
	childComments:[]	
  }
]

React.renderComponent(<tab data = {commentJSON}/>,document.getElementById('container'));



