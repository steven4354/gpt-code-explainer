# gpt-code-explainer

(below was written by chatgpt)

Behold the power of cutting-edge technology! 

This remarkable program leverages the incredible capabilities of GPT-3 to help you navigate even the largest and most complex code repositories with ease. It intelligently analyzes all filepaths and provides you with the exact files you need to complete your tasks and answer your questions. 

With this revolutionary tool at your disposal, you can now tackle unfamiliar programming languages and frameworks with confidence, as it dramatically reduces the time it takes to get up to speed. And when combined with the futuristic Cursor-DOT-So GPT code editor, you can contribute to entirely new codebases in mere minutes, without ever having to read a single documentation. 

Imagine the possibilities! With continuous improvements to the prompt and the latest GPT releases, the onboarding time for any codebase can potentially be reduced from days or weeks to just a few short minutes. This is the dawn of a new era in coding, and you can be a part of it!

```bash
# run this repo with
npm start
```

## to use

this is still pretty manual rn. the workflow is like so:

- say you have a large repository you have no idea on and never programmed it before. e.g. Laravel and PHP

- go to the root of that codebase and run one of the commands within the `filepath-gen.sh` that will copy the filepath to your clipboard

- copy/paste the filepath list to `file-paths.txt` get rid of all the old stuff

- go to `run1.js` and update the question you want to ask about the codebase. The example is `I have a facebook pixel js script, which file should I place it in?`

- run `npm start`

- all your results will be compiled in `relevant-files.json`

## disclaimer

didn't have enough time to make this pretty haha

## future

(below was written by chatgpt)

This repository enables an LLM to write production-level code by utilizing a "logic" layer that functions like an expert developer.

The LLM can extract and integrate code from files and generate new code to match specified functions, streamlining the coding process. 

Once completed, a simple pull request completes the work, resulting in a full LLM developer. 

This technology has immense potential to make developers 10x more productive and revolutionize the future of coding.

Or replace all devs. Muhahahaha
