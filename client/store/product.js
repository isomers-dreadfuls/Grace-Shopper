import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const SET_SEARCH = 'SET_SEARCH'

const initialState = {
  allProducts: [],
  singleProduct: {},
  search: ''
}

// this route is for setting a single product to the store
export const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

// this route is for setting all products in the store
export const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts
})

let storeString = ''
export const setSearch = searchString => {
  storeString = searchString
  return {
    type: SET_SEARCH,
    searchString
  }
}

// this route is for retrieving one product from the database using the product id
export const fetchProduct = productId => async dispatch => {
  const res = await axios.get(`/api/products/${productId}`)
  const product = res.data
  const action = getProduct(product)
  dispatch(action)
}

// this route is for retrieving all the products from the database
export const fetchAllProducts = key => async dispatch => {
  if (key) {
    dispatch(setSearch(key))
  }
  const res = await axios.get('/api/products')
  let allProducts = res.data
  if (storeString) {
    allProducts = allProducts.filter(product => {
      const query = key.toUpperCase()
      const productName = product.name.toUpperCase()
      return productName.includes(query)
    })
  }
  dispatch(getAllProducts(allProducts))
}

// this route is for adding a review to a specific product

// reviewInfo includes: {
//   rating,
//   reviewText,
//   userId,
//   productId
// }
export const addNewReview = reviewInfo => async dispatch => {
  const res = await axios.put('/api/reviews', reviewInfo)
  const product = res.data
  const action = getProduct(product)
  dispatch(action)
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.allProducts
      }
    case GET_PRODUCT:
      return {
        ...state,
        singleProduct: action.product
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.searchString
      }
    default:
      return state
  }
}
