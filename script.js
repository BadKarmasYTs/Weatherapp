const confessionsKey = 'confessions';

function loadConfessions() {
  const confessions = JSON.parse(localStorage.getItem(confessionsKey)) || [];
  const confessionsList = document.getElementById('confessionsList');
  confessionsList.innerHTML = '';
  
  confessions.forEach((confession, index) => {
    const confessionDiv = document.createElement('div');
    confessionDiv.classList.add('confession');
    confessionDiv.innerHTML = `
      <p>${confession.text}</p>
      <div class="buttons">
        <span class="upvote" onclick="vote(${index}, 'upvote')">Upvote (${confession.upvotes})</span>
        <span class="downvote" onclick="vote(${index}, 'downvote')">Downvote (${confession.downvotes})</span>
      </div>
    `;
    confessionsList.appendChild(confessionDiv);
  });
}

function postConfession() {
  const confessionInput = document.getElementById('confessionInput');
  const confessionText = confessionInput.value.trim();
  
  if (confessionText) {
    const confessions = JSON.parse(localStorage.getItem(confessionsKey)) || [];
    const newConfession = { text: confessionText, upvotes: 0, downvotes: 0 };
    confessions.push(newConfession);
    localStorage.setItem(confessionsKey, JSON.stringify(confessions));
    confessionInput.value = '';
    loadConfessions();
  }
}

function vote(index, type) {
  const confessions = JSON.parse(localStorage.getItem(confessionsKey)) || [];
  if (type === 'upvote') {
    confessions[index].upvotes++;
  } else if (type === 'downvote') {
    confessions[index].downvotes++;
  }
  localStorage.setItem(confessionsKey, JSON.stringify(confessions));
  loadConfessions();
}

// Initial load
loadConfessions();
