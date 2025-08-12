// Service data
const services = [
  {
    id: "kasda-user-mgmt",
    name: "KASDA User Management",
    description: "User account management for KASDA system",
    icon: "👥",
    department: "Departement Dukungan dan Layanan",
    estimatedTime: "2-4 hours",
    category: "User Management",
    isHighlighted: true,
  },
  {
    id: "bsgdirect-user-mgmt",
    name: "BSGDirect User Management",
    description: "User account management for BSGDirect system",
    icon: "🏦",
    department: "Departement Dukungan dan Layanan",
    estimatedTime: "2-4 hours",
    category: "User Management",
    isHighlighted: true,
  },
  {
    id: "olibs",
    name: "OLIBS",
    description: "Online Library Banking System support",
    icon: "📚",
    department: "IT Operations Department",
    estimatedTime: "1-3 hours",
    category: "Banking Systems",
  },
  {
    id: "klaim",
    name: "KLAIM",
    description: "Claims processing system support",
    icon: "📋",
    department: "IT Operations Department",
    estimatedTime: "2-6 hours",
    category: "Banking Systems",
  },
  {
    id: "xcard",
    name: "XCARD",
    description: "Card management system support",
    icon: "💳",
    department: "IT Operations Department",
    estimatedTime: "1-4 hours",
    category: "Banking Systems",
  },
  {
    id: "teller-app",
    name: "TellerApp/Reporting",
    description: "Teller application and reporting system",
    icon: "🏪",
    department: "IT Operations Department",
    estimatedTime: "2-5 hours",
    category: "Banking Systems",
  },
  {
    id: "bsg-qris",
    name: "BSG QRIS",
    description: "QR code payment system support",
    icon: "📱",
    department: "IT Operations Department",
    estimatedTime: "1-3 hours",
    category: "Payment Systems",
  },
  {
    id: "bsg-touch",
    name: "BSGTouch",
    description: "Touch interface banking system",
    icon: "📟",
    department: "IT Operations Department",
    estimatedTime: "2-4 hours",
    category: "Banking Systems",
  },
  {
    id: "atm",
    name: "ATM Systems",
    description: "ATM hardware and software support",
    icon: "🏧",
    department: "IT Operations Department",
    estimatedTime: "3-8 hours",
    category: "Hardware Systems",
  },
  {
    id: "sms-banking",
    name: "SMS Banking",
    description: "SMS banking service support",
    icon: "💬",
    department: "IT Operations Department",
    estimatedTime: "1-2 hours",
    category: "Communication Systems",
  },
]

// Create service card HTML
function createServiceCard(service, isRecent = false) {
  const isDepartmentDukungan = service.department === "Departement Dukungan dan Layanan"
  const cardClass = isRecent ? "recent-service-card" : `service-card ${service.isHighlighted ? "highlighted" : ""}`

  if (isRecent) {
    return `
            <a href="request.html?service=${service.id}" class="${cardClass}">
                <div class="recent-service-header">
                    <span class="recent-service-icon">${service.icon}</span>
                    <svg class="service-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </div>
                <h3 class="recent-service-title">${service.name}</h3>
                <div class="recent-service-time">${service.estimatedTime}</div>
            </a>
        `
  }

  return `
        <a href="request.html?service=${service.id}" class="${cardClass}">
            <div class="service-card-header">
                <span class="service-icon">${service.icon}</span>
                <svg class="service-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
            </div>
            
            <h3 class="service-title">${service.name}</h3>
            <p class="service-description">${service.description}</p>
            
            <div class="service-meta">
                <div class="service-department ${isDepartmentDukungan ? "highlighted" : "normal"}">
                    Routed to: ${service.department}
                </div>
                
                <div class="service-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    <span>${service.estimatedTime}</span>
                </div>
            </div>
        </a>
    `
}

// Populate services by category
function populateServices() {
  const categories = {
    "User Management": "userManagementServices",
    "Banking Systems": "bankingServices",
    "Payment Systems": "paymentServices",
    "Hardware Systems": "hardwareServices",
    "Communication Systems": "communicationServices",
  }

  Object.entries(categories).forEach(([category, elementId]) => {
    const container = document.getElementById(elementId)
    if (container) {
      const categoryServices = services.filter((service) => service.category === category)
      container.innerHTML = categoryServices.map((service) => createServiceCard(service)).join("")
    }
  })
}

// Populate recent services (mock data - last 3 services used)
function populateRecentServices() {
  const container = document.getElementById("recentServicesGrid")
  if (container) {
    // Mock recent services - in real app, this would come from user's history
    const recentServices = services.slice(0, 3)
    container.innerHTML = recentServices.map((service) => createServiceCard(service, true)).join("")
  }
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase()
      filterServices(query)
    })
  }
}

// Filter services based on search query
function filterServices(query) {
  const allServiceCards = document.querySelectorAll(".service-card")

  allServiceCards.forEach((card) => {
    const title = card.querySelector(".service-title")?.textContent.toLowerCase() || ""
    const description = card.querySelector(".service-description")?.textContent.toLowerCase() || ""

    if (title.includes(query) || description.includes(query)) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// General request handler
function submitGeneralRequest() {
  window.location.href = "request.html?service=general"
}

// Initialize services when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  populateServices()
  populateRecentServices()
  setupSearch()
})
