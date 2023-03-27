import { ModalState } from "./ModalState";

export interface PropsModal {
  id: string;
  valueTitle: string;
  valueContent: string;
  modalState: ModalState;
  setModalState: (value: ModalState) => void;
}
