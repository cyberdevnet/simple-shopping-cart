import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;

  .take-my-money {
    display: flex;
    flex-flow: row;
    justify-content: center;
  }

  .row.buttons {
    display: flex;
    flex-flow: row;
    justify-content: center;
  }

  .buy-button {
    max-width: 50%;
    background-color: #e0e0e0;
  }
  .cancel-button {
    max-width: 50%;
    background-color: #e0e0e0;
  }

  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }

  div {
    font-family: Arial, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;
