// Main application JavaScript

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  console.log("BSG Service Desk initialized")

  // Add any global event listeners or initialization code here
  setupGlobalEventListeners()
})

// Setup global event listeners
function setupGlobalEventListeners() {
  // Handle notification button clicks
  const notificationBtn = document.querySelector(".notification-btn")
  if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
      // In real app, this would show notifications dropdown
      alert("Notifications feature coming soon!")
    })
  }

  // Handle responsive menu toggle (if needed)
  setupResponsiveMenu()
}

// Setup responsive menu for mobile
function setupResponsiveMenu() {
  // Add mobile menu functionality if needed
  const header = document.querySelector(".header")
  if (window.innerWidth <= 768) {
    // Mobile-specific functionality
    console.log("Mobile view detected")
  }
}

// Utility functions
function showLoading(element) {
  if (element) {
    element.innerHTML = '<div class="loading">Loading...</div>'
  }
}

function showError(element, message) {
  if (element) {
    element.innerHTML = `<div class="error">${message}</div>`
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Handle window resize
window.addEventListener("resize", () => {
  setupResponsiveMenu()
})
