import React from 'react';
import styled from 'styled-components';
import MoonLoader from 'react-spinners/MoonLoader';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #2e66dd 0%, #639fc8 72.5%, #7ac3ce 100%);
`;

const LoadImg = styled.img`
  margin-top: 20px;
`;

function Loading() {
  return (
    <>
      <Wrapper>
        <MoonLoader color="#333333" loading size={45} speedMultiplier={0.5} />
        <LoadImg src={`/img/loading.webp`} alt="loading" />
      </Wrapper>
    </>
  );
}

export default Loading;
