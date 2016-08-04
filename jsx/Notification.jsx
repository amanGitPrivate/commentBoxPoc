/** @jsx React.DOM */

var ProductDetails = React.createClass({
    getInitialState: function(){
        return {
            data: this.props.data,
        };
    },

    makeCheckCircles:function(data){

    	var finalCircleList = [];

    	for(var i = 0;i < 4;i++){
    		if(i<=data){
    			finalCircleList.push(<span className = "circle colored"></span>)
    		}
    		else{
    			finalCircleList.push(<span className = "circle"></span>)
    		}
    	}
    	return(<div>{finalCircleList}</div>)

    },
    makeProductDetailsTable:function(){
		    var self = this,
		    	keyList,
				onTrSet = [],
				completeTable=[];
			var sum = 0;
			_.map(self.props.itemsinCart,function(value){ sum = sum +value.pricePerUnit });

			var trData=[];
				trData.push(<td></td>);
				trData.push(<td></td>);
				trData.push(<td>
						<div className = "totalWrapper">
							<div className = "totalValueProduct"><span><img className = "cartImageProdDetailpage" src="./images/cart.ico"></img>{self.props.itemsinCart.length}item,</span><span className = "totAmout">${sum}</span></div>
							<div className = "totalValueProduct">these items are in cart</div>
						</div>
					</td>);
				onTrSet.push(<tr className = "totalRow">{trData}</tr>);

			keyList = Object.keys(self.props.productJSON);
			keyList.map(function(data,index){
				var trData=[];
					if(data === "Calorie"){
						trData.push(<td>{data}</td>);
					    trData.push(<td className = "calorieNumber">{self.props.productJSON[data]}</td>);
					    trData.push(<td></td>);
					    onTrSet.push(<tr>{trData}</tr>);
					}
					else if(data !== "Calorie" && data !== "productName" && data !== "productTag" && data !== "pricePerUnit"){
						var circleDivSet;
						trData.push(<td>{data}</td>);
						trData.push(<td>{self.makeCheckCircles(self.props.productJSON[data])}</td>)
						trData.push(<td>{self.props.ratingJSON[self.props.productJSON[data]]}</td>)
						onTrSet.push(<tr>{trData}</tr>);
					}
					
			})

			var sum = 0;
			_.map(self.props.itemsinCart,function(value){ sum = sum +value.pricePerUnit });

			var trData=[];
				trData.push(<td></td>);
				trData.push(<td></td>);
				trData.push(<td>
						<div className = "totalWrapper">
							<div className = "totalValueProduct"><span><img className = "cartImageProdDetailpage" src="./images/cart.ico"></img>{self.props.itemsinCart.length}item,</span><span className = "totAmout">${sum}</span></div>
							<div className = "totalValueProduct">these items are in cart</div>
						</div>
					</td>);
				onTrSet.push(<tr className = "totalRow">{trData}</tr>);

			completeTable.push(<table>{onTrSet}</table>);
			return completeTable;
    },

    goBackToStore:function(){

    	var self = this;
    	self.props.showStore();	

    },

   render: function() {
    
    var self = this,
    	productDetailsTable = this.makeProductDetailsTable(); 

    return(
        <div className = "productDetailsWrapper">
        	<div className = "productNameWrapper">
        		<div className = "productTagLineWrapper"><img className = "selectedProductImg" src={"./images/"+(self.props.productJSON["productName"]) +".ico"}></img><span>{self.props.productJSON["productName"]} :</span>{self.props.productJSON["productTag"]}<span></span></div>
        		{productDetailsTable}
        	</div>
        	<div className = "buttonContainer">
        		<div className = "addToCart" onClick={this.props.addItemInCart.bind(this,self.props.productJSON)}>add to Cart</div>
        		<div className = "backToStore" onClick = {this.goBackToStore}>back to store</div>
        	</div>
        </div>
        );
     }
    });

var Cart = React.createClass({
    getInitialState: function(){
        return {
            data: this.props.data,
        };
    },

    removeItemsformCart:function(prodName){

    	var filterdArray = [];
    	var totalArray = this.props.itemsinCart;
		totalArray.map(function(data,index){
				if(data["productName"] !== prodName){
						filterdArray.push(data);
				}
		});
    	this.props.resetFilteredArray(filterdArray);
    },
	makeCartItemsTable:function(){
		var self = this, trSet = [],completeTable =[],trData=[];

		trData.push(<td>items</td>);
		trData.push(<td>Quantity</td>);
		trData.push(<td>Price</td>);
		trData.push(<td></td>);
		trSet.push(<tr>{trData}</tr>);
			
		_.values(_.groupBy(this.props.itemsinCart,"productName")).map(function(data,index){
			trData=[];
				trData.push(<td>{data[0].productName}</td>);
				trData.push(<td>
						<div className="quantitybuttons">{data.length}</div>
						<div className="quantitybuttons" onClick={self.props.increaseQuantity.bind(self,data[0])}>+</div>
						<div className="quantitybuttons" onClick={self.props.decreaseQuantity.bind(self,data[0])}>-</div>
					</td>
				);
				trData.push(<td>$ {data[0].pricePerUnit}</td>);
				trData.push(<td onClick = {self.removeItemsformCart.bind(self,data[0].productName)}>X</td>);
				trSet.push(<tr>{trData}</tr>);
		});
		var sum = 0;
		_.map(this.props.itemsinCart,function(value){ sum = sum +value.pricePerUnit });
		trData=[];
		trData.push(<td>Total</td>);
		trData.push(<td>{self.props.itemsinCart.length}</td>);
		trData.push(<td>$ {sum}</td>);
		trData.push(<td></td>);
		trSet.push(<tr>{trData}</tr>);

		completeTable.push(<table><tbody>{trSet}</tbody></table>);
		return completeTable;
    },
   	render: function() {
    	
    	var cartItemsTable = this.makeCartItemsTable(); 
	
    	return(
    	    <div className = "cartWrapper">
	    	    <div className = "descriptionWrapper">
	    	    	<div>Thanks for shopping at the React store</div>
	    	    	<div>This is your shopping cart. Here you can edit the items, go back to store, clear the cart or check out</div>
	    	    </div>
    	    	<div className = "cartItemsWrapper">
    	    		{cartItemsTable}
    	    	</div>
    	    	<div className = "buttonContainer">
    	    		<div className = "backToStore" onClick = {this.props.showStore}>back to store</div>
    	    	</div>
    	    </div>
    	);
    }
});

var ShoppingList = React.createClass({
 	
 	showProductDetails:function(event){
 		this.props.showProductDetails(event);
 	},

 	addItemInCart:function(item){
 		this.props.addItemInCart(item);
 	},

   	render: function() {
    	
		var self = this,
			onTrSet = [],
			lastElement = [],
			completeTable=[];
			
		var sum = 0;
			_.map(self.props.itemsinCart,function(value){ sum = sum +value.pricePerUnit });
				var trData=[];
					trData.push(<td></td>);
					trData.push(<td></td>);
					trData.push(<td></td>);
					trData.push(<td>
						<img src="./images/cart.ico"></img>
						<div className = "totalValue"><span>{self.props.itemsinCart.length} items,</span><span className = "totAmout">${sum}</span></div>
						</td>);
					onTrSet.push(<tr className = "totalRow">{trData}</tr>);

		self.props.filteredData.map(function(data,index){

			var trData=[];
				trData.push(<td className="imageContainer"><img src={"./images/"+(data.productName) +".ico"}></img></td>);
				trData.push(<td><div className = "clickTag" onClick = {self.showProductDetails} data-item = {data.productName}>{data.productName}</div><div>{data.productTag}</div></td>);
				trData.push(<td>$ {data.pricePerUnit}</td>);
				trData.push(<td className = "clickTag" onClick = {self.addItemInCart.bind(self,data)}>add to cart</td>);

				onTrSet.push(<tr>{trData}</tr>);
		});
		var sum = 0;
			_.map(self.props.itemsinCart,function(value){ sum = sum +value.pricePerUnit });
				var trData=[];
					trData.push(<td></td>);
					trData.push(<td></td>);
					trData.push(<td></td>);
					trData.push(<td>
						<img src="./images/cart.ico"></img>
						<div className = "totalValue"><span>{self.props.itemsinCart.length} items,</span><span className = "totAmout">${sum}</span></div>
						</td>);
					onTrSet.push(<tr className = "totalRow">{trData}</tr>);

		completeTable.push(<table className = "allProductTable"><tbody>{onTrSet}</tbody></table>);
		return (<div>{completeTable}</div>);
    }
});

var ShoppingCart = React.createClass({
 	getInitialState: function(){
        return {
            data: this.props.data,
            filteredData: this.props.data,
            showProductDetails:false,
            showCart:false,
            productJSON:'',
            itemsinCart : [],
        };
    },  
    addItemInCart:function(item){
    	var itemsInCart = this.state.itemsinCart; 
		itemsInCart.push(item);
		this.setState({
			itemsinCart:itemsInCart,
			showCart:true,
			showProductDetails:false
		});
    },
	searchCart:function(){
		 var data = this.state.data,
		 	 searchedData = [],
		     searchString = document.querySelector('.searchCart').value;


		data.filter(function(items){
			if(items["productName"].search(searchString) !== -1){
				searchedData.push(items);	
			}
		});
		this.setState({filteredData: searchedData});
	},

	componentDidMount: function(){
		this.setState({filteredData: this.props.data})
	},

	resetFilteredArray:function(newItems){
		// debugger;
		var showCart = true;
		if (newItems.length === 0) {
			showCart = false;
		}
		this.setState({
			itemsinCart: newItems,
			showCart: showCart
		})
	},

	showStore:function(){
		this.setState({
			showProductDetails:false,
			showCart:false
		});
	},
	showProductDetails:function(event){

		var self = this,
			product = event.target.getAttribute('data-item'),
			productJSON = {};

		this.props.data.map(function(data,index){
			if(data["productName"] === product){
				productJSON = data
			}
		})
		this.setState({showProductDetails:true,productJSON:productJSON})
	},
	increaseQuantity:function(item){
		var itemsInCart = this.state.itemsinCart
		itemsInCart.push(_.clone(item));
		this.setState({
			itemsinCart:itemsInCart
		});
	},
	decreaseQuantity:function(item){
		// this.state.itemsinCart.push(item);
		var newArray = _.without(this.state.itemsinCart,item);
		var showCart = true;
		if (newArray.length === 0) {
			showCart = false;
		}
		this.setState({
			itemsinCart:newArray,
			showCart: showCart
		});
	},
	render: function() {
	
		var self = this;
			
		return(

			<div className = "siteWrapper">
				<div className = "headerWrapper">
					<img className = "siteImage" src="./images/Shop.ico"></img>
					<div className = "siteBanner">Angular Fruit Store</div>
				</div>
					{this.state.showProductDetails ? <ProductDetails itemsinCart = {this.state.itemsinCart} ratingJSON = {this.props.ratingJSON} showStore = {this.showStore} data = {self.props.data} productJSON = {this.state.productJSON} addItemInCart={this.addItemInCart}/>: null}
					{this.state.showCart ? <Cart 	resetFilteredArray = {this.resetFilteredArray} 
													itemsinCart = {this.state.itemsinCart} 
													showStore = {this.showStore} 
													increaseQuantity = {this.increaseQuantity} 
													decreaseQuantity = {this.decreaseQuantity} /> : null}
					{!this.state.showProductDetails && !this.state.showCart ? 
						<div>
							<div className = "descriptionWrapper">
								<div>Welcome to the Angular Store</div>
								<div>Please select the products you want and add them to your shopping cart</div>
								<div>When you are done click on shopping cart icon to check out</div>
							</div>
							Search : <input placeholder = "Search" type = "text" className = "searchCart" onKeyUp = {this.searchCart}></input>
							{!this.state.showProductDetails && !this.state.showCart ? <ShoppingList addItemInCart = {this.addItemInCart} showProductDetails = {this.showProductDetails} filteredData = {this.state.filteredData} itemsinCart = {this.state.itemsinCart}/> : null}
						</div> 
					: null}
			</div>
		);
	 }
});
    

var cartJSON = [
	{
		productName:"Apple",
		productTag:"Apple a day keeps doctor away",
		pricePerUnit:12,
		Calorie:10,
		FiberUnits:2,
		Vitamins:1
	},
	{
		productName:"Grapes",
		productTag:"Wine is great. Grapes are Better",
		pricePerUnit:8,
	    Calorie:60,
		FiberUnits:0,
		Vitamins:0
	},
	{
		productName:"Grapefruit",
		productTag:"Pink or Red always healthy and delicious",
		pricePerUnit:5,
	    Calorie:30,
		FiberUnits:2,
		Vitamins:3
	},
	{
		productName:"Papaya",
		productTag:"Super-popular for breakfast",
		pricePerUnit:5,
	    Calorie:30,
		FiberUnits:2,
		Vitamins:3
	},
	{
		productName:"Pineapple",
		productTag:"Enjoy it (But don't forget to peel it first)",
		pricePerUnit:5,
	    Calorie:30,
		FiberUnits:2,
		Vitamins:3
	}
]
	var ratingJSON = 
	{
		0:"Negligiable: below 5% of the recommended daily value",		
		1:"Low: between 5 and 10% of the recommended daily value",
		2:"Average: between 10 and 20% of the recommended daily value",
		3:"High: above 20% of the recommended daily value",
	}
	

React.renderComponent(<ShoppingCart data = {cartJSON} ratingJSON = {ratingJSON}/>,document.getElementById('container'));



