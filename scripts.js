document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggles (supports multiple instances)
  document.querySelectorAll('.nav-toggle').forEach(function(toggle){
    const targetId = toggle.getAttribute('aria-controls');
    const mobile = targetId ? document.getElementById(targetId) : null;
    if(!mobile) return;

    function closeMenu(){
      mobile.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      mobile.setAttribute('aria-hidden','true');
    }

    toggle.addEventListener('click', function(){
      const isOpen = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      mobile.setAttribute('aria-hidden', String(!isOpen));
    });

    mobile.addEventListener('click', function(e){
      if(e.target && e.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeMenu();
    });
  });

  // Slider controls: attach handlers to nav-btns in same container
  function updateSliderButtons(slider){
    const container = slider.closest('.slider-container');
    if(!container) return;
    const left = container.querySelector('.nav-btn.left');
    const right = container.querySelector('.nav-btn.right');
    if(!left || !right) return;
    if(slider.scrollWidth <= slider.clientWidth + 1){
      left.style.display = 'none';
      right.style.display = 'none';
    } else {
      left.style.display = '';
      right.style.display = '';
    }
  }

  document.querySelectorAll('.slider').forEach(function(slider){
    const container = slider.closest('.slider-container');
    if(!container) return;
    const left = container.querySelector('.nav-btn.left');
    const right = container.querySelector('.nav-btn.right');

    function scrollSliderLocal(direction){
      const card = slider.querySelector('.product-card');
      const gap = parseInt(getComputedStyle(slider).gap) || 16;
      const scrollAmount = card ? (card.offsetWidth + gap) : Math.floor(slider.clientWidth * 0.9);
      slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }

    if(left) left.addEventListener('click', function(){ scrollSliderLocal(-1); });
    if(right) right.addEventListener('click', function(){ scrollSliderLocal(1); });

    // Accessibility / visibility
    updateSliderButtons(slider);
    window.addEventListener('resize', function(){ updateSliderButtons(slider); });
    slider.addEventListener('scroll', function(){ updateSliderButtons(slider); });
  });

  // Backwards-compatible global used by some inline onclick handlers
  window.scrollSlider = function(direction){
    const slider = document.getElementById('productSlider');
    if(!slider) return;
    const card = slider.querySelector('.product-card');
    const gap = parseInt(getComputedStyle(slider).gap) || 16;
    const scrollAmount = card ? (card.offsetWidth + gap) : Math.floor(slider.clientWidth * 0.9);
    slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

});