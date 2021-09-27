import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from "./store/store"
import { Provider } from "react-redux"


test('navBrand', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headingElement = screen.getByText(/Flix/i);
  expect(headingElement).toBeInTheDocument();
});

// test('front page fail', () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   const headingElement = screen.queryByText(/dsadaslorem/i);
//   expect(headingElement).toBeInTheDocument();
// });


test('front page img', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headingElement = screen.getAllByRole('img');
  expect(headingElement).not.toHaveLength(0);
});


// test('front page img', () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   const headingElement = screen.getAllByRole('p');
//   expect(headingElement).not.toHaveLength(0);
// });



test('front page lorem', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headingElement = screen.getAllByText(/lorem/i);
  expect(headingElement).not.toHaveLength(0);
});