'use strict';

const video = document.querySelector('#project-video');
document.querySelector('[data-play-video]').addEventListener('click', () => {
  video.play().catch(() => {
    video.focus({ preventScroll: true });
  });
});

const copyButton = document.querySelector('[data-copy-citation]');
const copyStatus = document.querySelector('.copy-status');
copyButton.addEventListener('click', async () => {
  const citation = document.querySelector('#citation-text').textContent;
  try {
    await navigator.clipboard.writeText(citation);
    copyStatus.textContent = 'Copied to clipboard.';
  } catch {
    copyStatus.textContent = 'Select the citation above to copy it.';
  }
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.question, .section-intro, .framework-figure, .framework-notes, .result-grid, .resource-copy').forEach((element) => {
    element.classList.add('reveal-ready');
    observer.observe(element);
  });
}
