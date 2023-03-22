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

const systemPrompt = "You are a great developer assistnant to the user" + "\n\n" +

"Ask for from the user the FRAMEWORK, FILES, and QUESTION" + "\n\n" + 

"and then return the POSSIBLE_RELEVANT_FILES. You may guess a few files, no need to be fully sure." + "\n\n"

// turn frameworks into "laravel, react, node"
const promptFormat = (files, question) => {
    return "FRAMEWORKS: \n\n" +

    "laraval, nodejs" + 

    "\n\n" +

    "FILES: \n\n" +
    
    "```bash\n" +
    
    `${files.map(file => `- ${file}`).join('\n')}` + 
    
    "\n\n```\n\n" +
    
    "QUESTION: \n\n" +
        
    question + 
    
    "\n\n" +
    
    "RELEVANT_FILES: \n\n" +

    "```json\n"
}

const try1 =  "FRAMEWORKS: \n\n" +

"nodejs" + 

"\n\n" +

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

"What file contains the list of dependencies for the project? \n\n"

const answer1 = "RELEVANT_FILES: \n\n" +

"```json\n" +
    
"[package.json] \n\n" +

"```"

const try2 =  "FRAMEWORKS: \n\n" +

"nodejs" + 

"\n\n" +

"RELEVANT_FILES: \n\n" +

"```json\n" +
    
"[package.json] \n\n" +

"```" +

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

"What is the name of the file that contains the main entry point for the project? \n\n"

const answer2 =  "RELEVANT_FILES: \n\n" +

"```json\n" +

"[index.js] \n\n" +

"```"

fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) throw err;

  const filePaths = data.trim().split('\n');
  const maxFilesPerChunk = 250;

  let relevantFiles = [];

  for (let chunkStart = 0; chunkStart < filePaths.length; chunkStart += maxFilesPerChunk) {
    const chunk = filePaths.slice(chunkStart, chunkStart + maxFilesPerChunk);

    // write a messages for chat gpt
    const messages = [
        {
            role: "system",
            "content": systemPrompt
        },
        {
            role: "user",
            content: try1
        },
        {
            role: "assistant",
            content: answer1
        },
        {
            role: "user",
            content: try2
        },
        {
            role: "assistant",
            content: answer2
        },
        {
            role: "user",
            content: promptFormat(chunk, userQuestion)
        }
    ]

    console.log("STEVENDEBUG messages: ", JSON.stringify(messages))

    try {
      const completion = await openai.createChatCompletion({
        // chatgpt turbo
        model: 'gpt-3.5-turbo-0301',
        messages,
      })

      const topFilePath = completion.data.choices[0].message; // .trim();

      console.log("STEVENDEBUG topFilePath: ", topFilePath)

      if (topFilePath) {
        relevantFiles.push(topFilePath);
      }

      // log progress
    console.log(`Completed ${chunkStart + chunk.length} of ${filePaths.length} files`);
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
    fs.writeFile('relevant-files.json', JSON.stringify(relevantFiles), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    }
    );
});
