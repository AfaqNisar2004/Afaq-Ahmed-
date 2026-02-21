document.addEventListener("DOMContentLoaded", () => {
  

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }


  const tabBtns = document.querySelectorAll(".tab-btn");
  const programCards = document.querySelectorAll(".program-card");

  if (tabBtns.length > 0 && programCards.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");
        
        const target = btn.getAttribute("data-target");
        
        // Show/Hide cards based on target and re-trigger animation
        programCards.forEach(card => {
          if (card.classList.contains(target)) {
            card.style.display = 'block';
            // Small timeout to ensure the display:block registers before adding the animation class
            setTimeout(() => card.classList.add('show'), 10); 
          } else {
            card.style.display = 'none';
            card.classList.remove('show');
          }
        });
      });
    });
  }

  // ================= COUNTER ANIMATION LOGIC =================
  const counters = document.querySelectorAll('.counter');
  const statsSection = document.querySelector('.stats-section');
  let hasAnimated = false; 

  if (counters.length > 0 && statsSection) {
    const animateCounters = () => {
      counters.forEach(counter => {
        counter.innerText = '0'; // Ensure it starts at 0
        const target = +counter.getAttribute('data-target');
        
        const updateCount = () => {
          const count = +counter.innerText;
          const increment = target / 40; // Adjust speed (lower is faster)
          
          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target; // Ensure it ends exactly on the target
          }
        };
        updateCount();
      });
    };

    // Observer to trigger animation when scrolled into view
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounters();
          hasAnimated = true;
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% of the section is visible
    });

    sectionObserver.observe(statsSection);
  }

});
