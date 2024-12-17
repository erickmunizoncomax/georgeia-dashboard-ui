import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {
  District_Climate_Ratingloading: false,
  District_Climate_Rating: [],

  student_behavior_poor_performing_schoolsloading: false,
  student_behavior_poor_performing_schools: [],

  student_behavior_top_performing_schoolsloading: false,
  student_behavior_top_performing_schools: [],

  Student_Behavior_Incident_Typeloading: false,
  Student_Behavior_Incident_Type: [],

  Student_Behavior_Chartloading: false,
  Student_Behavior_Chart: [],

}

export const fetchDistrict_Climate_Rating = createAsyncThunk(
  'fetchDistrict_Climate_Rating',
  async (District_Climate_Rating, thunkAPI) => {
    District_Climate_Rating = { ...District_Climate_Rating, elasticQueryName: "District_Climate_Rating" }
    const response = await getNetSales(District_Climate_Rating);
    return response.data
  }
)

export const fetchstudent_behavior_top_performing_schools = createAsyncThunk(
  'fetchstudent_behavior_top_performing_schools',
  async (student_behavior_top_performing_schools, thunkAPI) => {
    student_behavior_top_performing_schools = { ...student_behavior_top_performing_schools, elasticQueryName: "student_behavior_top_performing_schools" }
    const response = await getNetSales(student_behavior_top_performing_schools);
    return response.data
  }
)

export const fetchstudent_behavior_poor_performing_schools = createAsyncThunk(
  'fetchstudent_behavior_poor_performing_schools',
  async (student_behavior_poor_performing_schools, thunkAPI) => {
    student_behavior_poor_performing_schools = { ...student_behavior_poor_performing_schools, elasticQueryName: "student_behavior_poor_performing_schools" }
    const response = await getNetSales(student_behavior_poor_performing_schools);
    return response.data
  }
)

  export const fetchStudent_Behavior_Incident_Type = createAsyncThunk(
    'fetchStudent_Behavior_Incident_Type',
    async (Student_Behavior_Incident_Type, thunkAPI) => {
      Student_Behavior_Incident_Type = { ...Student_Behavior_Incident_Type, elasticQueryName: "Student_Behavior_Incident_Type" }
      const response = await getNetSales(Student_Behavior_Incident_Type);
      return response.data
    }
  )
  
  export const fetchStudent_Behavior_Chart = createAsyncThunk(
    'fetchStudent_Behavior_Chart',
    async (Student_Behavior_Chart, thunkAPI) => {
      Student_Behavior_Chart = { ...Student_Behavior_Chart, elasticQueryName: "Student_Behavior_Chart" }
      const response = await getNetSales(Student_Behavior_Chart);
      return response.data
    }
  )

export const studentbehavior = createSlice({
  name: 'studentbehavior',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDistrict_Climate_Rating.fulfilled, (state, action) => {
      state.District_Climate_Rating = action.payload;
      state.District_Climate_Ratingloading = false;
    }).addCase(fetchDistrict_Climate_Rating.pending, (state, action) => {
      state.District_Climate_Ratingloading = true;
    })  

    builder.addCase(fetchstudent_behavior_poor_performing_schools.fulfilled, (state, action) => {
      state.student_behavior_poor_performing_schools = action.payload;
      state.student_behavior_poor_performing_schoolsloading = false;
    }).addCase(fetchstudent_behavior_poor_performing_schools.pending, (state, action) => {
      state.student_behavior_poor_performing_schoolsloading = true;
    })  

    builder.addCase(fetchstudent_behavior_top_performing_schools.fulfilled, (state, action) => {
      state.student_behavior_top_performing_schools = action.payload;
      state.student_behavior_top_performing_schoolsloading = false;
    }).addCase(fetchstudent_behavior_top_performing_schools.pending, (state, action) => {
      state.student_behavior_top_performing_schoolsloading = true;
    })  
  

  builder.addCase(fetchStudent_Behavior_Incident_Type.fulfilled, (state, action) => {
    state.Student_Behavior_Incident_Type = action.payload;
    state.Student_Behavior_Incident_Typeloading = false;
  }).addCase(fetchStudent_Behavior_Incident_Type.pending, (state, action) => {
    state.Student_Behavior_Incident_Typeloading = true;
  })  

  builder.addCase(fetchStudent_Behavior_Chart.fulfilled, (state, action) => {
    state.Student_Behavior_Chart = action.payload;
    state.Student_Behavior_Chartloading = false;
  }).addCase(fetchStudent_Behavior_Chart.pending, (state, action) => {
    state.Student_Behavior_Chartloading = true;
  })  
  }

})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default studentbehavior.reducer