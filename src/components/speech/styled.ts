/* eslint-disable */
import styled from 'styled-components';

export const SpeechContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Select = styled.select`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  & {
    align-items: center;
    padding: 3px 8px;
    border: 1px solid #f1f1f1;
    background-color: #ffffff;
    border-radius: 800px;
    font-size: medium;
  };
  &:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    background-image: -webkit-linear-gradient(top, #f8f8f8, #f1f1f1);
    background-color: #f8f8f8;
    border: 1px solid #c6c6c6;
    color: #222;
  };
`

export const Option = styled.option`
  display: flex;
  justify-content: center;
  & {
    align-items: center;
    padding: 3px 8px;
    border: 1px solid #f1f1f1;
    background-color: #ffffff;
    border-radius: 800px;
    font-size: medium;
  };
  &:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    background-image: -webkit-linear-gradient(top, #f8f8f8, #f1f1f1);
    background-color: #f8f8f8;
    border: 1px solid #c6c6c6;
    color: #222;
  };
`;
