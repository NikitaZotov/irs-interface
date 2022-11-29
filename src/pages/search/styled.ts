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

export const SearchPageResultTitle = styled.a`
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

export const SearchPageResultSnippet = styled.p`
  margin-top: 10px;
`;
