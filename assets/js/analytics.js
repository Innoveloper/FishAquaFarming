/**
 * Custom PostHog Behavioral Tracking Helper
 */
(function () {
  'use strict';

  function captureEvent(eventName, properties) {
    if (window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture(eventName, properties || {});
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Declarative event tracking via data attributes
    document.addEventListener('click', function (e) {
      var target = e.target.closest('[data-ph-event]');
      if (target) {
        var eventName = target.getAttribute('data-ph-event');
        var title = target.getAttribute('data-ph-title') || target.innerText.trim();
        var section = target.getAttribute('data-ph-section') || target.closest('section')?.id || 'general';

        captureEvent(eventName, {
          element_text: title,
          section_id: section,
          target_url: target.getAttribute('href') || null
        });
      }
    });

    // 2. Navigation Link Tracking
    var navLinks = document.querySelectorAll('#main-nav a, #mobile-nav-panel a');
    navLinks.forEach(function (link) {
      if (!link.hasAttribute('data-ph-event')) {
        link.addEventListener('click', function () {
          captureEvent('nav_link_clicked', {
            link_text: link.innerText.trim(),
            target_href: link.getAttribute('href')
          });
        });
      }
    });

    // 3. Facility Video Event Tracking
    var facilityVideo = document.getElementById('facility-video-player');
    if (facilityVideo) {
      facilityVideo.addEventListener('play', function () {
        captureEvent('facility_video_played', {
          video_src: facilityVideo.currentSrc || 'drone video.mp4'
        });
      });
      facilityVideo.addEventListener('pause', function () {
        captureEvent('facility_video_paused', {
          current_time_sec: Math.floor(facilityVideo.currentTime)
        });
      });
    }

    // 4. Mobile Menu Toggle Tracking
    var mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', function () {
        var isOpen = document.getElementById('mobile-nav-panel')?.classList.contains('hidden');
        captureEvent('mobile_menu_toggled', {
          action: isOpen ? 'opened' : 'closed'
        });
      });
    }
  });

  // Global helper export for manual explicit tracking
  window.phTrack = captureEvent;
})();
