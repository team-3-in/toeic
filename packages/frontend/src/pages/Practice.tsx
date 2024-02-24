import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectChoice } from '../redux/_reducers/choices';
import { fetchGetProblem } from '@/redux/_reducers/problem';
import Loading from './Loading';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #2e66dd 0%, #639fc8 72.5%, #7ac3ce 100%);
`;

const HomeImg = styled.img`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
  margin-bottom: 13px;
`;

// 버튼에 상태에 따라 bg 설정
const PrevBtn = styled.button<{ $isActive: boolean }>`
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

const NextBtn = styled.button<{ $isActive: boolean }>`
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

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Arrow = styled.img`
  display: flex;
  width: 12px;
`;

const ContentBox = styled.div`
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProblemNum = styled.div`
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

const Problem = styled.div`
  padding: 20px;
  text-align: left;
  color: #000;
  font-size: 23px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ChoiceBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Choice = styled.div`
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

function Practice() {
  // redux problem slice의 isLoading
  const isLoading = useAppSelector((state) => state.problem.isLoading);
  // redux problem slice의 problem
  const data = useAppSelector((state) => state.problem.problem);
  // 문제의 인덱스
  const [questionIndex, setQuestionIndex] = useState(0);
  // 문제의 마지막 index
  const lastIndex = data.questions.length - 1;
  // 이전 버튼의 disable 속성의 bool값
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  // 다음 버튼의 disable 속성의 bool값
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // 문제 요청 get api
    dispatch(fetchGetProblem());
    // 문제의 index값이 0일때 이전 버튼 비활성화
    questionIndex === 0 ? setIsPrevDisabled(true) : setIsPrevDisabled(false);
    // 문제의 index값이 마지막일때 다음 버튼 비활성화
    questionIndex === lastIndex
      ? setIsNextDisabled(true)
      : setIsNextDisabled(false);
  }, [questionIndex, isLoading]);

  const navigate = useNavigate();
  const problemdata = data.questions[questionIndex];
  const problem = problemdata.content;
  const choices = problemdata.choice;

  // choice의 문자열을 "(" 을 기준으로 배열로 만든다.
  const choicesArray = choices.match(/\([^)]+\) [^\s]+/g);

  // redux에서 choicesArray를 가져온다.
  const ChoicesArray = useAppSelector((state) => state.choices.choicesArray);
  // choicesArray중 지금 문제의 번호와 같은 객체를 찾아 currentChoice에 넣는다.
  const currentChoice = ChoicesArray.find(
    (item) => item.questionIndex === questionIndex,
  );
  // 선택했던 답의 index 번호
  const currentChoiceIndex = currentChoice?.choiceIndex;
  // choice를 클릭했을때 문제 번호와 답, 답의 index 저장
  const clickChoice = (answer: string, i: number) => {
    // 마지막 문제가 아닐때
    if (questionIndex !== lastIndex) {
      dispatch(selectChoice({ questionIndex, answer, choiceIndex: i }));
      setQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HomeImg
            onClick={() => {
              navigate('/main');
            }}
            src={`/img/homewhite.webp`}
          />
          {/* 버튼영역 */}
          <BtnBox>
            <PrevBtn
              disabled={isPrevDisabled}
              $isActive={isPrevDisabled}
              onClick={() => {
                setQuestionIndex((prev) => prev - 1);
              }}
            >
              <Btn>
                <Arrow src={`/img/prevarrow.webp`} alt="prevarrow" />
              </Btn>
              <div>이전 문제</div>
            </PrevBtn>
            <NextBtn
              // 비활성화 속성
              disabled={isNextDisabled}
              // 비활성화 boolean값 styled에서 쓰기위한 속성추가
              $isActive={isNextDisabled}
              onClick={() => {
                setQuestionIndex((prev) => prev + 1);
              }}
            >
              <div>다음 문제</div>
              <Btn>
                <Arrow src={`/img/nextarrow.webp`} alt="nextarrow" />
              </Btn>
            </NextBtn>
          </BtnBox>
          <ContentBox>
            <Box>
              {/* 번호와 즐겨찾기 영역 */}
              <ContHeader>
                <ProblemNum>{questionIndex + 1}</ProblemNum>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 21 19"
                  fill="none"
                >
                  <path
                    d="M9.65693 1.32159C10.0501 0.705335 10.9499 0.705335 11.3431 1.32159L13.9879 5.46762C14.1347 5.69776 14.3692 5.85787 14.637 5.91082L19.6229 6.89662C20.4026 7.05078 20.6996 8.00901 20.1437 8.57705L16.8469 11.9459C16.6371 12.1603 16.5346 12.4575 16.5677 12.7555L17.0752 17.3325C17.1586 18.0841 16.4096 18.6527 15.708 18.3704L10.8733 16.4252C10.6338 16.3288 10.3662 16.3288 10.1267 16.4252L5.29197 18.3704C4.59038 18.6527 3.84144 18.0841 3.92479 17.3325L4.43234 12.7555C4.4654 12.4575 4.36291 12.1603 4.15314 11.9459L0.856323 8.57706C0.30042 8.00901 0.59736 7.05078 1.37707 6.89662L6.363 5.91082C6.63079 5.85787 6.8653 5.69776 7.0121 5.46762L9.65693 1.32159Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </ContHeader>
              <Problem>{problem}</Problem>
            </Box>
            {/* 선택영역 */}
            <ChoiceBox>
              {/* 문자열을 배열로 만든 선택 배열을 map으로 나열 */}
              {choicesArray?.map((choice, i) => (
                <Choice
                  style={{
                    backgroundColor:
                      i === currentChoiceIndex ? '#fff741' : '#eee',
                  }}
                  onClick={() => clickChoice(choice, i)}
                  key={i}
                >
                  {choice}
                </Choice>
              ))}
            </ChoiceBox>
          </ContentBox>
        </>
      )}
    </Wrapper>
  );
}

export default Practice;
