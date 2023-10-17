import { useRecoilCallback, useRecoilValue } from "recoil";
import { mdNoteModalActionState, mdNoteModalState } from "../../atoms/MDNoteModalAtoms";
import ModalMenu from "./ModalMenu";


const MenuMDNoteModal = () => {
    const mdNoteModalAction = useRecoilValue(mdNoteModalActionState);
    const getMDNoteModalData = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(mdNoteModalState);
    }, []);

    return (
        <ModalMenu
            modalAction={ mdNoteModalAction }
            modalData={ async () => await getMDNoteModalData() }
        />
    );
};


export default MenuMDNoteModal;