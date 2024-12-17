import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {
  Student_Charactersticsloading: false,
  Student_Characterstics: [],

  // Enrollmentloading: false,
  // Enrollment: [],

  Schoolsloading: false,
  Schools: [],

  Ethnicity_District_at_a_glanceloading: false,
  Ethnicity_District_at_a_glance: [],

  Yearwise_Student_Enrollment_Rankingloading: false,
  Yearwise_Student_Enrollment_Ranking: [],

  Gradewise_Student_Enrollment_Rankingloading: false,
  Gradewise_Student_Enrollment_Ranking: [],

  Student_Enrollment_Reportloading: false,
  Student_Enrollment_Report: [],

  District_at_a_glance_top_tileloading: false,
  District_at_a_glance_top_tile: [],

  Schools_Centers_Reportloading: false,
  Schools_Centers_Report: [],

  Authenticate_Usersloading: false,
  Authenticate_Users: [],

  TotalTeacherFTEloading :false,
  TotalTeacherFTE : [],
  
  School_District_employeesloading :false,
  School_District_employees : [],

  StudentCounselorRatioloading :false,
  StudentCounselorRatio : [],

  StudentTeacherRatioloading :false,
  StudentTeacherRatio : [],

  Financial_Informationloading :false,
  Financial_Information : [],

  Revene_for_districtloading :false,
  Revene_for_district : [],

  Expense_for_districtloading :false,
  Expense_for_district : [],

  RevenueandExpenseloading  :false,
  RevenueandExpense : [],

}

export const fetchStudent_Characterstics = createAsyncThunk(
  'fetchStudent_Characterstics',
  async (Student_Characterstics, thunkAPI) => {
    Student_Characterstics = { ...Student_Characterstics, elasticQueryName: "Student_Characterstics" }
    const response = await getNetSales(Student_Characterstics);
    return response.data
  }
)

export const fetchSchools = createAsyncThunk(
  'fetchSchools',
  async (Schools, thunkAPI) => {
    Schools = { ...Schools, elasticQueryName: "Schools" }
    const response = await getNetSales(Schools);
    return response.data
  }
)

export const fetchEthnicity_District_at_a_glance = createAsyncThunk(
  'fetchEthnicity_District_at_a_glance',
  async (Ethnicity_District_at_a_glance, thunkAPI) => {
    Ethnicity_District_at_a_glance = { ...Ethnicity_District_at_a_glance, elasticQueryName: "Ethnicity_District_at_a_glance" }
    const response = await getNetSales(Ethnicity_District_at_a_glance);
    return response.data
  }
)

export const fetchYearwise_Student_Enrollment_Ranking = createAsyncThunk(
  'fetchYearwise_Student_Enrollment_Ranking',
  async (Yearwise_Student_Enrollment_Ranking, thunkAPI) => {
    Yearwise_Student_Enrollment_Ranking = { ...Yearwise_Student_Enrollment_Ranking, elasticQueryName: "Yearwise_Student_Enrollment_Ranking" }
    const response = await getNetSales(Yearwise_Student_Enrollment_Ranking);
    return response.data
  }
)

export const fetchGradewise_Student_Enrollment_Ranking = createAsyncThunk(
  'fetchGradewise_Student_Enrollment_Ranking',
  async (Gradewise_Student_Enrollment_Ranking, thunkAPI) => {
    Gradewise_Student_Enrollment_Ranking = { ...Gradewise_Student_Enrollment_Ranking, elasticQueryName: "Gradewise_Student_Enrollment_Ranking" }
    const response = await getNetSales(Gradewise_Student_Enrollment_Ranking);
    return response.data
  }
)


export const fetchStudent_Enrollment_Report = createAsyncThunk(
  'fetchStudent_Enrollment_Report',
  async (Student_Enrollment_Report, thunkAPI) => {
    Student_Enrollment_Report = { ...Student_Enrollment_Report, elasticQueryName: "Student_Enrollment_Report" }
    const response = await getNetSales(Student_Enrollment_Report);
    return response.data
  }
)

export const fetchDistrict_at_a_glance_top_tile = createAsyncThunk(
  'fetchDistrict_at_a_glance_top_tile',
  async (District_at_a_glance_top_tile, thunkAPI) => {
    District_at_a_glance_top_tile = { ...District_at_a_glance_top_tile, elasticQueryName: "District_at_a_glance_top_tile" }
    const response = await getNetSales(District_at_a_glance_top_tile);
    return response.data
  }
)

export const fetchSchools_Centers_Report = createAsyncThunk(
  'fetchSchools_Centers_Report',
  async (Schools_Centers_Report, thunkAPI) => {
    Schools_Centers_Report = { ...Schools_Centers_Report, elasticQueryName: "Schools_Centers_Report" }
    const response = await getNetSales(Schools_Centers_Report);
    return response.data
  }
)

export const fetchAuthenticate_Users = createAsyncThunk(
  'fetchAuthenticate_Users',
  async (Authenticate_Users, thunkAPI) => {
    Authenticate_Users = { ...Authenticate_Users, elasticQueryName: "Authenticate_Users" }
    const response = await getNetSales(Authenticate_Users);
    return response.data
  }
)

export const fetchschoolTeachersFTE = createAsyncThunk(
  'fetchschoolTeachersFTE',
  async (School_District_Teachers_FTE, thunkAPI) => {
    School_District_Teachers_FTE = { ...School_District_Teachers_FTE, elasticQueryName: "School_District_Teachers_FTE" }
    const response = await getNetSales(School_District_Teachers_FTE);
    return response.data
  }
)

export const fetchschoolTotalFTE = createAsyncThunk(
  'fetchschoolTotalFTE',
  async (School_Total_Teachers_FTE, thunkAPI) => {
    School_Total_Teachers_FTE = { ...School_Total_Teachers_FTE, elasticQueryName: "School_Total_Teachers_FTE" }
    const response = await getNetSales(School_Total_Teachers_FTE);
    return response.data
  }
)

export const fetchTotalTeacherFTE = createAsyncThunk(
  'fetchTotalTeacherFTE',
  async (TotalTeacherFTE, thunkAPI) => {
    TotalTeacherFTE = { ...TotalTeacherFTE, elasticQueryName: "Total Teacher FTE" }
    const response = await getNetSales(TotalTeacherFTE);
    return response.data
  }
)

export const fetchSchool_District_employees = createAsyncThunk(
  'fetchSchool_District_employees',
  async (School_District_employees, thunkAPI) => {
    School_District_employees = { ...School_District_employees, elasticQueryName: "School_District_employees" }
    const response = await getNetSales(School_District_employees);
    return response.data
  }
)

export const fetchStudentCounselorRatio = createAsyncThunk(
  'fetchStudentCounselorRatio',
  async (StudentCounselorRatio, thunkAPI) => {
    StudentCounselorRatio = { ...StudentCounselorRatio, elasticQueryName: "Student/Counselor Ratio" }
    const response = await getNetSales(StudentCounselorRatio);
    return response.data
  }
)

export const fetchStudentTeacherRatio = createAsyncThunk(
  'fetchStudentTeacherRatio',
  async (StudentTeacherRatio, thunkAPI) => {
    StudentTeacherRatio = { ...StudentTeacherRatio, elasticQueryName: "Student/Teacher Ratio" }
    const response = await getNetSales(StudentTeacherRatio);
    return response.data
  }
)

export const fetchFinancial_Information = createAsyncThunk(
  'fetchFinancial_Information',
  async (Financial_Information, thunkAPI) => {
    Financial_Information = { ...Financial_Information, elasticQueryName: "Financial_Information" }
    const response = await getNetSales(Financial_Information);
    return response.data
  }
)

export const fetchRevenueandExpense = createAsyncThunk(
  'fetchRevenueandExpense',
  async (RevenueandExpense, thunkAPI) => {
    RevenueandExpense = { ...RevenueandExpense, elasticQueryName: "Revenue_and_Expense_chart" }
    const response = await getNetSales(RevenueandExpense);
    return response.data
  }
)

export const fetchExpense_for_district = createAsyncThunk(
  'fetchExpense_for_district',
  async (Expense_for_district, thunkAPI) => {
    Expense_for_district = { ...Expense_for_district, elasticQueryName: "Expense_for_district_at_glance" }
    const response = await getNetSales(Expense_for_district);
    return response.data
  }
)

export const fetchRevene_for_district = createAsyncThunk(
  'fetchRevene_for_district',
  async (Revene_for_district, thunkAPI) => {
    Revene_for_district = { ...Revene_for_district, elasticQueryName: "Revenue_for_district_at_glance" }
    const response = await getNetSales(Revene_for_district);
    return response.data
  }
)




export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudent_Characterstics.fulfilled, (state, action) => {
      state.Student_Characterstics = action.payload;
      state.Student_Charactersticsloading = false;
    }).addCase(fetchStudent_Characterstics.pending, (state, action) => {
      state.Student_Charactersticsloading = true;
    })

    builder.addCase(fetchSchools.fulfilled, (state, action) => {
      state.Schools = action.payload;
      state.Schoolsloading = false;
    }).addCase(fetchSchools.pending, (state, action) => {
      state.Schoolsloading = true;
    })

    builder.addCase(fetchEthnicity_District_at_a_glance.fulfilled, (state, action) => {
      state.Ethnicity_District_at_a_glance = action.payload;
      state.Ethnicity_District_at_a_glanceloading = false;
    }).addCase(fetchEthnicity_District_at_a_glance.pending, (state, action) => {
      state.Ethnicity_District_at_a_glanceloading = true;
    })

    builder.addCase(fetchYearwise_Student_Enrollment_Ranking.fulfilled, (state, action) => {
      state.Yearwise_Student_Enrollment_Ranking = action.payload;
      state.Yearwise_Student_Enrollment_Rankingloading = false;
    }).addCase(fetchYearwise_Student_Enrollment_Ranking.pending, (state, action) => {
      state.Yearwise_Student_Enrollment_Rankingloading = true;
    })

    builder.addCase(fetchGradewise_Student_Enrollment_Ranking.fulfilled, (state, action) => {
      state.Gradewise_Student_Enrollment_Ranking = action.payload;
      state.Gradewise_Student_Enrollment_Rankingloading = false;
    }).addCase(fetchGradewise_Student_Enrollment_Ranking.pending, (state, action) => {
      state.Gradewise_Student_Enrollment_Rankingloading = true;
    })

    builder.addCase(fetchStudent_Enrollment_Report.fulfilled, (state, action) => {
      state.Student_Enrollment_Report = action.payload;
      state.Student_Enrollment_Reportloading = false;
    }).addCase(fetchStudent_Enrollment_Report.pending, (state, action) => {
      state.Student_Enrollment_Reportloading = true;
    })

    builder.addCase(fetchDistrict_at_a_glance_top_tile.fulfilled, (state, action) => {
      state.District_at_a_glance_top_tile = action.payload;
      state.District_at_a_glance_top_tileloading = false;
    }).addCase(fetchDistrict_at_a_glance_top_tile.pending, (state, action) => {
      state.District_at_a_glance_top_tileloading = true;
    })

    builder.addCase(fetchSchools_Centers_Report.fulfilled, (state, action) => {
      state.Schools_Centers_Report = action.payload;
      state.Schools_Centers_Reportloading = false;
    }).addCase(fetchSchools_Centers_Report.pending, (state, action) => {
      state.Schools_Centers_Reportloading = true;
    })


    builder.addCase(fetchAuthenticate_Users.fulfilled, (state, action) => {
      state.Authenticate_Users = action.payload;
      state.Authenticate_Usersloading = false;
    }).addCase(fetchAuthenticate_Users.pending, (state, action) => {
      state.Authenticate_Usersloading = true;
    })

    builder.addCase(fetchschoolTeachersFTE.fulfilled, (state, action) => {
      state.School_District_Teachers_FTE = action.payload;
      state.School_District_Teachers_FTEloading = false;
    }).addCase(fetchschoolTeachersFTE.pending, (state, action) => {
      state.School_District_Teachers_FTEloading = true;
    })

    builder.addCase(fetchschoolTotalFTE.fulfilled, (state, action) => {
      state.School_Total_Teachers_FTE = action.payload;
      state.School_Total_Teachers_FTEloading = false;
    }).addCase(fetchschoolTotalFTE.pending, (state, action) => {
      state.School_Total_Teachers_FTEloading = true;
    })

    builder.addCase(fetchTotalTeacherFTE.fulfilled, (state, action) => {
      state.TotalTeacherFTE = action.payload;
      state.TotalTeacherFTEloading = false;
    }).addCase(fetchTotalTeacherFTE.pending, (state, action) => {
      state.TotalTeacherFTEloading = true;
    })

    builder.addCase(fetchSchool_District_employees.fulfilled, (state, action) => {
      state.School_District_employees = action.payload;
      state.School_District_employeesloading = false;
    }).addCase(fetchSchool_District_employees.pending, (state, action) => {
      state.School_District_employeesloading = true;
    })

    builder.addCase(fetchStudentCounselorRatio.fulfilled, (state, action) => {
      state.StudentCounselorRatio = action.payload;
      state.StudentCounselorRatioloading = false;
    }).addCase(fetchStudentCounselorRatio.pending, (state, action) => {
      state.StudentCounselorRatioloading = true;
    })

    builder.addCase(fetchStudentTeacherRatio.fulfilled, (state, action) => {
      state.StudentTeacherRatio = action.payload;
      state.StudentTeacherRatioloading = false;
    }).addCase(fetchStudentTeacherRatio.pending, (state, action) => {
      state.StudentTeacherRatioloading = true;
    })

    builder.addCase(fetchFinancial_Information.fulfilled, (state, action) => {
      state.Financial_Information = action.payload;
      state.Financial_Informationloading = false;
    }).addCase(fetchFinancial_Information.pending, (state, action) => {
      state.Financial_Informationloading = true;
    })

    builder.addCase(fetchRevenueandExpense.fulfilled, (state, action) => {
      state.RevenueandExpense = action.payload;
      state.RevenueandExpenseloading = false;
    }).addCase(fetchRevenueandExpense.pending, (state, action) => {
      state.RevenueandExpenseloading = true;
    })

    builder.addCase(fetchExpense_for_district.fulfilled, (state, action) => {
      state.Expense_for_district = action.payload;
      state.Expense_for_districtloading = false;
    }).addCase(fetchExpense_for_district.pending, (state, action) => {
      state.Expense_for_districtloading = true;
    })

    builder.addCase(fetchRevene_for_district.fulfilled, (state, action) => {
      state.Revene_for_district = action.payload;
      state.Revene_for_districtloading = false;
    }).addCase(fetchRevene_for_district.pending, (state, action) => {
      state.Revene_for_districtloading = true;
    })
    
    
  }

})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer