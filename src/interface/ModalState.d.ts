export interface ModalState {
  closeOrOpen: boolean;
  propsModal: ModalStateProps;
}
export interface ModalStateProps {
  id: string;
  valueTitle: string;
  valueContent: string;
  user: string;
  timeStamp: string;
}
