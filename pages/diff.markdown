We saw in the 'log' section that adding a '-p' will show you the differences
that each commit introduces by showing [diff](http://en.wikipedia.org/wiki/Diff)
of the snapshots of each commit and its parent.

The 'diff' command in Git will show you the same thing - the changes between
two snapshots or files in unified diff format.  This section will show you 
the different ways you can use diff to answer common quesions you might have
about your repository.

### changes that have not been staged ###

One of the most common things you'll do with 'git diff' is to see what changes
you've made in your working directory that have not been _staged_ yet.

Let's say that we edit the simplegit.rb file to add a function, and we edit
the README file to add a new author to the list.  Then we stage the README
file with 'git add'.  Running 'git status' will show us that README is staged
and simplegit.rb is modified but not yet staged.

	$ vim lib/simplegit.rb
	$ vim README
	$ git add README
	$ git status
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#	modified:   README
	#
	# Changed but not updated:
	#   (use "git add <file>..." to update what will be committed)
	#   (use "git checkout -- <file>..." to discard changes in working directory)
	#
	#	modified:   lib/simplegit.rb
	#
	
However, what was actually changed in 'simplegit.rb'?  How can I see what 
changes I've made that I'm going to stage?  The answer is to just run 'git diff'
with no arguments.

	$ git diff
	diff --git a/lib/simplegit.rb b/lib/simplegit.rb
	index dd5ecc4..8ac6604 100644
	--- a/lib/simplegit.rb
	+++ b/lib/simplegit.rb
	@@ -25,6 +25,10 @@ class SimpleGit
	     command("git log -n 25 #{treeish}")
	   end

	+  def log_single(branch = 'master')
	+    command("git log --pretty=oneline #{branch}")
	+  end
	+
	   def blame(path)
	     command("git blame #{path}")
	   end

I can easily see the function that I added and now I can decide if I want to
stage the file like this.  Notice that it does *not* show the change to the
README file.

### changes that are staged but not committed ###

In order to see the changes that have been staged already, you can pass the
'--staged' option to 'git diff' (in pre-1.6 versions of Git, use '--cached').

	$ git diff --staged
	diff --git a/README b/README
	index c526f88..879f0d4 100644
	--- a/README
	+++ b/README
	@@ -8,3 +8,4 @@ It is an example for the Git Peepcode book that I'm currently writin
	 Author : Scott Chacon (schacon@gmail.com)
	          Orange Peel Chacon (opchacon@gmail.com)
	          Magnus O. Chacon (mchacon@gmail.com)
	+         Josephine Chacon (jo.chacon@gmail.com)

This is a very useful command, because it tells you what changes you're introducing
were you to run 'git commit' (without the '-a') at that point.

### all changes since the last commit ###

Now, if you want to see all the changes between your working directory files
and the last commit, you can directly compare them by specifying 'HEAD' on the
command line:

	$ git diff HEAD
	diff --git a/README b/README
	index c526f88..879f0d4 100644
	--- a/README
	+++ b/README
	@@ -8,3 +8,4 @@ It is an example for the Git Peepcode book that I'm currently writin
	 Author : Scott Chacon (schacon@gmail.com)
	          Orange Peel Chacon (opchacon@gmail.com)
	          Magnus O. Chacon (mchacon@gmail.com)
	+         Josephine Chacon (jo.chacon@gmail.com)
	diff --git a/lib/simplegit.rb b/lib/simplegit.rb
	index dd5ecc4..8ac6604 100644
	--- a/lib/simplegit.rb
	+++ b/lib/simplegit.rb
	@@ -25,6 +25,10 @@ class SimpleGit
	     command("git log -n 25 #{treeish}")
	   end

	+  def log_single(branch = 'master')
	+    command("git log --pretty=oneline #{branch}")
	+  end
	+
	   def blame(path)
	     command("git blame #{path}")
	   end

You can see that it shows both staged and unstaged changes.  This is useful 
because it shows you what you would commit if you were to run 'git commit -a'
at that point.

We haven't covered what **HEAD** means in Git yet - we'll go into that in 
greater detail in the 'Intermediate' lessons in this course.  It is important
to note that it is very different from what HEAD means in SVN, though.  In Git,
HEAD refers to the last commit of the branch you are currently on.  If you 
are on the 'master' branch, HEAD refers to the most recent commit on that branch,
if you are on the 'experiment' branch, it refers to the most recent commit there.
It is relative to each users local repository, and changes as you switch
between branches.

Those three commands (really mostly 'git diff' and 'git diff --staged') are
probably how you will most often be using the 'diff' command - they are often
used sort of like a really detailed 'git status'.  However, there are other
cool things you can use it for.

### how a file has changed since a specific time ###

One common question you may want answered is how a file has changed since
a specific point in the history, like a tag.  If I wanted to know how the
Git project README has changed since the initial 1.6 release, I can run 'diff'
with a path limiter:

	$ git diff v1.6.0 -- README 
	diff --git a/README b/README
	index 548142c..5fa41b7 100644
	--- a/README
	+++ b/README
	@@ -24,7 +24,7 @@ It was originally written by Linus Torvalds with help of a group o
	 hackers around the net. It is currently maintained by Junio C Hamano.

	 Please read the file INSTALL for installation instructions.
	-See Documentation/tutorial.txt to get started, then see
	+See Documentation/gittutorial.txt to get started, then see
	 Documentation/everyday.txt for a useful minimum set of commands,
	 and "man git-commandname" for documentation of each command.

That will compare the README file to the version in your working directory - if
you've made local changes, staged or unstaged, they will show up in this diff.

### changes between two commits ###

If you want to compare a file between two snapshots - two versions of your
project - instead of comparing a snapshot and the contents of your working
directory, you can specify both versions on the command line:

	$ git diff v1.0 v1.1

That would give you a big diff of all the changes between the two snapshots
that those two commits point to, as if they were both constituted in two 
directories and you ran the unix 'diff' tool on them.

You can also use some of the formatting options that you can pass to 'log', 
such as **--stat**.  If I wanted to see an overview of what all changed between
version 1.6.1.1 and 1.6.1.2 in the Git project, I could run this:

	$ git diff v1.6.1.1 v1.6.1.2 --stat
	 Documentation/RelNotes-1.6.1.2.txt |   39 +++++++++++++
	 Documentation/config.txt           |    4 +-
	 Documentation/git-ls-tree.txt      |    8 +++-
	 GIT-VERSION-GEN                    |    2 +-
	 RelNotes                           |    2 +-
	 builtin-commit.c                   |    6 ++
	 builtin-gc.c                       |    8 ++-
	 builtin-grep.c                     |   15 +++++-
	 builtin-log.c                      |   28 +++++++++-
	 builtin-ls-tree.c                  |    7 ++-
	 builtin-send-pack.c                |   43 +++++++--------
	 diffcore-rename.c                  |    9 +++-
	 git-sh-setup.sh                    |    2 +-
	 sha1_file.c                        |    3 +-
	 sha1_name.c                        |    2 +-
	 t/t2300-cd-to-toplevel.sh          |    4 +-
	 t/t4014-format-patch.sh            |   52 +++++++++++++++++-
	 t/t5519-push-alternates.sh         |  106 ++++++++++++++++++++++++++++++++++++
	 t/t7002-grep.sh                    |    7 +++
	 test-path-utils.c                  |    2 +-
	 20 files changed, 306 insertions(+), 43 deletions(-)

Then I could use that to drill down to see individual changes:

	$ git diff v1.6.1.1 v1.6.1.2 -- sha1_file.c
	diff --git a/sha1_file.c b/sha1_file.c
	index 52d1ead..ce5ea12 100644
	--- a/sha1_file.c
	+++ b/sha1_file.c
	@@ -2337,7 +2337,8 @@ static int create_tmpfile(char *buffer, size_t bufsiz, const c
	 static int write_loose_object(const unsigned char *sha1, char *hdr, int hdrlen,
	                              void *buf, unsigned long len, time_t mtime)
	 {
	-       int fd, size, ret;
	+       int fd, ret;
	+       size_t size;
	        unsigned char *compressed;
	        z_stream stream;
	        char *filename;

That shows me the total change to the sha1\_file.c file between the 1.6.1.1
and 1.6.1.2 releases of the Git project.

### what a merge would introduce ###

Another interesting question that you can answer with 'diff' is what a merge
would introduce.  This is a strange question, because if you have a line of
work that diverged into two branches and you directly compare the snapshots, 
it's going to try to tell you how to get from one state to the other.  

For instance, if you create a 'dev' branch and add a function to a file, then 
go back to your 'master' branch and remove a line from the README, and then 
run something like this:

	$ git diff master dev
	
It will tell you that a function was added from the first file and a line was 
*added* to the README.  Why?  Because on the branch, the README still has the
original line, but on 'master' you've removed it - so directly comparing the
snapshots looks like 'dev' added it.  What you really want to compare is 
what 'dev' has changed _since_ your branches diverged.  To do that, Git has
a nice little shorthand:

	$ git diff master...dev
	
This will not compare the last 'master' branch snapshot and the last 'dev'
snapshot - it will instead compare the _common ancestor_ of both with 'dev'.
That will tell you what changed _since_ the branch point.  In our example,
it would just say that the function was added.  If you are currently on the
'master' branch, you can just run this instead:

	$ git diff ...dev
	
So, if you want to see what would change in detail if you merged in a particular
branch, you can just run 

	$ git diff ...(branch)
	
Where (branch) is the name of the branch you're considering merging.

