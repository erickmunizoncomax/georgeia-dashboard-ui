import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {
  Performance_Summary_By_Dimensionsloading: false,
  Performance_Summary_By_Dimensions: [],

  student_performance_tile_reportloading: false,
  student_performance_tile_report: [],

  student_dimension_table_reportloading: false,
  student_dimension_table_report: [],

  student_dimension_table_report_graduationloading: false,
  student_dimension_table_report_graduation: [],

  student_dimension_reportloading: false,
  student_dimension_report: [],

  student_dimension_report_graduationloading: false,
  student_dimension_report_graduation: [],

  
}

export const fetchPerformance_Summary_By_Dimensions = createAsyncThunk(
  'fetchPerformance_Summary_By_Dimensions',
  async (Performance_Summary_By_Dimensions, thunkAPI) => {
    Performance_Summary_By_Dimensions = { ...Performance_Summary_By_Dimensions, elasticQueryName: "Performance_Summary_By_Dimensions" }
    const response = await getNetSales(Performance_Summary_By_Dimensions);
    return response.data
  }
)

export const fetchstudent_performance_tile_report = createAsyncThunk(
  'fetchstudent_performance_tile_report',
  async (student_performance_tile_report, thunkAPI) => {
    student_performance_tile_report = { ...student_performance_tile_report, elasticQueryName: "Student_Performance_Progress_Tile_Report" }
    const response = await getNetSales(student_performance_tile_report);
    return response.data
  }
)

export const fetchstudent_dimension_table_report = createAsyncThunk(
  'fetchstudent_dimension_table_report',
  async (student_dimension_table_report, thunkAPI) => {
    student_dimension_table_report = { ...student_dimension_table_report, elasticQueryName: "student_dimension_table_report" }
    const response = await getNetSales(student_dimension_table_report);
    return response.data
  }
)

export const fetchstudent_dimension_table_report_graduation = createAsyncThunk(
  'fetchstudent_dimension_table_report_graduation',
  async (student_dimension_table_report_graduation, thunkAPI) => {
    student_dimension_table_report_graduation = { ...student_dimension_table_report_graduation, elasticQueryName: "student_dimension_table_report_graduation" }
    const response = await getNetSales(student_dimension_table_report_graduation);
    return response.data
  }
)

export const fetchstudent_dimension_report = createAsyncThunk(
  'fetchstudent_dimension_report',
  async (student_dimension_report, thunkAPI) => {
    student_dimension_report = { ...student_dimension_report, elasticQueryName: "student_dimension_report" }
    const response = await getNetSales(student_dimension_report);
    return response.data
  }
)

export const fetchstudent_dimension_report_graduation = createAsyncThunk(
  'fetchstudent_dimension_report_graduation',
  async (student_dimension_report_graduation, thunkAPI) => {
    student_dimension_report_graduation = { ...student_dimension_report_graduation, elasticQueryName: "student_dimension_report_graduation" }
    const response = await getNetSales(student_dimension_report_graduation);
    return response.data
  }
)



export const studentperformance = createSlice({
  name: 'studentperformance',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPerformance_Summary_By_Dimensions.fulfilled, (state, action) => {
      state.Performance_Summary_By_Dimensions = action.payload;
      state.Performance_Summary_By_Dimensionsloading = false;
    }).addCase(fetchPerformance_Summary_By_Dimensions.pending, (state, action) => {
      state.Performance_Summary_By_Dimensionsloading = true;
    })  

    builder.addCase(fetchstudent_performance_tile_report.fulfilled, (state, action) => {
      state.student_performance_tile_report = action.payload;
      state.student_performance_tile_reportloading = false;
    }).addCase(fetchstudent_performance_tile_report.pending, (state, action) => {
      state.student_performance_tile_reportloading = true;
    })  


    builder.addCase(fetchstudent_dimension_table_report.fulfilled, (state, action) => {
      state.student_dimension_table_report = action.payload;
      state.student_dimension_table_reportloading = false;
    }).addCase(fetchstudent_dimension_table_report.pending, (state, action) => {
      state.student_dimension_table_reportloading = true;
    })  

    builder.addCase(fetchstudent_dimension_table_report_graduation.fulfilled, (state, action) => {
      state.student_dimension_table_report_graduation = action.payload;
      state.student_dimension_table_report_graduationloading = false;
    }).addCase(fetchstudent_dimension_table_report_graduation.pending, (state, action) => {
      state.student_dimension_table_report_graduationloading = true;
    })  


    builder.addCase(fetchstudent_dimension_report.fulfilled, (state, action) => {
      state.student_dimension_report = action.payload;
      state.student_dimension_reportloading = false;
    }).addCase(fetchstudent_dimension_report.pending, (state, action) => {
      state.student_dimension_reportloading = true;
    })  

    builder.addCase(fetchstudent_dimension_report_graduation.fulfilled, (state, action) => {
      state.student_dimension_report_graduation = action.payload;
      state.student_dimension_report_graduationloading = false;
    }).addCase(fetchstudent_dimension_report_graduation.pending, (state, action) => {
      state.student_dimension_report_graduationloading = true;
    })  
  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default studentperformance.reducer