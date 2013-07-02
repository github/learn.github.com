---
layout: redirect
redirecturl: http://youtube.com/GitHubGuides
redirectdelay: 3000
---

<embed src="http://www.youtube.com/v/Esl439M154M" type="application/x-shockwave-flash" width="790" height="430" allowscriptaccess="always" allowfullscreen="true"></embed>

### setting up git

When you first start using Git, there are a few things you will likely want
to get setup before you start.  Git records your name and email address when
you create commits, so you need to tell Git what those are.  You can use the
`git config` command to set those.  If you pass `--global`, it will save the values
in the '~/.gitconfig' file so they are the default for all of your repositories.

	$ git config --global user.name "Scott Chacon"
	$ git config --global user.email "schacon@gmail.com"

Git also uses a text editor for creating commit messages and a few other things
that by default will use the vim text editor.  If you prefer something else, like
emacs for example, you'll have to set that, too.

	$ git config --global core.editor 'emacs'

To check your configuration values, you can just run something like this:

	$ git config user.name

Or you can edit the files yourself.  Git will first check '/etc/gitconfig', then
'~/.gitconfig', and finally '.git/config' for these values.  The format looks
like this:

	$ cat ~/.gitconfig
	[user]
		name = Scott Chacon
		email = schacon@gmail.com

### initializing a new git repo

To initialize a Git repository from an existing directory, simply type `git init`
while in that directory.  That will create the skeleton of the basic Git repository
for you in that directory.

	$ rails myproject
	$ cd myproject
	$ git init

Now you have an empty git repository (you can see the new '.git' directory there).
Now you can stage and commit files to it with the `git add` and `git commit`
commands.  We'll cover these commands in depth in the next session.

	$ git add .
	$ git commit -m 'initial commit'

Now you have a full Git repository with a commit in it, and you can run
commands like `git log` on it to see the history of the project
(which we'll cover in depth later).

	$ git log
	commit eac2f939e6a1cb3189fedd19919888d998ab0431
	Author: Scott Chacon <schacon@gmail.com>
	Date:   Sun Feb 8 07:55:57 2009 -0800

	    initial commit

### cloning a git repo

There are a number of protocols that Git can communicate over, but the three
main ones we'll deal with are ssh, http and the git protocol (a simple protocol
used just for git).

For anonymous access, it is generally over git:// or http.
To clone a repository over any protocol, simply type `git clone [url]`, where
the _url_ is something like "git://(hostname)/(path).git"

	$ git clone git://github.com/schacon/munger.git
	$ cd munger
	$ ls
	README         examples       munger.gemspec
	Rakefile       lib            spec

You can also clone repositories over http in many cases.  That looks largely
the same, but with 'http' instead of 'git'.

	$ git clone http://github.com/schacon/munger.git

This is only available if the
server has enabled it - if you are hosting your repository on GitHub, both
git:// and http:// access are enabled.

<div class="page-turns">
  <a href="index.html" class="page-prev">&laquo; Introduction To Git</a><a href="normal.html" class="page-next">Normal Workflow &raquo;</a>
</div>
