Does your IT staff mandate Subversion but you want to work in Git?  Hack on an open-source project that hasn't yet moved beyond Subversion?  Then git-svn, and by extension, this lesson, are for you.

Git and Subversion actually play fairly well together, provided you follow certain rules and guidelines.  The 'git svn' command provides two-way communication between a Git and Subversion repository.  This guide provides a brief overview of the general Subversion to Git to Subversion workflow.

### Cloning a Subversion Repository ###

The first step is to actually clone a Subversion repository using Git.  This is accomplished by executing the 'git svn clone':

	$ git svn clone <subversion-url> ?optional-directory-name?
	
For example,

	$ git svn clone file:///Users/blair/git-svn/SVNROOT git_repo
	Initialized empty Git repository in /Users/blair/git-svn/git_repo/.git/
	r1 = e1e2a18c6537614f2bebc5c0dfb4ac6f8c829a3b (git-svn)
		A	file1.c
		A	Makefile
	r2 = 58e044c16678b0a8b92e4dbed8f0a69d48ba9ec1 (git-svn)
	Checked out HEAD:
	  file:///Users/blair/git-svn/SVNROOT/trunk r2
	
As you can see, this creates a new Git repository in the directory named 'MyGitRepository', populates the Git history with all Subversion commits to the trunk, and checks out the latest HEAD.

Note that this operation will generally take longer than a corresponding 'git clone' command, as the entire history for the Subversion repository in question must be downloaded commit by commit.  For large projects, this process can take hours.  Thus it's best to execute this command only when you have some time to kill.

### Synchronizing With Upstream ###

When using Subversion, you synchronize with upstream changes by running 'svn update', which pulls down all of the changes made to your Subversion branch and merges your working copy with those changes.

With git-svn, you accomplish a similar task via the 'git svn rebase' command.

	bucky:git_repo blair$ git svn rebase
		M	Makefile
	r3 = ae409c2f5fe0831f22d6dc891652b5f9159f35de (git-svn)
	First, rewinding head to replay your work on top of it...
	Applying: Local git commit.
	
So what does this tell us?  Well, first, you see a list of modified files.  The next line informs us that revision 3 from Subversion is being stored as commit ae409c2 in our local Git repository.  No problems thus far.  But, what about that line informing us Git is rewinding and replaying our work?  Well, this is where 'svn update' and 'git svn rebase' differ slightly.

Remember that, with a Subversion repository, you don't have the concept of offline commits.  So when 'svn update' executes, all it does is pull down all of the commits from the Subversion repository, and replay the changes in your working copy.

Under Git, you've likely been making a series of changes and committing them in nice small pieces (you _are_ making regular commits, aren't you?).  So, when 'git svn rebase' is executed, it rolls back all of your local commits, pulls down all of the commits from Subversion, and then _reapplies_ your local commits as if you had made them on the current HEAD of the Subversion branch.  This has much the same logical effect as 'svn update' (all of your local changes are applied on top of the current Subversion HEAD), but may appear a little odd at first glance.


