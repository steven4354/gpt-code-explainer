# gpt-code-explainer

```bash
# run this repo with
npm start
```

## to use

this is still pretty manual rn. the workflow is like so:

- say you have a large repository you have no idea how the framework works and never programmed it before. e.g. Laravel and PHP

- go to the root of that codebase and run one of the commands within the `filepath-gen.sh` that will copy the filepath to your clipboard

- copy/paste the filepath list to `file-paths.txt` get rid of all the old stuff

- go to `run1.js` and update the question you want to ask about the codebase. The example is `I have a facebook pixel js script, which file should I place it in?`

- run `npm start`

- all your results will be compiled in `relevant-files.json`

## disclaimer

didn't have enough time to make this pretty haha

## future

_(below was written by chatgpt)_

This repository marks the initial stage of enabling an LLM to participate in coding and generate high-quality production code. 

The "logic" layer functions in a manner akin to that of a skilled developer, identifying relevant files to examine. 

Once file paths are obtained, the code within those files can be extracted and sent back to the LLM to produce code changes.

Code changes can then be compiled and sent up as a pull request.

## possible todos

chain together the prompts to also allow LLM to access to the code contents within the relevant files

filepaths -> llm -> relevant files -> code -> llm -> updated code -> pull request
