const downloadBtn = document.getElementById('download');

        downloadBtn.addEventListener('click', () => {
            fetch('/download/Rezyume.pdf')
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'Rezyume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => console.error(error));
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