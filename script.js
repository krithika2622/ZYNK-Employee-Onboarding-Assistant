document.addEventListener('DOMContentLoaded', () => {
  const userProfile = document.getElementById('userProfile');
  const hrModal = document.getElementById('hrModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const closeBtn = document.querySelector('.close-btn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openModal(title, htmlContent) {
    if (!hrModal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalText) modalText.innerHTML = htmlContent;
    hrModal.style.display = 'flex';
  }
const jotformURL = "https://form.jotform.com/263220531428045";
  const modalBox = document.querySelector('#hrModal .modal-content') || document.querySelector('.modal-content');
  const profileTrigger = document.getElementById('userProfile');

  // Profile modal open pannum pothu form-modal size-ah remove pannum
  if (profileTrigger && modalBox) {
    profileTrigger.addEventListener('click', () => {
      modalBox.classList.remove('form-modal');
    });
  }

  // Open Form button click panna Jotform responsive iframe-ah modal-kulla open pannum
  document.querySelectorAll('.form-open-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const title = btn.getAttribute('data-form-title') || 'Zynq Employee Onboarding Form';
      if (modalBox) {
        modalBox.classList.add('form-modal');
      }

      openModal(
        title,
        `<iframe class="jotform-iframe" src="${jotformURL}" title="${title}" loading="lazy" allow="camera; microphone; geolocation"></iframe>`
      );
    });
  });
  function closeModal() {
    if (hrModal) {
      hrModal.style.display = 'none';
    }
  }

  // 1. Navbar Links -> Smooth scroll ONLY (Never opens profile modal)
  document.querySelectorAll('.top-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const topbar = document.querySelector('.topbar');
        const headerOffset = (topbar ? topbar.offsetHeight : 76) + 16;
        const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });
      }
    });
  });

  // 2. Profile Click -> Opens ONLY Employee Profile modal
  if (userProfile) {
    userProfile.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(
        'Employee Profile',
        `
          <strong>Name:</strong> Krithika<br>
          <strong>Role:</strong> Software Associate<br>
          <strong>Employee ID:</strong> ZYNQ-1026<br>
          <strong>Department:</strong> Product Engineering<br>
          <strong>Status:</strong> Onboarding in Progress
        `
      );
    });
  }

  // 3. Quick Cards Click -> Opens card info modal
  document.querySelectorAll('.quick-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const titleEl = card.querySelector('strong');
      const descEl = card.querySelector('p');
      const titleText = titleEl ? titleEl.textContent.trim() : 'HR Info';
      const descText = descEl ? descEl.textContent.trim() : '';

      openModal(
        titleText,
        `
          <p>${descText}</p>
          <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
          <strong>Zynq Support Info:</strong><br>
          For official assistance regarding <em>${titleText}</em>, reach out to hr@zynq.demo or call extension 101.
        `
      );
    });
  });

  // 4. Close Modal Actions
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === hrModal) closeModal();
  });

  // 5. Chat Suggestion Buttons & Interactive Chat Logic
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatArea = document.getElementById('chatArea');
  const suggestions = document.querySelectorAll('.suggestion');

  const officeJokes = [
    "Why did the developer go broke? Because he used up all his cache! 😄",
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "What’s a computer’s favorite snack? Microchips! 🍟"
  ];

  function addMessage(text, sender) {
    if (!chatArea) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;

    if (sender === 'bot') {
      msgDiv.innerHTML = `
        <span class="message-avatar">✦</span>
        <div class="bubble">
          <p>${text}</p>
          <span class="message-time">HR Assistant</span>
        </div>`;
    } else {
      msgDiv.innerHTML = `
        <div class="bubble">
          <p>${text}</p>
        </div>`;
    }
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function handleQuestion(question) {
    addMessage(question, 'user');
    setTimeout(() => {
      let reply = "I'm here to help with your onboarding! You can ask me about documents, working hours, leave, Wi-Fi, or your onboarding buddy.";
      const q = question.toLowerCase();

      if (q.includes('document')) {
        reply = "📄 For joining documents, please keep your Government ID proof, educational certificates, and 2 passport-size photos ready to submit.";
      } else if (q.includes('hour') || q.includes('timing')) {
        reply = "⏰ Standard working hours are from 9:30 AM to 6:30 PM, Monday through Friday (with flexible core hours).";
      } else if (q.includes('leave') || q.includes('apply')) {
        reply = "🏖️ You get 24 annual leaves! You can apply through the Zynq portal once your onboarding reaches 100%.";
      } else if (q.includes('wi-fi') || q.includes('wifi') || q.includes('password')) {
        reply = "📶 Connect to <strong>Zynq_Employee_5G</strong>. Your temporary onboarding password is <code>WelcomeZynq2026!</code>";
      } else if (q.includes('buddy') || q.includes('mentor')) {
        reply = "🤝 Your onboarding buddy is <strong>Arjun Nair</strong> (Senior Product Engineer). He’ll reach out on Slack at 2:00 PM for a quick virtual coffee chat!";
      } else if (q.includes('joke') || q.includes('fun')) {
        reply = officeJokes[Math.floor(Math.random() * officeJokes.length)];
      }

      addMessage(reply, 'bot');
    }, 400);
  }

  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question') || btn.textContent;
      handleQuestion(question);
    });
  });

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (text) {
        handleQuestion(text);
        chatInput.value = '';
      }
    });
  }

  // 6. Checklist Checkboxes + Badges + Confetti
  const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
  const completedCountEl = document.getElementById('completedCount');
  const progressLabel = document.getElementById('progressLabel');
  const progressFill = document.getElementById('progressFill');
  const badges = document.querySelectorAll('.badge');

  let was100Percent = false;

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5b5bd6', '#249c78', '#3688d8', '#f59e0b']
      });
    }
  }

  function updateChecklistProgress() {
    const totalTasks = taskCheckboxes.length;
    let completedTasks = 0;

    taskCheckboxes.forEach((checkbox, index) => {
      const taskItem = checkbox.closest('.task-item');
      const statusSpan = taskItem ? taskItem.querySelector('.task-status') : null;
      const correspondingBadge = badges[index];

      if (checkbox.checked) {
        if (taskItem) taskItem.classList.add('completed');
        if (statusSpan) {
          statusSpan.textContent = 'Done';
          statusSpan.style.color = '#269b79';
        }
        completedTasks++;

        if (correspondingBadge && correspondingBadge.classList.contains('locked')) {
          correspondingBadge.classList.remove('locked');
          correspondingBadge.classList.add('unlocked', 'just-unlocked');
        }
      } else {
        if (taskItem) taskItem.classList.remove('completed');
        if (statusSpan) {
          statusSpan.textContent = 'Pending';
          statusSpan.style.color = '#8994a8';
        }

        if (correspondingBadge) {
          correspondingBadge.classList.remove('unlocked', 'just-unlocked');
          correspondingBadge.classList.add('locked');
        }
      }
    });

    if (completedCountEl) {
      completedCountEl.textContent = `${completedTasks} of ${totalTasks}`;
    }

    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    if (progressLabel) {
      progressLabel.textContent = `${percentage}% complete`;
    }
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }

    if (percentage === 100 && !was100Percent) {
      was100Percent = true;
      triggerConfetti();

      setTimeout(() => {
        openModal(
          '🎉 Onboarding Complete!',
          `
            Awesome job, <strong>Krithika</strong>! You’ve completed all 5 onboarding tasks and unlocked all your starter badges.<br><br>
            Welcome officially to the <strong>Zynq</strong> team! 🚀
          `
        );
      }, 600);
    } else if (percentage < 100) {
      was100Percent = false;
    }
  }

  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateChecklistProgress);
  });
});