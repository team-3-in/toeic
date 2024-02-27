import styled from 'styled-components';
import { media } from '@/style/mediaQuery';

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  ${media.smallMobile`
    width: 312px;
  `}
  ${media.largeMobile`
    width: 355px;
    padding: 15px;
  `}
  display: flex;
  flex-direction: column;
  gap: 9px;
  align-items: center;
  background: #fff;
  width: 417px;
  padding: 20px;
  border-radius: 8px;
`;
export const XmarkImg = styled.img`
  ${media.largeMobile`
    width: 15px;
    height: 15px;
  `}
  width: 16px;
  height: 16px;
  margin-left: auto;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const PencilImg = styled.img`
  ${media.smallMobile`
    width: 80px;
    height: 80px;
  `}
  ${media.largeMobile`
    width: 90px;
    height: 90px;
  `}
  width: 110px;
  height: 110px;
`;

export const Title = styled.h1`
  ${media.smallMobile`
    font-size: 18px;
  `}
  ${media.largeMobile`
    font-size: 20px;
  `}
  font-weight: 600;
  font-size: 25px;
`;

export const SubTitle = styled.h2`
  ${media.smallMobile`
    font-size: 12px;
  `}
  ${media.largeMobile`
    font-size: 14px;
  `}
  font-weight: 600;
  font-size: 16px;
  color: #939393;
`;

export const Btn = styled.button<{ $color: string }>`
  ${media.smallMobile`
    width: 115px;
    height: 30px;
    font-size: 15px;
  `}
  ${media.largeMobile`
    width: 125px;
    height: 37px;
    font-size: 17px;
  `}
  width: 150px;
  height: 47px;
  margin-top: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.$color};
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`;
