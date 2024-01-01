import {createStore} from 'redux'
import {composWithDevTools} from 'redux-devtools-extension'

const store = createStore(
    reducer , composWithDevTools()
)