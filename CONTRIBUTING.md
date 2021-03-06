## Contributing

This is a guide to contributing to My Team @ Church. It should walk you through the
major steps to contributing code to the project.

### 1. Create an Issue on GitHub

The first step to contributing to My Team @ Church is creating a ticket in our
[ticketing system on GitHub](https://github.com/tntsoftware/my-team-church/issues).
Please take a second to search for the issue or feature before creating a new one.

All bug fixes should have a ticket. This makes it easy for everyone
to discuss the code and know if a fix is already in progress for an issue.


### 2. Fork & Create a Feature Branch

The next step is to fork My Team @ Church (if you haven't already done so) and
create a new git branch based on the feature or issue you're working on. Please
use a descriptive name for your branch.

For example a great branch name would be (where issue #325 is the ticket you're
working on):

    $> git checkout -b 325-add-japanese-translations


### 3. Follow setup steps in README.md

The readme contains requirements and steps for setting up your local development environment.

If something in the readme is wrong or missing please submit an issue or PR to help fix it!

https://github.com/tntsoftware/my-team-church/blob/master/README.md


### 4. Get the test suite running

My Team @ Church is a tool that many people rely on for managing their churches.
Bugs are not cool. Although we're not perfect, we pride ourselves on writing well tested code. I hope you do too :)

My Team @ Church uses rspec for it's test suite.

Most of the tests can be run with this command, see the readme for more details:

    $> bin/rspec spec

### 5. Make a pull request

At this point, you should switch back to your master branch and make sure it's
up to date with My Team @ Church's master branch. If there were any changes, you
should rebase your feature branch and make sure that it will merge correctly. If
there are any merge conflicts, your pull request will not be merged in.

Now push your changes up to your feature branch on GitHub and make a pull request!
We will pull your changes, run the test suite, review the code and merge it in.

