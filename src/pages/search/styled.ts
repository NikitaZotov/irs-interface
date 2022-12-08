import styled from 'styled-components';

export const SearchPageHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  align-items: flex-start;
  padding: 30px;
  border-bottom: 1px solid lightgray;
`;

export const SearchPageLogo = styled.img`
  object-fit: contain;
  height: 50px;
  margin-left: 50px;
  margin-right: 90px;
  border-radius: 20px;
`;

export const SearchPageHeaderBody = styled.div`
  margin-top: 0;
  width: 200px;
  margin: unset;
  max-width: 500px;
`;

export const SearchPageResult = styled.div`
  margin: 40px 0;
  border: 1px solid lightgray;
  padding: 10px 10px;
  border-radius: 15px;
  width: 75vw;
`;

export const SpeechButton = styled.button`
  display: flex;
  justify-content: center;
  & {
    align-items: center;
    padding: 3px 8px;
    border: 1px solid #f1f1f1;
    background-color: #ffffff;
    border-radius: 800px;
    font-size: medium;
    margin-top: 20px;
  };
  &:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    background-image: -webkit-linear-gradient(top, #f8f8f8, #f1f1f1);
    background-color: #f8f8f8;
    border: 1px solid #c6c6c6;
    color: #222;
  };
`

export const SearchPageNoResult = styled.p`
  margin: 40px 0;
`;

export const SearchPageResultCount = styled.p`
  color: #70757a;
  font-size: 14px;
`;

export const SearchPageResults = styled.div`
  max-width: 1000px;
  margin-top: 20px;
  margin-left: 240px;
  margin-bottom: 100px;
`;

export const DocumentLink = styled.a`
  text-decoration: none;
  text-align: justify;
  &:hover {
    text-decoration: underline;
  };
  & > h2 {
    font-weight: 400;
    color: #1a0dab;
  }
`;

export const TranslationLink = styled.div`
  margin-top: 10px;
`;

export const SearchPageResultSnippet = styled.p`
  margin-top: 10px;
`;
