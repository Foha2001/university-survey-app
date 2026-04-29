document.getElementById('surveyForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const responseField = document.getElementById('response');
  const response = responseField.value.trim();
  const messageDiv = document.getElementById('message');
  const submitBtn = document.querySelector('.btn');

  if (!response) {
    showMessage('Please enter a response', 'error', messageDiv);
    return;
  }

  // Disable button during submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const result = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ response })
    });

    const data = await result.json();

    if (result.ok) {
      showMessage('Thank you! Your response has been saved.', 'success', messageDiv);
      responseField.value = '';
      
      // Reset button after 2 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Response';
      }, 2000);
    } else {
      showMessage(data.error || 'An error occurred', 'error', messageDiv);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Response';
    }
  } catch (error) {
    showMessage('Failed to submit response. Please try again.', 'error', messageDiv);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Response';
  }
});

function showMessage(text, type, messageDiv) {
  messageDiv.textContent = text;
  messageDiv.className = `message show ${type}`;
  
  // Auto-hide error messages after 5 seconds
  if (type === 'error') {
    setTimeout(() => {
      messageDiv.classList.remove('show');
    }, 5000);
  }
}
