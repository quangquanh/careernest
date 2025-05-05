import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { getAllAppliedJobs } from '../../services/userService';

const initialState = {
    info: {},
    appliedJobs: [],
    access_token: '',
}

export const fetchAllAppliedJobs = createAsyncThunk('user/fetchAllAppliedJobs', async ({ id }, { rejectWithValue }) => {
    try {
        const res = await getAllAppliedJobs(+id);
        if (res.statusCode === 200) {
            return res.data; // Trả về data khi thành công
        } else {
            return rejectWithValue(res.message || 'Không thể lấy danh sách các job đã ứng tuyển!');
        }
    } catch (error) {
        return rejectWithValue(error.message || 'Lỗi hệ thống');
    }
}
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action) => {
            const { access_token, ...rest } = action.payload;
            state.info = rest?.user ?? rest?.info;
            state.access_token = access_token;
        },
        resetAppliedJobs: (state) => {
            state.appliedJobs = [];
        }
    },

    //xử lí Action liên quan API thì viết trong extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAppliedJobs.pending, (state) => {
                // state.loadingAppliedJobs = true;
            })
            .addCase(fetchAllAppliedJobs.fulfilled, (state, action) => {
                state.appliedJobs = action.payload || [];
                // state.loadingAppliedJobs = false;
            })
            .addCase(fetchAllAppliedJobs.rejected, (state, action) => {
                // state.loadingAppliedJobs = false;
                toast.error(action.payload || 'Không thể lấy danh sách công việc đã ứng tuyển');
            });
    },

})

export const { updateUserInfo, resetAppliedJobs } = userSlice.actions
export default userSlice.reducer