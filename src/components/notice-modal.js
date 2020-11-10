const { alert, notice, info, success, error } = require('@pnotify/core');
import '@pnotify/core/dist/BrightTheme.css';
function noticeModalSpecQuery() {
  const myNotice = notice({
    text: 'Please enter something specific for query!',
    type: 'notice',
    title: 'Attention!',
    addClass: 'notice-modal',
    addModalClass: 'notice-modal',
    width: '265px',
    minHeight: '160px',
    shadow: true,
    delay: 8000,
    closer: true,
    remove: true,
    destroy: true,
  });
}
function noticeModalSmthElse() {
  const myNotice = notice({
    text: 'Please enter something specific for query!',
    type: 'notice',
    title: 'Attention!',
    addClass: 'notice-modal',
    addModalClass: 'notice-modal',
    width: '265px',
    minHeight: '160px',
    shadow: true,
    delay: 8000,
    closer: true,
    remove: true,
    destroy: true,
  });
}
function noticeModalNothingFound() {
  const myNotice = notice({
    text: 'Oh no! Nothig found! Please enter something specific for query!',
    type: 'notice',
    title: 'Attention!',
    addClass: 'notice-modal',
    addModalClass: 'notice-modal',
    width: '265px',
    minHeight: '160px',
    shadow: true,
    delay: 8000,
    closer: true,
    remove: true,
    destroy: true,
  });
}
export { noticeModalSpecQuery, noticeModalNothingFound };
