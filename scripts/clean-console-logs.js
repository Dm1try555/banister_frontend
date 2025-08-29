// ============================================================================
// Script to remove console.log statements from production code
// ============================================================================

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Files to exclude from console.log removal
const EXCLUDE_FILES = [
  'node_modules',
  '.nuxt',
  '.output',
  'scripts',
  'public/firebase-messaging-sw.js' // Keep console.log in service worker for debugging
]

// Directories to process
const DIRECTORIES = [
  'pages',
  'components',
  'composables',
  'layouts',
  'utils',
  'middleware',
  'plugins'
]

function shouldExcludeFile(filePath) {
  return EXCLUDE_FILES.some(exclude => filePath.includes(exclude))
}

function removeConsoleLogs(content) {
  // Remove console.log statements but keep console.error, console.warn, console.info
  return content
    .replace(/^\s*console\.log\([^)]*\);\s*$/gm, '')
    .replace(/^\s*console\.log\([^)]*\)\s*$/gm, '')
    .replace(/\s*console\.log\([^)]*\);\s*/g, '')
    .replace(/\s*console\.log\([^)]*\)\s*/g, '')
    // Remove empty lines that might be left behind
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // Remove comments that reference console.log
    .replace(/\/\/.*console\.log.*$/gm, '')
}

function processFile(filePath) {
  if (shouldExcludeFile(filePath)) {
    return
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const originalContent = content
    
    // Only process if file contains console.log
    if (content.includes('console.log')) {
      const newContent = removeConsoleLogs(content)
      
      if (newContent !== originalContent) {
        fs.writeFileSync(filePath, newContent, 'utf8')
        console.log(`✅ Removed console.log from: ${filePath}`)
      }
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message)
  }
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return
  }

  const items = fs.readdirSync(dirPath)
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      if (!shouldExcludeFile(fullPath)) {
        processDirectory(fullPath)
      }
    } else if (stat.isFile() && (item.endsWith('.vue') || item.endsWith('.ts') || item.endsWith('.js'))) {
      processFile(fullPath)
    }
  }
}

function main() {
  console.log('🧹 Starting console.log removal...')
  
  for (const dir of DIRECTORIES) {
    if (fs.existsSync(dir)) {
      console.log(`📁 Processing directory: ${dir}`)
      processDirectory(dir)
    }
  }
  
  console.log('✨ Console.log removal completed!')
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { removeConsoleLogs, processFile, processDirectory }