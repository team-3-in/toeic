import styled from 'styled-components';
import { media } from '@/style/mediaQuery';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #2e66dd 0%, #639fc8 72.5%, #7ac3ce 100%);
`;

export const HomeImg = styled.img`
  ${media.smallMobile`
    width: 20px;
    height: 20px;
  `}
  ${media.largeMobile`
    width: 25px;
    height: 25px;
  `}
  position: absolute;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
`;

export const BtnBox = styled.div`
  ${media.smallMobile`
    width: 280px;
  `}
  ${media.largeMobile`
    width: 350px;
  `}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
  margin-bottom: 13px;
`;

// 버튼에 상태에 따라 bg 설정
export const PrevBtn = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px;
  width: 130px;
  height: 50px;
  gap: 10px;
  border-radius: 30px;
  background: ${(props) => (props.$isActive ? '#d9d9d9' : '#94befe')};
  div {
    color: #000;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const NextBtn = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 5px;
  width: 130px;
  height: 50px;
  gap: 10px;
  border-radius: 30px;
  background: ${(props) => (props.$isActive ? '#d9d9d9' : '#94befe')};
  div {
    color: #000;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const Btn = styled.div<{ $isopen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  filter: ${(props) =>
    props.$isopen ? 'none' : 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'};
`;

export const Arrow = styled.img`
  display: flex;
  width: 12px;
`;

export const ContentBox = styled.div`
  ${media.smallMobile`
    width: 280px;
    height: 450px;

  `}
  ${media.largeMobile`
    width: 350px;
    height: 500px;
    padding: 10px;
  `}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 550px;
  padding: 15px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  svg {
    ${media.smallMobile`
      width: 20px;
      height: 20px;
  `}
  }
`;

export const ProblemNum = styled.div`
  ${media.smallMobile`
    width: 30px;
    height: 30px;
    font-size: 18px;
  `}
  ${media.largeMobile`
    width: 35px;
    height: 35px;
    font-size: 20px;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #000;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
`;

export const Problem = styled.div`
  ${media.smallMobile`
    font-size: 20px;
  `}
  padding: 20px;
  text-align: left;
  color: #000;
  font-size: 23px;
  font-weight: 500;
`;

export const ChoiceBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Choice = styled.div`
  ${media.smallMobile`
    height: 40px;
    font-size: 14px;
  `}
  ${media.largeMobile`
    height: 50px;
    padding: 10px;
    font-size: 16px;
  `}
  display: flex;
  align-items: center;
  text-align: left;
  height: 62px;
  margin-bottom: 8px;
  padding: 15px;
  border-radius: 10px;
  background: #eee;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  &:hover {
    background-color: #fff741 !important;
  }
`;
