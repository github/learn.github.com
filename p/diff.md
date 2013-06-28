---
layout: redirect
redirecturl: http://youtube.com/GitHubGuides
redirectdelay: 3000
---

We saw in the 'log' section that adding a '-p' will show you the differences
that each commit introduces by showing [diff](http://en.wikipedia.org/wiki/Diff)
of the snapshots of each commit and its parent.



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

Another intersting question that you can answer with 'diff' is what a merge
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

