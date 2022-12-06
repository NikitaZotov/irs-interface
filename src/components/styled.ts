/* eslint-disable */
import styled from 'styled-components';

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  height: 30px;
  padding: 10px 20px;
  border-radius: 999px;
  min-width: 700px;
  margin: 10px auto 5px;
  max-width: 560px;
  & > input {
    flex: 1;
    padding: 10px 20px;
    font-size: medium;
    border: none;
  };
  & > input:focus {
    outline-width: 0;
  };
`;

export const MicroButton = styled.button<{ isSpeaking: boolean }>`
  display: flex;
  justify-content: center;
  & {
    align-items: center;
    padding: 10px 20px;
    border: 1px solid ${p => p.isSpeaking ? `#f1f1f1` : `#c6c6c6`}};
    background-color: "${p => p.isSpeaking ? `#f8f8f8` : `#ffffff`}}";
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

export const SearchButton = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  & button {
    margin: 5px;
    padding: 10px 20px;
    border: 1px solid lightgray;
    background-color: #f8f8f8;
    text-transform: inherit;
    border-radius: 800px;
    font-size: medium;
  };
  & button:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    background-image: -webkit-linear-gradient(top, #f8f8f8, #f1f1f1);
    background-color: #f8f8f8;
    border: 1px solid #c6c6c6;
    color: #222;
  };
`;

export const SearchButtonHidden = styled.button`
  display: none !important;
`;
