const downloadBtn = document.getElementById('download');

// Добавляем обработчик события клика на кнопку
downloadBtn.addEventListener('click', () => {
  // Создаем ссылку на файл
  const link = document.createElement('a');
  link.href = 'Rezyume.pdf';
  link.download = 'Rezyume.pdf';

  // Добавляем ссылку в DOM
  document.body.appendChild(link);

  // Имитируем клик на ссылку, чтобы начать скачивание
  link.click();

  // Удаляем ссылку из DOM
  document.body.removeChild(link);
});
document.getElementById('sendButton').addEventListener('click', () => {
  const nameUser = document.getElementById('nameUser').value;
  const emailUser = document.getElementById('emailUser').value;
  const messageUser = document.getElementById('messageUser').value;

  fetch('/send_email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ nameUser, emailUser, messageUser }).toString()
})
  .then(response => {
      if (response.ok) {
          alert('Email sent successfully!');
      } else {
          alert('Failed to send email. Please try again later.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
  });
});