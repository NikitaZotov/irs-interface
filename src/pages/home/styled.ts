import styled from 'styled-components';

export const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const HomePageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  align-items: center;
  & a {
    margin-right: 20px;
    text-decoration: inherit;
    color: rgba(0, 0, 0, 0.87);
    font-size: 15px;
  };
  & a:hover {
    text-decoration: underline;
  };
`;

export const HomePageBody = styled.div`
  flex: 1;
  display: flex;
  margin-top: 10%;
  flex-direction: column;
  & > img {
    object-fit: contain;
    height: 100px;
  }
`;

export const HomePageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
