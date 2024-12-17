import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {
    Menu_School_Yearloading: false,
    Menu_School_Year: [],

    Menu_School_Levelloading: false,
    Menu_School_Level: [],

    Menu_School_Nameloading: false,
    Menu_School_Name: [],

    Menu_School_Yearloading: false,
    Menu_School_Year: [],

    Menu_Genderloading: false,
    Menu_Gender: [],

    Menu_Gradeloading: false,
    Menu_Grade: [],

    Menu_Ethnicityloading: false,
    Menu_Ethnicity: [],
  
}

// export const fetchMenu_School_Year = createAsyncThunk(
//     'fetchMenu_School_Year',
//     async (Menu_School_Year, thunkAPI) => {
//         Menu_School_Year = { ...Menu_School_Year, elasticQueryName: "Menu_Filter" }
//       const response = await getNetSales(Menu_School_Year);
//       return response.data
//     }
//   )

    export const fetchMenu_School_Year = createAsyncThunk(
      'fetchMenu_School_Year',
      async (Menu_School_Year, thunkAPI) => {
        Menu_School_Year = { ...Menu_School_Year, elasticQueryName: "Menu_School_Year" }
        const response = await getNetSales(Menu_School_Year);
        return response.data
      }
    )

    export const fetchMenu_School_Level = createAsyncThunk(
      'fetchMenu_School_Level',
      async (Menu_School_Level, thunkAPI) => {
        Menu_School_Level = { ...Menu_School_Level, elasticQueryName: "Menu_School_Level" }
        const response = await getNetSales(Menu_School_Level);
        return response.data
      }
    )

    export const fetchMenu_School_Name = createAsyncThunk(
      'fetchMenu_School_Name',
      async (Menu_School_Name, thunkAPI) => {
        Menu_School_Name = { ...Menu_School_Name, elasticQueryName: "Menu_School_Name" }
        const response = await getNetSales(Menu_School_Name);
        return response.data
      }
    )

    export const fetchMenu_Gender = createAsyncThunk(
      'fetchMenu_Gender',
      async (Menu_Gender, thunkAPI) => {
        Menu_Gender = { ...Menu_Gender, elasticQueryName: "Menu_Gender" }
        const response = await getNetSales(Menu_Gender);
        return response.data
      }
    )

    export const fetchMenu_Grade = createAsyncThunk(
      'fetchMenu_Grade',
      async (Menu_Grade, thunkAPI) => {
        Menu_Grade = { ...Menu_Grade, elasticQueryName: "Menu_Grade" }
        const response = await getNetSales(Menu_Grade);
        return response.data
      }
    )

    export const fetchMenu_Ethnicity = createAsyncThunk(
      'fetchMenu_Ethnicity',
      async (Menu_Ethnicity, thunkAPI) => {
        Menu_Ethnicity = { ...Menu_Ethnicity, elasticQueryName: "Menu_Ethnicity" }
        const response = await getNetSales(Menu_Ethnicity);
        return response.data
      }
    )

export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
        // builder.addCase(fetchMenu_School_Year.fulfilled, (state, action) => {
        //     state.Menu_School_Year = action.payload;
        // }).addCase(fetchMenu_School_Year.pending, (state, action) => {
        //     state.Menu_School_Yearloading = true;
        // }) 

    builder.addCase(fetchMenu_School_Year.fulfilled, (state, action) => {
      state.Menu_School_Year = action.payload;
    }).addCase(fetchMenu_School_Year.pending, (state, action) => {
        state.Menu_School_Yearloading = true;
    }) 

    builder.addCase(fetchMenu_School_Level.fulfilled, (state, action) => {
      state.Menu_School_Level = action.payload;
    }).addCase(fetchMenu_School_Level.pending, (state, action) => {
        state.Menu_School_Levelloading = true;
    }) 

    builder.addCase(fetchMenu_School_Name.fulfilled, (state, action) => {
      state.Menu_School_Name = action.payload;
    }).addCase(fetchMenu_School_Name.pending, (state, action) => {
        state.Menu_School_Nameloading = true;
    }) 

    builder.addCase(fetchMenu_Gender.fulfilled, (state, action) => {
      state.Menu_Gender = action.payload;
    }).addCase(fetchMenu_Gender.pending, (state, action) => {
        state.Menu_Genderloading = true;
    }) 

    builder.addCase(fetchMenu_Grade.fulfilled, (state, action) => {
      state.Menu_Grade = action.payload;
    }).addCase(fetchMenu_Grade.pending, (state, action) => {
        state.Menu_Gradeloading = true;
    }) 

    builder.addCase(fetchMenu_Ethnicity.fulfilled, (state, action) => {
      state.Menu_Ethnicity = action.payload;
    }).addCase(fetchMenu_Ethnicity.pending, (state, action) => {
        state.Menu_Ethnicityloading = true;
    }) 
      
  }
})



export default filter.reducer