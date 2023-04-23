import { createStore } from 'vuex'


const setLocalCartList = (state)=>{
  const {cartList} = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString 
}
const setLocalProducts = (state)=>{
  const {products} = state
  const productsString = JSON.stringify(products)
  localStorage.products = productsString
}
const setLocalAllProducts = (state)=>{
  const {allProducts} = state
  const allProductsString = JSON.stringify(allProducts)
  localStorage.allProducts = allProductsString
}


const getLocalCartList = ()=>{
  try{
    return JSON.parse(localStorage.cartList)
  }
  catch(e){
    return {}
  }
}

const getLocalProducts = ()=>{
  try{
    return JSON.parse(localStorage.products)
  }
  catch(e){
    return []
  }
}
const getLocalAllProducts = ()=>{
  try{
    return JSON.parse(localStorage.allProducts)
  }
  catch(e){
    return []
  }
}
export default createStore({
  state: {
    cartList: getLocalCartList(),
    products:getLocalProducts(),
    allProducts:getLocalAllProducts()
  },
  getters: {
  },
  mutations: {
    allOrders(state,payload){
      const {products,shopId,Num,totalSum} = payload
      state.allProducts.unshift({products:products,id:shopId,Num:Num,totalSum:totalSum})
      setLocalAllProducts(state)
    },
    changeProducts(state,payload){
      const  products = payload
      state.products = products
      setLocalProducts(state)
    },
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {shopName:'',productList:{}} }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += payload.num
      if (payload.num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
      //console.log(state.cartList);
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      //这里如果不给state.cartList[shopId]赋值,会导致严重的错误
      state.cartList[shopId] = {shopName:'',productList:{}}
      setLocalCartList(state)
    },
    setCartItemChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (let key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    changeShopName(state,payload){
      const {shopId,shopName} = payload
      const shopInfo = state.cartList[shopId] || {
        shopName:'',productList:{}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    clearCartData(state,shopId){
      state.cartList[shopId].productList = {} 
    }
  },
  actions: {

  },
  modules: {
  }
})
