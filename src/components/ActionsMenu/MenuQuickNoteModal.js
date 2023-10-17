import { useRecoilCallback, useRecoilValue } from "recoil";
import { quickNoteModalActionState, quickNoteModalState } from "../../atoms/QuickNoteModalAtoms";
import ModalMenu from "./ModalMenu";


const MenuQuickNoteModal = () => {
    const quickNoteModalAction = useRecoilValue(quickNoteModalActionState);
    const getQuickNoteModalData = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(quickNoteModalState);
    }, []);

    return (
        <ModalMenu
            modalAction={quickNoteModalAction}
            modalData={ async () => await getQuickNoteModalData() }
        />
    );
};


export default MenuQuickNoteModal;