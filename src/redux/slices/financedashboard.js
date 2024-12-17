import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'

const initialState = {

  CreditRatingRevenue_and_Expenditure: [],
  CreditRatingRevenue_and_Expenditureloading: true,
  
  RevenuevsExpenditurechart: [],
  RevenuevsExpenditurechartloading: true,

  Expensesbycategory: [],
  Expensesbycategoryloading: true,

  PPE:[],
  PPEloading: true,

  PPE_toptileloading: true,
  PPE_toptile:[],

  Credit_toptileloading:true,
  Credit_toptile:[]
}


export const fetchCreditRatingRevenue_and_Expenditure = createAsyncThunk(
  'fetchCreditRatingRevenue_and_Expenditure',
  async (CreditRatingRevenue_and_Expenditure, thunkAPI) => {
    CreditRatingRevenue_and_Expenditure = { ...CreditRatingRevenue_and_Expenditure, elasticQueryName: "Credit Rating Revenue_and_Expenditure" }
    const response = await getNetSales(CreditRatingRevenue_and_Expenditure);
    return response.data
  }
)

export const fetchRevenuevsExpenditurechart = createAsyncThunk(
  'fetchRevenuevsExpenditurechart',
  async (RevenuevsExpenditurechart, thunkAPI) => {
    RevenuevsExpenditurechart = { ...RevenuevsExpenditurechart, elasticQueryName: "Revenue vs Expenditure chart" }
    const response = await getNetSales(RevenuevsExpenditurechart);
    return response.data
  }
)

export const fetchExpensesbycategory = createAsyncThunk(
  'fetchExpensesbycategory',
  async (Expensesbycategory, thunkAPI) => {
    Expensesbycategory = { ...Expensesbycategory, elasticQueryName: "Expenses by category" }
    const response = await getNetSales(Expensesbycategory);
    return response.data
  }
)

export const fetchPPE = createAsyncThunk(
  'fetchPPE',
  async (PPE, thunkAPI) => {
    PPE = { ...PPE, elasticQueryName: "PPE(Per_Pupil_Expenditure)" }
    const response = await getNetSales(PPE);
    return response.data
  }
)  

export const fetchPPE_toptile = createAsyncThunk(
  'fetchPPE_toptile',
  async (PPE_toptile, thunkAPI) => {
    PPE_toptile = { ...PPE_toptile, elasticQueryName: "PPE(Per_Pupil_Expenditure)_Top Tile" }
    const response = await getNetSales(PPE_toptile);
    return response.data
  }
)

export const fetchCredit_toptile = createAsyncThunk(
  'fetchCredit_toptile',
  async (Credit_toptile, thunkAPI) => {
    Credit_toptile = { ...Credit_toptile, elasticQueryName: "Credit Rating Top Tile" }
    const response = await getNetSales(Credit_toptile);
    return response.data
  }
)


export const financedashboard = createSlice({
  name: 'financedashboard',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreditRatingRevenue_and_Expenditure.fulfilled, (state, action) => {
      state.CreditRatingRevenue_and_Expenditure = action.payload;
      state.CreditRatingRevenue_and_Expenditureloading = false;
    }).addCase(fetchCreditRatingRevenue_and_Expenditure.pending, (state, action) => {
      state.CreditRatingRevenue_and_Expenditureloading = true;
    })

    builder.addCase(fetchRevenuevsExpenditurechart.fulfilled, (state, action) => {
      state.RevenuevsExpenditurechart = action.payload;
      state.RevenuevsExpenditurechartloading = false;
    }).addCase(fetchRevenuevsExpenditurechart.pending, (state, action) => {
      state.RevenuevsExpenditurechartloading = true;
    })

    builder.addCase(fetchExpensesbycategory.fulfilled, (state, action) => {
      state.Expensesbycategory = action.payload;
      state.Expensesbycategoryloading = false;
    }).addCase(fetchExpensesbycategory.pending, (state, action) => {
      state.Expensesbycategoryloading = true;
    })

    builder.addCase(fetchPPE.fulfilled, (state, action) => {
      state.PPE = action.payload;
      state.PPEloading = false;
    }).addCase(fetchPPE.pending, (state, action) => {
      state.PPEloading = true;
    })

    
    builder.addCase(fetchPPE_toptile.fulfilled, (state, action) => {
      state.PPE_toptile = action.payload;
      state.PPE_toptileloading = false;
    }).addCase(fetchPPE_toptile.pending, (state, action) => {
      state.PPE_toptileloading = true;
    })

    builder.addCase(fetchCredit_toptile.fulfilled, (state, action) => {
      state.Credit_toptile = action.payload;
      state.Credit_toptileloading = false;
    }).addCase(fetchCredit_toptile.pending, (state, action) => {
      state.Credit_toptileloading = true;
    })

  }
})

export default financedashboard.reducer