import { PracticeModalProps } from '@/types/PracticeModalProps';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
  background: #fff;
  width: 417px;
  padding: 20px;
  border-radius: 8px;
`;
const XmarkImg = styled.img`
  width: 16px;
  height: 16px;
  margin-left: auto;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const PencilImg = styled.img`
  width: 110px;
  height: 110px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 25px;
`;

const SubTitle = styled.h2`
  font-weight: 600;
  font-size: 16px;
  color: #939393;
`;

const Btn = styled.button<{ $color: string }>`
  width: 150px;
  height: 47px;
  margin-top: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.$color};
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`;

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
      <ModalOverlay>
        <ModalContent>
          <XmarkImg onClick={setIsOpen} src={`/img/xmark.webp`} />
          <ModalBox>
            <PencilImg src={img_path} />
            <Title>{title}</Title>
            <SubTitle>{sub_title}</SubTitle>
            <Btn
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
            </Btn>
          </ModalBox>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

export default PracticeModal;
