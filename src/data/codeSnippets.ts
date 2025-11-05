// Code snippets for syntax highlighting preview
import type { SupportedLanguage } from '../types/scheme';

export const codeSnippets: Record<SupportedLanguage, string> = {
  cpp: `// C++ Example
#include <iostream>
#include <vector>
#include <string>

class DataProcessor {
private:
    std::vector<int> data;
    const int MAX_SIZE = 1000;

public:
    DataProcessor() : data() {}

    void process(const std::string& input) {
        // Process the input data
        for (char c : input) {
            if (c >= '0' && c <= '9') {
                data.push_back(c - '0');
            }
        }
    }

    int calculate() const {
        int sum = 0;
        for (int value : data) {
            sum += value * 2;
        }
        return sum;
    }
};

int main() {
    DataProcessor processor;
    processor.process("12345");
    std::cout << "Result: " << processor.calculate() << std::endl;
    return 0;
}`,

  html: `<!-- HTML/CSS Example -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Color Scheme Demo</title>
    <style>
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .card {
            background: #1a1b26;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome</h1>
        <div class="card">
            <p>This is a demo page.</p>
        </div>
    </div>
</body>
</html>`,

  javascript: `// JavaScript/TypeScript Example
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const API_URL = 'https://api.example.com';

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(\`\${API_URL}/users\`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,

  python: `# Python Example
from typing import List, Dict, Optional
import json
import asyncio

class DataAnalyzer:
    """Analyze data from various sources"""

    def __init__(self, data_source: str):
        self.data_source = data_source
        self.cache: Dict[str, any] = {}
        self.MAX_RETRIES = 3

    async def fetch_data(self) -> Optional[List[Dict]]:
        """Fetch data asynchronously"""
        try:
            # Simulate API call
            await asyncio.sleep(1)
            return [
                {"id": 1, "value": 100},
                {"id": 2, "value": 200},
            ]
        except Exception as e:
            print(f"Error fetching data: {e}")
            return None

    def analyze(self, data: List[Dict]) -> Dict[str, float]:
        """Analyze the data"""
        total = sum(item['value'] for item in data)
        average = total / len(data) if data else 0

        return {
            'total': total,
            'average': average,
            'count': len(data)
        }

# Main execution
if __name__ == "__main__":
    analyzer = DataAnalyzer("api.example.com")
    data = asyncio.run(analyzer.fetch_data())

    if data:
        results = analyzer.analyze(data)
        print(json.dumps(results, indent=2))`,

  rust: `// Rust Example
use std::collections::HashMap;
use std::fmt;

#[derive(Debug, Clone)]
struct User {
    id: u32,
    name: String,
    email: String,
}

impl fmt::Display for User {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} <{}>", self.name, self.email)
    }
}

struct UserManager {
    users: HashMap<u32, User>,
    next_id: u32,
}

impl UserManager {
    fn new() -> Self {
        UserManager {
            users: HashMap::new(),
            next_id: 1,
        }
    }

    fn add_user(&mut self, name: String, email: String) -> u32 {
        let id = self.next_id;
        self.next_id += 1;

        let user = User { id, name, email };
        self.users.insert(id, user);
        id
    }

    fn get_user(&self, id: u32) -> Option<&User> {
        self.users.get(&id)
    }
}

fn main() {
    let mut manager = UserManager::new();

    let id = manager.add_user(
        "Alice".to_string(),
        "alice@example.com".to_string()
    );

    if let Some(user) = manager.get_user(id) {
        println!("User: {}", user);
    }
}`,

  go: `// Go Example
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "time"
)

// User represents a user in the system
type User struct {
    ID        int       \`json:"id"\`
    Name      string    \`json:"name"\`
    Email     string    \`json:"email"\`
    CreatedAt time.Time \`json:"created_at"\`
}

// UserService handles user operations
type UserService struct {
    users map[int]*User
}

// NewUserService creates a new user service
func NewUserService() *UserService {
    return &UserService{
        users: make(map[int]*User),
    }
}

// CreateUser creates a new user
func (s *UserService) CreateUser(name, email string) *User {
    id := len(s.users) + 1
    user := &User{
        ID:        id,
        Name:      name,
        Email:     email,
        CreatedAt: time.Now(),
    }
    s.users[id] = user
    return user
}

// HandleUsers handles HTTP requests for users
func (s *UserService) HandleUsers(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        json.NewEncoder(w).Encode(s.users)
    case "POST":
        var user User
        if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        created := s.CreateUser(user.Name, user.Email)
        json.NewEncoder(w).Encode(created)
    }
}

func main() {
    service := NewUserService()
    http.HandleFunc("/users", service.HandleUsers)

    fmt.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}`,

  nix: `# Nix Example
{ pkgs ? import <nixpkgs> {} }:

let
  # Define custom package
  myPackage = pkgs.stdenv.mkDerivation {
    pname = "my-app";
    version = "1.0.0";

    src = pkgs.fetchFromGitHub {
      owner = "example";
      repo = "my-app";
      rev = "v1.0.0";
      sha256 = "0000000000000000000000000000000000000000000000000000";
    };

    buildInputs = with pkgs; [
      nodejs
      yarn
      python3
    ];

    buildPhase = ''
      yarn install
      yarn build
    '';

    installPhase = ''
      mkdir -p $out/bin
      cp -r dist/* $out/bin/
    '';

    meta = with pkgs.lib; {
      description = "My example application";
      homepage = "https://example.com";
      license = licenses.mit;
      platforms = platforms.all;
    };
  };

  # Development shell
  devShell = pkgs.mkShell {
    buildInputs = with pkgs; [
      nodejs
      yarn
      git
      (python3.withPackages (ps: with ps; [
        requests
        numpy
      ]))
    ];

    shellHook = ''
      echo "Welcome to the development environment!"
      export PATH=$PWD/node_modules/.bin:$PATH
    '';
  };

in {
  inherit myPackage devShell;
}`,
};

export const languageNames: Record<SupportedLanguage, string> = {
  cpp: 'C++',
  html: 'HTML/CSS',
  javascript: 'TypeScript',
  python: 'Python',
  rust: 'Rust',
  go: 'Go',
  nix: 'Nix',
};
