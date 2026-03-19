Test Plan – Giphy React App 

1. Objective
To verify that the application correctly loads trending GIFs, allows users to search GIFs, and validates the feedback form, including proper UI behavior and API responses.
2. Scope
•	Trending GIFs (infinite scroll)
•	Search GIFs (search + infinite scroll)
•	Feedback form (validation + submission)
3. Test Approach
•	End-to-End testing using Cypress (TypeScript)
•	API interception to validate responses
•	UI validation (images, titles, counts)
•	Scroll behavior testing for infinite loading
4. Test Scenarios
4.1 Trending GIFs
•	Load 15 GIFs on page open
•	Each GIF shows image and title
•	Scroll loads more GIFs
•	New GIFs are appended (not replaced)
•	Stop loading when no more data
4.2 Search GIFs
•	User can search using input + Enter
•	Search API returns 15 GIFs
•	Results match search keyword
•	Scroll loads more search results
•	New results are appended
4.3 Feedback Form
•	Name, Email, Rating are required
•	Invalid inputs show error messages
•	Valid submission saves data to local storage
•	Success message is displayed
•	User is redirected after submission
5. Assumptions
•	Each API call returns 15 GIFs
•	Search is triggered by Enter key
•	App uses Giphy API endpoints for data
•	Feedback data is stored in local storage
