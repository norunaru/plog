import { create } from 'zustand';
import createTokenSlice from './tokenSlice';
import createUserSlice from './userSlice';

const useStore = create((set) => ({
    ...createTokenSlice(set),
    ...createUserSlice(set),
}));

export default useStore;