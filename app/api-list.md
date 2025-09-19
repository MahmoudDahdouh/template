# API Routes List

## ⚠️ CRITICAL: MANDATORY CONFIG AND AUTHENTICATION

**ALL API CALLS MUST USE CONFIG.API.BASEURL AND AUTH_TOKEN COOKIE - NO EXCEPTIONS**

\`\`\`typescript
// REQUIRED for every API call
import { config } from '@/config';

const url = `${config.api.baseUrl}/companies/{companyId}/employees`;
const response = await fetch(url, {
  method: 'GET',
  credentials: 'include', // MANDATORY: Include cookies for auth_token
  headers: {
    'Content-Type': 'application/json',
  },
});
\`\`\`

## MANDATORY USAGE

**IMPORTANT**: This file contains the ONLY approved API endpoints for this project. These APIs must be used exclusively when generating components that require data.

## Purpose

This file contains available API endpoints for generating components or designs that require data fetching.

## STRICT USAGE REQUIREMENTS

- **MANDATORY**: ALWAYS check this file first before suggesting any API integration
- **FORBIDDEN**: Do NOT use any APIs not listed in this file
- **REQUIRED**: When data-driven components are requested, ONLY use endpoints from this list
- **ENFORCEMENT**: If components need data not available here, the required API must be added to this file first
- **NO EXCEPTIONS**: Never suggest external APIs, mock APIs, or placeholder services outside this list

## Implementation Requirements

- **MANDATORY BASE URL**: MUST import and use ONLY the base URL from `src/config.ts` (config.api.baseUrl)
- **MANDATORY AUTHENTICATION**: MUST include `credentials: 'include'` in ALL fetch requests to send auth_token cookie
- **FORBIDDEN**: NEVER hardcode URLs or make requests without authentication
- **REQUIRED PATTERN**: Every API call MUST follow this pattern:
  \`\`\`typescript
  import { config } from '@/config';
  
  const url = `${config.api.baseUrl}/companies/{companyId}/employees`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include', // MANDATORY for auth_token cookie
    headers: {
      'Content-Type': 'application/json',
    },
  });
  \`\`\`
- **ENFORCEMENT**: All API requests will be validated to ensure they use config.api.baseUrl
- ALWAYS use the exact endpoints listed below with the configured base URL
- MUST implement error handling and loading states
- MUST use modern fetch() API
- MUST follow the response structure descriptions provided
- MUST implement pagination according to the Bayzat pagination standards below

## Authentication Requirements

**CRITICAL**: ALL API endpoints are protected and require authentication via the 'auth_token' cookie.

### Required Authentication Setup:
- **MANDATORY**: Include `credentials: 'include'` in ALL fetch requests
- **COOKIE NAME**: The authentication token is stored in a cookie named 'auth_token'
- **AUTOMATIC**: When `credentials: 'include'` is used, the browser automatically sends the auth_token cookie
- **ENFORCEMENT**: API requests without proper authentication will return 401 Unauthorized

### Example with Authentication:
\`\`\`typescript
// CORRECT - Includes authentication
const response = await fetch(`${config.api.baseUrl}/companies/{companyId}/employees`, {
  credentials: 'include', // Sends auth_token cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

// INCORRECT - Missing authentication (will fail with 401)
const response = await fetch(`${config.api.baseUrl}/companies/{companyId}/employees`);
\`\`\`

## Pagination Rules (Bayzat Standards)

### Request Parameters Format

All paginated endpoints use form-encoded parameters with array notation:

**Pagination Parameters:**

\`\`\`
pagination[offset]=0
pagination[limit]=24
\`\`\`

**Sorting Parameters:**

\`\`\`
sort[0][dir]=desc
sort[0][name]=avatar-uploaded-at
sort[1][dir]=asc
sort[1][name]=created-at
\`\`\`

**Filter Parameters:**

\`\`\`
filters[status][]=active
filters[department][]=hr
filters[department][]=finance
\`\`\`

### Standard Response Format

All paginated responses return data with pagination metadata:

\`\`\`json
{
  "data": [...],
  "pagination": {
    "limit": 24,
    "offset": 0,
    "total": 315
  }
}
\`\`\`

### Implementation Guidelines

- **Default Pagination**: `pagination[offset]=0&pagination[limit]=20`
- **Page Calculation**: `currentPage = Math.floor(offset / limit) + 1`
- **Next Page**: `pagination[offset]=${currentOffset + limit}`
- **Previous Page**: `pagination[offset]=${Math.max(0, currentOffset - limit)}`
- **Sort Direction**: Use `asc` or `desc` for `sort[index][dir]`
- **Multi-Sort**: Support multiple sort criteria with incremental indices
- **Array Filters**: Use `filters[field][]` notation for multiple values

### Required Implementation

When implementing paginated endpoints:

- Use Bayzat's `ClientSidePagination` type: `{ offset: number, limit: number }`
- Handle `PaginationDetail` responses: `{ limit, offset, total }`
- Implement proper form encoding for request parameters
- Support multiple sort fields and filter arrays
- Show loading states during pagination changes
- Reset to offset 0 when filters change

## Request Format Standards

### Path Parameters

All Bayzat API endpoints use the following path parameter format:

- `{companyId}`: Company identifier (UUID format)
- `{employeeId}`: Employee identifier (UUID format)
- `{documentId}`: Document identifier (UUID format)
- All other IDs follow similar UUID format

### Request Body Format

**POST/PUT requests** should send JSON body with proper Content-Type header:

\`\`\`json
Content-Type: application/json

{
  "field1": "value1",
  "field2": "value2",
  "nestedObject": {
    "subField": "value"
  }
}
\`\`\`

**GET requests with filters/pagination** use form-encoded query parameters:

\`\`\`
Content-Type: application/x-www-form-urlencoded

pagination[offset]=0&pagination[limit]=24&filters[status][]=active&sort[0][dir]=desc&sort[0][name]=created-at
\`\`\`

## API Endpoints

### Employee Management APIs

- Get Employees List: GET /companies/{companyId}/widgets/employee-summaries
  - Retrieves list of employees with summary information for the company
  - Use this to fetch all employees data for company employee listings, directories, or dashboard widgets
  - Returns array of employee summary objects with basic profile information
- Get Employee Details: GET /companies/{companyId}/employees/{employeeId}
  - Retrieves comprehensive employee profile information including personal, work, and contact details
  - Use this when displaying employee profiles, editing employee information, or loading employee dashboard data
  - Returns complete employee object with all profile sections
- Get Employee Summary: GET /companies/{companyId}/employees/{employeeId}/widgets/employee-summaries
  - Retrieves key employee metrics and summary information for widgets and dashboards
  - Use this for employee dashboard widgets, quick overview cards, or summary displays
  - Returns condensed employee data optimized for dashboard display
- Update Employee Profile: PUT /companies/{companyId}/employees/{employeeId}
  - Updates employee profile information
  - Use this when employees or HR admins need to modify profile details
  - **Request Body:**
    \`\`\`json
    {
      "personalInfo": {
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string"
      },
      "workInfo": {
        "jobTitle": "string",
        "department": "string",
        "startDate": "YYYY-MM-DD"
      }
    }
    \`\`\`
  - Returns updated employee object
- Get Employee Documents: GET /companies/{companyId}/employees/{employeeId}/documents/{documentId}
  - Retrieves specific employee documents (contracts, IDs, certificates)
  - Use this to view or download employee uploaded documents
  - Returns document metadata and download URL
- Upload Employee Document: POST /companies/{companyId}/employees/{employeeId}/documents
  - Uploads new documents for an employee
  - Use this during onboarding or when employees need to submit new documents
  - Returns created document record

### Time-Off Management APIs

- Get Time-Off Requests: GET /companies/{companyId}employees/{employeeId}/time-off/leave-requests
  - Retrieves employee's leave requests with status and details
  - Use this to display employee leave history, pending requests, or for approval workflows
  - Returns array of leave request objects with dates, types, and approval status
- Create Leave Request: POST /companies/{companyId}/employees/{employeeId}/time-off/leave-requests
  - Submits new time-off request for approval
  - Use this when employees want to request vacation, sick leave, or other time off
  - **Request Body:**
    \`\`\`json
    {
      "leaveTypeId": "uuid",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD",
      "reason": "string",
      "isHalfDay": false,
      "halfDayPeriod": "morning|afternoon"
    }
    \`\`\`
  - Returns created leave request with pending status
- Approve Leave Request: POST /companies/{companyId}/employees/{employeeId}/time-off/leave-requests/{leaveRequestId}/approve
  - Approves a pending leave request
  - Use this in manager approval workflows or HR admin interfaces
  - Returns approval confirmation and updated request status
- Get Leave Types: GET /companies/{companyId}/time-off/leave-types
  - Retrieves available leave types for the company
  - Use this to populate leave type dropdowns in request forms
  - Returns array of leave type objects with allowances and rules

### Payroll APIs

- Get Salary Configuration: GET /companies/{companyId}/employees/{employeeId}/payroll/salary-configurations/{salaryConfigId}
  - Retrieves employee's current salary and compensation details
  - Use this for payroll processing, salary reviews, or employee pay statements
  - Returns detailed salary breakdown including base, allowances, and deductions
- Update Salary Configuration: PUT /companies/{companyId}/employees/{employeeId}/payroll/salary-configurations/{salaryConfigId}
  - Updates employee salary configuration
  - Use this for salary adjustments, promotions, or compensation changes
  - **Request Body:**
    \`\`\`json
    {
      "baseSalary": 50000,
      "currency": "AED",
      "payFrequency": "monthly",
      "allowances": [
        {
          "type": "housing",
          "amount": 10000
        }
      ],
      "effectiveDate": "YYYY-MM-DD"
    }
    \`\`\`
  - Returns updated salary configuration
- Get Pay History: GET /companies/{companyId}/employees/{employeeId}/payroll/pay-history
  - Retrieves employee's historical pay records and payslips
  - Use this for employee self-service pay history or generating pay statements
  - Returns array of pay period records with amounts and deductions

### Performance Management APIs

- Get Performance Evaluations: GET /companies/{companyId}/performance/evaluations
  - Retrieves performance review cycles and evaluation data
  - Use this for performance review dashboards and employee evaluation tracking
  - Returns array of evaluation cycles with participants and status
- Get Employee Goals: GET /companies/{companyId}/employees/{employeeId}/performance/goals
  - Retrieves employee's performance goals and objectives
  - Use this for goal tracking interfaces and performance review preparation
  - Returns array of goals with progress and completion status
- Create Performance Goal: POST /companies/{companyId}/employees/{employeeId}/performance/goals
  - Creates new performance goal for employee
  - Use this during goal-setting sessions or performance review cycles
  - **Request Body:**
    \`\`\`json
    {
      "title": "string",
      "description": "string",
      "targetDate": "YYYY-MM-DD",
      "priority": "high|medium|low",
      "measurementCriteria": "string",
      "category": "skill|performance|behavior"
    }
    \`\`\`
  - Returns created goal object with tracking information

### Survey Management APIs

- Get Company Surveys: GET /companies/{companyId}/surveys
  - Retrieves all company surveys and engagement polls
  - Use this for HR survey management dashboards and survey administration
  - Returns array of survey objects with response statistics
- Get Employee Surveys: GET /companies/{companyId}/employees/{employeeId}/surveys
  - Retrieves surveys assigned to specific employee
  - Use this for employee survey participation interfaces
  - Returns array of available and completed surveys for the employee
- Submit Survey Response: PUT /companies/{companyId}/employees/{employeeId}/surveys/{surveyId}/answers/submit
  - Submits completed survey responses
  - Use this when employees complete engagement surveys or feedback forms
  - Returns submission confirmation and completion status

### Employee Ticket/Request APIs

- Get Employee Tickets: GET /companies/{companyId}/tickets/self
  - Retrieves employee's own service requests and tickets
  - Use this for employee self-service portals to track request status
  - Returns array of ticket objects with status and resolution details
- Create Employee Ticket: POST /companies/{companyId}/tickets/self
  - Creates new service request or support ticket
  - Use this when employees need IT support, HR assistance, or other services
  - **Request Body:**
    \`\`\`json
    {
      "ticketTypeId": "uuid",
      "subject": "string",
      "description": "string",
      "priority": "low|medium|high|urgent",
      "attachments": ["file1.pdf", "file2.jpg"]
    }
    \`\`\`
  - Returns created ticket with tracking number and initial status
- Accept/Approve Ticket: POST /companies/{companyId}/tickets/{ticketId}/accept
  - Accepts or approves employee service request
  - Use this in admin workflows for processing employee requests
  - Returns approval confirmation and updated ticket status

### Authentication APIs

- User Login: POST /login
  - Authenticates user with credentials and returns access tokens
  - Use this for primary user authentication flow
  - Returns JWT access token and refresh token
- Multi-Factor Authentication: POST /users/{userId}/mfa/verifications
  - Handles MFA verification during login process
  - Use this when MFA is required for enhanced security
  - Returns verification status and authentication tokens
- Refresh Token: POST /{userId}/access_token
  - Refreshes expired access tokens using refresh token
  - Use this for maintaining user sessions without re-authentication
  - Returns new access token for continued API access
