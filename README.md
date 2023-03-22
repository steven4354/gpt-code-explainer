# gpt-code-explainer

so what this does is take all the filepaths in a large code repository then run them through gpt3 to figure out the files you should look at to do a "task" or answer a "question"

this is extremely helpful for frameworks you've never used and programming languages you never written before or used.

combine this with cursor-DOT-so (the fancy GPT code editor) should allow you to contribue to a completely new framework and programming language within minutes. No need to read any docs/etc to get ramped up to a new programming language/framework/codebase.

thereotically, onboarding time to any codebase goes from days/weeks to minutes with this given enough improvements to the prompt and as new gpt versions come out.

commands

```
npm start
```

### to use

this is still pretty manual rn. the workflow is like so

say you have a large repository you have no idea on and never programmed it before. e.g. Laravel and PHP

go to the root of that codebase and run one of the commands within the `filepath-gen.sh` that will copy the filepath to your clipboard

copy/paste the filepath list to `file-paths.txt` get rid of all the old stuff

go to `run1.js` and update the question you want to ask about the codebase. The example is `I have a facebook pixel js script, which file should I place it in?`

run `npm start`

all your results will be compiled in `relevant-files.json`

### disclaimer

didn't have enough time to make this pretty haha

### future

this repo is the first step in allowing an LLM to contribute to any codebase and write production level code

you have the "logic" layer for figuring out files to look at like any good developer

take the filepaths it gives, then plop the code from those paths back into the LLM, ask the LLM to produce new code to match a given function

rinse and repeat to do all the code changes

then push up to a pull request

now you have a full LLM developer

tad scary - either devs will 10x or lose their jobs

