import * as actionTypes from '../actions/actionTypes';

const initialState = {
  personalDetails: {
    name: '' || localStorage.getItem('name'),
    email: '' || localStorage.getItem('email'),
    isAnAdmin: '' || localStorage.getItem('isAnAdmin'),
    token: '' || localStorage.getItem('token')
  },
  shippingAddress: {
    addr1: '' || localStorage.getItem('addr1'),
    addr2: '' || localStorage.getItem('addr2'),
    city: '' || localStorage.getItem('city'),
    state: '' || localStorage.getItem('state'),
    country: '' || localStorage.getItem('country'),
    postalCode: '' || localStorage.getItem('postalCode')
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.POPULATE_LOGGEDIN_USER_DETAILS:
      return { ...state, personalDetails: {
          ...state.personalDetails, name: action.user.name, email: action.user.email,
            isAnAdmin: action.user.isAnAdmin, token: action.token
        }
      };
    
    case actionTypes.UPDATE_SUCCESS:
      return { ...state, personalDetails: {
        ...state.personalDetails, name: action.user.name, email: action.user.email,
          isAnAdmin: action.user.isAnAdmin, token: action.token
        }
      };

      case actionTypes.POPULATE_LOGGEDIN_USER_ADDRESS:
        return { ...state, shippingAddress: {
          ...state.shippingAddress, addr1: action.address.addr1, addr2: action.address.addr2,
            city: action.address.city, state: action.address.state, country: action.address.country,
              postalCode: action.address.postalCode
          }
        };
        
      case actionTypes.UPDATE_ADDRESS_SUCCESS:
        return { ...state, shippingAddress: {
          ...state.shippingAddress, addr1: action.address.addr1, addr2: action.address.addr2,
            city: action.address.city, state: action.address.state, country: action.address.country,
              postalCode: action.address.postalCode
          }
        };

    case actionTypes.LOGOUT:
      return { ...state, personalDetails:
          { ...state.personalDetails, name: null, email: null, isAnAdmin: null, token: null }, shippingAddress:
          { ...state.shippingAddress, addr1: null, addr2: null, city: null, state: null, country: null, postalCode: null }
      };

    default: return state;
  }
}

export default reducer;