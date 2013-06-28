---
layout: redirect
redirecturl: http://youtube.com/GitHubGuides
redirectdelay: 3000
---

<embed src="http://www.youtube.com/v/jnGbU-_m8oY" type="application/x-shockwave-flash" width="790" height="430" allowscriptaccess="always" allowfullscreen="true"></embed>

One of the most commonly used commands is the 'git log' command.  This command
shows you the commit history of your project, so you can see what has happened
up to this point.  With no options, it will start from the last commit on
the branch you're currently on and show you all the commits that are ancestors
of that in reverse chronological order.

	$ git log
	commit 166ae0c4d3f420721acbb115cc33848dfcc2121a
	Author: Scott Chacon <schacon@gmail.com>
	Date:   Sun Feb 8 16:50:43 2009 -0800

	    started write support

	commit 9fceb02d0ae598e95dc970b74767f19372d61af8
	Author: Magnus Chacon <mchacon@gmail.com>
	Date:   Sun Apr 27 20:43:35 2008 -0700

	    updated rakefile

	commit 964f16d36dfccde844893cac5b347e7b3d44abbc
	Author: Magnus Chacon <mchacon@gmail.com>
	Date:   Sun Apr 27 20:34:23 2008 -0700

	    commit the todo

There you can see three commits - each with:

* the checksum of the commit
* the author name and email
* the date the author committed it 
* the full commit message

This is the default format and the output is paged for you automatically. In 
most situations, this will be fine - you just want to see the last few commits
in the branch.  However, sometimes you want to see more interesting data, or
do some data mining, and 'git log' can do a number of interesting things.

### log output formatting ###

There are a number of other ways you can see the commit information from the
log command.

#### Viewing Patches ####

You can view patches with each commit entry with the **-p** option.  This can
be helpful when doing code reviews - looking at what another developer has
committed before merging it into one of your branches, or seeing what has
happened since the last release.

	$ git log -p
	commit 0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc
	Author: Scott Chacon <schacon@gmail.com>
	Date:   Sun Feb 8 18:29:31 2009 -0800

	    added a commit function

	diff --git a/lib/simplegit.rb b/lib/simplegit.rb
	index dd6b7b3..c75a3e6 100644
	--- a/lib/simplegit.rb
	+++ b/lib/simplegit.rb
	@@ -9,6 +9,10 @@ class SimpleGit
	     command("git status")
	   end
 
	+  def commit(message)
	+    command("git commit -m '#{message}'")
	+  end
	+
	   def show(treeish = 'master')
	     command("git show #{treeish}")
	   end
	
	commit 166ae0c4d3f420721acbb115cc33848dfcc2121a
	Author: Scott Chacon <schacon@gmail.com>
	Date:   Sun Feb 8 16:50:43 2009 -0800

	    started write support

	diff --git a/lib/simplegit.rb b/lib/simplegit.rb
	index dd6b7b3..e7dfaa9 100644
	--- a/lib/simplegit.rb
	+++ b/lib/simplegit.rb
	@@ -9,6 +9,10 @@ class SimpleGit
	     command("git status")
	   end

	+  def add(path)
	+    command("git add #{path}")
	+  end
	+
	   def show(treeish = 'master')
	     command("git show #{treeish}")
	   end

It's pretty verbose, but since Git pages the output, it's pretty easy to just
skip to the next commit once you get the idea.

#### Viewing Statistics ####

You can view statistics about which files have changed and how many lines
were added and removed from each file by adding the **--stat** option.

	$ git log --stat
	commit 0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc
	Author: Scott Chacon <schacon@gmail.com>
	Date:   Sun Feb 8 18:29:31 2009 -0800

	    added a commit function

	 lib/simplegit.rb |    4 ++++
	 1 files changed, 4 insertions(+), 0 deletions(-)

	commit 166ae0c4d3f420721acbb115cc33848dfcc2121a
	Author: Scott Chacon <schacon@gmail.com>
	Date:   Sun Feb 8 16:50:43 2009 -0800

	    started write support

	 lib/simplegit.rb |    4 ++++
	 1 files changed, 4 insertions(+), 0 deletions(-)

#### Preset Formats ####

There are a couple of other preset formats you can use to view your commit
history which you can trigger with the **--pretty** option. You can specify 
one of : oneline, short, medium, full, fuller, email, or raw. They are somewhat
self explanatory in how much information they show.  For example, 'raw' looks
like this:

	$ git log --pretty=raw
	commit 0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc
	tree dbcff814ec9fbbd3487171a7eaca73cf0069ba53
	parent 85211d1138cb91f25c0633d361ff5f6e00677bc5
	author Scott Chacon <schacon@gmail.com> 1234146571 -0800
	committer Scott Chacon <schacon@gmail.com> 1234146571 -0800

	    added a commit function

	commit 166ae0c4d3f420721acbb115cc33848dfcc2121a
	tree e67636948570e27a9c2bf2699ecafadf729c3efc
	parent 9fceb02d0ae598e95dc970b74767f19372d61af8
	author Scott Chacon <schacon@gmail.com> 1234140643 -0800
	committer Scott Chacon <schacon@gmail.com> 1234140643 -0800

	    started write support

The one I'll be using occasionally in this series is the 'oneline' format, 
which displays just the checksum and commit message on a single line per
commit.  This is nice for displaying a large number of commits compactly.

	$ git log --pretty=oneline
	0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
	166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
	9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
	964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
	8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
	a5f4a0daa9b13bb85283461ddaba6e589e34ccb5 added cat-file

#### Custom Format ####

If you want Git to output your commit information in a custom format, you can
use the 'format' option to --pretty : **--pretty=format:"(format)"**.  You can
specify a formatting string with variables that Git will fill in.  This is very
nice for generating custom output or for generating output for a script to read
from, since you know the format won't change from one Git release to another.

	$ git log --pretty=format:"The author of %h was %an, %ar%nThe title was >>%s<<%n"
	The author of 0b7434d was Scott Chacon, 18 hours ago
	The title was >>added a commit function<<

	The author of 166ae0c was Scott Chacon, 20 hours ago
	The title was >>started write support<<

	The author of 9fceb02 was Magnus Chacon, 10 months ago
	The title was >>updated rakefile<<

	The author of 964f16d was Magnus Chacon, 10 months ago
	The title was >>commit the todo<<

	The author of 8a5cbc4 was Scott Chacon, 5 months ago
	The title was >>updated readme<<

See the [git log docs](http://git-scm.com/docs/git-log)
for all the different options you can put in that string.

#### Branch Graph ####

One of the more interesting command line output options for log is **--graph**.
If you combine it with **--pretty=oneline** you can very effectively visualize
your commit history and branch topology. 

	$ git log --pretty=oneline --graph
	*   15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'experiment'
	|\  
	| * a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
	* |   4a447f750f910445e38338aadef48f3038b35d2b sweet
	|\ \  
	| |/  
	| * 0d52aaab4479697da7686c15f77a3d64d9165190 one more thing
	* |   6d52a271eda8725415634dd79daabbc4d9b6008e Merge branch 'experiment'
	|\ \  
	| |/  
	| * 4682c3261057305bdd616e23b64b0857d832627b added a todo file
	| * ebe0d698d3def0ec43f9b883857717de8c405d96 removed the todo file
	| * 166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
	* | 0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
	* | 85211d1138cb91f25c0633d361ff5f6e00677bc5 removed todo file
	|/  
	* 9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile

### commit filtering ###

In addition to changing the output format, you can filter the commits that 
'log' shows you in several different useful ways.  This can be helpful in
many different ways - if you are data mining somehow, or looking for a commit
you can't quite recall, etc.

#### Date Ranges ####

The log command will take **--before** and **--after** commands that restrict
the commits shown to ones that are older or newer than those dates, respectively.
You can specify several different date formats, including relative dates.  For
example, if I wanted to see commits to the Git project that happened between
Jan 26 and two weeks ago, I can run:

	$ git log --before="2 weeks ago" --after="2009-01-26" --pretty=oneline
	dfb047b9e4f7f66c5322ef642f21fd92b0a975e3 Mention "local convention" rule in t
	25655221745fd27d5da3bda7ad0fe49f2005d776 Windows: Revert to default paths and
	35fb0e8633217f602360a9987af51c4b960e7850 Compute prefix at runtime if RUNTIME
	8e3462837b0ace04357503a3f58802cc2231df29 Modify setup_path() to only add git_
	2fb3f6db96492b680899f9e40f434eeb4c778a84 Add calls to git_extract_argv0_path(
	2cd72b0b290e40fb4d6a925ce26603503f01aa09 git_extract_argv0_path(): Move check
	4dd47c3b867f51211d0dc4474dab0fee5ca614da Refactor git_set_argv0_path() to git
	026fa0d5ad9538ca76838070861531c037d7b9ba Move computation of absolute paths f


#### Looking for People ####

Git also allows you to filter the shown commits to only those that were created
by certain individuals.  There are actually two people recorded in the commit
object - one is the _author_, which is the person who originally made the commit.
The second is the _committer_, which is the person who applied it to that repo.
This is often the same, but under some circumstances they differ - for instance,
if a patch was sent over email - the author would be the person who wrote the 
patch, the committer would be the project maintainer that applied it.  

Most of the time when you're searching, you're probably looking for the author, 
but you can search for either with the **--author** and **--committer** log 
options.  For instance, here we can look through the Git source history for 
all the commits in the last 2 weeks that Johannes Schindelin authored.

	$ git log --author=johannes.schindelin --since="14 days ago" --pretty=oneline
	26be15f09db15d2b53a13d0f184d77fb54367f33 filter-branch: do not consider diver
	e1e4389832f32bb6ce029d6a6b110aa9ec768ea8 apply: fix access to an uninitialize
	418566b6fdcc0eb1b5549d0742366aa13a7ff277 Fix 'git diff --no-index' with a non
	f7951e1d97aeb7b3ed359faeab5edf9e870ec8a5 Simplify t3412
	37e5c8f46042510176a71d73c903c44214e09815 Simplify t3411
	4bd03d15e495086a38470b59447296db4c235cb9 Simplify t3410
	008849689e04e774aa7b194cd690405761e2383a test-lib.sh: introduce test_commit()
	03af0870a0e6d551a31eb830d5c2682b82ae0ac6 lib-rebase.sh: Document what set_fak
	29a03348a336f28025c824436a713cb9cb01b7a6 t3404 & t3411: undo copy&paste
	b8469ad0578d6b84ec92752a5f8df3ca5828af77 test-path-utils: Fix off by one, fou
	f265458f6116a0c03200477ae3b839f2a75bf0fa get_sha1_basic(): fix invalid memory

You can specify either the persons name or the email address to search.  You 
can also specify partial values - in the above example, it matches Johannes's
email address.  We could, for example, search for Junio Hamano with any of the 
following values:

	$ git log --author=Junio
	$ git log --author=Hamano
	$ git log --author="Junio C Hamano"
	$ git log --author=gitster@pobox.com

They're all basically equivalent.  We could even search for something like 
'gmail.com' to find every commit contributed from a Gmail account.

	$ git log --author=gmail --pretty=format:"%ae" | wc -l
    	1348
	$ git log --author=gmail --pretty=format:"%ae" | sort -u | wc -l
	     113

So, we can see that the Git source code project has had 1,348 patches contributed
by 113 different authors using a Gmail account.  Interestingly, none from Hotmail,
but 81 from a '.mil' (all from one guy). 

	$ git log --author='\.mil' --pretty=format:"%ae" | wc -l
	      81
	
#### Search Commit Messages ####

If we're more interested in the commit message than the author, we can search
for a specific phrase in the message with the **--grep** option.  For instance,
if we wanted to see all the commits in the Git commit history that referenced
C90 C compilers, we could search for 'C90':

	$ git log --grep='C90' --pretty=oneline
	8ff8eea016f27d22d0264b140843470c7f14e004 Merge branch 'jc/revlist' into next
	8c9e7947c2a76fb21bda11816c544d50e271156d http-push.c: squelch C90 warnings.
	8f1d2e6f49ee51ac062ab38337a6a70dd1998def [PATCH] Compilation: zero-length arr
	01c6ad29bd1b647d4fd1acea54e374c740ec3c10 [PATCH] Fix strange timezone handlin

#### File History ####

There are other times when you are looking for commits that introduced changes
to a particular file.  If you want to see every commit that modified the 
'notes.c' file, you can just add the path to the end of the command after a '--'
to tell Git you're going to put paths next.

	$ git log --pretty=oneline -- notes.c 
	22a3d060937072b0f197a8084af879c753c68fe7 git-notes: fix printing of multi-lin
	2dd625d022074bb677bdd5caa5146cabaf726123 Speed up git notes lookup
	879ef2485d6ced20845ca626ecb45a9b65aa3a70 Introduce commit notes

You can also do this with directories.  If you wanted to see which commits 
changed any of the files in the 't/lib-httpd' directory, you can just add the
directory name instead.

	$ git log --pretty=oneline --all -- t/lib-httpd/
	466ddf90c2f270b973d141f20e912f743743331c http-push: when making directories, 
	603fb1168218a813f1b0816b1208c5d0c92cf29d Avoid apache complaining about lack 
	faa4bc35a05ddb1822f3770cd8c51859e3b929ee http-push: add regression tests

You can also list multiple paths.  If we wanted to see which commits modified
something in the 't/lib-httpd' directory _or_ the notes.c file:

	$ git log --pretty=oneline -- t/lib-httpd/ notes.c
	7b75b331f6744fbf953fe8913703378ef86a2189 Merge branch 'js/notes'
	466ddf90c2f270b973d141f20e912f743743331c http-push: when making directories, 
	22a3d060937072b0f197a8084af879c753c68fe7 git-notes: fix printing of multi-lin
	2dd625d022074bb677bdd5caa5146cabaf726123 Speed up git notes lookup
	879ef2485d6ced20845ca626ecb45a9b65aa3a70 Introduce commit notes
	603fb1168218a813f1b0816b1208c5d0c92cf29d Avoid apache complaining about lack 
	faa4bc35a05ddb1822f3770cd8c51859e3b929ee http-push: add regression tests

#### Other Useful Options ####

Many times you won't want to see merge commits in these results, so you can
filter them out by adding the **--no-merges** option.

	$ git log --grep='C90' --pretty=oneline --no-merges
	8c9e7947c2a76fb21bda11816c544d50e271156d http-push.c: squelch C90 warnings.
	8f1d2e6f49ee51ac062ab38337a6a70dd1998def [PATCH] Compilation: zero-length arr
	01c6ad29bd1b647d4fd1acea54e374c740ec3c10 [PATCH] Fix strange timezone handlin

We can also see just the last _N_ commits by specifying the maximum number of 
commits we want to see with a '-' in front of it:

	$ git log --pretty=oneline --no-merges -5 
	621f1b4bcf40f1469fc59202248df35619e33c82 GIT 1.6.2-rc0
	7851386948dce72c739bcdfe08f069afe4f5ea45 emacs: Remove the no longer maintain
	5a7b3bf5275adf86fdd23f8824562b88c8a20e33 git.el: Add some notes about Emacs v
	6c4f70d5b2fb8f9275ca85e0927f00b8bc892819 git.el: Use integer instead of chara
	efd49f50fc087df2ad46f194ca848c5335f4cca9 git.el: Set a regexp for paragraph-s

Lastly, and this introduces a concept that we'll explore more fully in a later
lesson, we can specify a range of commits with a cool little shorthand.  If
we want to see all the commits between two specific commits, we can list the
older one and then two periods and then the newer one.  For example, if this
is our commit history:

	$ git log --pretty=oneline --graph
	* 9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
	* 964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
	* 8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
	* a5f4a0daa9b13bb85283461ddaba6e589e34ccb5 added cat-file
	* 310154e3c7db47d8bac935c2c43aee6afac11aae updated README formatting and adde
	* f7f3f6dd8fd3fa40f052427c32785a0fa01aaa5f changed my name a bit
	* 710f0f8d2cdf5af87033b9ec08859a505f9a6af5 added ls-files
	* c110d7ff8cfb86fd5cce9a8aee462678dbb4ef9b made the ls-tree function recursiv
	* ce9b0d5551762048735dd67917046b44176317e0 limiting log to 30

and we wanted to just see all the commits after the 'added ls-files' commit 
and up to the 'updated readme' commit, we can specify that like this:

	[master]$ git log --pretty=oneline 710f0f..8a5cbc
	8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
	a5f4a0daa9b13bb85283461ddaba6e589e34ccb5 added cat-file
	310154e3c7db47d8bac935c2c43aee6afac11aae updated README formatting and added 
	f7f3f6dd8fd3fa40f052427c32785a0fa01aaa5f changed my name a bit

This is hugely useful if you're looking for commits that are on one branch 
that are not on another.  If you are on your 'master' branch and wanted to see
each of the commits that are on your 'experiment' branch that are not yet
merged in, you can run:

	$ git log master..experiment --pretty=oneline
	f6b98e46bdf64454d7c6ab76d617237118799d7b git-web--browse: Fix check for /bin/
	df487baa30924a36ade38ada4f77379236dcce0f Merge branch 'maint'
	a9ee90d7ff9f3854b3096b4abbdc2013708704f5 completion: Get rid of tabbed indent
	cf9957875c3a27b6ae4593e1fa9d4dabbde68433 completion: Fix GIT_PS1_SHOWDIRTYSTA
	7e1100e9e939c9178b2aa3969349e9e8d34488bf gitweb: add $prevent_xss option to p
	
That basically tells you that if you were to merge at this point, all of those
commits will be merged in.  You can also leave off one side and Git will assume
the branch that you are currently on. So, if you are on the 'master' branch, 
this command will give you the same output:

	$ git log ..experiment --pretty=oneline

If you are on the 'experiment' branch and want to see the same information - 
everything that is on your current branch that have not been merged into 'master'
yet, you can run this:

	$ git log master.. --pretty=oneline

Very useful commands.  We'll explain why this works fully in a later section,
but for now it's useful to just remember that it does that.
<div class="page-turns">
  <a href="remotes.html" class="page-prev">&laquo; Distributed Git</a><a href="undoing.html" class="page-next">Git Reset &raquo;</a>
</div>