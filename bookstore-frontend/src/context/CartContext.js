import React,{createContext,useReducer,useContext} from 'react';
import {v4 as uuidv4} from 'uuid';
const CartContext=createContext();

const cartreducer=(state,action)=>{
    switch(action.type){
        case'ADD_TO_CART':
            return[...state,{...action.payload,uniqueId:uuidv4()}]//add unique ID item to each  item
        case 'REMOVE_FROM_CART':
            return state.filter((item)=>item.uniqueId!==action.payload) //Remove by id
        case 'CLEAR_CART':
            return[]
        default:
            return state;             
         }
        }

        export const CartProvider=({children})=>{
            const[cart,dispatch]=useReducer(cartreducer,[]);
            return(
                <CartContext.Provider value={{cart,dispatch}}>
                    {children}
                </CartContext.Provider>
            )
        }

        export const useCart=()=>{
            return useContext(CartContext);
        }