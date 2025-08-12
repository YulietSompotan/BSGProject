// Mock authentication system
class AuthManager {
  constructor() {
    this.currentUser = null
    this.init()
  }

  init() {
    // Check if user is logged in (mock - in real app, check JWT token)
    const savedUser = localStorage.getItem("bsg_user")
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser)
      this.updateUserDisplay()
    } else {
      // Redirect to login if not authenticated
      if (!window.location.pathname.includes("login.html")) {
        window.location.href = "login.html"
      }
    }
  }

  login(username, password) {
    // Mock login - in real app, this would call an API
    const mockUsers = {
      admin: { name: "Admin User", role: "admin", id: 1 },
      manager: { name: "Manager User", role: "manager", id: 2 },
      technician: { name: "Tech User", role: "technician", id: 3 },
      user: { name: "End User", role: "user", id: 4 },
    }

    if (mockUsers[username] && password === "password") {
      this.currentUser = mockUsers[username]
      localStorage.setItem("bsg_user", JSON.stringify(this.currentUser))
      return true
    }
    return false
  }

  logout() {
    this.currentUser = null
    localStorage.removeItem("bsg_user")
    window.location.href = "login.html"
  }

  updateUserDisplay() {
    const userNameElement = document.getElementById("userName")
    const userRoleElement = document.getElementById("userRole")

    if (userNameElement && this.currentUser) {
      userNameElement.textContent = this.currentUser.name
    }

    if (userRoleElement && this.currentUser) {
      userRoleElement.textContent = this.currentUser.role
    }
  }

  getCurrentUser() {
    return this.currentUser
  }

  hasRole(role) {
    return this.currentUser && this.currentUser.role === role
  }
}

// Global auth instance
const auth = new AuthManager()

// Global logout function
function logout() {
  auth.logout()
}

// Initialize auth when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (auth.currentUser) {
    auth.updateUserDisplay()
  }
})
