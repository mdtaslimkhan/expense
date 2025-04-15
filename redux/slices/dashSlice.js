import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SQLite from 'expo-sqlite';


export const getItemList = createAsyncThunk("DashList", async(val) => {
    const db = await SQLite.openDatabaseAsync('test2.db');
    const result = await db.getAllAsync('SELECT * FROM test');
    return result;
});


async function fetchdata(){
    try{
        const db = await SQLite.openDatabaseAsync('test2.db');
        await db.runAsync('DELETE FROM test WHERE id = ?', [JSON.stringify(action.payload.id)]);
       // const result = await db.getAllAsync('SELECT * FROM test');
       // state.data = [...result].filter((item) => item.id != action.payload.id);
        console.log('hello' + action.payload.id);
        console.log('hello' + state.data);
    }catch(err){
        console.log(err);
    }

}


const DashListSlice = createSlice({
    name: "DashList",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    reducers: {
        allItems: async (state, action) => {
            state.data += 1000
        },
        addItems: state => {
            state.data += 1000
        },
        removeItem: async (state, action) => {
            console.log("values: " + JSON.stringify(action.payload.id));
        },
        addList: (state, action) => {
            state.data += action.payload 
        }
    },
    extraReducers: builder => {
        builder.addCase(getItemList.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getItemList.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getItemList.rejected, (state, action) => {
            state.isLoader = true;
        });
    }
});

export const { addItems, removeItem, addList } = DashListSlice.actions;

export default DashListSlice.reducer;