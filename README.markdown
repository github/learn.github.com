Learn.GitHub.com
================

This is the code and data behind [http://learn.github.com]. The page
content lives in the p/ directory and is compiled into the HTML output
in pages/. Normally, generated files like these wouldn't be checked into
source control, but it's required for the
[http://pages.github.com/](GitHub Pages) hosting.

If you edit a page, please remember to run 'rake' to recompile the site
and create a single commit including both your source and generated
files. This makes it as easy as possible for others to work with your
changes.

Dependencies, Getting Started
-----------------------------

Compiling the site requires maruku, which can be installed with:

    sudo gem install maruku

Once you've done that, just run rake to compile the site:

    rake

Last, 

To do: instructions for how to quickly set up a copy of the site on
GitHub Pages so contributors can see their edits. The info at
pages.github.com says that it works by repo naming, but forking the repo
always gives the name 'learn.github.com' and there doesn't seem to be a
way to rename it (and if there is one, this should be the first
instruction before people clone their repo). If the users cloned the
official learn.github.com repo and create their own named repo, the nice
GitHub features like Pull Requests and the Fork Queue won't work (I
believe). In short, this instruction needs to be written by a GitHub
guru/employee.
