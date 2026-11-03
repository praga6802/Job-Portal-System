# Job Portal System

A full-stack **Job Portal System** developed using Java, Spring Boot, React, and MySQL that connects candidates with companies and provides administrative management capabilities. The application enables candidates to search and apply for jobs, companies to manage job postings and applications, and administrators to oversee system operations.

The project implements secure authentication, role-based authorization, OTP-based email verification, resume management, and RESTful API integration.

## 🚀 Features

### 🔐 Authentication & Authorization
- User Registration and Login
- JWT-Based Authentication
- Role-Based Access Control (RBAC)
- Secure Password Hashing using BCrypt
- OTP-Based Email Verification
- OTP Expiration and Verification Handling
- Protected Routes based on User Roles

### 👨‍💻 Candidate Management
- Candidate Registration and Login
- Candidate Profile Management
- Job Search and Job Details
- Apply for Available Jobs
- View Applied Jobs
- Resume Upload and Management
- Resume Validation, Viewing, Downloading, and Deletion

### 🏢 Company Management
- Company Registration and Login
- Company Profile Management
- Create and Manage Job Postings
- Activate and Deactivate Job Listings
- View Job Applications
- Manage Applicant Status
- Shortlist, Select, and Reject Applicants

### 🛡️ Admin Management
- Administrative Dashboard
- Manage Candidate and Company Accounts
- Monitor Job Postings
- Manage System-Level Operations

### ⚙️ Backend Features
- RESTful API Architecture
- Global Exception Handling
- Standardized API Response Structure using DTOs
- Database Integration using Spring Data JPA
- Entity Relationships using Hibernate
- JWT Authentication Filter
- API Testing using Postman

### 🎨 Frontend Features
- Responsive User Interface
- React-Based Component Architecture
- React Router for Navigation
- Axios for REST API Integration
- Role-Based Navigation
- Responsive Layout using HTML and CSS

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Programming Language | Java, JavaScript |
| Frontend | React.js, HTML5, CSS3 |
| Backend | Spring Boot, Spring MVC |
| Security | Spring Security, JWT, BCrypt |
| Database | MySQL |
| ORM | Spring Data JPA, Hibernate |
| API Communication | REST APIs, Axios |
| Build Tool | Maven |
| API Testing | Postman |
| Version Control | Git, GitHub |
| IDE | IntelliJ IDEA, VS Code |

## 🔐 Authentication & Authorization

The application uses Spring Security and JWT to authenticate users and protect REST APIs.

### Authentication Flow

1. Users register with their required details.
2. An OTP is generated and sent to the registered email address.
3. Users verify their email using the OTP within the validity period.
4. Users log in using their email and password.
5. Spring Security authenticates the user credentials.
6. A JWT token is generated after successful authentication.
7. The token is used to access protected APIs.

### Role-Based Access Control

The application supports three user roles:

| Role | Access |
|---|---|
| Candidate | Search jobs, apply for jobs, manage profile and resume |
| Company | Create job postings, manage jobs, view and manage applicants |
| Admin | Manage and monitor system operations |

Protected API requests are authenticated using JWT.

```http
Authorization: Bearer <JWT_TOKEN>
```

## 📧 OTP-Based Email Verification

The application implements OTP-based email verification for secure user registration.

- Generates a unique OTP for email verification.
- Sends the OTP to the user's email address.
- Maintains OTP expiration with a 10-minute validity period.
- Rejects invalid and expired OTPs.
- Tracks verification status to prevent OTP reuse.

## 💼 Job Posting Management

Companies can manage job postings through secured REST APIs.

Functionalities include:

- Create job postings
- Update job details
- Manage job status
- Activate and deactivate jobs
- Retrieve active job listings
- View job details
- Manage company-specific job postings

## 📝 Job Application Management

Candidates can apply for available jobs, and companies can manage applications for their job postings.

Functionalities include:

- Apply for jobs
- Retrieve candidate applications
- View applications associated with company job postings
- Track application status
- Shortlist applicants
- Select or reject applicants

## 📄 Resume Management

Candidates can upload and manage their resumes.

- Resume Upload
- Resume Storage
- Resume File Validation
- Resume Viewing
- Resume Download
- Resume Deletion

## 🗄️ Database Design

The application uses MySQL as its relational database, with Spring Data JPA and Hibernate for persistence and entity relationship management.

### Major Entities

- Users
- Candidate
- Company
- Job
- Job Application
- OTP Verification
- Resume

## 🏗️ Project Architecture

The backend follows a layered architecture to maintain separation of concerns and improve maintainability.

### Backend Package Structure

```text
src/main/java
└── com.example.smartjobportalsystem
    ├── controller
    ├── service
    ├── repository
    ├── entity
    ├── dto
    ├── enums
    ├── exception
    ├── configuration
    ├── filter
    └── pojo
```

### Architecture Flow

```text
                  React Frontend
                       |
                 Axios REST API
                       |
                Spring Security
                  JWT Filter
                       |
                   Controller
                       |
                    Service
                       |
                  Repository
                       |
                  MySQL Database
```

The frontend communicates with the backend through REST APIs. Spring Security and JWT filters authenticate incoming requests before protected controller operations are executed.

## 🧪 API Testing

The REST APIs are tested using Postman to validate functionality, authentication, authorization, and request-response handling.

API modules include:

- Authentication and Authorization
- Candidate Management
- Company Management
- Job Management
- Job Application Management
- Resume Management
- OTP Email Verification
- Admin Management

## ⚙️ Installation & Setup

### Prerequisites

- Java JDK
- Maven
- Node.js and npm
- MySQL
- Git

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd <BACKEND_DIRECTORY>
```

Configure the MySQL database and required application properties in `application.properties`.

Configure the following environment-specific values:

- Database URL
- Database Username
- Database Password
- JWT Secret Key
- Email SMTP Configuration

Build the backend:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd <FRONTEND_DIRECTORY>
```

Install dependencies:

```bash
npm install
```

Configure the backend API base URL in the frontend API configuration.

Start the React application:

```bash
npm run dev
```

The frontend and backend can now be accessed through their respective local development URLs.

## 🔮 Future Improvements

- Refresh Token Implementation
- Real-Time Notifications
- Cloud Deployment
- Enhanced Job Search and Filtering
- Improved Dashboard Analytics

## 👨‍💻 Author

**Pragadeeswaran Sekar**

Aspiring Java Full Stack Developer

- **GitHub:** [praga6802](https://github.com/praga6802)
- **Portfolio:** [Pragadeeswaran Sekar](https://portfolio-pragadeeswaran.vercel.app/)

