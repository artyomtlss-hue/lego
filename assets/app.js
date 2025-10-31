const startBtn = document.getElementById('start-btn');
const quizEl = document.getElementById('quiz');
const formEl = document.getElementById('quiz-form');
const questionTextEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('progress');
const thankyouEl = document.getElementById('thankyou');
const restartBtn = document.getElementById('restart-btn');
const yearEl = document.getElementById('year');
const heroEl = document.getElementById('hero');

yearEl.textContent = new Date().getFullYear();

const quiz = [
  {
    q: 'How often do you take online surveys?',
    a: ['Once a week', 'Once a month', 'Rarely']
  },
  {
    q: 'Did you like the LEGO® Advent Calendar Mystery Box??',
    a: ['Yes, I liked it', 'Neutral', 'Didn’t like it']
  },
  {
    q: 'Will you buy products from this company in the future?',
    a: ['Yes, definitely', 'Not sure', 'No, I won’t']
  }
];

let index = 0;

function renderQuestion(i) {
  const { q, a } = quiz[i];
  questionTextEl.textContent = q;
  optionsEl.innerHTML = '';
  a.forEach((label, idx) => {
    const id = `opt-${i}-${idx}`;
    const wrapper = document.createElement('label');
    wrapper.className = 'option';
    wrapper.setAttribute('for', id);

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.id = id;
    input.value = String(idx);
    if (idx === 0) input.required = true;

    const text = document.createElement('span');
    text.textContent = label;

    wrapper.appendChild(input);
    wrapper.appendChild(text);
    optionsEl.appendChild(wrapper);
  });
  progressEl.textContent = `Question ${i + 1} of ${quiz.length}`;
}

function startQuiz() {
  index = 0;
  heroEl.hidden = true;
  document.getElementById('main-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
  thankyouEl.hidden = true;
  quizEl.hidden = false;
  renderQuestion(index);
  formEl.querySelector('#next-btn').textContent = 'Next';
}

function finishQuiz() {
  quizEl.hidden = true;
  thankyouEl.hidden = false;
  thankyouEl.focus?.();
}

function resetPage() {
  index = 0;
  heroEl.hidden = false;
  quizEl.hidden = true;
  thankyouEl.hidden = true;
}

startBtn.addEventListener('click', startQuiz);

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const selected = formEl.querySelector('input[name="answer"]:checked');
  if (!selected) return;
  if (index < quiz.length - 1) {
    index += 1;
    renderQuestion(index);
    if (index === quiz.length - 1) {
      formEl.querySelector('#next-btn').textContent = 'Finish';
    }
  } else {
    finishQuiz();
  }
});

restartBtn?.addEventListener('click', resetPage);