// Dashboard management system
const auth = {
  getCurrentUser: () => {
    // Mock implementation for demonstration purposes
    return {
      name: "John Doe",
      role: "manager",
    }
  },
}

class DashboardManager {
  constructor() {
    this.currentUser = null
    this.mockData = this.generateMockData()
    this.init()
  }

  init() {
    // Get current user from auth
    this.currentUser = auth.getCurrentUser()

    if (!this.currentUser) {
      window.location.href = "login.html"
      return
    }

    this.renderDashboard()
  }

  generateMockData() {
    return {
      tickets: [
        {
          id: "BSG-001234",
          title: "KASDA User Management - New User Request",
          status: "pending_approval",
          department: "Departement Dukungan dan Layanan",
          createdAt: "2024-01-15T10:30:00Z",
          estimatedCompletion: "2024-01-16T14:00:00Z",
          priority: "medium",
          assignedTo: "Tech User",
          requester: "End User",
        },
        {
          id: "BSG-001235",
          title: "BSGDirect User Management - Password Reset",
          status: "in_progress",
          department: "Departement Dukungan dan Layanan",
          createdAt: "2024-01-14T09:15:00Z",
          estimatedCompletion: "2024-01-15T16:00:00Z",
          priority: "high",
          assignedTo: "Tech User",
          requester: "End User",
        },
        {
          id: "BSG-001236",
          title: "OLIBS - System Error Report",
          status: "closed",
          department: "IT Operations Department",
          createdAt: "2024-01-13T14:20:00Z",
          completedAt: "2024-01-14T11:30:00Z",
          priority: "low",
          assignedTo: "Tech User",
          requester: "End User",
        },
        {
          id: "BSG-001237",
          title: "XCARD - Transaction Issue",
          status: "pending_approval",
          department: "IT Operations Department",
          createdAt: "2024-01-12T16:45:00Z",
          estimatedCompletion: "2024-01-15T12:00:00Z",
          priority: "high",
          assignedTo: null,
          requester: "Manager User",
        },
        {
          id: "BSG-001238",
          title: "ATM Systems - Hardware Maintenance",
          status: "in_progress",
          department: "IT Operations Department",
          createdAt: "2024-01-11T08:30:00Z",
          estimatedCompletion: "2024-01-16T17:00:00Z",
          priority: "critical",
          assignedTo: "Tech User",
          requester: "Admin User",
        },
      ],
      stats: {
        totalTickets: 156,
        activeTickets: 23,
        completedThisMonth: 45,
        averageResolutionTime: "2.5 days",
        pendingApprovals: 8,
        teamPerformance: 92,
      },
    }
  }

  renderDashboard() {
    const container = document.getElementById("dashboardContent")

    switch (this.currentUser.role) {
      case "manager":
        container.innerHTML = this.renderManagerDashboard()
        break
      case "technician":
        container.innerHTML = this.renderTechnicianDashboard()
        break
      case "admin":
        container.innerHTML = this.renderAdminDashboard()
        break
      default:
        container.innerHTML = this.renderUserDashboard()
        break
    }

    // Add event listeners after rendering
    this.addEventListeners()
  }

  renderUserDashboard() {
    const userTickets = this.mockData.tickets.filter((t) => t.requester === this.currentUser.name)
    const activeTickets = userTickets.filter((t) => t.status !== "closed")
    const completedTickets = userTickets.filter((t) => t.status === "closed")

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">My Dashboard</h1>
        <p class="dashboard-subtitle">Track your service requests and create new ones</p>
      </div>

      ${this.renderQuickActions()}

      <div class="dashboard-grid">
        <div class="dashboard-main">
          <div class="dashboard-section">
            <h2 class="dashboard-section-title">Active Requests</h2>
            ${
              activeTickets.length > 0
                ? activeTickets.map((ticket) => this.renderTicketCard(ticket)).join("")
                : this.renderEmptyState(
                    "No active requests",
                    "You don't have any active service requests at the moment.",
                  )
            }
          </div>

          <div class="dashboard-section">
            <h2 class="dashboard-section-title">Recent Completed Requests</h2>
            ${this.renderRecentTickets(completedTickets)}
          </div>
        </div>

        <div class="dashboard-sidebar">
          <div class="dashboard-section">
            <h3 class="dashboard-section-title">Request Summary</h3>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-label">Active Requests</span>
                <span class="stat-value primary">${activeTickets.length}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Completed This Month</span>
                <span class="stat-value success">${completedTickets.length}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Average Resolution Time</span>
                <span class="stat-value neutral">${this.mockData.stats.averageResolutionTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderManagerDashboard() {
    const pendingApprovals = this.mockData.tickets.filter((t) => t.status === "pending_approval")
    const teamTickets = this.mockData.tickets.filter((t) => t.status !== "closed")

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Manager Dashboard</h1>
        <p class="dashboard-subtitle">Manage team performance and approve requests</p>
      </div>

      ${this.renderQuickActions("manager")}

      <div class="dashboard-grid">
        <div class="dashboard-main">
          <div class="dashboard-section">
            <h2 class="dashboard-section-title">Pending Approvals (${pendingApprovals.length})</h2>
            ${
              pendingApprovals.length > 0
                ? pendingApprovals.map((ticket) => this.renderApprovalItem(ticket)).join("")
                : this.renderEmptyState("No pending approvals", "All requests have been processed.")
            }
          </div>

          <div class="dashboard-section">
            <h2 class="dashboard-section-title">Team Active Tickets</h2>
            ${teamTickets.map((ticket) => this.renderTicketCard(ticket)).join("")}
          </div>
        </div>

        <div class="dashboard-sidebar">
          <div class="dashboard-section">
            <h3 class="dashboard-section-title">Team Performance</h3>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-label">Active Tickets</span>
                <span class="stat-value primary">${teamTickets.length}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Pending Approvals</span>
                <span class="stat-value primary">${pendingApprovals.length}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Team Performance</span>
                <span class="stat-value success">${this.mockData.stats.teamPerformance}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderTechnicianDashboard() {
    const assignedTickets = this.mockData.tickets.filter(
      (t) => t.assignedTo === this.currentUser.name && t.status !== "closed",
    )
    const departmentTickets = this.mockData.tickets.filter((t) => t.status === "pending_approval")

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Technician Dashboard</h1>
        <p class="dashboard-subtitle">Manage your assigned tickets and department queue</p>
      </div>

      ${this.renderQuickActions("technician")}

      <div class="dashboard-grid">
        <div class="dashboard-main">
          <div class="dashboard-section">
            <h2 class="dashboard-section-title">My Assigned Tickets (${assignedTickets.length})</h2>
            ${
              assignedTickets.length > 0
                ? assignedTickets.map((ticket) => this.renderTicketCard(ticket)).join("")
                : this.renderEmptyState("No assigned tickets", "You don't have any tickets assigned at the moment.")
            }
          </div>

          <div class="dashboard-section">
            <h2 class="dashboard-section-title">Department Queue</h2>
            ${departmentTickets.map((ticket) => this.renderTicketCard(ticket)).join("")}
          </div>
        </div>

        <div class="dashboard-sidebar">
          <div class="dashboard-section">
            <h3 class="dashboard-section-title">Workload Summary</h3>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-label">Assigned to Me</span>
                <span class="stat-value primary">${assignedTickets.length}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Department Queue</span>
                <span class="stat-value primary">${departmentTickets.length}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Completed Today</span>
                <span class="stat-value success">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderAdminDashboard() {
    const allTickets = this.mockData.tickets
    const activeTickets = allTickets.filter((t) => t.status !== "closed")

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Admin Dashboard</h1>
        <p class="dashboard-subtitle">System overview and user management</p>
      </div>

      ${this.renderQuickActions("admin")}

      <div class="dashboard-grid">
        <div class="dashboard-main">
          <div class="dashboard-section">
            <h2 class="dashboard-section-title">System Overview</h2>
            ${activeTickets.map((ticket) => this.renderTicketCard(ticket)).join("")}
          </div>
        </div>

        <div class="dashboard-sidebar">
          <div class="dashboard-section">
            <h3 class="dashboard-section-title">System Statistics</h3>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-label">Total Tickets</span>
                <span class="stat-value neutral">${this.mockData.stats.totalTickets}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Active Tickets</span>
                <span class="stat-value primary">${this.mockData.stats.activeTickets}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Completed This Month</span>
                <span class="stat-value success">${this.mockData.stats.completedThisMonth}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">System Performance</span>
                <span class="stat-value success">98.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderQuickActions(role = "user") {
    const actions = {
      user: [
        { icon: "➕", text: "New Request", href: "index.html" },
        { icon: "📋", text: "My Tickets", href: "tickets.html" },
        { icon: "👤", text: "Profile", href: "profile.html" },
      ],
      manager: [
        { icon: "✅", text: "Approve Requests", href: "#", onclick: "showApprovals()" },
        { icon: "📊", text: "Team Reports", href: "reports.html" },
        { icon: "👥", text: "Manage Team", href: "team.html" },
      ],
      technician: [
        { icon: "🔧", text: "My Tickets", href: "tickets.html" },
        { icon: "📥", text: "Department Queue", href: "queue.html" },
        { icon: "⏱️", text: "Time Tracking", href: "timetrack.html" },
      ],
      admin: [
        { icon: "⚙️", text: "System Settings", href: "settings.html" },
        { icon: "👥", text: "User Management", href: "users.html" },
        { icon: "📈", text: "Analytics", href: "analytics.html" },
      ],
    }

    const roleActions = actions[role] || actions.user

    return `
      <div class="quick-actions">
        <h2 class="quick-actions-title">Quick Actions</h2>
        <div class="quick-actions-grid">
          ${roleActions
            .map(
              (action) => `
            <a href="${action.href}" class="quick-action-btn" ${action.onclick ? `onclick="${action.onclick}"` : ""}>
              <div class="quick-action-icon">${action.icon}</div>
              <span class="quick-action-text">${action.text}</span>
            </a>
          `,
            )
            .join("")}
        </div>
      </div>
    `
  }

  renderTicketCard(ticket) {
    const isDepartmentDukungan = ticket.department === "Departement Dukungan dan Layanan"

    return `
      <div class="ticket-status-card" onclick="viewTicket('${ticket.id}')">
        <div class="ticket-header">
          <span class="ticket-id">${ticket.id}</span>
          <span class="ticket-status ${ticket.status.replace("_", "-")}">${this.formatStatus(ticket.status)}</span>
        </div>
        
        <h3 class="ticket-title">${ticket.title}</h3>
        
        <div class="ticket-meta">
          <div class="ticket-department ${isDepartmentDukungan ? "highlighted" : ""}">
            ${ticket.department}
          </div>
          <div class="ticket-priority">
            <span class="priority-dot ${ticket.priority}"></span>
            ${ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
          </div>
          <span>Created: ${this.formatDate(ticket.createdAt)}</span>
          ${ticket.estimatedCompletion ? `<span>Est. Completion: ${this.formatDate(ticket.estimatedCompletion)}</span>` : ""}
        </div>
      </div>
    `
  }

  renderApprovalItem(ticket) {
    return `
      <div class="approval-item">
        <div class="approval-info">
          <div class="approval-title">${ticket.title}</div>
          <div class="approval-meta">
            ${ticket.id} • Requested by ${ticket.requester} • ${this.formatDate(ticket.createdAt)}
          </div>
        </div>
        <div class="approval-actions">
          <button class="approval-btn approve" onclick="approveTicket('${ticket.id}')">Approve</button>
          <button class="approval-btn reject" onclick="rejectTicket('${ticket.id}')">Reject</button>
        </div>
      </div>
    `
  }

  renderRecentTickets(tickets) {
    if (tickets.length === 0) {
      return this.renderEmptyState("No completed requests", "You haven't completed any requests recently.")
    }

    return `
      <div class="recent-tickets-list">
        ${tickets
          .map(
            (ticket) => `
          <div class="recent-ticket-item" onclick="viewTicket('${ticket.id}')">
            <div class="recent-ticket-info">
              <div class="recent-ticket-title">${ticket.title}</div>
              <div class="recent-ticket-date">Completed: ${this.formatDate(ticket.completedAt || ticket.createdAt)}</div>
            </div>
            <span class="recent-ticket-status ${ticket.status}">${this.formatStatus(ticket.status)}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }

  renderEmptyState(title, description) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </div>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-description">${description}</p>
      </div>
    `
  }

  formatStatus(status) {
    const statusMap = {
      pending_approval: "Pending Approval",
      in_progress: "In Progress",
      completed: "Completed",
      closed: "Closed",
    }
    return statusMap[status] || status
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  addEventListeners() {
    // Add any additional event listeners here
  }
}

// Global functions for button handlers
function viewTicket(ticketId) {
  window.location.href = `ticket.html?id=${ticketId}`
}

function approveTicket(ticketId) {
  if (confirm(`Are you sure you want to approve ticket ${ticketId}?`)) {
    alert(`Ticket ${ticketId} has been approved.`)
    // In real app, this would call an API
    location.reload()
  }
}

function rejectTicket(ticketId) {
  const reason = prompt(`Please provide a reason for rejecting ticket ${ticketId}:`)
  if (reason) {
    alert(`Ticket ${ticketId} has been rejected.\nReason: ${reason}`)
    // In real app, this would call an API
    location.reload()
  }
}

function showApprovals() {
  // Filter to show only pending approvals
  alert("Showing pending approvals...")
}

// Global dashboard manager instance
let dashboardManager

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  dashboardManager = new DashboardManager()
})
