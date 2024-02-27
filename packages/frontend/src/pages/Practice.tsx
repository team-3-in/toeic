import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectChoice } from '../redux/_reducers/choices';
import { fetchGetProblem } from '@/redux/_reducers/problem';
import Loading from './Loading';
import PracticeModal from '@/components/practice/PracticeModal';
import * as P from '../style/pages/PracticeCSS';

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

  // 현재 페이지의 문제 data
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

  const extracAnswer = (answer: string): string => {
    // 정규 표현식을 사용하여 "()"와 같은 패턴을 찾습니다.
    const pattern = /\((\w+)\)/;
    const match = answer.match(pattern);
    if (match) {
      // 정규 표현식에 일치하는 그룹을 추출하여 리턴합니다.
      return match[1];
    } else {
      return '';
    }
  };

  // 정답 확인 함수
  const checkCorrect = (exAnswer: string) => {
    if (exAnswer === problemdata.answer) {
      return true;
    } else {
      return false;
    }
  };

  // choice를 클릭했을때 문제 번호와 답, 답의 index 저장
  const clickChoice = (answer: string, i: number) => {
    const exAnswer = extracAnswer(answer);
    const isCorrect = checkCorrect(exAnswer);
    // 마지막 문제가 아닐때
    if (questionIndex !== lastIndex) {
      dispatch(
        selectChoice({
          questionIndex,
          answer: exAnswer,
          choiceIndex: i,
          isCorrect,
        }),
      );
      setQuestionIndex((prev) => prev + 1);
    } else {
      const exAnswer = extracAnswer(answer);
      const isCorrect = checkCorrect(exAnswer);
      dispatch(
        selectChoice({
          questionIndex,
          answer: exAnswer,
          choiceIndex: i,
          isCorrect,
        }),
      );
      setIsOpenCheckModal(true);
    }
  };

  // 마지막 문제 클릭시 나오는 모달창의 isopen
  const [isOpenCheckModal, setIsOpenCheckModal] = useState(false);
  // 홈 버튼을 눌렀을때 나오는 모달창의 isopen
  const [isOpenOutModal, setIsOpenOutModal] = useState(false);

  return (
    <P.Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isOpenCheckModal && (
            <PracticeModal
              type="check"
              setIsOpen={() => {
                setIsOpenCheckModal(false);
              }}
              img_path="/img/checkPencil.webp"
              color="#35DE73"
              title="마지막 문제입니다."
              sub_title="답안지를 제출하겠습니까?"
              btn_text="제출하기"
            />
          )}
          {isOpenOutModal && (
            <PracticeModal
              type="out"
              setIsOpen={() => setIsOpenOutModal(false)}
              img_path="/img/outPencil.webp"
              color="#FF5573"
              title="이대로 나갈 건가요?"
              sub_title="풀었던 문제들은 저장되지 않아요."
              btn_text="나가기"
            />
          )}
          <P.HomeImg
            onClick={() => {
              setIsOpenOutModal(true);
            }}
            src={`/img/homewhite.webp`}
          />
          {/* 버튼영역 */}
          <P.BtnBox>
            <P.PrevBtn
              disabled={isPrevDisabled}
              $isActive={isPrevDisabled}
              onClick={() => {
                setQuestionIndex((prev) => prev - 1);
              }}
            >
              <P.Btn $isopen={isOpenCheckModal || isOpenOutModal}>
                <P.Arrow src={`/img/prevarrow.webp`} alt="prevarrow" />
              </P.Btn>
              <div>이전 문제</div>
            </P.PrevBtn>
            <P.NextBtn
              // 비활성화 속성
              disabled={isNextDisabled}
              // 비활성화 boolean값 styled에서 쓰기위한 속성추가
              $isActive={isNextDisabled}
              onClick={() => {
                setQuestionIndex((prev) => prev + 1);
              }}
            >
              <div>다음 문제</div>
              <P.Btn $isopen={isOpenCheckModal || isOpenOutModal}>
                <P.Arrow src={`/img/nextarrow.webp`} alt="nextarrow" />
              </P.Btn>
            </P.NextBtn>
          </P.BtnBox>
          <P.ContentBox>
            <P.Box>
              {/* 번호와 즐겨찾기 영역 */}
              <P.ContHeader>
                <P.ProblemNum>{questionIndex + 1}</P.ProblemNum>
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
              </P.ContHeader>
              <P.Problem>{problem}</P.Problem>
            </P.Box>
            {/* 선택영역 */}
            <P.ChoiceBox>
              {/* 문자열을 배열로 만든 선택 배열을 map으로 나열 */}
              {choicesArray?.map((choice, i) => (
                <P.Choice
                  style={{
                    backgroundColor:
                      i === currentChoiceIndex ? '#fff741' : '#eee',
                  }}
                  onClick={() => clickChoice(choice, i)}
                  key={i}
                >
                  {choice}
                </P.Choice>
              ))}
            </P.ChoiceBox>
          </P.ContentBox>
        </>
      )}
    </P.Wrapper>
  );
}

export default Practice;
