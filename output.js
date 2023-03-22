const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

// dotenv
require('dotenv').config();

const filePath = 'file-paths.txt';
const userQuestion = 'I have a JS script like a Facebook pixel that I want to run on my website. Where do I put it?';
const frameworks = ['laravel', 'react', 'node']

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// turn frameworks into "laravel, react, node"
const promptFormat = (files, question) => {
    return `You are a great ${frameworks.join(', ')} developer \n\n` + 
    
    "You are looking for RELEVANT_FILES that might answer your question. \n\n" +

    "You have a list of files that might be relevant. \n\n" +
    
    "You are given some examples of inputs (FILES) and the question (QUESTION). \n\n" +
    
    "Answer the RELEVANT_FILES section. \n\n" +
    
    "FILES: \n\n" +
    
    "```bash\n" +

    `
    - .
    - ./package.json
    - ./package-lock.json
    - ./README.md
    - ./src
    - ./src/index.js
    ` +
    
    "\n\n```\n\n" +
    
    "QUESTION: \n\n" +
    
    "What file contains the list of dependencies for the project? \n\n" +
    
    "RELEVANT_FILES: \n\n" +
    
    "```js\n" +
    
    "[package.json] \n\n" +
    
    "```\n\n" +
    
    "FILES: \n\n" +
    
    "```bash\n" +
    
    `${files.map(file => `- ${file}`).join('\n')}` + 
    
    "\n\n```\n\n" +
    
    "QUESTION: \n\n" +
        
    question + 
    
    "\n\n" +
    
    "RELEVANT_FILES: \n\n" +
    
    "```js\n"
}

fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) throw err;

  const filePaths = data.trim().split('\n');
  const maxFilesPerChunk = 200;

  let relevantFiles = [];

  for (let chunkStart = 0; chunkStart < filePaths.length; chunkStart += maxFilesPerChunk) {
    const chunk = filePaths.slice(chunkStart, chunkStart + maxFilesPerChunk);

    const prompt = promptFormat(chunk, userQuestion);
    // console.log("Prompt: ", prompt)

    // write a messages for chat gpt
    const messages = [
        {
            "content": prompt,
            role: "user",
        },
    ]

    try {
      const completion = await openai.createChatCompletion({
        // chatgpt turbo
        model: 'gpt-3.5-turbo',
        messages,
      })

      const topFilePath = completion.data.choices[0].message; // .trim();

      if (topFilePath) {
        relevantFiles.push(topFilePath);
      }

      // log progress
    console.log(`Completed ${chunkStart + chunk.length} of ${filePaths.length} files`);
    console.log(`Found ${relevantFiles.length} relevant files so far`)
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }

  console.log(`Top 10 files that might answer the question "${userQuestion}":`);
  console.log(relevantFiles.slice(0, 10));

  // write the relevantFiles to a file in this folder called "relevant-files.txt"
    fs.writeFile('relevant-files.txt', relevantFiles.join('\n'), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    }
    );
});
