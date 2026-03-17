const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const questions = [
    // CATEGORY: DSA 
    // 1. Arrays
    { category: "DSA", subtopic: "Arrays", questionText: "What is the time complexity to insert an element at the end of a dynamic array (Amortized)?", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], correctOption: 1 },
    { category: "DSA", subtopic: "Arrays", questionText: "Which of these is a disadvantage of arrays?", options: ["Fast data access", "Fixed size (in static arrays)", "Memory efficiency", "Ease of iteration"], correctOption: 1 },
    { category: "DSA", subtopic: "Arrays", questionText: "In a 2D array A[m][n], what is the index of A[i][j] in row-major order?", options: ["i + j", "i*n + j", "j*m + i", "i*m + j"], correctOption: 1 },
    { category: "DSA", subtopic: "Arrays", questionText: "Which algorithm is used to find the largest sum contiguous subarray?", options: ["Binary Search", "Kadane’s Algorithm", "Dijkstra’s", "Floyd-Warshall"], correctOption: 1 },
    { category: "DSA", subtopic: "Arrays", questionText: "Arrays are best suited for which of the following?", options: ["Constant deletions", "Frequent resizing", "Random access of elements", "Non-linear data"], correctOption: 2 },

    // 2. Linked Lists
    { category: "DSA", subtopic: "Linked Lists", questionText: "What is the time complexity to search an element in a sorted Singly Linked List?", options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"], correctOption: 1 },
    { category: "DSA", subtopic: "Linked Lists", questionText: "Which Linked List doesn't have a NULL pointer at the end?", options: ["Singly", "Doubly", "Circular", "Linear"], correctOption: 2 },
    { category: "DSA", subtopic: "Linked Lists", questionText: "To delete a node in a Singly Linked List, which info is required?", options: ["The node itself", "The next node", "The previous node", "The tail node"], correctOption: 2 },
    { category: "DSA", subtopic: "Linked Lists", questionText: "What is the space complexity of a Doubly Linked List compared to Singly?", options: ["Same", "Less", "More (due to extra pointer)", "Double"], correctOption: 2 },
    { category: "DSA", subtopic: "Linked Lists", questionText: "Which data structure is used to implement a Linked List internally?", options: ["Array", "Hash Table", "Pointers/References", "Stack"], correctOption: 2 },

    // 3. Stack
    { category: "DSA", subtopic: "Stack", questionText: "Which principle does the Stack follow?", options: ["FIFO", "LIFO", "LILO", "Priority"], correctOption: 1 },
    { category: "DSA", subtopic: "Stack", questionText: "In a stack, 'Push' and 'Pop' happen at which end?", options: ["Front", "Rear", "Top", "Bottom"], correctOption: 2 },
    { category: "DSA", subtopic: "Stack", questionText: "Which of these is a valid application of a Stack?", options: ["Process Scheduling", "Function Call Management", "Buffer for Printer", "Shortest path"], correctOption: 1 },
    { category: "DSA", subtopic: "Stack", questionText: "What is 'Stack Overflow'?", options: ["Deleting from empty stack", "Adding to a full stack", "Stack size is 0", "Data corruption"], correctOption: 1 },
    { category: "DSA", subtopic: "Stack", questionText: "How many stacks are needed to implement a Queue?", options: ["1", "2", "3", "4"], correctOption: 1 },

    // 4. BST (Binary Search Tree)
    { category: "DSA", subtopic: "BST", questionText: "In a BST, what is the property of the left child?", options: ["Greater than parent", "Less than parent", "Equal to parent", "No relation"], correctOption: 1 },
    { category: "DSA", subtopic: "BST", questionText: "What is the height of a balanced BST with n nodes?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correctOption: 1 },
    { category: "DSA", subtopic: "BST", questionText: "Which traversal of a BST gives the elements in sorted order?", options: ["Pre-order", "Post-order", "In-order", "Level-order"], correctOption: 2 },
    { category: "DSA", subtopic: "BST", questionText: "Worst case time complexity of searching in a skewed BST?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctOption: 2 },
    { category: "DSA", subtopic: "BST", questionText: "Maximum number of nodes at level L of a binary tree?", options: ["2L", "L^2", "2^L", "2^{L-1}"], correctOption: 3 },

    // 5. Dynamic Programming
    { category: "DSA", subtopic: "Dynamic Programming", questionText: "What is the 'Top-Down' approach in DP called?", options: ["Tabulation", "Memoization", "Recursion", "Greedy"], correctOption: 1 },
    { category: "DSA", subtopic: "Dynamic Programming", questionText: "What is the 'Bottom-Up' approach in DP called?", options: ["Tabulation", "Memoization", "Backtracking", "Brute Force"], correctOption: 0 },
    { category: "DSA", subtopic: "Dynamic Programming", questionText: "Which of these problems is solved using DP?", options: ["Binary Search", "0/1 Knapsack", "Merge Sort", "Quick Sort"], correctOption: 1 },
    { category: "DSA", subtopic: "Dynamic Programming", questionText: "DP is used when a problem has Overlapping Subproblems and...?", options: ["No solution", "Greedy property", "Optimal Substructure", "Circular dependency"], correctOption: 2 },
    { category: "DSA", subtopic: "Dynamic Programming", questionText: "Fibonacci sequence calculation without DP has what time complexity?", options: ["O(n)", "O(n^2)", "O(2^n)", "O(log n)"], correctOption: 2 },

    // CATEGORY: DEVELOPMENT
    // 6. Fullstack Web Dev
    { category: "Development", subtopic: "Fullstack", questionText: "What does the 'S' in HTTPS stand for?", options: ["Simple", "Secure", "Socket", "Standard"], correctOption: 1 },
    { category: "Development", subtopic: "Fullstack", questionText: "Which HTTP status code means 'Not Found'?", options: ["200", "404", "500", "403"], correctOption: 1 },
    { category: "Development", subtopic: "Fullstack", questionText: "What is the purpose of the useEffect hook in React?", options: ["Handle styling", "Manage side effects", "Define routes", "Update global state"], correctOption: 1 },
    { category: "Development", subtopic: "Fullstack", questionText: "What is 'Middle-ware' in Express.js?", options: ["Front-end library", "DB schema", "Function between Request and Response", "CSS Framework"], correctOption: 2 },
    { category: "Development", subtopic: "Fullstack", questionText: "Which of these is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], correctOption: 2 },

    // 7. Machine Learning
    { category: "Development", subtopic: "Machine Learning", questionText: "What is 'Supervised Learning'?", options: ["Learning without labels", "Learning with labeled data", "Learning by reward", "No data needed"], correctOption: 1 },
    { category: "Development", subtopic: "Machine Learning", questionText: "In Linear Regression, what are we trying to minimize?", options: ["Accuracy", "Cost Function (Error)", "Number of features", "Data size"], correctOption: 1 },
    { category: "Development", subtopic: "Machine Learning", questionText: "What is 'Overfitting'?", options: ["Model is too simple", "Model performs too well on training but poorly on test data", "Data is too large", "High bias"], correctOption: 1 },
    { category: "Development", subtopic: "Machine Learning", questionText: "Which algorithm is used for Classification?", options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"], correctOption: 2 },
    { category: "Development", subtopic: "Machine Learning", questionText: "What is a 'Neural Network' inspired by?", options: ["Computer architecture", "Human brain", "Social networks", "Physics"], correctOption: 1 },

    // 8. Artificial Intelligence
    { category: "Development", subtopic: "AI", questionText: "What is the 'Turing Test' designed to measure?", options: ["Computer speed", "Machine intelligence", "Memory size", "Network stability"], correctOption: 1 },
    { category: "Development", subtopic: "AI", questionText: "Which search algorithm is commonly used in AI for games like Chess?", options: ["Minimax", "Binary Search", "Linear Search", "BFS"], correctOption: 0 },
    { category: "Development", subtopic: "AI", questionText: "What is 'Natural Language Processing' (NLP)?", options: ["Writing fast code", "Machine understanding human speech/text", "Graphics design", "DB management"], correctOption: 1 },
    { category: "Development", subtopic: "AI", questionText: "In AI, what is an 'Agent'?", options: ["The database", "The entity that perceives and acts", "The user", "The hardware"], correctOption: 1 },
    { category: "Development", subtopic: "AI", questionText: "What is 'Computer Vision'?", options: ["Improving monitor resolution", "Machines interpreting visual data", "Virtual reality", "Eye tracking"], correctOption: 1 },

    // 9. Cloud Computing
    { category: "Development", subtopic: "Cloud Computing", questionText: "What does SaaS stand for?", options: ["Software as a Service", "System as a Service", "Storage as a Service", "Security as a Service"], correctOption: 0 },
    { category: "Development", subtopic: "Cloud Computing", questionText: "Which is an example of an IaaS (Infrastructure as a Service)?", options: ["Gmail", "AWS EC2", "Heroku", "Salesforce"], correctOption: 1 },
    { category: "Development", subtopic: "Cloud Computing", questionText: "What is 'Elasticity' in Cloud?", options: ["Fixed storage", "Ability to scale resources up and down", "Cheap pricing", "High security"], correctOption: 1 },
    { category: "Development", subtopic: "Cloud Computing", questionText: "What is a 'Public Cloud'?", options: ["Shared by multiple organizations", "Owned by one company", "Offline server", "Government only"], correctOption: 0 },
    { category: "Development", subtopic: "Cloud Computing", questionText: "What is 'Cloud Latency'?", options: ["Cost of cloud", "Time delay in data transfer", "Storage limit", "Power usage"], correctOption: 1 },

    // CATEGORY: INTERVIEW
    // 10. System Design & Core Subjects
    { category: "Interview", subtopic: "System Design", questionText: "What is a 'Load Balancer'?", options: ["Increases database size", "Distributes traffic across servers", "Styles the UI", "Compiles code"], correctOption: 1 },
    { category: "Interview", subtopic: "Core Subjects", questionText: "What does 'A' in ACID properties of a database stand for?", options: ["Accuracy", "Atomicity", "Availability", "Algorithm"], correctOption: 1 },
    { category: "Interview", subtopic: "Core Subjects", questionText: "What is a 'Deadlock' in OS?", options: ["System is off", "Processes waiting for each other forever", "Fast processing", "Error in code"], correctOption: 1 },
    { category: "Interview", subtopic: "Core Subjects", questionText: "What is 'Virtual Memory'?", options: ["Extra RAM", "Space on disk used as RAM", "Cloud storage", "GPU memory"], correctOption: 1 },
    { category: "Interview", subtopic: "Core Subjects", questionText: "In Networking, what is the role of a Router?", options: ["Connects monitor to CPU", "Forwards data packets between networks", "Stores passwords", "Displays HTML"], correctOption: 1 },

    // 11. HR Behavioural
    { category: "Interview", subtopic: "HR Behavioural", questionText: "How should you handle a question about your 'Greatest Weakness'?", options: ["Say you have none", "Share a real weakness and how you are improving it", "Make a joke", "Blame others"], correctOption: 1 },
    { category: "Interview", subtopic: "HR Behavioural", questionText: "What is the 'STAR' method in interviews?", options: ["Simple Tech And Research", "Situation, Task, Action, Result", "State, Time, Aim, Review", "None"], correctOption: 1 },
    { category: "Interview", subtopic: "HR Behavioural", questionText: "Why do interviewers ask 'Why should we hire you?'", options: ["To see if you are desperate", "To see how you fit the role's needs", "To save time", "To check your salary"], correctOption: 1 },
    { category: "Interview", subtopic: "HR Behavioural", questionText: "How do you answer 'Where do you see yourself in 5 years?'", options: ["'In your chair'", "'On vacation'", "'Growing into a senior/specialist role'", "'In a different company'"], correctOption: 2 },
    { category: "Interview", subtopic: "HR Behavioural", questionText: "What is 'Conflict Resolution' in a team?", options: ["Ignoring the issue", "Professional communication to reach a solution", "Quitting", "Complaining to HR"], correctOption: 1 }
];

mongoose.connect(process.env.MONGODB_URL)
    .then(async () => {
        console.log("Clearing old questions...");
        await Question.deleteMany();
        console.log("Inserting 55 new questions...");
        await Question.insertMany(questions);
        console.log("Database Seeded Successfully!");
        process.exit();
    })
    .catch(err => {
        console.error("Seeding failed:", err);
        process.exit(1);
    });