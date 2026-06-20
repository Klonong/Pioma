import styled from "styled-components";
export { default as Footer } from "./footer";
export { LeftAsideLayout, RightAsideLayout } from "./aside-layouts";

export const BasePage = styled.div`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 1.5rem;
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media (min-width: 1024px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
`;

export const BasePageCenter = styled.div`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 1.5rem;
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media (min-width: 1024px) {
    padding-left: 6rem;
    padding-right: 6rem;
  }
  @media (min-width: 1280px) {
    padding-left: 12rem;
    padding-right: 12rem;
  }
  @media (min-width: 1536px) {
    padding-left: 17rem;
    padding-right: 17rem;
  }
`;
