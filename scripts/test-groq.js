#!/usr/bin/env node

/**
 * Test script for Groq API
 * Run with: node scripts/test-groq.js
 */

require('dotenv').config({ path: '.env.local' });

async function testGroqAPI() {
  console.log('🧪 Testing Groq API...\n');

  // Check if API key exists
  if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY not found in environment variables');
    console.log('Make sure you have a .env.local file with your API key');
    process.exit(1);
  }

  console.log('✅ API key found');
  console.log(`🔑 Key starts with: ${process.env.GROQ_API_KEY.substring(0, 10)}...`);

  try {
    // Test the API directly
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: 'Hello! Just testing the API. Please respond with "API is working!"'
          }
        ],
        temperature: 0.7,
        max_tokens: 50
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API request failed (${response.status}):`, errorText);
      return;
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log('✅ API is working!');
      console.log('🤖 Response:', data.choices[0].message.content);
      console.log('📊 Usage:', data.usage);
    } else {
      console.error('❌ Unexpected response format:', data);
    }

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

// Test the Next.js API route if we're in a Next.js environment
async function testNextJSRoute() {
  console.log('\n🌐 Testing Next.js API route...');
  
  try {
    const response = await fetch('http://localhost:3000/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: 'Hello! Test message for the API route.'
          }
        ]
      }),
    });

    if (!response.ok) {
      console.log('⚠️  Next.js server not running or API route not accessible');
      console.log('   Start your dev server with: npm run dev');
      return;
    }

    const data = await response.json();
    
    if (data.result) {
      console.log('✅ Next.js API route is working!');
      console.log('🤖 Response:', data.result);
    } else {
      console.error('❌ API route error:', data.error);
    }

  } catch (error) {
    console.log('⚠️  Could not test Next.js route (server not running)');
    console.log('   Start your dev server with: npm run dev');
  }
}

// Run tests
testGroqAPI().then(() => {
  testNextJSRoute();
});