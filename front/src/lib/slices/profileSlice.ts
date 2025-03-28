import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfile, resetPassword, deleteAccount } from "@/api/user/auth";

// 프로필 관리 상태 정의
interface ProfileState {
  // 프로필 업데이트 관련 상태
  profileUpdate: {
    loading: boolean;
    success: boolean;
    error: string | null;
  };

  // 비밀번호 재설정 관련 상태
  passwordReset: {
    loading: boolean;
    success: boolean;
    error: string | null;
  };

  // 회원 탈퇴 관련 상태
  accountDeletion: {
    loading: boolean;
    success: boolean;
    error: string | null;
  };
}

// 초기 상태
const initialState: ProfileState = {
  profileUpdate: {
    loading: false,
    success: false,
    error: null,
  },
  passwordReset: {
    loading: false,
    success: false,
    error: null,
  },
  accountDeletion: {
    loading: false,
    success: false,
    error: null,
  },
};

// 유저 정보 수정 비동기 액션
export const updateUserProfile = createAsyncThunk(
  "profile/updateProfile",
  async (
    data: {
      nickname?: string;
      name?: string;
      phone?: string;
      imageFile?: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateProfile(data);
      return response;
    } catch (err) {
      return rejectWithValue("프로필 수정에 실패했습니다.");
    }
  }
);

// 비밀번호 재설정 비동기 액션
export const resetUserPassword = createAsyncThunk(
  "profile/resetPassword",
  async (data: { email: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response;
    } catch (err) {
      return rejectWithValue("비밀번호 재설정에 실패했습니다.");
    }
  }
);

// 회원 탈퇴 비동기 액션
export const deleteUserAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (data: { password: string }, { rejectWithValue }) => {
    try {
      const response = await deleteAccount(data);
      return response;
    } catch (err) {
      return rejectWithValue("회원 탈퇴에 실패했습니다.");
    }
  }
);

// 프로필 관리 슬라이스 생성
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // 프로필 업데이트 상태 초기화
    resetProfileUpdateState: (state) => {
      state.profileUpdate = initialState.profileUpdate;
    },

    // 비밀번호 재설정 상태 초기화
    resetPasswordResetState: (state) => {
      state.passwordReset = initialState.passwordReset;
    },

    // 회원 탈퇴 상태 초기화
    resetAccountDeletionState: (state) => {
      state.accountDeletion = initialState.accountDeletion;
    },

    // 모든 상태 초기화
    resetAllStates: () => initialState,
  },
  extraReducers: (builder) => {
    // 유저 정보 수정
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.profileUpdate.loading = true;
        state.profileUpdate.success = false;
        state.profileUpdate.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.profileUpdate.loading = false;
        state.profileUpdate.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileUpdate.loading = false;
        state.profileUpdate.error = action.payload as string;
      });

    // 비밀번호 재설정
    builder
      .addCase(resetUserPassword.pending, (state) => {
        state.passwordReset.loading = true;
        state.passwordReset.success = false;
        state.passwordReset.error = null;
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.passwordReset.loading = false;
        state.passwordReset.success = true;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.passwordReset.loading = false;
        state.passwordReset.error = action.payload as string;
      });

    // 회원 탈퇴
    builder
      .addCase(deleteUserAccount.pending, (state) => {
        state.accountDeletion.loading = true;
        state.accountDeletion.success = false;
        state.accountDeletion.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.accountDeletion.loading = false;
        state.accountDeletion.success = true;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.accountDeletion.loading = false;
        state.accountDeletion.error = action.payload as string;
      });
  },
});

export const {
  resetProfileUpdateState,
  resetPasswordResetState,
  resetAccountDeletionState,
  resetAllStates,
} = profileSlice.actions;

export default profileSlice.reducer;
