import { useRecoilValue } from "recoil";
import { quickNoteModalActionState, quickNoteModalState } from "../../atoms/QuickNoteModalAtoms";
import ModalMenu from "./ModalMenu";


const MenuQuickNoteModal = () => {
    const quickNoteModalAction = useRecoilValue(quickNoteModalActionState);
    const quickNoteModalData = useRecoilValue(quickNoteModalState);

    return (
        <ModalMenu
            modalAction={ quickNoteModalAction }
            modalData={ quickNoteModalData }
        />
    );
};


export default MenuQuickNoteModal;