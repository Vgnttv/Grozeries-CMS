import * as request from 'superagent'
import { baseUrl } from '../../constants'
import { logout } from '../auth/users'
import { isExpired } from '../../jwt'

export const ADD_PRODUCT = 'ADD_PRODUCT'

const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
})

export const createProduct = (shopId, product) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .post(`${baseUrl}/shops/${shopId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(product)
    .then(response => {
      console.log('createProduct' ,response)
      dispatch(addProduct(response.body))
    })
    .catch(err => console.error(err))
}