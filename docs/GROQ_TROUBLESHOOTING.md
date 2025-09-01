# Groq API Troubleshooting Guide

## ✅ Issue Fixed: Model Decommissioned

**Problem**: The model `llama3-8b-8192` was decommissioned by Groq.

**Solution**: Updated to use `llama-3.1-8b-instant` which is currently available.

## 🔧 Quick Diagnostics

### 1. Test Your API Key

```bash
npm run test-groq
```

This will test both the Groq API directly and your Next.js API route.

### 2. Check Environment Variables

Make sure your `.env.local` file contains:

```env
GROQ_API_KEY=your_actual_api_key_here
```

### 3. Verify API Key Format

- Should start with `gsk_`
- Should be about 56 characters long
- Get it from [Groq Console](https://console.groq.com)

## 🚨 Common Issues & Solutions

### Issue: "Model decommissioned" error

**Solution**: Update the model name in `lib/groq.ts` to a current model.

Current available models (as of Jan 2025):

- `llama-3.1-8b-instant` ✅ (currently used)
- `llama-3.3-70b-versatile`
- `gemma2-9b-it`

### Issue: "Invalid API key" (401 error)

**Solutions**:

1. Check your API key in `.env.local`
2. Regenerate key at [Groq Console](https://console.groq.com)
3. Make sure no extra spaces in the key

### Issue: "Rate limit exceeded" (429 error)

**Solutions**:

1. Wait a few minutes before trying again
2. Check your Groq usage limits
3. Consider upgrading your Groq plan

### Issue: API works in test but not in app

**Solutions**:

1. Restart your Next.js dev server: `npm run dev`
2. Clear browser cache
3. Check browser console for errors

## 📊 Current Configuration

- **Model**: `llama-3.1-8b-instant`
- **Temperature**: 0.7
- **Max Tokens**: 1000
- **API Endpoint**: `https://api.groq.com/openai/v1/chat/completions`

## 🔄 How to Update Model

If you need to change the model:

1. Check available models:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.groq.com/openai/v1/models
```

2. Update `lib/groq.ts`:

```typescript
model: "new-model-name";
```

3. Test the change:

```bash
npm run test-groq
```

## 📞 Getting Help

If issues persist:

1. Check [Groq Status Page](https://status.groq.com)
2. Review [Groq Documentation](https://console.groq.com/docs)
3. Check the browser console for detailed error messages
4. Run `npm run test-groq` for diagnostics
