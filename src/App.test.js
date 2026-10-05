import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the mood prompt and share action', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'How are you feeling?' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Share with your friends' })).toBeEnabled();
});
