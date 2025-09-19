# Project API Documentation

## MANDATORY: Use Only Approved API Endpoints

**IMPORTANT**: Always use the API routes listed in the file below. Do not use any other APIs outside of this list.

**[API Routes List](api-list.md)**

### Instructions:

- **MANDATORY BASE URL**: ALL API calls MUST import and use the base URL from `src/config.ts` (config.api.baseUrl)
- **MANDATORY AUTHENTICATION**: ALL API calls MUST include the 'auth_token' cookie for authentication
- **FORBIDDEN**: NEVER hardcode URLs or make unauthenticated API requests
- **REQUIRED IMPORT**: Every API request MUST include `import { config } from '@/config'`
- **ENFORCEMENT**: Any API call not using config values or missing auth token will be rejected
- **CONFIGURATION**: 
  - Base URL can be configured via NEXT_PUBLIC_API_BASE_URL environment variable
  - Company ID can be configured via NEXT_PUBLIC_COMPANY_ID environment variable
- **REQUIRED**: When fetching data, ONLY use the routes inside api-list.md with the configured base URL
- **FORBIDDEN**: Do not use any external APIs or services not listed in that file
- **ENFORCEMENT**: If you need data not available from the listed APIs, request to add the required endpoint to api-list.md first

This file contains all approved API endpoints that must be used exclusively for data fetching in components.

## Instructions

**CRITICAL REQUIREMENTS:**

1. **NO DEMO DATA**: Never display, generate, or use any placeholder, sample, or demo data in components or responses.

2. **NO SAMPLE DATA MESSAGES**: Never display messages indicating the use of sample data, such as:

   - "Note: Using sample data..."
   - "This is placeholder data..."
   - Any variation mentioning sample/demo/placeholder data

3. **NO FILE REFERENCES**: Never mention or reference the api-list.md file in user-facing content, error messages, or component text.

4. **DATA HANDLING**: If real data is not available from approved endpoints, show loading states or empty states instead of demo content.

5. **ALWAYS SHOW LOADING STATE**: Always implement and display loading states during data fetching operations.

6. **ALWAYS SHOW ERROR MESSAGE AND ERROR STATE**: Always implement proper error handling with visible error messages and error states for failed requests.
