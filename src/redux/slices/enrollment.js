import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {
  Enrollmentloading: false,
  Enrollment: [],

  Special_Grouploading: false,
  Special_Group: [],

  Ethnicity_Mixloading: false,
  Ethnicity_Mix: [],
  
  SPED_Enrollmentloading: false,
  SPED_Enrollment: [],

  Net_Movementloading: false,
  Net_Movement: [],

  Graduation_To_KG_Enrollment_Ratioloading: false,
  Graduation_To_KG_Enrollment_Ratio: [],

  Inter_School_Conversionloading: false,
  Inter_School_Conversion: [],

  Schools_Biggest_Gainersloading: false,
  Schools_Biggest_Gainers: [],
  
  Schools_Biggest_Losersloading: false,
  Schools_Biggest_Losers: [],

  Time_Analysisloading: false,
  Time_Analysis: [],

  Enrollment_Time_Analysisloading: false,
  Enrollment_Time_Analysis: [],

  Enrollment_Summary_By_Dimensionsloading: false,
  Enrollment_Summary_By_Dimensions: [],

  Average_Class_Sizeloading: false,
  Average_Class_Size: [],

  Enrollment_Projectionsloading: false,
  Enrollment_Projections: []
}

export const fetchSpecial_Group = createAsyncThunk(
  'fetchSpecial_Group',
  async (Special_Group, thunkAPI) => {
    Special_Group = { ...Special_Group, elasticQueryName: "Special_Groups" }
    const response = await getNetSales(Special_Group);
    return response.data
  }
)

export const fetchEnrollment = createAsyncThunk(
  'fetchEnrollment',
  async (Enrollment, thunkAPI) => {
    Enrollment = { ...Enrollment, elasticQueryName: "Enrollment" }
    const response = await getNetSales(Enrollment);
    return response.data
  }
)

export const fetchEthnicity_Mix = createAsyncThunk(
  'fetchEthnicity_Mix',
  async (Ethnicity_Mix, thunkAPI) => {
    Ethnicity_Mix = { ...Ethnicity_Mix, elasticQueryName: "Ethnicity_Mix" }
    const response = await getNetSales(Ethnicity_Mix);
    return response.data
  }
)

export const fetchSPED_Enrollment = createAsyncThunk(
  'fetchSPED_Enrollment',
  async (SPED_Enrollment, thunkAPI) => {
    SPED_Enrollment = { ...SPED_Enrollment, elasticQueryName: "SPED_Enrollment" }
    const response = await getNetSales(SPED_Enrollment);
    return response.data
  }
)

export const fetchNet_Movement = createAsyncThunk(
  'fetchNet_Movement',
  async (Net_Movement, thunkAPI) => {
    Net_Movement = { ...Net_Movement, elasticQueryName: "Net_Movement" }
    const response = await getNetSales(Net_Movement);
    return response.data
  }
)

export const fetchGraduation_To_KG_Enrollment_Ratio = createAsyncThunk(
  'fetchGraduation_To_KG_Enrollment_Ratio',
  async (Graduation_To_KG_Enrollment_Ratio, thunkAPI) => {
    Graduation_To_KG_Enrollment_Ratio = { ...Graduation_To_KG_Enrollment_Ratio, elasticQueryName: "Graduation_To_KG_Enrollment_Ratio" }
    const response = await getNetSales(Graduation_To_KG_Enrollment_Ratio);
    return response.data
  }
)

export const fetchInter_School_Conversion = createAsyncThunk(
  'fetchInter_School_Conversion',
  async (Inter_School_Conversion, thunkAPI) => {
    Inter_School_Conversion = { ...Inter_School_Conversion, elasticQueryName: "Inter_School_Conversion" }
    const response = await getNetSales(Inter_School_Conversion);
    return response.data
  }
)

export const fetchSchools_Biggest_Gainers = createAsyncThunk(
  'fetchSchools_Biggest_Gainers',
  async (Schools_Biggest_Gainers, thunkAPI) => {
    Schools_Biggest_Gainers = { ...Schools_Biggest_Gainers, elasticQueryName: "Schools_Biggest_Gainers" }
    const response = await getNetSales(Schools_Biggest_Gainers);
    return response.data
  }
)

export const fetchSchools_Biggest_Losers = createAsyncThunk(
  'fetchSchools_Biggest_Losers',
  async (Schools_Biggest_Losers, thunkAPI) => {
    Schools_Biggest_Losers = { ...Schools_Biggest_Losers, elasticQueryName: "Schools_Biggest_Losers" }
    const response = await getNetSales(Schools_Biggest_Losers);
    return response.data
  }
)

export const fetchTime_Analysis = createAsyncThunk(
  'fetchTime_Analysis',
  async (Time_Analysis, thunkAPI) => {
    Time_Analysis = { ...Time_Analysis, elasticQueryName: "Time_Analysis" }
    const response = await getNetSales(Time_Analysis);
    return response.data
  }
)

export const fetchEnrollment_Time_Analysis = createAsyncThunk(
  'fetchEnrollment_Time_Analysis',
  async (Enrollment_Time_Analysis, thunkAPI) => {
    Enrollment_Time_Analysis = { ...Enrollment_Time_Analysis, elasticQueryName: "Enrollment_Time_Analysis" }
    const response = await getNetSales(Enrollment_Time_Analysis);
    return response.data
  }
)

export const fetchEnrollment_Summary_By_Dimensions = createAsyncThunk(
  'fetchEnrollment_Summary_By_Dimensions',
  async (Enrollment_Summary_By_Dimensions, thunkAPI) => {
    Enrollment_Summary_By_Dimensions = { ...Enrollment_Summary_By_Dimensions, elasticQueryName: "Enrollment_Summary_By_Dimensions" }
    const response = await getNetSales(Enrollment_Summary_By_Dimensions);
    return response.data
  }
)

export const fetchAverage_Class_Size = createAsyncThunk(
  'fetchAverage_Class_Size',
  async (Average_Class_Size, thunkAPI) => {
    Average_Class_Size = { ...Average_Class_Size, elasticQueryName: "Average Class Size" }
    const response = await getNetSales(Average_Class_Size);
    return response.data
  }
)

export const fetchEnrollment_Projections = createAsyncThunk(
  'fetchEnrollment_Projections',
  async (Enrollment_Projections, thunkAPI) => {
    Enrollment_Projections = { ...Enrollment_Projections, elasticQueryName: "Enrollment_Projections" }
    const response = await getNetSales(Enrollment_Projections);
    return response.data
  }
)


export const enrollment = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEnrollment.fulfilled, (state, action) => {
      state.Enrollment = action.payload;
      state.Enrollmentloading = false;
    }).addCase(fetchEnrollment.pending, (state, action) => {
      state.Enrollmentloading = true;
    }) 
    
    builder.addCase(fetchSpecial_Group.fulfilled, (state, action) => {
      state.Special_Group = action.payload;
      state.Special_Grouploading = false;
    }).addCase(fetchSpecial_Group.pending, (state, action) => {
      state.Special_Grouploading = true;
    })  

    builder.addCase(fetchEthnicity_Mix.fulfilled, (state, action) => {
      state.Ethnicity_Mix = action.payload;
      state.Ethnicity_Mixloading = false;
    }).addCase(fetchEthnicity_Mix.pending, (state, action) => {
      state.Ethnicity_Mixloading = true;
    })  

    builder.addCase(fetchSPED_Enrollment.fulfilled, (state, action) => {
      state.SPED_Enrollment = action.payload;
      state.SPED_Enrollmentloading = false;
    }).addCase(fetchSPED_Enrollment.pending, (state, action) => {
      state.SPED_Enrollmentloading = true;
    })  

    builder.addCase(fetchNet_Movement.fulfilled, (state, action) => {
      state.Net_Movement = action.payload;
      state.Net_Movementloading = false;
    }).addCase(fetchNet_Movement.pending, (state, action) => {
      state.Net_Movementloading = true;
    })

    builder.addCase(fetchGraduation_To_KG_Enrollment_Ratio.fulfilled, (state, action) => {
      state.Graduation_To_KG_Enrollment_Ratio = action.payload;
      state.Graduation_To_KG_Enrollment_Ratioloading = false;
    }).addCase(fetchGraduation_To_KG_Enrollment_Ratio.pending, (state, action) => {
      state.Graduation_To_KG_Enrollment_Ratioloading = true;
    })  

    builder.addCase(fetchInter_School_Conversion.fulfilled, (state, action) => {
      state.Inter_School_Conversion = action.payload;
      state.Inter_School_Conversionloading = false;
    }).addCase(fetchInter_School_Conversion.pending, (state, action) => {
      state.Inter_School_Conversionloading = true;
    })  

    builder.addCase(fetchSchools_Biggest_Gainers.fulfilled, (state, action) => {
      state.Schools_Biggest_Gainers = action.payload;
      state.Schools_Biggest_Gainersloading = false;
    }).addCase(fetchSchools_Biggest_Gainers.pending, (state, action) => {
      state.Schools_Biggest_Gainersloading = true;
    })

    builder.addCase(fetchSchools_Biggest_Losers.fulfilled, (state, action) => {
      state.Schools_Biggest_Losers = action.payload;
      state.Schools_Biggest_Losersloading = false;
    }).addCase(fetchSchools_Biggest_Losers.pending, (state, action) => {
      state.Schools_Biggest_Losersloading = true;
    })

    builder.addCase(fetchTime_Analysis.fulfilled, (state, action) => {
      state.Time_Analysis = action.payload;
      state.Time_Analysisloading = false;
    }).addCase(fetchTime_Analysis.pending, (state, action) => {
      state.Time_Analysisloading = true;
    })  

    builder.addCase(fetchEnrollment_Time_Analysis.fulfilled, (state, action) => {
      state.Enrollment_Time_Analysis = action.payload;
      state.Enrollment_Time_Analysisloading = false;
    }).addCase(fetchEnrollment_Time_Analysis.pending, (state, action) => {
      state.Enrollment_Time_Analysisloading = true;
    })  

    builder.addCase(fetchEnrollment_Summary_By_Dimensions.fulfilled, (state, action) => {
      state.Enrollment_Summary_By_Dimensions = action.payload;
      state.Enrollment_Summary_By_Dimensionsloading = false;
    }).addCase(fetchEnrollment_Summary_By_Dimensions.pending, (state, action) => {
      state.Enrollment_Summary_By_Dimensionsloading = true;
    })
    
    builder.addCase(fetchAverage_Class_Size.fulfilled, (state, action) => {
      state.Average_Class_Size = action.payload;
      state.Average_Class_Sizeloading = false;
    }).addCase(fetchAverage_Class_Size.pending, (state, action) => {
      state.Average_Class_Sizeloading = true;
    })

    builder.addCase(fetchEnrollment_Projections.fulfilled, (state, action) => {
      state.Enrollment_Projections = action.payload;
      state.Enrollment_Projectionsloading = false;
    }).addCase(fetchEnrollment_Projections.pending, (state, action) => {
      state.Enrollment_Projectionsloading = true;
    })

  }

})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default enrollment.reducer