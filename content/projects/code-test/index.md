---
title: Code Rendering Test
description: Testing all code block rendering features
date: 2023-12-01
tags: [test, code, syntax-highlighting]
---

# Code Rendering Test

This project tests all the code block rendering features to ensure they work properly.

## JavaScript Example

Here's a JavaScript function with modern syntax:

\`\`\`javascript
// Modern JavaScript with async/await and destructuring
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const { data, error } = await response.json();
    
    if (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: new Date(data.created_at)
    };
  } catch (err) {
    console.error('Error fetching user data:', err);
    return null;
  }
}

// Usage with error handling
const user = await fetchUserData(123);
if (user) {
  console.log(`Welcome, ${user.name}!`);
}
\`\`\`

## TypeScript Example

TypeScript with interfaces and generics:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

class UserService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUser(id: number): Promise<User | null> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    const result: ApiResponse<User> = await response.json();
    
    return result.error ? null : result.data;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    const result: ApiResponse<User> = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }
    
    return result.data;
  }
}
\`\`\`

## Python Example

Python with type hints and async:

\`\`\`python
from typing import List, Optional, Dict, Any
import asyncio
import aiohttp
from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    id: int
    name: str
    email: str
    created_at: datetime

class UserRepository:
    def __init__(self, base_url: str):
        self.base_url = base_url
    
    async def fetch_user(self, user_id: int) -> Optional[User]:
        """Fetch a single user by ID."""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(f"{self.base_url}/users/{user_id}") as response:
                    if response.status == 200:
                        data = await response.json()
                        return User(
                            id=data['id'],
                            name=data['name'],
                            email=data['email'],
                            created_at=datetime.fromisoformat(data['created_at'])
                        )
                    return None
            except Exception as e:
                print(f"Error fetching user {user_id}: {e}")
                return None
    
    async def fetch_users(self, limit: int = 10) -> List[User]:
        """Fetch multiple users with pagination."""
        users = []
        tasks = [self.fetch_user(i) for i in range(1, limit + 1)]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        for result in results:
            if isinstance(result, User):
                users.append(result)
        
        return users

# Usage example
async def main():
    repo = UserRepository("https://api.example.com")
    users = await repo.fetch_users(5)
    
    for user in users:
        print(f"User: {user.name} ({user.email})")

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

## CSS Example

Modern CSS with custom properties and grid:

\`\`\`css
/* Modern CSS with custom properties and grid */
:root {
  --primary-color: hsl(220, 90%, 56%);
  --secondary-color: hsl(220, 10%, 40%);
  --background-color: hsl(220, 13%, 18%);
  --text-color: hsl(220, 14%, 96%);
  --border-radius: 0.5rem;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: var(--background-color);
  color: var(--text-color);
}

.card {
  background: linear-gradient(135deg, 
    var(--primary-color) 0%, 
    var(--secondary-color) 100%);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--primary-color), 
    transparent);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
\`\`\`

## Inline Code Test

Here's some `inline code` mixed with regular text. You can use `const variable = "value"` or `function()` inline.

## Mixed Content

This paragraph has **bold text**, *italic text*, `inline code`, and a [link](https://example.com).

- List item with `inline code`
- Another item with **bold** and *italic*
- Final item with a [link](https://example.com)

> This blockquote contains `inline code` and **bold text**.

The code blocks should now render with proper syntax highlighting, dark backgrounds, and good typography!
