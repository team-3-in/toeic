import { PracticeModalProps } from '@/types/PracticeModalProps';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as M from '../../style/components/practice/PracticeModalCSS';

function PracticeModal({
  type,
  setIsOpen,
  img_path,
  color,
  title,
  sub_title,
  btn_text,
}: PracticeModalProps) {
  const navigate = useNavigate();
  return (
    <>
      <M.ModalOverlay>
        <M.ModalContent>
          <M.XmarkImg onClick={setIsOpen} src={`/img/xmark.webp`} />
          <M.ModalBox>
            <M.PencilImg src={img_path} />
            <M.Title>{title}</M.Title>
            <M.SubTitle>{sub_title}</M.SubTitle>
            <M.Btn
              onClick={() => {
                if (type === 'check') {
                  navigate('/result');
                } else if (type === 'out') {
                  navigate('/main');
                }
              }}
              $color={color}
            >
              {btn_text}
            </M.Btn>
          </M.ModalBox>
        </M.ModalContent>
      </M.ModalOverlay>
    </>
  );
}

export default PracticeModal;
