So you have a Git repository and everything is all setup.  What now?

Generally, it is not going to be much different than working with any other
source control system, the only real difference should be the staging process.
The workflow will generally go something like this:

* syncronize with upstream
* modify files
* see what you've changed
* stage the changes you want to commit
* commit your staging area
* rinse, repeat
* push upstream

That is the most complex case - if you're not collaborating with anyone and so
have no upstream repository to push to, and you want to ignore the staging area,
it can be as simple as:

* modify files
* commit your changes
* repeat

Easy peasy.  Remember, Git is decentralized, so you don't actually need a public
or shared server to commit to - you can use it like RCS if you want and just 
track local changes.  So, let's look at that use case first, then we'll do the more 
complicated one where we have to syncronize our work with other collaborators.

### the simple case ###

The first thing we're going to do is modify some files.  Let's say we're
working on a simple library that wraps the Git command line in a Ruby library.
If you want to follow along, you can clone the project from 
[its GitHub page](http://github.com/schacon/simplegit).

For this first example we'll modify the README file to add ourselves as an
author on the project.  So we simply edit the file.  Now we want to commit
that change, so we run the 'git commit -a' command.  The '-a' tells Git to 
stage all modified files and then commit - we'll cover the 'staging area' next,
but for now just running 'git commit -a' will act something like the 'commit'
command in SVN. 

A prompt for a commit message
will open in our editor (the $EDITOR environment variable or 'core.editor' git config
variable - by default it uses 'vim') that looks like this:

	_
	# Please enter the commit message for your changes. Lines starting
	# with '#' will be ignored, and an empty message aborts the commit.
	# On branch main
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	# modified:   README
	#                                                                      
	~                                                                                      
	~                                                                                      
	".git/COMMIT_EDITMSG" 9L, 253C

We simply type our commit message and exit the editor.  

	$ git commit -a
	[master]: created 5896d4d: "added myself to the README as an author"
	 1 files changed, 2 insertions(+), 1 deletions(-)

Git will show us the commit message we typed and some statistics about what
changes were introduced in that commit.  It will also give us a checksum of the
commit, '5896d4d', that we can use to refer to this exact commit at any other 
time.

That's it - that's the simple case.  Edit files, 'git commit -a', repeat.

### the more complete case ###

Now we'll expand that use case a bit to include a remote repository we're 
pushing to so we can collaborate with other developers.  We'll also introduce
the staging area so we don't have to commit every file we've changed each time
we commit.

* syncronize with upstream
* modify files
* see what you've changed
* stage the changes you want to commit
* commit your staging area
* rinse, repeat
* push upstream