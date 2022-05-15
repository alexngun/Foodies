import { createSlice } from "@reduxjs/toolkit"

export const sideMenuSlicer = createSlice({
    name: "sidemenu",
    initialState: false,
    reducers: {
        toggleSideMenu: state=> !state,
        closeSideMenu: ()=>false
    }
})

export const { toggleSideMenu, closeSideMenu } = sideMenuSlicer.actions

export default sideMenuSlicer.reducer