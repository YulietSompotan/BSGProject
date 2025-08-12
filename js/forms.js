// Form management system
const services = [
  {
    id: "kasda-user-mgmt",
    name: "KASDA User Management",
    icon: "user",
    description: "Manage user accounts for KASDA.",
    department: "IT Department",
    estimatedTime: "2-3 business days",
  },
  {
    id: "bsgdirect-user-mgmt",
    name: "BSGDirect User Management",
    icon: "user",
    description: "Manage user accounts for BSGDirect.",
    department: "IT Department",
    estimatedTime: "1-2 business days",
  },
  {
    id: "olibs",
    name: "OLibs Issue Reporting",
    icon: "bug",
    description: "Report issues related to OLibs.",
    department: "Support Department",
    estimatedTime: "1 business day",
  },
  {
    id: "general",
    name: "General Request",
    icon: "question",
    description: "Submit a general request.",
    department: "General Support",
    estimatedTime: "1-3 business days",
  },
]

class FormManager {
  constructor() {
    this.currentService = null
    this.formData = {}
    this.errors = {}
    this.currentStep = "form"
    this.isSubmitting = false
    this.init()
  }

  init() {
    // Get service ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const serviceId = urlParams.get("service")

    if (serviceId) {
      this.loadService(serviceId)
    } else {
      this.showError("No service specified")
    }
  }

  loadService(serviceId) {
    // Find service from services data
    const service = services.find((s) => s.id === serviceId)

    if (!service) {
      this.showError("Service not found")
      return
    }

    this.currentService = {
      ...service,
      formTemplate: this.getFormTemplate(serviceId),
    }

    this.renderServiceInfo()
    this.renderForm()
  }

  getFormTemplate(serviceId) {
    // Define form templates for different services
    const templates = {
      "kasda-user-mgmt": {
        fields: [
          { id: "employeeId", label: "Employee ID", type: "text", required: true, maxLength: 20 },
          { id: "fullName", label: "Full Name", type: "text", required: true, maxLength: 100 },
          { id: "email", label: "Email Address", type: "email", required: true, maxLength: 100 },
          { id: "department", label: "Department", type: "text", required: true, maxLength: 50 },
          {
            id: "requestType",
            label: "Request Type",
            type: "dropdown",
            required: true,
            options: ["New Account", "Password Reset", "Account Unlock", "Permission Change", "Account Deactivation"],
          },
          { id: "justification", label: "Business Justification", type: "textarea", required: true, maxLength: 500 },
          {
            id: "urgency",
            label: "Urgency Level",
            type: "dropdown",
            required: true,
            options: ["Low", "Medium", "High", "Critical"],
          },
          { id: "attachments", label: "Supporting Documents", type: "file", required: false },
        ],
      },
      "bsgdirect-user-mgmt": {
        fields: [
          { id: "employeeId", label: "Employee ID", type: "text", required: true, maxLength: 20 },
          { id: "fullName", label: "Full Name", type: "text", required: true, maxLength: 100 },
          { id: "email", label: "Email Address", type: "email", required: true, maxLength: 100 },
          { id: "branch", label: "Branch Code", type: "text", required: true, maxLength: 10 },
          {
            id: "requestType",
            label: "Request Type",
            type: "dropdown",
            required: true,
            options: ["New Account", "Password Reset", "Account Unlock", "Permission Change", "Account Deactivation"],
          },
          {
            id: "accessLevel",
            label: "Access Level",
            type: "dropdown",
            required: true,
            options: ["Read Only", "Standard User", "Power User", "Administrator"],
          },
          { id: "justification", label: "Business Justification", type: "textarea", required: true, maxLength: 500 },
          { id: "attachments", label: "Supporting Documents", type: "file", required: false },
        ],
      },
      olibs: {
        fields: [
          {
            id: "issueType",
            label: "Issue Type",
            type: "dropdown",
            required: true,
            options: ["System Error", "Performance Issue", "Feature Request", "Data Issue", "Access Problem"],
          },
          {
            id: "priority",
            label: "Priority",
            type: "dropdown",
            required: true,
            options: ["Low", "Medium", "High", "Critical"],
          },
          {
            id: "affectedModule",
            label: "Affected Module",
            type: "dropdown",
            required: true,
            options: ["Catalog Search", "Book Management", "User Management", "Reports", "System Administration"],
          },
          { id: "description", label: "Issue Description", type: "textarea", required: true, maxLength: 1000 },
          { id: "stepsToReproduce", label: "Steps to Reproduce", type: "textarea", required: false, maxLength: 500 },
          { id: "expectedResult", label: "Expected Result", type: "textarea", required: false, maxLength: 300 },
          { id: "actualResult", label: "Actual Result", type: "textarea", required: false, maxLength: 300 },
          { id: "attachments", label: "Screenshots/Documents", type: "file", required: false },
        ],
      },
      general: {
        fields: [
          { id: "subject", label: "Subject", type: "text", required: true, maxLength: 100 },
          {
            id: "category",
            label: "Category",
            type: "dropdown",
            required: true,
            options: ["Technical Issue", "Access Request", "Feature Request", "Bug Report", "General Inquiry"],
          },
          {
            id: "priority",
            label: "Priority",
            type: "dropdown",
            required: true,
            options: ["Low", "Medium", "High", "Critical"],
          },
          { id: "description", label: "Description", type: "textarea", required: true, maxLength: 1000 },
          { id: "attachments", label: "Attachments", type: "file", required: false },
        ],
      },
    }

    // Return specific template or default general template
    return templates[serviceId] || templates.general
  }

  renderServiceInfo() {
    const container = document.getElementById("serviceInfoHeader")
    const serviceNameElement = document.getElementById("serviceName")

    if (serviceNameElement) {
      serviceNameElement.textContent = this.currentService.name
    }

    const isDepartmentDukungan = this.currentService.department === "Departement Dukungan dan Layanan"

    container.innerHTML = `
            <div class="service-info-title">
                <span class="service-info-icon">${this.currentService.icon}</span>
                <h1 class="service-info-name">${this.currentService.name}</h1>
            </div>
            <p class="service-info-description">${this.currentService.description}</p>
            <div class="service-info-meta">
                <div class="service-info-department ${isDepartmentDukungan ? "highlighted" : "normal"}">
                    Routed to: ${this.currentService.department}
                </div>
                <div class="service-info-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    <span>Estimated: ${this.currentService.estimatedTime}</span>
                </div>
            </div>
        `
  }

  renderForm() {
    const container = document.getElementById("formFields")
    container.innerHTML = ""

    this.currentService.formTemplate.fields.forEach((field) => {
      const fieldElement = this.createFormField(field)
      container.appendChild(fieldElement)
    })
  }

  createFormField(field) {
    const fieldDiv = document.createElement("div")
    fieldDiv.className = "form-field"

    const label = document.createElement("label")
    label.className = "form-label"
    label.htmlFor = field.id
    label.innerHTML = `${field.label}${field.required ? '<span class="required">*</span>' : ""}`

    let input
    if (field.type === "file") {
      input = this.createFileUpload(field)
    } else {
      input = this.createInput(field)
    }

    fieldDiv.appendChild(label)
    fieldDiv.appendChild(input)

    // Add character count for text fields with maxLength
    if (field.maxLength && field.type !== "dropdown" && field.type !== "file") {
      const charCount = document.createElement("div")
      charCount.className = "character-count"
      charCount.id = `${field.id}-count`
      charCount.textContent = `0/${field.maxLength} characters`
      fieldDiv.appendChild(charCount)
    }

    // Add error container
    const errorDiv = document.createElement("div")
    errorDiv.className = "form-error"
    errorDiv.id = `${field.id}-error`
    errorDiv.style.display = "none"
    fieldDiv.appendChild(errorDiv)

    return fieldDiv
  }

  createInput(field) {
    let input

    switch (field.type) {
      case "dropdown":
        input = document.createElement("select")
        input.className = "form-input form-select"

        const defaultOption = document.createElement("option")
        defaultOption.value = ""
        defaultOption.textContent = "Select an option"
        input.appendChild(defaultOption)

        field.options?.forEach((option) => {
          const optionElement = document.createElement("option")
          optionElement.value = option
          optionElement.textContent = option
          input.appendChild(optionElement)
        })
        break

      case "textarea":
        input = document.createElement("textarea")
        input.className = "form-input form-textarea"
        input.placeholder = `Enter ${field.label.toLowerCase()}...`
        break

      case "date":
        input = document.createElement("input")
        input.type = "date"
        input.className = "form-input"
        break

      case "email":
        input = document.createElement("input")
        input.type = "email"
        input.className = "form-input"
        input.placeholder = `Enter ${field.label.toLowerCase()}...`
        break

      case "number":
        input = document.createElement("input")
        input.type = "number"
        input.className = "form-input"
        input.placeholder = `Enter ${field.label.toLowerCase()}...`
        break

      default: // text
        input = document.createElement("input")
        input.type = "text"
        input.className = "form-input"
        input.placeholder = `Enter ${field.label.toLowerCase()}...`
        break
    }

    input.id = field.id
    input.name = field.id
    if (field.required) input.required = true
    if (field.maxLength) input.maxLength = field.maxLength

    // Add event listeners
    input.addEventListener("input", (e) => this.handleFieldChange(field.id, e.target.value))
    input.addEventListener("change", (e) => this.handleFieldChange(field.id, e.target.value))

    return input
  }

  createFileUpload(field) {
    const container = document.createElement("div")
    container.className = "file-upload"
    container.innerHTML = `
            <div class="file-upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
            </div>
            <div class="file-upload-text">Click to upload or drag and drop</div>
            <div class="file-upload-hint">PDF, DOC, DOCX, JPG, PNG (max 10MB)</div>
            <input type="file" id="${field.id}" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style="display: none;">
        `

    const fileInput = container.querySelector("input[type='file']")
    const fileList = document.createElement("div")
    fileList.className = "file-list"
    fileList.id = `${field.id}-list`
    container.appendChild(fileList)

    // File upload event listeners
    container.addEventListener("click", () => fileInput.click())
    container.addEventListener("dragover", (e) => {
      e.preventDefault()
      container.classList.add("dragover")
    })
    container.addEventListener("dragleave", () => {
      container.classList.remove("dragover")
    })
    container.addEventListener("drop", (e) => {
      e.preventDefault()
      container.classList.remove("dragover")
      this.handleFileUpload(field.id, e.dataTransfer.files)
    })

    fileInput.addEventListener("change", (e) => {
      this.handleFileUpload(field.id, e.target.files)
    })

    return container
  }

  handleFieldChange(fieldId, value) {
    this.formData[fieldId] = value

    // Clear error
    this.clearFieldError(fieldId)

    // Update character count
    const field = this.currentService.formTemplate.fields.find((f) => f.id === fieldId)
    if (field?.maxLength) {
      const countElement = document.getElementById(`${fieldId}-count`)
      if (countElement) {
        countElement.textContent = `${value.length}/${field.maxLength} characters`
      }
    }
  }

  handleFileUpload(fieldId, files) {
    const fileArray = Array.from(files)
    this.formData[fieldId] = fileArray

    // Update file list display
    this.updateFileList(fieldId, fileArray)
    this.clearFieldError(fieldId)
  }

  updateFileList(fieldId, files) {
    const listContainer = document.getElementById(`${fieldId}-list`)
    listContainer.innerHTML = ""

    files.forEach((file, index) => {
      const fileItem = document.createElement("div")
      fileItem.className = "file-item"
      fileItem.innerHTML = `
                <div class="file-info">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">(${this.formatFileSize(file.size)})</span>
                </div>
                <button type="button" class="file-remove" onclick="formManager.removeFile('${fieldId}', ${index})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `
      listContainer.appendChild(fileItem)
    })
  }

  removeFile(fieldId, index) {
    const files = this.formData[fieldId] || []
    files.splice(index, 1)
    this.formData[fieldId] = files
    this.updateFileList(fieldId, files)
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  validateForm() {
    this.errors = {}

    this.currentService.formTemplate.fields.forEach((field) => {
      const value = this.formData[field.id]

      if (field.required && (!value || (Array.isArray(value) && value.length === 0) || value === "")) {
        this.errors[field.id] = `${field.label} is required`
      }

      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          this.errors[field.id] = "Please enter a valid email address"
        }
      }

      if (field.maxLength && value && value.length > field.maxLength) {
        this.errors[field.id] = `${field.label} must be ${field.maxLength} characters or less`
      }
    })

    // Display errors
    Object.entries(this.errors).forEach(([fieldId, error]) => {
      this.showFieldError(fieldId, error)
    })

    return Object.keys(this.errors).length === 0
  }

  showFieldError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`)
    const inputElement = document.getElementById(fieldId)

    if (errorElement) {
      errorElement.textContent = message
      errorElement.style.display = "block"
    }

    if (inputElement) {
      inputElement.classList.add("error")
    }
  }

  clearFieldError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`)
    const inputElement = document.getElementById(fieldId)

    if (errorElement) {
      errorElement.style.display = "none"
    }

    if (inputElement) {
      inputElement.classList.remove("error")
    }
  }

  showStep(step) {
    document.querySelectorAll(".form-step").forEach((el) => el.classList.remove("active"))
    document.getElementById(`${step}Step`).classList.add("active")
    this.currentStep = step
  }

  renderReview() {
    const container = document.getElementById("reviewContent")
    container.innerHTML = ""

    // Service Information
    const serviceSection = document.createElement("div")
    serviceSection.className = "review-section"
    serviceSection.innerHTML = `
            <h3 class="review-section-title">Service Information</h3>
            <div class="review-field">
                <span class="review-label">Service:</span>
                <span class="review-value">${this.currentService.name}</span>
            </div>
            <div class="review-field">
                <span class="review-label">Department:</span>
                <span class="review-value">${this.currentService.department}</span>
            </div>
            <div class="review-field">
                <span class="review-label">Estimated Time:</span>
                <span class="review-value">${this.currentService.estimatedTime}</span>
            </div>
        `
    container.appendChild(serviceSection)

    // Form Data
    const formSection = document.createElement("div")
    formSection.className = "review-section"
    formSection.innerHTML = `<h3 class="review-section-title">Request Details</h3>`

    this.currentService.formTemplate.fields.forEach((field) => {
      const value = this.formData[field.id]
      let displayValue = ""

      if (field.type === "file") {
        if (value && value.length > 0) {
          displayValue = value.map((file) => file.name).join(", ")
        } else {
          displayValue = "No files uploaded"
        }
      } else {
        displayValue = value || "Not provided"
      }

      const fieldDiv = document.createElement("div")
      fieldDiv.className = "review-field"
      fieldDiv.innerHTML = `
                <span class="review-label">${field.label}:</span>
                <span class="review-value ${!value ? "empty" : ""}">${displayValue}</span>
            `
      formSection.appendChild(fieldDiv)
    })

    container.appendChild(formSection)
  }

  async submitRequest() {
    if (this.isSubmitting) return

    this.isSubmitting = true
    const submitBtn = document.getElementById("submitBtn")
    const submitText = document.getElementById("submitText")
    const submitSpinner = document.getElementById("submitSpinner")

    submitBtn.disabled = true
    submitText.style.display = "none"
    submitSpinner.style.display = "inline-block"

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate ticket number
      const ticketNumber = `BSG-${Date.now().toString().slice(-6)}`

      // Show success message
      alert(
        `Request submitted successfully!\n\nTicket Number: ${ticketNumber}\n\nYou will receive an email confirmation shortly.`,
      )

      // Redirect to dashboard
      window.location.href = "dashboard.html"
    } catch (error) {
      alert("Error submitting request. Please try again.")
    } finally {
      this.isSubmitting = false
      submitBtn.disabled = false
      submitText.style.display = "inline"
      submitSpinner.style.display = "none"
    }
  }

  showError(message) {
    const container = document.querySelector(".container")
    container.innerHTML = `
            <div class="error" style="margin: 2rem 0;">
                <h2>Error</h2>
                <p>${message}</p>
                <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">Back to Service Catalog</a>
            </div>
        `
  }
}

// Global form manager instance
let formManager

// Global functions for button handlers
function continueToReview() {
  if (formManager.validateForm()) {
    formManager.renderReview()
    formManager.showStep("review")
  }
}

function backToForm() {
  formManager.showStep("form")
}

function submitRequest() {
  formManager.submitRequest()
}

function goBack() {
  window.history.back()
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  formManager = new FormManager()
})
