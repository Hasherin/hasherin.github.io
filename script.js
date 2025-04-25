function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('IP cím kimásolva');
    })
    .catch(err => {
      alert('Nem sikerült kimásolni az IP címet: ', err);
    });
}