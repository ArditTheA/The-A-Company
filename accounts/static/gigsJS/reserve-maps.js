    function initMap2() {
      const jobLocation = document.getElementById('job-location').textContent;
      const input = document.getElementById('pac-input');
      input.value = jobLocation;
      google.maps.event.trigger(autocomplete, 'place_changed');
  
      const searchButton = document.querySelector('.pac-container .pac-item-query');
      if (searchButton) {
        searchButton.focus();
        searchButton.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }));
      }
    }
  
    window.addEventListener('load', initMap2);
