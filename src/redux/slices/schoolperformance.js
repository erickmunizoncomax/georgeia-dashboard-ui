import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {
  School_Performance_Fund_Type_Reportloading: false,
  School_Performance_Fund_Type_Report: [],
  
  School_Performance_School_Type_Reportloading: false,
  School_Performance_School_Type_Report: [],

  School_Performance_Metric_Reportloading: false,
  School_Performance_Metric_Report: [],

  School_Performance_Map_Reportloading: false,
  School_Performance_Map_Report: [],

  School_Performance_Pie_Chart_Reportloading: false,
  School_Performance_Pie_Chart_Report: [],
}

export const fetchSchool_Performance_Fund_Type_Report = createAsyncThunk(
  'fetchSchool_Performance_Fund_Type_Report',
  async (School_Performance_Fund_Type_Report, thunkAPI) => {
    School_Performance_Fund_Type_Report = { ...School_Performance_Fund_Type_Report, elasticQueryName: "School_Performance_Fund_Type_Report" }
    const response = await getNetSales(School_Performance_Fund_Type_Report);
    return response.data
  }
)

export const fetchSchool_Performance_School_Type_Report = createAsyncThunk(
  'fetchSchool_Performance_School_Type_Report',
  async (School_Performance_School_Type_Report, thunkAPI) => {
    School_Performance_School_Type_Report = { ...School_Performance_School_Type_Report, elasticQueryName: "School_Performance_School_Type_Report" }
    const response = await getNetSales(School_Performance_School_Type_Report);
    return response.data
  }
)

export const fetchSchool_Performance_Metric_Report = createAsyncThunk(
  'fetchSchool_Performance_Metric_Report',
  async (School_Performance_Metric_Report, thunkAPI) => {
    School_Performance_Metric_Report = { ...School_Performance_Metric_Report, elasticQueryName: "School_Performance_Metric_Report" }
    const response = await getNetSales(School_Performance_Metric_Report);
    return response.data
  }
)


export const fetchSchool_Performance_Map_Report = createAsyncThunk(
  'fetchSchool_Performance_Map_Report',
  async (School_Performance_Map_Report, thunkAPI) => {
    School_Performance_Map_Report = { ...School_Performance_Map_Report, elasticQueryName: "School_Performance_Map_Report" }
    const response = await getNetSales(School_Performance_Map_Report);
    return response.data
  }
)

export const fetchSchool_Performance_Pie_Chart_Report = createAsyncThunk(
  'fetchSchool_Performance_Pie_Chart_Report',
  async (School_Performance_Pie_Chart_Report, thunkAPI) => {
    School_Performance_Pie_Chart_Report = { ...School_Performance_Pie_Chart_Report, elasticQueryName: "School_Performance_Pie_Chart_Report" }
    const response = await getNetSales(School_Performance_Pie_Chart_Report);
    return response.data
  }
)

export const schoolperformance = createSlice({
  name: 'schoolperformance',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSchool_Performance_Fund_Type_Report.fulfilled, (state, action) => {
      state.School_Performance_Fund_Type_Report = action.payload;
      state.School_Performance_Fund_Type_Reportloading = false;
    }).addCase(fetchSchool_Performance_Fund_Type_Report.pending, (state, action) => {
      state.School_Performance_Fund_Type_Reportloading = true;
    })  

    builder.addCase(fetchSchool_Performance_School_Type_Report.fulfilled, (state, action) => {
      state.School_Performance_School_Type_Report = action.payload;
      state.School_Performance_School_Type_Reportloading = false;
    }).addCase(fetchSchool_Performance_School_Type_Report.pending, (state, action) => {
      state.School_Performance_School_Type_Reportloading = true;
    })  

    builder.addCase(fetchSchool_Performance_Metric_Report.fulfilled, (state, action) => {
      state.School_Performance_Metric_Report = action.payload;
      state.School_Performance_School_Type_Reportloading = false;
    }).addCase(fetchSchool_Performance_Metric_Report.pending, (state, action) => {
      state.School_Performance_School_Type_Reportloading = true;
    })  

    builder.addCase(fetchSchool_Performance_Map_Report.fulfilled, (state, action) => {
      state.School_Performance_Map_Report = action.payload;
      state.School_Performance_Map_Reportloading = false;
    }).addCase(fetchSchool_Performance_Map_Report.pending, (state, action) => {
      state.School_Performance_Map_Reportloading = true;
    })  

    builder.addCase(fetchSchool_Performance_Pie_Chart_Report.fulfilled, (state, action) => {
      state.School_Performance_Pie_Chart_Report = action.payload;
      state.School_Performance_Pie_Chart_Reportloading = false;
    }).addCase(fetchSchool_Performance_Pie_Chart_Report.pending, (state, action) => {
      state.School_Performance_Pie_Chart_Reportloading = true;
    })  


  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default schoolperformance.reducer