import { useRecoilValue } from "recoil";
import { mdNoteModalActionState, mdNoteModalState } from "../../atoms/MDNoteModalAtoms";
import ModalMenu from "./ModalMenu";


const MenuMDNoteModal = () => {
    const mdNoteModalAction = useRecoilValue(mdNoteModalActionState);
    const mdNoteModalData = useRecoilValue(mdNoteModalState);

    return (
        <ModalMenu
            modalAction={ mdNoteModalAction }
            modalData={ mdNoteModalData }
            transparent
        />
    );
};


export default MenuMDNoteModal;