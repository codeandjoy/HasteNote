export const actionBtnHover = { scale: .9 }
export const action_btn_open_variants = {
    initial: {
        opacity: 0,
        right: 0
    },
    menuopen: {
        opacity: 1
    }
}
export const markdown_btn_variants = {
    ...action_btn_open_variants,
    menuopen:{
        ...action_btn_open_variants.menuopen,
        right: "160px"
    }
};
export const quick_note_btn_variants = {
    ...action_btn_open_variants,
    menuopen:{
        ...action_btn_open_variants.menuopen,
        right: "80px"
    }
};
export const deleteBtnOpenVariants = {
    initial: {
        opacity: 0,
        left: 0
    },
    menuopen: {
        opacity: 1
    }
}