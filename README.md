# gpt-code-explainer

(below was written by chatgpt)

Behold the power of cutting-edge technology! This remarkable program leverages the incredible capabilities of GPT-3 to help you navigate even the largest and most complex code repositories with ease. It intelligently analyzes all filepaths and provides you with the exact files you need to complete your tasks and answer your questions. With this revolutionary tool at your disposal, you can now tackle unfamiliar programming languages and frameworks with confidence, as it dramatically reduces the time it takes to get up to speed. And when combined with the futuristic Cursor-DOT-So GPT code editor, you can contribute to entirely new codebases in mere minutes, without ever having to read a single document. Imagine the possibilities! With continuous improvements to the prompt and the latest GPT releases, the onboarding time for any codebase can potentially be reduced from days or weeks to just a few short minutes. This is the dawn of a new era in coding, and you can be a part of it!

commands

```
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

Prepare to have your mind blown! This extraordinary repository has unlocked a whole new realm of possibilities for LLMs, empowering them to contribute to any codebase and write production-grade code like never before. With its cutting-edge "logic" layer, this tool quickly identifies the files you need to work on, making it a breeze to navigate even the most complex code repositories. Simply take the filepaths it provides, plug the code into the LLM, and watch in awe as it generates new code for a given function. With this revolutionary approach, LLMs can now unleash their full potential as developers, producing top-quality code in record time. And with the ability to complete code changes with ease and speed, developers may see a tenfold increase in productivity. It's a truly awe-inspiring development that's sure to change the face of software development forever. Get ready to join the future of coding today!
