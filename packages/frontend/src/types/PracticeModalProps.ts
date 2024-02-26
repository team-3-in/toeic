export type PracticeModalProps = {
  type: 'check' | 'out';
  setIsOpen: () => void;
  img_path: string;
  color: string;
  title: string;
  sub_title: string;
  btn_text: string;
};
