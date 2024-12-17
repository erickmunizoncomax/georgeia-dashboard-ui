import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {
  STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTloading: false,
  STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART: [],

  STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATIONloading: false,
  STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION: [],
  
  Improvement_Tile_Reportloading: false,
  Improvement_Tile_Report: [],

  Strength_Tile_Reportloading: false,
  Strength_Tile_Report: [],

  Weakness_Tile_Reportloading: false,
  Weakness_Tile_Report: [],

  Strength_Weaknesses_Tile_Reportloading: false,
  Strength_Weaknesses_Tile_Report: []
}

export const fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART = createAsyncThunk(
  'fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART',
  async (STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART, thunkAPI) => {
    STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART = { ...STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART, elasticQueryName: "STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART" }
    const response = await getNetSales(STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART);
    return response.data
  }
)

export const fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION = createAsyncThunk(
  'fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION',
  async (STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION, thunkAPI) => {
    STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION = { ...STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION, elasticQueryName: "STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION" }
    const response = await getNetSales(STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION);
    return response.data
  }
)

export const fetchImprovement_Tile_Report = createAsyncThunk(
  'fetchImprovement_Tile_Report',
  async (Improvement_Tile_Report, thunkAPI) => {
    Improvement_Tile_Report = { ...Improvement_Tile_Report, elasticQueryName: "Improvement_Tile_Report" }
    const response = await getNetSales(Improvement_Tile_Report);
    return response.data
  }
)

export const fetchStrength_Tile_Report = createAsyncThunk(
  'fetchStrength_Tile_Report',
  async (Strength_Tile_Report, thunkAPI) => {
    Strength_Tile_Report = { ...Strength_Tile_Report, elasticQueryName: "Strength_Tile_Report" }
    const response = await getNetSales(Strength_Tile_Report);
    return response.data
  }
)

export const fetchWeakness_Tile_Report = createAsyncThunk(
  'fetchWeakness_Tile_Report',
  async (Weakness_Tile_Report, thunkAPI) => {
    Weakness_Tile_Report = { ...Weakness_Tile_Report, elasticQueryName: "Weakness_Tile_Report" }
    const response = await getNetSales(Weakness_Tile_Report);
    return response.data
  }
)

export const fetchStrength_Weaknesses_Tile_Report = createAsyncThunk(
  'fetchStrength_Weaknesses_Tile_Report',
  async (Strength_Weaknesses_Tile_Report, thunkAPI) => {
    Strength_Weaknesses_Tile_Report = { ...Strength_Weaknesses_Tile_Report, elasticQueryName: "Strength_Weaknesses_Tile_Report" }
    const response = await getNetSales(Strength_Weaknesses_Tile_Report);
    return response.data
  }
)

export const strengthweakness = createSlice({
  name: 'strengthweakness',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART.fulfilled, (state, action) => {
      state.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART = action.payload;
      state.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTloading = false;
    }).addCase(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART.pending, (state, action) => {
      state.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHARTloading = true;
    }) 
    
    builder.addCase(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION.fulfilled, (state, action) => {
      state.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION = action.payload;
      state.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATIONloading = false;
    }).addCase(fetchSTRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATION.pending, (state, action) => {
      state.STRENGTH_AND_WEAKNESS_DRILL_DOWN_CHART_GRADUATIONloading = true;
    }) 

    builder.addCase(fetchImprovement_Tile_Report.fulfilled, (state, action) => {
      state.Improvement_Tile_Report = action.payload;
      state.Improvement_Tile_Reportloading = false;
    }).addCase(fetchImprovement_Tile_Report.pending, (state, action) => {
      state.Improvement_Tile_Reportloading = true;
    })  

    builder.addCase(fetchStrength_Tile_Report.fulfilled, (state, action) => {
      state.Strength_Tile_Report = action.payload;
      state.Strength_Tile_Reportloading = false;
    }).addCase(fetchStrength_Tile_Report.pending, (state, action) => {
      state.Strength_Tile_Reportloading = true;
    })  

    builder.addCase(fetchWeakness_Tile_Report.fulfilled, (state, action) => {
      state.Weakness_Tile_Report = action.payload;
      state.Weakness_Tile_Reportloading = false;
    }).addCase(fetchWeakness_Tile_Report.pending, (state, action) => {
      state.Weakness_Tile_Reportloading = true;
    })  

    builder.addCase(fetchStrength_Weaknesses_Tile_Report.fulfilled, (state, action) => {
      state.Strength_Weaknesses_Tile_Report = action.payload;
      state.Strength_Weaknesses_Tile_Reportloading = false;
    }).addCase(fetchStrength_Weaknesses_Tile_Report.pending, (state, action) => {
      state.Strength_Weaknesses_Tile_Reportloading = true;
    }) 


  }

})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default strengthweakness.reducer