const form = document.querySelector('#survey-form');
const surveyResults = document.querySelector('#survey-results');
const totalParticipants = document.querySelector('#total-participants');

// Depolanan sonuçları al
const storedResults = JSON.parse(localStorage.getItem('surveyResults')) || [];

// Sonuçları depolama
function storeResult(result) {
  storedResults.push(result);
  localStorage.setItem('surveyResults', JSON.stringify(storedResults));
}

// Sonuçları görüntüleme
function displayResults() {
  surveyResults.innerHTML = '';
  const results = countResults();
  totalParticipants.textContent = storedResults.length;
  Object.keys(results).forEach(key => {
    const resultItem = document.createElement('li');
    resultItem.innerHTML = `<span>${key}: </span>${results[key]}`;
    surveyResults.appendChild(resultItem);
  });
}

// Sonuçları sayma
function countResults() {
  const results = {};
  storedResults.forEach(result => {
    if (results[result]) {
      results[result]++;
    } else {
      results[result] = 1;
    }
  });
  return results;
}

// Formu gönderme
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const result = form.course.value;
  storeResult(result);
  form.reset();
  displayResults();
});

// Mevcut sonuçları görüntüleme
displayResults();
