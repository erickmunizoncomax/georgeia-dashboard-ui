import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {
  District_Sizeloading: false,
  District_Size: [],

  Graduation_Top_5loading: false,
  Graduation_Top_5: [],

  Graduation_Bottom_5loading: false,
  Graduation_Bottom_5: [],

  Student_Achievement_ELA_Top_5loading: false,
  Student_Achievement_ELA_Top_5: [],

  Student_Achievement_ELA_Bottom_5loading: false,
  Student_Achievement_ELA_Bottom_5: [],

  Student_Achievement_Math_Top_5loading: false,
  Student_Achievement_Math_Top_5: [],

  Student_Achievement_Math_Bottom_5loading: false,
  Student_Achievement_Math_Bottom_5: [],

  Student_Achievement_Science_Top_5loading: false,
  Student_Achievement_Science_Top_5: [],

  Student_Achievement_Science_Bottom_5loading: false,
  Student_Achievement_Science_Bottom_5: [],

  Attendance_Top_5loading: false,
  Attendance_Top_5: [],

  Attendance_Bottom_5loading: false,
  Attendance_Bottom_5: [],

  Overall_Scoreloading: false,
  Overall_Score: [],

  Graduation_Top_5_District1loading: false,
  Graduation_Top_5_District1: [],

  Graduation_Top_5_District2loading: false,
  Graduation_Top_5_District2: [],

  Graduation_Top_5_District3loading: false,
  Graduation_Top_5_District3: [],

  Graduation_Top_5_District4loading: false,
  Graduation_Top_5_District4: [],

  Graduation_Top_5_District5loading: false,
  Graduation_Top_5_District5: [],

  Graduation_bottom_5_District1loading: false,
  Graduation_bottom_5_District1: [],

  Graduation_bottom_5_District2loading: false,
  Graduation_bottom_5_District2: [],

  Graduation_bottom_5_District3loading: false,
  Graduation_bottom_5_District2: [],

  Graduation_bottom_5_District3loading: false,
  Graduation_bottom_5_District3: [],

  Graduation_bottom_5_District4loading: false,
  Graduation_bottom_5_District4: [],

  Graduation_bottom_5_District5loading: false,
  Graduation_bottom_5_District5: [],

  Student_Achievement_ELA_Top_5_District1Loading: false,
  Student_Achievement_ELA_Top_5_District1: [],

  Student_Achievement_ELA_Top_5_District2Loading: false,
  Student_Achievement_ELA_Top_5_District2: [],

  Student_Achievement_ELA_Top_5_District3Loading: false,
  Student_Achievement_ELA_Top_5_District3: [],

  Student_Achievement_ELA_Top_5_District4Loading: false,
  Student_Achievement_ELA_Top_5_District4: [],

  Student_Achievement_ELA_Top_5_District5Loading: false,
  Student_Achievement_ELA_Top_5_District5: [],

  Student_Achievement_ELA_Bottom_5_District1Loading: true,
  Student_Achievement_ELA_Bottom_5_District1: [],

  Student_Achievement_ELA_Bottom_5_District2Loading: true,
  Student_Achievement_ELA_Bottom_5_District2: [],

  Student_Achievement_ELA_Bottom_5_District3Loading: true,
  Student_Achievement_ELA_Bottom_5_District3: [],

  Student_Achievement_ELA_Bottom_5_District4Loading: true,
  Student_Achievement_ELA_Bottom_5_District4: [],

  Student_Achievement_ELA_Bottom_5_District5Loading: true,
  Student_Achievement_ELA_Bottom_5_District5: [],

  Student_Achievement_Math_Top_5_District1Loading: true,
  Student_Achievement_Math_Top_5_District1: [],

  Student_Achievement_Math_Top_5_District2Loading: true,
  Student_Achievement_Math_Top_5_District2: [],

  Student_Achievement_Math_Top_5_District3Loading: true,
  Student_Achievement_Math_Top_5_District3: [],

  Student_Achievement_Math_Top_5_District4Loading: true,
  Student_Achievement_Math_Top_5_District4: [],

  Student_Achievement_Math_Top_5_District5Loading: true,
  Student_Achievement_Math_Top_5_District5: [],

  Student_Achievement_Math_Bottom_5_District1Loading: true,
  Student_Achievement_Math_Bottom_5_District1: [],
  Student_Achievement_Math_Bottom_5_District2Loading: true,
  Student_Achievement_Math_Bottom_5_District2: [],
  Student_Achievement_Math_Bottom_5_District3Loading: true,
  Student_Achievement_Math_Bottom_5_District3: [],
  Student_Achievement_Math_Bottom_5_District4Loading: true,
  Student_Achievement_Math_Bottom_5_District4: [],
  Student_Achievement_Math_Bottom_5_District5Loading: true,
  Student_Achievement_Math_Bottom_5_District5: [],

  Student_Achievement_Science_Top_5_District1Loading: true,
  Student_Achievement_Science_Top_5_District1: [],
  Student_Achievement_Science_Top_5_District2Loading: true,
  Student_Achievement_Science_Top_5_District2: [],
  Student_Achievement_Science_Top_5_District3Loading: true,
  Student_Achievement_Science_Top_5_District3: [],
  Student_Achievement_Science_Top_5_District4Loading: true,
  Student_Achievement_Science_Top_5_District4: [],
  Student_Achievement_Science_Top_5_District5Loading: true,
  Student_Achievement_Science_Top_5_District5: [],

  Student_Achievement_Science_bottom_5_District1Loading: true,
  Student_Achievement_Science_bottom_5_District1: [],
  Student_Achievement_Science_bottom_5_District2Loading: true,
  Student_Achievement_Science_bottom_5_District2: [],
  Student_Achievement_Science_bottom_5_District3Loading: true,
  Student_Achievement_Science_bottom_5_District3: [],
  Student_Achievement_Science_bottom_5_District4Loading: true,
  Student_Achievement_Science_bottom_5_District4: [],
  Student_Achievement_Science_bottom_5_District5Loading: true,
  Student_Achievement_Science_bottom_5_District5: [],

  Attendance_Top_5_District1Loading: true,
  Attendance_Top_5_District1: [],
  Attendance_Top_5_District2Loading: true,
  Attendance_Top_5_District2: [],
  Attendance_Top_5_District3Loading: true,
  Attendance_Top_5_District3: [],
  Attendance_Top_5_District4Loading: true,
  Attendance_Top_5_District4: [],
  Attendance_Top_5_District5Loading: true,
  Attendance_Top_5_District5: [],

  Attendance_bottom_5_District1Loading: true,
  Attendance_bottom_5_District1: [],
  Attendance_bottom_5_District2Loading: true,
  Attendance_bottom_5_District2: [],
  Attendance_bottom_5_District3Loading: true,
  Attendance_bottom_5_District3: [],
  Attendance_bottom_5_District4Loading: true,
  Attendance_bottom_5_District4: [],
  Attendance_bottom_5_District5Loading: true,
  Attendance_bottom_5_District5: [],

  Nearby_Districtloading: true,
  Nearby_District: [],

  State_Benchmarking_table:[],
  State_Benchmarking_tableloading: true,

  State_Benchmarking_top_tile:[],
  State_Benchmarking_top_tileloading: true,

  State_Benchmarking_table_Details:[],
  State_Benchmarking_table_Detailsloading:true,

}

export const fetchDistrict_Size = createAsyncThunk(
  'fetchDistrict_Size',
  async (District_Size, thunkAPI) => {
    District_Size = { ...District_Size, elasticQueryName: "DISTRICT_SIZE" }
    const response = await getNetSales(District_Size);
    return response.data
  }
)

export const fetchGraduation_Top_5 = createAsyncThunk(
  'fetchGraduation_Top_5',
  async (Graduation_Top_5, thunkAPI) => {
    Graduation_Top_5 = { ...Graduation_Top_5, elasticQueryName: "Graduation Top 5" }
    const response = await getNetSales(Graduation_Top_5);
    return response.data
  }
)

export const fetchGraduation_Bottom_5 = createAsyncThunk(
  'fetchGraduation_Bottom_5',
  async (Graduation_Bottom_5, thunkAPI) => {
    Graduation_Bottom_5 = { ...Graduation_Bottom_5, elasticQueryName: "Graduation Bottom 5" }
    const response = await getNetSales(Graduation_Bottom_5);
    return response.data
  }
)

export const fetchStudent_Achievement_ELA_Top_5 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Top_5',
  async (Student_Achievement_ELA_Top_5, thunkAPI) => {
    Student_Achievement_ELA_Top_5 = { ...Student_Achievement_ELA_Top_5, elasticQueryName: "Student Achievement - ELA Top 5" }
    const response = await getNetSales(Student_Achievement_ELA_Top_5);
    return response.data
  }
)

export const fetchStudent_Achievement_ELA_Bottom_5 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Bottom_5',
  async (Student_Achievement_ELA_Bottom_5, thunkAPI) => {
    Student_Achievement_ELA_Bottom_5 = { ...Student_Achievement_ELA_Bottom_5, elasticQueryName: "Student Achievement - ELA Bottom 5" }
    const response = await getNetSales(Student_Achievement_ELA_Bottom_5);
    return response.data
  }
)

export const fetchStudent_Achievement_Math_Top_5 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Top_5',
  async (Student_Achievement_Math_Top_5, thunkAPI) => {
    Student_Achievement_Math_Top_5 = { ...Student_Achievement_Math_Top_5, elasticQueryName: "Student Achievement - Math Top 5" }
    const response = await getNetSales(Student_Achievement_Math_Top_5);
    return response.data
  }
)

export const fetchStudent_Achievement_Math_Bottom_5 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Bottom_5',
  async (Student_Achievement_Math_Bottom_5, thunkAPI) => {
    Student_Achievement_Math_Bottom_5 = { ...Student_Achievement_Math_Bottom_5, elasticQueryName: "Student Achievement - Math Bottom 5" }
    const response = await getNetSales(Student_Achievement_Math_Bottom_5);
    return response.data
  }
)

export const fetchStudent_Achievement_Science_Top_5 = createAsyncThunk(
  'fetchStudent_Achievement_Science_Top_5',
  async (Student_Achievement_Science_Top_5, thunkAPI) => {
    Student_Achievement_Science_Top_5 = { ...Student_Achievement_Science_Top_5, elasticQueryName: "Student Achievement - Science Top 5" }
    const response = await getNetSales(Student_Achievement_Science_Top_5);
    return response.data
  }
)

export const fetchStudent_Achievement_Science_Bottom_5 = createAsyncThunk(
  'fetchStudent_Achievement_Science_Bottom_5',
  async (Student_Achievement_Science_Bottom_5, thunkAPI) => {
    Student_Achievement_Science_Bottom_5 = { ...Student_Achievement_Science_Bottom_5, elasticQueryName: "Student Achievement - Science Bottom 5" }
    const response = await getNetSales(Student_Achievement_Science_Bottom_5);
    return response.data
  }
)

export const fetchAttendance_Top_5 = createAsyncThunk(
  'fetchAttendance_Top_5',
  async (Attendance_Top_5, thunkAPI) => {
    Attendance_Top_5 = { ...Attendance_Top_5, elasticQueryName: "Attendance Top 5" }
    const response = await getNetSales(Attendance_Top_5);
    return response.data
  }
)

export const fetchAttendance_Bottom_5 = createAsyncThunk(
  'fetchAttendance_Bottom_5',
  async (Attendance_Bottom_5, thunkAPI) => {
    Attendance_Bottom_5 = { ...Attendance_Bottom_5, elasticQueryName: "Attendance Bottom 5" }
    const response = await getNetSales(Attendance_Bottom_5);
    return response.data
  }
)

export const fetchOverall_Score = createAsyncThunk(
  'fetchOverall_Score',
  async (Overall_Score, thunkAPI) => {
    Overall_Score = { ...Overall_Score, elasticQueryName: "Overall_Score" }
    const response = await getNetSales(Overall_Score);
    return response.data
  }
)

export const fetchGraduation_Top_5_District1 = createAsyncThunk(
  'fetchGraduation_Top_5_District1',
  async (Graduation_Top_5_District1, thunkAPI) => {
    Graduation_Top_5_District1 = { ...Graduation_Top_5_District1, elasticQueryName: "Graduation Top 5 - District1" }
    const response = await getNetSales(Graduation_Top_5_District1);
    return response.data
  }
)

export const fetchGraduation_Top_5_District2 = createAsyncThunk(
  'fetchGraduation_Top_5_District2',
  async (Graduation_Top_5_District2, thunkAPI) => {
    Graduation_Top_5_District2 = { ...Graduation_Top_5_District2, elasticQueryName: "Graduation Top 5 - District2" }
    const response = await getNetSales(Graduation_Top_5_District2);
    return response.data
  }
)

export const fetchGraduation_Top_5_District3 = createAsyncThunk(
  'fetchGraduation_Top_5_District3',
  async (Graduation_Top_5_District3, thunkAPI) => {
    Graduation_Top_5_District3 = { ...Graduation_Top_5_District3, elasticQueryName: "Graduation Top 5 - District3" }
    const response = await getNetSales(Graduation_Top_5_District3);
    return response.data
  }
)

export const fetchGraduation_Top_5_District4 = createAsyncThunk(
  'fetchGraduation_Top_5_District4',
  async (Graduation_Top_5_District4, thunkAPI) => {
    Graduation_Top_5_District4 = { ...Graduation_Top_5_District4, elasticQueryName: "Graduation Top 5 - District4" }
    const response = await getNetSales(Graduation_Top_5_District4);
    return response.data
  }
)

export const fetchGraduation_Top_5_District5 = createAsyncThunk(
  'fetchGraduation_Top_5_District5',
  async (Graduation_Top_5_District5, thunkAPI) => {
    Graduation_Top_5_District5 = { ...Graduation_Top_5_District5, elasticQueryName: "Graduation Top 5 - District5" }
    const response = await getNetSales(Graduation_Top_5_District5);
    return response.data
  }
)

export const fetchGraduation_bottom_5_District1 = createAsyncThunk(
  'fetchGraduation_bottom_5_District1',
  async (Graduation_bottom_5_District1, thunkAPI) => {
    Graduation_bottom_5_District1 = { ...Graduation_bottom_5_District1, elasticQueryName: "Graduation bottom 5 - District1" }
    const response = await getNetSales(Graduation_bottom_5_District1);
    return response.data
  }
)

export const fetchGraduation_bottom_5_District2 = createAsyncThunk(
  'fetchGraduation_bottom_5_District2',
  async (Graduation_bottom_5_District2, thunkAPI) => {
    Graduation_bottom_5_District2 = { ...Graduation_bottom_5_District2, elasticQueryName: "Graduation bottom 5 - District2" }
    const response = await getNetSales(Graduation_bottom_5_District2);
    return response.data
  }
)

export const fetchGraduation_bottom_5_District3 = createAsyncThunk(
  'fetchGraduation_bottom_5_District3',
  async (Graduation_bottom_5_District3, thunkAPI) => {
    Graduation_bottom_5_District3 = { ...Graduation_bottom_5_District3, elasticQueryName: "Graduation bottom 5 - District3" }
    const response = await getNetSales(Graduation_bottom_5_District3);
    return response.data
  }
)

export const fetchGraduation_bottom_5_District4 = createAsyncThunk(
  'fetchGraduation_bottom_5_District4',
  async (Graduation_bottom_5_District4, thunkAPI) => {
    Graduation_bottom_5_District4 = { ...Graduation_bottom_5_District4, elasticQueryName: "Graduation bottom 5 - District4" }
    const response = await getNetSales(Graduation_bottom_5_District4);
    return response.data
  }
)

export const fetchGraduation_bottom_5_District5 = createAsyncThunk(
  'fetchGraduation_bottom_5_District5',
  async (Graduation_bottom_5_District5, thunkAPI) => {
    Graduation_bottom_5_District5 = { ...Graduation_bottom_5_District5, elasticQueryName: "Graduation bottom 5 - District5" }
    const response = await getNetSales(Graduation_bottom_5_District5);
    return response.data
  }
)

export const fetchStudent_Achievement_ELA_Top_5_District1 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Top_5_District1',
  async (Student_Achievement_ELA_Top_5_District1, thunkAPI) => {
    Student_Achievement_ELA_Top_5_District1 = { ...Student_Achievement_ELA_Top_5_District1, elasticQueryName: "Student Achievement - ELA Top 5 - District1" }
    const response = await getNetSales(Student_Achievement_ELA_Top_5_District1)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Top_5_District2 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Top_5_District2',
  async (Student_Achievement_ELA_Top_5_District2, thunkAPI) => {
    Student_Achievement_ELA_Top_5_District2 = { ...Student_Achievement_ELA_Top_5_District2, elasticQueryName: "Student Achievement - ELA Top 5 - District2" }
    const response = await getNetSales(Student_Achievement_ELA_Top_5_District2)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Top_5_District3 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Top_5_District3',
  async (Student_Achievement_ELA_Top_5_District3, thunkAPI) => {
    Student_Achievement_ELA_Top_5_District3 = { ...Student_Achievement_ELA_Top_5_District3, elasticQueryName: "Student Achievement - ELA Top 5 - District3" }
    const response = await getNetSales(Student_Achievement_ELA_Top_5_District3)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Top_5_District4 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Top_5_District4',
  async (Student_Achievement_ELA_Top_5_District4, thunkAPI) => {
    Student_Achievement_ELA_Top_5_District4 = { ...Student_Achievement_ELA_Top_5_District4, elasticQueryName: "Student Achievement - ELA Top 5 - District4" }
    const response = await getNetSales(Student_Achievement_ELA_Top_5_District4)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Top_5_District5 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Top_5_District5',
  async (Student_Achievement_ELA_Top_5_District5, thunkAPI) => {
    Student_Achievement_ELA_Top_5_District5 = { ...Student_Achievement_ELA_Top_5_District5, elasticQueryName: "Student Achievement - ELA Top 5 - District5" }
    const response = await getNetSales(Student_Achievement_ELA_Top_5_District5)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Bottom_5_District1 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Bottom_5_District1',
  async (Student_Achievement_ELA_Bottom_5_District1, thunkAPI) => {
    Student_Achievement_ELA_Bottom_5_District1 = { ...Student_Achievement_ELA_Bottom_5_District1, elasticQueryName: "Student Achievement - ELA bottom 5 - District1" }
    const response = await getNetSales(Student_Achievement_ELA_Bottom_5_District1)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Bottom_5_District2 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Bottom_5_District2',
  async (Student_Achievement_ELA_Bottom_5_District2, thunkAPI) => {
    Student_Achievement_ELA_Bottom_5_District2 = { ...Student_Achievement_ELA_Bottom_5_District2, elasticQueryName: "Student Achievement - ELA bottom 5 - District2" }
    const response = await getNetSales(Student_Achievement_ELA_Bottom_5_District2)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Bottom_5_District3 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Bottom_5_District3',
  async (Student_Achievement_ELA_Bottom_5_District3, thunkAPI) => {
    Student_Achievement_ELA_Bottom_5_District3 = { ...Student_Achievement_ELA_Bottom_5_District3, elasticQueryName: "Student Achievement - ELA bottom 5 - District3" }
    const response = await getNetSales(Student_Achievement_ELA_Bottom_5_District3)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Bottom_5_District4 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Bottom_5_District4',
  async (Student_Achievement_ELA_Bottom_5_District4, thunkAPI) => {
    Student_Achievement_ELA_Bottom_5_District4 = { ...Student_Achievement_ELA_Bottom_5_District4, elasticQueryName: "Student Achievement - ELA bottom 5 - District4" }
    const response = await getNetSales(Student_Achievement_ELA_Bottom_5_District4)
    return response.data
  }
);

export const fetchStudent_Achievement_ELA_Bottom_5_District5 = createAsyncThunk(
  'fetchStudent_Achievement_ELA_Bottom_5_District5',
  async (Student_Achievement_ELA_Bottom_5_District5, thunkAPI) => {
    Student_Achievement_ELA_Bottom_5_District5 = { ...Student_Achievement_ELA_Bottom_5_District5, elasticQueryName: "Student Achievement - ELA bottom 5 - District5" }
    const response = await getNetSales(Student_Achievement_ELA_Bottom_5_District5)
    return response.data
  }
);
export const fetchStudent_Achievement_Math_Top_5_District1 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Top_5_District1',
  async (Student_Achievement_Math_Top_5_District1, thunkAPI) => {
    Student_Achievement_Math_Top_5_District1 = { ...Student_Achievement_Math_Top_5_District1, elasticQueryName: "Student Achievement - Math Top 5 - District1" }
    const response = await getNetSales(Student_Achievement_Math_Top_5_District1)
    return response.data
  }
);

export const fetchStudent_Achievement_Math_Top_5_District2 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Top_5_District2',
  async (Student_Achievement_Math_Top_5_District2, thunkAPI) => {
    Student_Achievement_Math_Top_5_District2 = { ...Student_Achievement_Math_Top_5_District2, elasticQueryName: "Student Achievement - Math Top 5 - District2" }
    const response = await getNetSales(Student_Achievement_Math_Top_5_District2)
    return response.data
  }
);

export const fetchStudent_Achievement_Math_Top_5_District3 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Top_5_District3',
  async (Student_Achievement_Math_Top_5_District3, thunkAPI) => {
    Student_Achievement_Math_Top_5_District3 = { ...Student_Achievement_Math_Top_5_District3, elasticQueryName: "Student Achievement - Math Top 5 - District3" }
    const response = await getNetSales(Student_Achievement_Math_Top_5_District3)
    return response.data
  }
);

export const fetchStudent_Achievement_Math_Top_5_District4 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Top_5_District4',
  async (Student_Achievement_Math_Top_5_District4, thunkAPI) => {
    Student_Achievement_Math_Top_5_District4 = { ...Student_Achievement_Math_Top_5_District4, elasticQueryName: "Student Achievement - Math Top 5 - District4" }
    const response = await getNetSales(Student_Achievement_Math_Top_5_District4)
    return response.data
  }
);

export const fetchStudent_Achievement_Math_Top_5_District5 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Top_5_District5',
  async (Student_Achievement_Math_Top_5_District5, thunkAPI) => {
    Student_Achievement_Math_Top_5_District5 = { ...Student_Achievement_Math_Top_5_District5, elasticQueryName: "Student Achievement - Math Top 5 - District5" }
    const response = await getNetSales(Student_Achievement_Math_Top_5_District5)
    return response.data
  }
);
export const fetchStudent_Achievement_Math_Bottom_5_District1 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Bottom_5_District1',
  async (Student_Achievement_Math_Bottom_5_District1, thunkAPI) => {
    Student_Achievement_Math_Bottom_5_District1 = { ...Student_Achievement_Math_Bottom_5_District1, elasticQueryName: "Student Achievement - Math bottom 5 - District1" }
    const response = await getNetSales(Student_Achievement_Math_Bottom_5_District1)
    return response.data
  }
);

export const fetchStudent_Achievement_Math_Bottom_5_District2 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Bottom_5_District2',
  async (Student_Achievement_Math_Bottom_5_District2, thunkAPI) => {
    Student_Achievement_Math_Bottom_5_District2 = { ...Student_Achievement_Math_Bottom_5_District2, elasticQueryName: "Student Achievement - Math bottom 5 - District2" }
    const response = await getNetSales(Student_Achievement_Math_Bottom_5_District2)
    return response.data
  }
);

export const fetchStudent_Achievement_Math_Bottom_5_District3 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Bottom_5_District3',
  async (Student_Achievement_Math_Bottom_5_District3, thunkAPI) => {
    Student_Achievement_Math_Bottom_5_District3 = { ...Student_Achievement_Math_Bottom_5_District3, elasticQueryName: "Student Achievement - Math bottom 5 - District3" }
    const response = await getNetSales(Student_Achievement_Math_Bottom_5_District3)
    return response.data
  }
);

export const fetchStudent_Achievement_Math_Bottom_5_District4 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Bottom_5_District4',
  async (Student_Achievement_Math_Bottom_5_District4, thunkAPI) => {
    Student_Achievement_Math_Bottom_5_District4 = { ...Student_Achievement_Math_Bottom_5_District4, elasticQueryName: "Student Achievement - Math bottom 5 - District4" }
    const response = await getNetSales(Student_Achievement_Math_Bottom_5_District4)
    return response.data
  }
);

export const fetchStudent_Achievement_Math_Bottom_5_District5 = createAsyncThunk(
  'fetchStudent_Achievement_Math_Bottom_5_District5',
  async (Student_Achievement_Math_Bottom_5_District5, thunkAPI) => {
    Student_Achievement_Math_Bottom_5_District5 = { ...Student_Achievement_Math_Bottom_5_District5, elasticQueryName: "Student Achievement - Math bottom 5 - District5" }
    const response = await getNetSales(Student_Achievement_Math_Bottom_5_District5)
    return response.data
  }
);
export const fetchStudent_Achievement_Science_Top_5_District1 = createAsyncThunk(
  'fetchStudent_Achievement_Science_Top_5_District1',
  async (Student_Achievement_Science_Top_5_District1, thunkAPI) => {
    Student_Achievement_Science_Top_5_District1 = { ...Student_Achievement_Science_Top_5_District1, elasticQueryName: "Student Achievement - Science Top 5 - District1" }
    const response = await getNetSales(Student_Achievement_Science_Top_5_District1)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_Top_5_District2 = createAsyncThunk(
  'fetchStudent_Achievement_Science_Top_5_District2',
  async (Student_Achievement_Science_Top_5_District2, thunkAPI) => {
    Student_Achievement_Science_Top_5_District2 = { ...Student_Achievement_Science_Top_5_District2, elasticQueryName: "Student Achievement - Science Top 5 - District2" }
    const response = await getNetSales(Student_Achievement_Science_Top_5_District2)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_Top_5_District3 = createAsyncThunk(
  'fetchStudent_Achievement_Science_Top_5_District3',
  async (Student_Achievement_Science_Top_5_District3, thunkAPI) => {
    Student_Achievement_Science_Top_5_District3 = { ...Student_Achievement_Science_Top_5_District3, elasticQueryName: "Student Achievement - Science Top 5 - District3" }
    const response = await getNetSales(Student_Achievement_Science_Top_5_District3)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_Top_5_District4 = createAsyncThunk(
  'fetchStudent_Achievement_Science_Top_5_District4',
  async (Student_Achievement_Science_Top_5_District4, thunkAPI) => {
    Student_Achievement_Science_Top_5_District4 = { ...Student_Achievement_Science_Top_5_District4, elasticQueryName: "Student Achievement - Science Top 5 - District4" }
    const response = await getNetSales(Student_Achievement_Science_Top_5_District4)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_Top_5_District5 = createAsyncThunk(
  'fetchStudent_Achievement_Science_Top_5_District5',
  async (Student_Achievement_Science_Top_5_District5, thunkAPI) => {
    Student_Achievement_Science_Top_5_District5 = { ...Student_Achievement_Science_Top_5_District5, elasticQueryName: "Student Achievement - Science Top 5 - District5" }
    const response = await getNetSales(Student_Achievement_Science_Top_5_District5)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_bottom_5_District1 = createAsyncThunk(
  'fetchStudent_Achievement_Science_bottom_5_District1',
  async (Student_Achievement_Science_bottom_5_District1, thunkAPI) => {
    Student_Achievement_Science_bottom_5_District1 = { ...Student_Achievement_Science_bottom_5_District1, elasticQueryName: "Student Achievement - Science bottom 5 - District1" }
    const response = await getNetSales(Student_Achievement_Science_bottom_5_District1)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_bottom_5_District2 = createAsyncThunk(
  'fetchStudent_Achievement_Science_bottom_5_District2',
  async (Student_Achievement_Science_bottom_5_District2, thunkAPI) => {
    Student_Achievement_Science_bottom_5_District2 = { ...Student_Achievement_Science_bottom_5_District2, elasticQueryName: "Student Achievement - Science bottom 5 - District2" }
    const response = await getNetSales(Student_Achievement_Science_bottom_5_District2)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_bottom_5_District3 = createAsyncThunk(
  'fetchStudent_Achievement_Science_bottom_5_District3',
  async (Student_Achievement_Science_bottom_5_District3, thunkAPI) => {
    Student_Achievement_Science_bottom_5_District3 = { ...Student_Achievement_Science_bottom_5_District3, elasticQueryName: "Student Achievement - Science bottom 5 - District3" }
    const response = await getNetSales(Student_Achievement_Science_bottom_5_District3)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_bottom_5_District4 = createAsyncThunk(
  'fetchStudent_Achievement_Science_bottom_5_District4',
  async (Student_Achievement_Science_bottom_5_District4, thunkAPI) => {
    Student_Achievement_Science_bottom_5_District4 = { ...Student_Achievement_Science_bottom_5_District4, elasticQueryName: "Student Achievement - Science bottom 5 - District4" }
    const response = await getNetSales(Student_Achievement_Science_bottom_5_District4)
    return response.data
  }
);

export const fetchStudent_Achievement_Science_bottom_5_District5 = createAsyncThunk(
  'fetchStudent_Achievement_Science_bottom_5_District5',
  async (Student_Achievement_Science_bottom_5_District5, thunkAPI) => {
    Student_Achievement_Science_bottom_5_District5 = { ...Student_Achievement_Science_bottom_5_District5, elasticQueryName: "Student Achievement - Science bottom 5 - District5" }
    const response = await getNetSales(Student_Achievement_Science_bottom_5_District5)
    return response.data
  }
);
export const fetchAttendance_Top_5_District1 = createAsyncThunk(
  'fetchAttendance_Top_5_District1',
  async (Attendance_Top_5_District1, thunkAPI) => {
    Attendance_Top_5_District1 = { ...Attendance_Top_5_District1, elasticQueryName: "Attendance Top 5 - District1" }
    const response = await getNetSales(Attendance_Top_5_District1)
    return response.data
  }
);

export const fetchAttendance_Top_5_District2 = createAsyncThunk(
  'fetchAttendance_Top_5_District2',
  async (Attendance_Top_5_District2, thunkAPI) => {
    Attendance_Top_5_District2 = { ...Attendance_Top_5_District2, elasticQueryName: "Attendance Top 5 - District2" }
    const response = await getNetSales(Attendance_Top_5_District2)
    return response.data
  }
);

export const fetchAttendance_Top_5_District3 = createAsyncThunk(
  'fetchAttendance_Top_5_District3',
  async (Attendance_Top_5_District3, thunkAPI) => {
    Attendance_Top_5_District3 = { ...Attendance_Top_5_District3, elasticQueryName: "Attendance Top 5 - District3" }
    const response = await getNetSales(Attendance_Top_5_District3)
    return response.data
  }
);

export const fetchAttendance_Top_5_District4 = createAsyncThunk(
  'fetchAttendance_Top_5_District4',
  async (Attendance_Top_5_District4, thunkAPI) => {
    Attendance_Top_5_District4 = { ...Attendance_Top_5_District4, elasticQueryName: "Attendance Top 5 - District4" }
    const response = await getNetSales(Attendance_Top_5_District4)
    return response.data
  }
);

export const fetchAttendance_Top_5_District5 = createAsyncThunk(
  'fetchAttendance_Top_5_District5',
  async (Attendance_Top_5_District5, thunkAPI) => {
    Attendance_Top_5_District5 = { ...Attendance_Top_5_District5, elasticQueryName: "Attendance Top 5 - District5" }
    const response = await getNetSales(Attendance_Top_5_District5)
    return response.data
  }
);
export const fetchAttendance_bottom_5_District1 = createAsyncThunk(
  'fetchAttendance_bottom_5_District1',
  async (Attendance_bottom_5_District1, thunkAPI) => {
    Attendance_bottom_5_District1 = { ...Attendance_bottom_5_District1, elasticQueryName: "Attendance bottom 5 - District1" }
    const response = await getNetSales(Attendance_bottom_5_District1)
    return response.data
  }
);

export const fetchAttendance_bottom_5_District2 = createAsyncThunk(
  'fetchAttendance_bottom_5_District2',
  async (Attendance_bottom_5_District2, thunkAPI) => {
    Attendance_bottom_5_District2 = { ...Attendance_bottom_5_District2, elasticQueryName: "Attendance bottom 5 - District2" }
    const response = await getNetSales(Attendance_bottom_5_District2)
    return response.data
  }
);

export const fetchAttendance_bottom_5_District3 = createAsyncThunk(
  'fetchAttendance_bottom_5_District3',
  async (Attendance_bottom_5_District3, thunkAPI) => {
    Attendance_bottom_5_District3 = { ...Attendance_bottom_5_District3, elasticQueryName: "Attendance bottom 5 - District3" }
    const response = await getNetSales(Attendance_bottom_5_District3)
    return response.data
  }
);

export const fetchAttendance_bottom_5_District4 = createAsyncThunk(
  'fetchAttendance_bottom_5_District4',
  async (Attendance_bottom_5_District4, thunkAPI) => {
    Attendance_bottom_5_District4 = { ...Attendance_bottom_5_District4, elasticQueryName: "Attendance bottom 5 - District4" }
    const response = await getNetSales(Attendance_bottom_5_District4)
    return response.data
  }
);

export const fetchAttendance_bottom_5_District5 = createAsyncThunk(
  'fetchAttendance_bottom_5_District5',
  async (Attendance_bottom_5_District5, thunkAPI) => {
    Attendance_bottom_5_District5 = { ...Attendance_bottom_5_District5, elasticQueryName: "Attendance bottom 5 - District5" }
    const response = await getNetSales(Attendance_bottom_5_District5)
    return response.data
  }
);

export const fetchNearby_District = createAsyncThunk(
  'fetchNearby_District',
  async (Nearby_District, thunkAPI) => {
    Nearby_District = { ...Nearby_District, elasticQueryName: "Nearby_District" }
    const response = await getNetSales(Nearby_District);
    return response.data
  }
)

export const fetchState_Benchmarking_table = createAsyncThunk(
  'fetchState_Benchmarking_table',
  async (State_Benchmarking_table, thunkAPI) => {
    State_Benchmarking_table = { ...State_Benchmarking_table, elasticQueryName: "State_Benchmarking_table" }
    const response = await getNetSales(State_Benchmarking_table);
    return response.data
  }
)

export const fetchState_Benchmarking_top_tile = createAsyncThunk(
  'fetchState_Benchmarking_top_tile',
  async (State_Benchmarking_top_tile, thunkAPI) => {
    State_Benchmarking_top_tile = { ...State_Benchmarking_top_tile, elasticQueryName: "State_benchmark_top_tile" }
    const response = await getNetSales(State_Benchmarking_top_tile);
    return response.data
  }
)

export const fetchState_Benchmarking_table_Details = createAsyncThunk(
  'fetchState_Benchmarking_table_Details',
  async (State_Benchmarking_table_Details, thunkAPI) => {
    State_Benchmarking_table_Details = { ...State_Benchmarking_table_Details, elasticQueryName: "State_Benchmarking_table_Details" }
    const response = await getNetSales(State_Benchmarking_table_Details);
    return response.data
  }
)


export const statebenchmarking = createSlice({
  name: 'statebenchmarking',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDistrict_Size.fulfilled, (state, action) => {
      state.District_Size = action.payload;
      state.District_Sizeloading = false;
    }).addCase(fetchDistrict_Size.pending, (state, action) => {
      state.District_Sizeloading = true;
    })

    builder.addCase(fetchGraduation_Top_5.fulfilled, (state, action) => {
      state.Graduation_Top_5 = action.payload;
      state.Graduation_Top_5loading = false;
    }).addCase(fetchGraduation_Top_5.pending, (state, action) => {
      state.Graduation_Top_5loading = true;
    })

    builder.addCase(fetchGraduation_Bottom_5.fulfilled, (state, action) => {
      state.Graduation_Bottom_5 = action.payload;
      state.Graduation_Bottom_5loading = false;
    }).addCase(fetchGraduation_Bottom_5.pending, (state, action) => {
      state.Graduation_Bottom_5loading = true;
    })

    builder.addCase(fetchStudent_Achievement_ELA_Top_5.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Top_5 = action.payload;
      state.Student_Achievement_ELA_Top_5loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Top_5.pending, (state, action) => {
      state.Student_Achievement_ELA_Top_5loading = true;
    })

    builder.addCase(fetchStudent_Achievement_ELA_Bottom_5.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5 = action.payload;
      state.Student_Achievement_ELA_Bottom_5loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Bottom_5.pending, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Top_5.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Top_5 = action.payload;
      state.Student_Achievement_Math_Top_5loading = false;
    }).addCase(fetchStudent_Achievement_Math_Top_5.pending, (state, action) => {
      state.Student_Achievement_Math_Top_5loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Bottom_5.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Bottom_5 = action.payload;
      state.Student_Achievement_Math_Bottom_5loading = false;
    }).addCase(fetchStudent_Achievement_Math_Bottom_5.pending, (state, action) => {
      state.Student_Achievement_Math_Bottom_5loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_Top_5.fulfilled, (state, action) => {
      state.Student_Achievement_Science_Top_5 = action.payload;
      state.Student_Achievement_Science_Top_5loading = false;
    }).addCase(fetchStudent_Achievement_Science_Top_5.pending, (state, action) => {
      state.Student_Achievement_Science_Top_5loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_Bottom_5.fulfilled, (state, action) => {
      state.Student_Achievement_Science_Bottom_5 = action.payload;
      state.Student_Achievement_Science_Bottom_5loading = false;
    }).addCase(fetchStudent_Achievement_Science_Bottom_5.pending, (state, action) => {
      state.Student_Achievement_Science_Bottom_5loading = true;
    })

    builder.addCase(fetchAttendance_Top_5.fulfilled, (state, action) => {
      state.Attendance_Top_5 = action.payload;
      state.Attendance_Top_5loading = false;
    }).addCase(fetchAttendance_Top_5.pending, (state, action) => {
      state.Attendance_Top_5loading = true;
    })

    builder.addCase(fetchAttendance_Bottom_5.fulfilled, (state, action) => {
      state.Attendance_Bottom_5 = action.payload;
      state.Attendance_Bottom_5loading = false;
    }).addCase(fetchAttendance_Bottom_5.pending, (state, action) => {
      state.Attendance_Bottom_5loading = true;
    })

    builder.addCase(fetchOverall_Score.fulfilled, (state, action) => {
      state.Overall_Score = action.payload;
      state.Overall_Scoreloading = false;
    }).addCase(fetchOverall_Score.pending, (state, action) => {
      state.Overall_Scoreloading = true;
    })

    builder.addCase(fetchGraduation_Top_5_District1.fulfilled, (state, action) => {
      state.Graduation_Top_5_District1 = action.payload;
      state.Graduation_Top_5_District1loading = false;
    }).addCase(fetchGraduation_Top_5_District1.pending, (state, action) => {
      state.Graduation_Top_5_District1loading = true;
    })

    builder.addCase(fetchGraduation_Top_5_District2.fulfilled, (state, action) => {
      state.Graduation_Top_5_District2 = action.payload;
      state.Graduation_Top_5_District2loading = false;
    }).addCase(fetchGraduation_Top_5_District2.pending, (state, action) => {
      state.Graduation_Top_5_District2loading = true;
    })

    builder.addCase(fetchGraduation_Top_5_District3.fulfilled, (state, action) => {
      state.Graduation_Top_5_District3 = action.payload;
      state.Graduation_Top_5_District3loading = false;
    }).addCase(fetchGraduation_Top_5_District3.pending, (state, action) => {
      state.Graduation_Top_5_District3loading = true;
    })

    builder.addCase(fetchGraduation_Top_5_District4.fulfilled, (state, action) => {
      state.Graduation_Top_5_District4 = action.payload;
      state.Graduation_Top_5_District4loading = false;
    }).addCase(fetchGraduation_Top_5_District4.pending, (state, action) => {
      state.Graduation_Top_5_District4loading = true;
    })

    builder.addCase(fetchGraduation_Top_5_District5.fulfilled, (state, action) => {
      state.Graduation_Top_5_District5 = action.payload;
      state.Graduation_Top_5_District5loading = false;
    }).addCase(fetchGraduation_Top_5_District5.pending, (state, action) => {
      state.Graduation_Top_5_District5loading = true;
    })


    builder.addCase(fetchGraduation_bottom_5_District1.fulfilled, (state, action) => {
      state.Graduation_bottom_5_District1 = action.payload;
      state.Graduation_bottom_5_District1loading = false;
    }).addCase(fetchGraduation_bottom_5_District1.pending, (state, action) => {
      state.Graduation_bottom_5_District1loading = true;
    })
    builder.addCase(fetchGraduation_bottom_5_District2.fulfilled, (state, action) => {
      state.Graduation_bottom_5_District2 = action.payload;
      state.Graduation_bottom_5_District2loading = false;
    }).addCase(fetchGraduation_bottom_5_District2.pending, (state, action) => {
      state.Graduation_bottom_5_District2loading = true;
    })
    builder.addCase(fetchGraduation_bottom_5_District3.fulfilled, (state, action) => {
      state.Graduation_bottom_5_District3 = action.payload;
      state.Graduation_bottom_5_District3loading = false;
    }).addCase(fetchGraduation_bottom_5_District3.pending, (state, action) => {
      state.Graduation_bottom_5_District3loading = true;
    })
    builder.addCase(fetchGraduation_bottom_5_District4.fulfilled, (state, action) => {
      state.Graduation_bottom_5_District4 = action.payload;
      state.Graduation_bottom_5_District4loading = false;
    }).addCase(fetchGraduation_bottom_5_District4.pending, (state, action) => {
      state.Graduation_bottom_5_District4loading = true;
    })
    builder.addCase(fetchGraduation_bottom_5_District5.fulfilled, (state, action) => {
      state.Graduation_bottom_5_District5 = action.payload;
      state.Graduation_bottom_5_District5loading = false;
    }).addCase(fetchGraduation_bottom_5_District5.pending, (state, action) => {
      state.Graduation_bottom_5_District5loading = true;
    })

    builder.addCase(fetchStudent_Achievement_ELA_Top_5_District1.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District1 = action.payload;
      state.Student_Achievement_ELA_Top_5_District1Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Top_5_District1.pending, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District1Loading = true;
    })
    builder.addCase(fetchStudent_Achievement_ELA_Top_5_District2.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District2 = action.payload;
      state.Student_Achievement_ELA_Top_5_District2Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Top_5_District2.pending, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District2Loading = true;
    })
    builder.addCase(fetchStudent_Achievement_ELA_Top_5_District3.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District3 = action.payload;
      state.Student_Achievement_ELA_Top_5_District3Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Top_5_District3.pending, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District3Loading = true;
    })
    builder.addCase(fetchStudent_Achievement_ELA_Top_5_District4.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District4 = action.payload;
      state.Student_Achievement_ELA_Top_5_District4Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Top_5_District4.pending, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District4Loading = true;
    })
    builder.addCase(fetchStudent_Achievement_ELA_Top_5_District5.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District5 = action.payload;
      state.Student_Achievement_ELA_Top_5_District5Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Top_5_District5.pending, (state, action) => {
      state.Student_Achievement_ELA_Top_5_District5Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_ELA_Bottom_5_District1.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District1 = action.payload;
      state.Student_Achievement_ELA_Bottom_5_District1Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Bottom_5_District1.pending, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District1Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_ELA_Bottom_5_District2.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District2 = action.payload;
      state.Student_Achievement_ELA_Bottom_5_District2Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Bottom_5_District2.pending, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District2Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_ELA_Bottom_5_District3.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District3 = action.payload;
      state.Student_Achievement_ELA_Bottom_5_District3Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Bottom_5_District3.pending, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District3Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_ELA_Bottom_5_District4.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District4 = action.payload;
      state.Student_Achievement_ELA_Bottom_5_District4Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Bottom_5_District4.pending, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District4Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_ELA_Bottom_5_District5.fulfilled, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District5 = action.payload;
      state.Student_Achievement_ELA_Bottom_5_District5Loading = false;
    }).addCase(fetchStudent_Achievement_ELA_Bottom_5_District5.pending, (state, action) => {
      state.Student_Achievement_ELA_Bottom_5_District5Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Top_5_District1.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Top_5_District1 = action.payload;
      state.Student_Achievement_Math_Top_5_District1Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Top_5_District1.pending, (state, action) => {
      state.Student_Achievement_Math_Top_5_District1Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Top_5_District2.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Top_5_District2 = action.payload;
      state.Student_Achievement_Math_Top_5_District2Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Top_5_District2.pending, (state, action) => {
      state.Student_Achievement_Math_Top_5_District2Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Top_5_District3.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Top_5_District3 = action.payload;
      state.Student_Achievement_Math_Top_5_District3Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Top_5_District3.pending, (state, action) => {
      state.Student_Achievement_Math_Top_5_District3Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Top_5_District4.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Top_5_District4 = action.payload;
      state.Student_Achievement_Math_Top_5_District4Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Top_5_District4.pending, (state, action) => {
      state.Student_Achievement_Math_Top_5_District4Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Top_5_District5.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Top_5_District5 = action.payload;
      state.Student_Achievement_Math_Top_5_District5Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Top_5_District5.pending, (state, action) => {
      state.Student_Achievement_Math_Top_5_District5Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Bottom_5_District1.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District1 = action.payload;
      state.Student_Achievement_Math_Bottom_5_District1Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Bottom_5_District1.pending, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District1Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Bottom_5_District2.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District2 = action.payload;
      state.Student_Achievement_Math_Bottom_5_District2Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Bottom_5_District2.pending, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District2Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Bottom_5_District3.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District3 = action.payload;
      state.Student_Achievement_Math_Bottom_5_District3Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Bottom_5_District3.pending, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District3Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Bottom_5_District4.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District4 = action.payload;
      state.Student_Achievement_Math_Bottom_5_District4Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Bottom_5_District4.pending, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District4Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Math_Bottom_5_District5.fulfilled, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District5 = action.payload;
      state.Student_Achievement_Math_Bottom_5_District5Loading = false;
    }).addCase(fetchStudent_Achievement_Math_Bottom_5_District5.pending, (state, action) => {
      state.Student_Achievement_Math_Bottom_5_District5Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_Top_5_District1.fulfilled, (state, action) => {
      state.Student_Achievement_Science_Top_5_District1 = action.payload;
      state.Student_Achievement_Science_Top_5_District1Loading = false;
    }).addCase(fetchStudent_Achievement_Science_Top_5_District1.pending, (state, action) => {
      state.Student_Achievement_Science_Top_5_District1Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_Top_5_District2.fulfilled, (state, action) => {
      state.Student_Achievement_Science_Top_5_District2 = action.payload;
      state.Student_Achievement_Science_Top_5_District2Loading = false;
    }).addCase(fetchStudent_Achievement_Science_Top_5_District2.pending, (state, action) => {
      state.Student_Achievement_Science_Top_5_District2Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_Top_5_District3.fulfilled, (state, action) => {
      state.Student_Achievement_Science_Top_5_District3 = action.payload;
      state.Student_Achievement_Science_Top_5_District3Loading = false;
    }).addCase(fetchStudent_Achievement_Science_Top_5_District3.pending, (state, action) => {
      state.Student_Achievement_Science_Top_5_District3Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_Top_5_District4.fulfilled, (state, action) => {
      state.Student_Achievement_Science_Top_5_District4 = action.payload;
      state.Student_Achievement_Science_Top_5_District4Loading = false;
    }).addCase(fetchStudent_Achievement_Science_Top_5_District4.pending, (state, action) => {
      state.Student_Achievement_Science_Top_5_District4Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_Top_5_District5.fulfilled, (state, action) => {
      state.Student_Achievement_Science_Top_5_District5 = action.payload;
      state.Student_Achievement_Science_Top_5_District5Loading = false;
    }).addCase(fetchStudent_Achievement_Science_Top_5_District5.pending, (state, action) => {
      state.Student_Achievement_Science_Top_5_District5Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_bottom_5_District1.fulfilled, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District1 = action.payload;
      state.Student_Achievement_Science_bottom_5_District1Loading = false;
    }).addCase(fetchStudent_Achievement_Science_bottom_5_District1.pending, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District1Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_bottom_5_District2.fulfilled, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District2 = action.payload;
      state.Student_Achievement_Science_bottom_5_District2Loading = false;
    }).addCase(fetchStudent_Achievement_Science_bottom_5_District2.pending, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District2Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_bottom_5_District3.fulfilled, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District3 = action.payload;
      state.Student_Achievement_Science_bottom_5_District3Loading = false;
    }).addCase(fetchStudent_Achievement_Science_bottom_5_District3.pending, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District3Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_bottom_5_District4.fulfilled, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District4 = action.payload;
      state.Student_Achievement_Science_bottom_5_District4Loading = false;
    }).addCase(fetchStudent_Achievement_Science_bottom_5_District4.pending, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District4Loading = true;
    })

    builder.addCase(fetchStudent_Achievement_Science_bottom_5_District5.fulfilled, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District5 = action.payload;
      state.Student_Achievement_Science_bottom_5_District5Loading = false;
    }).addCase(fetchStudent_Achievement_Science_bottom_5_District5.pending, (state, action) => {
      state.Student_Achievement_Science_bottom_5_District5Loading = true;
    })
    builder.addCase(fetchAttendance_Top_5_District1.fulfilled, (state, action) => {
      state.Attendance_Top_5_District1 = action.payload;
      state.Attendance_Top_5_District1Loading = false;
    }).addCase(fetchAttendance_Top_5_District1.pending, (state, action) => {
      state.Attendance_Top_5_District1Loading = true;
    })

    builder.addCase(fetchAttendance_Top_5_District2.fulfilled, (state, action) => {
      state.Attendance_Top_5_District2 = action.payload;
      state.Attendance_Top_5_District2Loading = false;
    }).addCase(fetchAttendance_Top_5_District2.pending, (state, action) => {
      state.Attendance_Top_5_District2Loading = true;
    })

    builder.addCase(fetchAttendance_Top_5_District3.fulfilled, (state, action) => {
      state.Attendance_Top_5_District3 = action.payload;
      state.Attendance_Top_5_District3Loading = false;
    }).addCase(fetchAttendance_Top_5_District3.pending, (state, action) => {
      state.Attendance_Top_5_District3Loading = true;
    })

    builder.addCase(fetchAttendance_Top_5_District4.fulfilled, (state, action) => {
      state.Attendance_Top_5_District4 = action.payload;
      state.Attendance_Top_5_District4Loading = false;
    }).addCase(fetchAttendance_Top_5_District4.pending, (state, action) => {
      state.Attendance_Top_5_District4Loading = true;
    })

    builder.addCase(fetchAttendance_Top_5_District5.fulfilled, (state, action) => {
      state.Attendance_Top_5_District5 = action.payload;
      state.Attendance_Top_5_District5Loading = false;
    }).addCase(fetchAttendance_Top_5_District5.pending, (state, action) => {
      state.Attendance_Top_5_District5Loading = true;
    })

    builder.addCase(fetchAttendance_bottom_5_District1.fulfilled, (state, action) => {
      state.Attendance_bottom_5_District1 = action.payload;
      state.Attendance_bottom_5_District1Loading = false;
    }).addCase(fetchAttendance_bottom_5_District1.pending, (state, action) => {
      state.Attendance_bottom_5_District1Loading = true;
    })

    builder.addCase(fetchAttendance_bottom_5_District2.fulfilled, (state, action) => {
      state.Attendance_bottom_5_District2 = action.payload;
      state.Attendance_bottom_5_District2Loading = false;
    }).addCase(fetchAttendance_bottom_5_District2.pending, (state, action) => {
      state.Attendance_bottom_5_District2Loading = true;
    })

    builder.addCase(fetchAttendance_bottom_5_District3.fulfilled, (state, action) => {
      state.Attendance_bottom_5_District3 = action.payload;
      state.Attendance_bottom_5_District3Loading = false;
    }).addCase(fetchAttendance_bottom_5_District3.pending, (state, action) => {
      state.Attendance_bottom_5_District3Loading = true;
    })

    builder.addCase(fetchAttendance_bottom_5_District4.fulfilled, (state, action) => {
      state.Attendance_bottom_5_District4 = action.payload;
      state.Attendance_bottom_5_District4Loading = false;
    }).addCase(fetchAttendance_bottom_5_District4.pending, (state, action) => {
      state.Attendance_bottom_5_District4Loading = true;
    })

    builder.addCase(fetchAttendance_bottom_5_District5.fulfilled, (state, action) => {
      state.Attendance_bottom_5_District5 = action.payload;
      state.Attendance_bottom_5_District5Loading = false;
    }).addCase(fetchAttendance_bottom_5_District5.pending, (state, action) => {
      state.Attendance_bottom_5_District5Loading = true;
    })

    builder.addCase(fetchNearby_District.fulfilled, (state, action) => {
      state.Nearby_District = action.payload;
      state.Nearby_Districtloading = false;
    }).addCase(fetchNearby_District.pending, (state, action) => {
      state.Nearby_Districtloading = true;
    })

    builder.addCase(fetchState_Benchmarking_table.fulfilled, (state, action) => {
      state.State_Benchmarking_table = action.payload;
      state.State_Benchmarking_tableloading = false;
    }).addCase(fetchState_Benchmarking_table.pending, (state, action) => {
      state.State_Benchmarking_tableloading = true;
    })

    builder.addCase(fetchState_Benchmarking_top_tile.fulfilled, (state, action) => {
      state.State_Benchmarking_top_tile = action.payload;
      state.State_Benchmarking_top_tileloading = false;
    }).addCase(fetchState_Benchmarking_top_tile.pending, (state, action) => {
      state.State_Benchmarking_top_tileloading = true;
    })

    builder.addCase(fetchState_Benchmarking_table_Details.fulfilled, (state, action) => {
      state.State_Benchmarking_table_Details = action.payload;
      state.State_Benchmarking_table_Detailsloading = false;
    }).addCase(fetchState_Benchmarking_table_Details.pending, (state, action) => {
      state.State_Benchmarking_table_Detailsloading = true;
    })

  }
})

export default statebenchmarking.reducer