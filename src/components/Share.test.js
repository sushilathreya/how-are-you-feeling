import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Share, { SHARE_URL } from './Share';

const originalShare = navigator.share;
const originalClipboard = navigator.clipboard;

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
});
beforeEach(() => {
  window.matchMedia = jest.fn(() => ({ matches: true }));
  Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: jest.fn() } });
});
afterAll(() => {
  Object.defineProperty(navigator, 'share', { configurable: true, value: originalShare });
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: originalClipboard });
});

function clickShare() {
  render(<Share shareText="Share with your friends" />);
  fireEvent.click(screen.getByRole('button', { name: 'Share with your friends' }));
}

test('uses the device share sheet with the canonical URL and suppresses duplicate clicks', async () => {
  let finish;
  const nativeShare = jest.fn(() => new Promise(resolve => { finish = resolve; }));
  Object.defineProperty(navigator, 'share', { value: nativeShare });
  clickShare();
  const pending = screen.getByRole('button', { name: 'Opening share…' });
  expect(pending).toBeDisabled();
  fireEvent.click(pending);
  expect(nativeShare).toHaveBeenCalledTimes(1);
  expect(nativeShare).toHaveBeenCalledWith(expect.objectContaining({ url: SHARE_URL }));
  finish();
  await waitFor(() => expect(screen.getByRole('button', { name: 'Share with your friends' })).toBeEnabled());
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('opens accessible sharing options without native sharing and provides correct platform links', () => {
  clickShare();
  expect(screen.getByRole('dialog', { name: 'Make a friend’s day' })).toBeInTheDocument();
  const whatsapp = new URL(screen.getByRole('link', { name: 'WhatsApp' }).href);
  expect(whatsapp.searchParams.get('text')).toContain(SHARE_URL);
  const telegram = new URL(screen.getByRole('link', { name: 'Telegram' }).href);
  expect(telegram.searchParams.get('url')).toBe(SHARE_URL);
  const x = new URL(screen.getByRole('link', { name: 'X', exact: true }).href);
  expect(x.searchParams.get('url')).toBe(SHARE_URL);
  expect(decodeURIComponent(screen.getByRole('link', { name: 'Email' }).href)).toContain(SHARE_URL);
  fireEvent.click(screen.getByRole('button', { name: 'Close sharing options' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('falls back when native sharing is blocked', async () => {
  Object.defineProperty(navigator, 'share', { value: jest.fn().mockRejectedValue(new DOMException('Blocked', 'NotAllowedError')) });
  clickShare();
  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('cancellation does not open another dialog or report success', async () => {
  Object.defineProperty(navigator, 'share', { value: jest.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError')) });
  clickShare();
  await waitFor(() => expect(screen.getByRole('button', { name: 'Share with your friends' })).toBeEnabled());
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('copies the canonical URL and announces completion', async () => {
  navigator.clipboard.writeText.mockResolvedValue();
  clickShare();
  fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Link copied!'));
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(SHARE_URL);
});

test.each(['denied', 'missing'])('provides a selected link for manual copying when clipboard is %s', async (mode) => {
  if (mode === 'denied') navigator.clipboard.writeText.mockRejectedValue(new Error('Denied'));
  else Object.defineProperty(navigator, 'clipboard', { value: undefined });
  clickShare();
  fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Select and copy'));
  const input = screen.getByRole('textbox', { name: 'Or share this link' });
  expect(input).toHaveFocus();
  expect(input.selectionStart).toBe(0);
  expect(input.selectionEnd).toBe(SHARE_URL.length);
  expect(screen.getByRole('status')).not.toHaveTextContent('Link copied!');
});

 test('desktop offers direct choices and a native More apps option', async () => {
  window.matchMedia = jest.fn(() => ({ matches: false }));
  const nativeShare = jest.fn().mockResolvedValue();
  Object.defineProperty(navigator, 'share', { value: nativeShare });
  clickShare();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(nativeShare).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'More apps…' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'More apps…' })).toBeEnabled());
  expect(nativeShare).toHaveBeenCalledWith(expect.objectContaining({ url: SHARE_URL }));
});
