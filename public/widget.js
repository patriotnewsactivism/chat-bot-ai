(function() {
  'use strict';
  
  // Get configuration
  const config = window.BuildMyBotConfig || {};
  const botId = config.botId;
  
  if (!botId) {
    console.error('BuildMyBot: botId is required in BuildMyBotConfig');
    return;
  }
  
  // Default configuration
  const primaryColor = config.primaryColor || '#1e3a8a';
  const position = config.position || 'bottom-right';
  const baseUrl = config.baseUrl || window.location.origin;
  
  // Position styles
  const positions = {
    'bottom-right': 'bottom: 20px; right: 20px;',
    'bottom-left': 'bottom: 20px; left: 20px;',
    'top-right': 'top: 20px; right: 20px;',
    'top-left': 'top: 20px; left: 20px;'
  };
  
  // Create widget container
  const container = document.createElement('div');
  container.id = 'buildmybot-widget';
  container.style.cssText = `
    position: fixed;
    ${positions[position] || positions['bottom-right']}
    width: 400px;
    height: 600px;
    max-width: calc(100vw - 40px);
    max-height: calc(100vh - 40px);
    z-index: 999999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
  `;
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = `${baseUrl}/widget/${botId}`;
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
  `;
  iframe.allow = 'clipboard-write';
  
  // Create toggle button
  const button = document.createElement('button');
  button.id = 'chatmaker-toggle';
  button.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;
  button.style.cssText = `
    position: fixed;
    ${positions[position] || positions['bottom-right']}
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${primaryColor};
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999998;
    transition: all 0.3s ease;
  `;
  
  // Toggle functionality
  let isOpen = false;
  container.style.display = 'none';
  
  button.addEventListener('click', function() {
    isOpen = !isOpen;
    if (isOpen) {
      container.style.display = 'block';
      button.style.transform = 'scale(0.9)';
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      container.style.display = 'none';
      button.style.transform = 'scale(1)';
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      `;
    }
  });
  
  // Hover effect
  button.addEventListener('mouseenter', function() {
    button.style.transform = isOpen ? 'scale(0.9)' : 'scale(1.1)';
  });
  
  button.addEventListener('mouseleave', function() {
    button.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
  });
  
  // Append to DOM when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      container.appendChild(iframe);
      document.body.appendChild(container);
      document.body.appendChild(button);
    });
  } else {
    container.appendChild(iframe);
    document.body.appendChild(container);
    document.body.appendChild(button);
  }
  
  // Expose API
  window.BuildMyBot = {
    open: function() {
      if (!isOpen) button.click();
    },
    close: function() {
      if (isOpen) button.click();
    },
    toggle: function() {
      button.click();
    }
  };
})();